import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { CommentCard } from './CommentCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useSession } from '@/integrations/supabase/auth'; // useSession hook'unu import et
import { toast } from '@/hooks/use-toast'; // toast bildirimlerini import et

interface Comment {
  id: string;
  user_id: string;
  content: string;
  is_moderated: boolean;
  created_at: string;
}

export const CommentList: React.FC = () => {
  const { session } = useSession(); // Mevcut oturumu al
  const currentUserId = session?.user?.id; // Giriş yapmış kullanıcının ID'si
  const queryClient = useQueryClient();

  const { data: comments, isLoading, error } = useQuery<Comment[], Error>({
    queryKey: ['comments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('is_moderated', true) // Sadece onaylanmış yorumları göster
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });

  // Yorum silme işlemi için useMutation hook'u
  const deleteCommentMutation = useMutation({
    mutationFn: async (commentId: string) => {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId)
        .eq('user_id', currentUserId); // Sadece yorum sahibi silebilir

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] }); // Yorum listesini yenile
      toast({
        title: 'Yorum Silindi',
        description: 'Yorumunuz başarıyla silindi.',
      });
    },
    onError: (err) => {
      toast({
        title: 'Hata',
        description: `Yorum silinirken bir hata oluştu: ${err.message}`,
        variant: 'destructive',
      });
    },
  });

  const handleDeleteComment = (commentId: string) => {
    if (window.confirm('Bu yorumu silmek istediğinizden emin misiniz?')) {
      deleteCommentMutation.mutate(commentId);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-24 w-full bg-brand-card" />
        <Skeleton className="h-24 w-full bg-brand-card" />
        <Skeleton className="h-24 w-full bg-brand-card" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Yorumlar yüklenirken bir hata oluştu: {error.message}</div>;
  }

  return (
    <div className="space-y-4">
      {comments?.length === 0 ? (
        <p className="text-gray-400 text-center">Henüz yorum yok. İlk yorumu siz yapın!</p>
      ) : (
        comments?.map((comment) => (
          <CommentCard
            key={comment.id}
            id={comment.id}
            content={comment.content}
            createdAt={comment.created_at}
            userId={comment.user_id}
            currentUserId={currentUserId} // Mevcut kullanıcı ID'sini CommentCard'a ilet
            onDelete={handleDeleteComment} // Silme işlevini CommentCard'a ilet
          />
        ))
      )}
    </div>
  );
};