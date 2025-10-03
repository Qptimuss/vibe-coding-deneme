import React from 'react';

interface CommentCardProps {
  content: string;
  createdAt: string;
  userName?: string; // Opsiyonel olarak kullanıcı adı
}

export const CommentCard: React.FC<CommentCardProps> = ({ content, createdAt, userName = "Anonim" }) => {
  const date = new Date(createdAt).toLocaleString();

  return (
    <div className="bg-brand-card border border-brand-purple/50 rounded-lg p-4 shadow-md">
      <p className="text-gray-200 text-base mb-2">{content}</p>
      <div className="flex justify-between items-center text-sm text-gray-400">
        <span>{userName}</span>
        <span>{date}</span>
      </div>
    </div>
  );
};