'use client';

import React, { memo, useMemo } from 'react';
import AppImage from './AppImage';

interface AppLogoProps {
  src?: string;
  alt?: string;
  size?: number;
  className?: string;
  onClick?: () => void;
}

const AppLogo = memo(function AppLogo({
  src = '/assets/images/khula-logo.jpg',
  alt = 'Khula Digital Solutions logo',
  size = 64,
  className = '',
  onClick,
}: AppLogoProps) {
  const containerClassName = useMemo(() => {
    const classes = ['inline-flex items-center justify-center'];
    if (onClick) classes.push('cursor-pointer hover:scale-105 transition-transform');
    if (className) classes.push(className);
    return classes.join(' ');
  }, [onClick, className]);

  return (
    <div className={containerClassName} onClick={onClick}>
      {src ? (
        <div
          className="relative rounded-full p-[2px] bg-arcade-coin shadow-[0_0_12px_rgba(255,201,51,0.35)] flex items-center justify-center flex-shrink-0"
          style={{ width: size, height: size }}
        >
          <div className="w-full h-full rounded-full overflow-hidden border-2 border-arcade-ink bg-arcade-coin flex items-center justify-center">
            <AppImage
              src={src}
              alt={alt}
              width={size}
              height={size}
              className="w-full h-full object-cover scale-[1.04]"
              priority={true}
              unoptimized={src.endsWith('.svg')}
            />
          </div>
        </div>
      ) : (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="flex-shrink-0 text-arcade-coin"
          aria-hidden="true"
        >
          <path d="M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3z" />
        </svg>
      )}
    </div>
  );
});

export default AppLogo;
