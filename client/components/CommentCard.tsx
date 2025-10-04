import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface CommentCardProps {
  id: string; // Yorumun ID'si
  content: string;
  createdAt: string;
  userName?: string;
  userId?: string; // Yorumu oluşturan kullanıcının ID'si
  currentUserId?: string; // Şu anki giriş yapmış kullanıcının ID'si
  onDelete: (commentId: string) => void; // Silme işlemi için callback
}

export const CommentCard: React.FC<CommentCardProps> = ({
  id,
  content,
  createdAt,
  userName = "Anonim",
  userId,
  currentUserId,
  onDelete,
}) => {
  const date = new Date(createdAt).toLocaleString();
  const canDelete = currentUserId && userId === currentUserId; // Yorumu silme yetkisi kontrolü

  return (
    <div className="bg-brand-card border border-brand-purple/50 rounded-lg p-4 shadow-md relative">
      <p className="text-gray-200 text-base mb-2">{content}</p>
      <div className="flex justify-between items-center text-sm text-gray-400">
        <span>{userName}</span>
        <span>{date}</span>
      </div>
      {canDelete && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 text-red-400 hover:bg-red-900/20 hover:text-red-300"
          onClick={() => onDelete(id)}
          aria-label="Yorumu Sil"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};