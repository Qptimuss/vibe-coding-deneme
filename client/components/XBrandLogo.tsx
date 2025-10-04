import React from 'react';
import { cn } from '@/lib/utils';

interface XBrandLogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const XBrandLogo: React.FC<XBrandLogoProps> = ({ size = 24, className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor" // X logosu genellikle dolgulu olduğu için fill="currentColor" kullanıldı
      className={cn(className)}
      {...props}
    >
      {/* Bu SVG yolu, X (eski adıyla Twitter) uygulamasının logosunu temsil eder. */}
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-6.597-8.717L5.067 22.75H1.75l8.879-10.15L1.75 2.25h4.272l5.015 6.25L18.244 2.25z"/>
    </svg>
  );
};

export default XBrandLogo;