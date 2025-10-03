import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { CommentCard } from './CommentCard';
import { Skeleton } from '@/components/ui/skeleton';

interface Comment {
  id: string;
  user_id: string;
  content: string;
  is_moderated: boolean;
  created_at: string;
}

export const CommentList: React.FC = () => {
  const { data: comments, isLoading, error, refetch } = useQuery<Comment[], Error>({
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

  // Yorumlar gönderildikten sonra listeyi yenilemek için bir fonksiyon
  const refreshComments = () => {
    refetch();
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
          <CommentCard key={comment.id} content={comment.content} createdAt={comment.created_at} />
        ))
      )}
    </div>
  );
};