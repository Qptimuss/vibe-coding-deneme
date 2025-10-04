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
      fill="currentColor"
      className={cn(className)}
      {...props}
    >
      {/* Bu SVG yolu, X markasının logosunu temsil eden yaygın bir versiyondur. */}
      <path d="M18.901 1.153h3.684l-8.042 9.167 9.171 12.14H21.051l-7.405-9.768L3.661 22.847H0l8.444-9.619L0 1.153h3.863l6.063 7.067L18.901 1.153zm-2.12 19.292h3.084L5.113 3.237H2.029l11.662 18.208z"/>
    </svg>
  );
};

export default XBrandLogo;