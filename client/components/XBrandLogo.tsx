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
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(className)}
      {...props}
    >
      {/* Bu SVG yolu, sağladığınız görseldeki stilize X logosunu temsil eder. */}
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
      <path d="M12 2v20" />
      <path d="M2 12h20" />
    </svg>
  );
};

export default XBrandLogo;