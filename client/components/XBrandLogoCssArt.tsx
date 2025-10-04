import React from 'react';
import { cn } from '@/lib/utils';

interface XBrandLogoCssArtProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number; // Logo boyutunu kontrol etmek için
}

const XBrandLogoCssArt: React.FC<XBrandLogoCssArtProps> = ({ size = 24, className, ...props }) => {
  // CSS değişkenini hesaplamak için stil
  const containerStyle = {
    '--size': `${size}px`,
    // color: 'rgb(239, 243, 244)', // Bu satırı kaldırarak rengin parent'tan gelmesini sağlıyoruz
  } as React.CSSProperties;

  return (
    <div
      className={cn("relative", `w-[var(--size)] h-[var(--size)]`, className)}
      style={containerStyle}
      {...props}
    >
      <div
        className="absolute border-solid"
        style={{
          borderTopWidth: `calc(var(--size) * 0.1)`, // Daha da kalınlaştırıldı
          borderBottomWidth: `calc(var(--size) * 0.1)`, // Daha da kalınlaştırıldı
          borderLeftWidth: `calc(var(--size) * 0.11)`, // Daha da kalınlaştırıldı
          borderRightWidth: `calc(var(--size) * 0.11)`, // Daha da kalınlaştırıldı
          top: 0,
          left: `calc(50% - var(--size) * 0.142)`,
          width: `calc(var(--size) * 0.28)`,
          height: `var(--size)`,
          transform: 'skew(35deg)',
        }}
      ></div>
      <div
        className="absolute w-0 border-solid bg-current"
        style={{
          borderWidth: `calc(var(--size) * 0.08)`, // Daha da kalınlaştırıldı
          height: `calc(var(--size) * 0.45)`,
          transform: 'skew(-41deg)',
          top: 0,
          left: `calc(50% + var(--size) * 0.184)`,
          borderBottomLeftRadius: `calc(var(--size) * 0.15)`,
        }}
      ></div>
      <div
        className="absolute w-0 border-solid bg-current"
        style={{
          borderWidth: `calc(var(--size) * 0.08)`, // Daha da kalınlaştırıldı
          height: `calc(var(--size) * 0.45)`,
          transform: 'skew(-41deg)',
          left: `calc(50% - var(--size) * 0.304)`,
          bottom: 0,
          borderTopRightRadius: `calc(var(--size) * 0.05)`,
        }}
      ></div>
    </div>
  );
};

export default XBrandLogoCssArt;