import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useSession } from '@/integrations/supabase/auth';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import TextareaAutosize from 'react-textarea-autosize';

const formSchema = z.object({
  content: z.string().min(10, {
    message: 'Yorum en az 10 karakter olmalıdır.',
  }).max(500, {
    message: 'Yorum en fazla 500 karakter olmalıdır.',
  }),
});

interface CommentFormProps {
  onCommentSubmitted: () => void;
}

export const CommentForm: React.FC<CommentFormProps> = ({ onCommentSubmitted }) => {
  const { session } = useSession();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!session) {
      toast({
        title: 'Giriş Yapmalısınız',
        description: 'Yorum göndermek için lütfen giriş yapın.',
        variant: 'destructive',
      });
      return;
    }

    try {
      // 1. Yorumu veritabanına ekle (başlangıçta is_moderated: false)
      const { data: commentData, error: insertError } = await supabase
        .from('comments')
        .insert({
          user_id: session.user.id,
          content: values.content,
          is_moderated: false, // Başlangıçta denetlenmemiş
        })
        .select()
        .single();

      if (insertError) throw insertError;

      // 2. Edge Fonksiyonunu çağırarak yorumu denetle
      const { data: moderationResult, error: invokeError } = await supabase.functions.invoke('moderate-comment', {
        body: JSON.stringify({ commentId: commentData.id, content: values.content }),
      });

      if (invokeError) throw invokeError;

      if (moderationResult.is_moderated) {
        toast({
          title: 'Yorum Gönderildi',
          description: 'Yorumunuz başarıyla gönderildi ve onaylandı.',
        });
      } else {
        toast({
          title: 'Yorum Denetlendi',
          description: 'Yorumunuz denetimden geçemedi ve herkese açık olarak görünmeyecek.',
          variant: 'destructive',
        });
      }

      form.reset();
      onCommentSubmitted(); // Yorum listesini yenilemek için callback
    } catch (error: any) {
      console.error('Yorum gönderme hatası:', error);
      toast({
        title: 'Hata',
        description: error.message || 'Yorum gönderilirken bir hata oluştu.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Yorumunuz</FormLabel>
              <FormControl>
                <TextareaAutosize
                  minRows={3}
                  maxRows={10}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Yorumunuzu buraya yazın..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting} className="bg-brand-purple hover:bg-brand-purple/80 text-white">
          Yorum Gönder
        </Button>
      </form>
    </Form>
  );
};