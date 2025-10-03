import React from 'react';
import { CommentForm } from '@/components/CommentForm';
import { CommentList } from '@/components/CommentList';
import { useQueryClient } from '@tanstack/react-query';

export default function CommentsPage() {
  const queryClient = useQueryClient();

  const handleCommentSubmitted = () => {
    // Yorum gönderildikten sonra 'comments' sorgusunu geçersiz kıl
    // Bu, CommentList bileşeninin verileri yeniden çekmesini sağlar.
    queryClient.invalidateQueries({ queryKey: ['comments'] });
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white overflow-hidden relative">
      {/* Background blur effects */}
      <div className="absolute top-[-200px] left-[-100px] w-[775px] h-[775px] rounded-full bg-brand-purple opacity-50 blur-[185px] pointer-events-none" />
      <div className="absolute top-[400px] right-[-200px] w-[775px] h-[775px] rounded-full bg-brand-cyan opacity-80 blur-[246px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[188px] py-16 pt-20 relative z-10">
        <div className="text-center space-y-6 mb-12">
          <h1 className="font-outfit text-4xl lg:text-6xl font-bold capitalize">
            Yorumlar
          </h1>
          <p className="font-roboto text-xl text-gray-300 max-w-2xl mx-auto">
            Düşüncelerinizi paylaşın ve diğer kullanıcıların yorumlarını okuyun.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-outfit text-3xl font-bold mb-6">Yorum Yap</h2>
            <CommentForm onCommentSubmitted={handleCommentSubmitted} />
          </div>
          <div>
            <h2 className="font-outfit text-3xl font-bold mb-6">Tüm Yorumlar</h2>
            <CommentList />
          </div>
        </div>
      </div>
      <div className="h-16" />
    </div>
  );
}