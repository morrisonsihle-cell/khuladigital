'use client';

import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { Sprite } from '@/components/ui/PixelSprite';

export default function NotFound() {
  const handleGoBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-6 pixel-grid-bg">
      <div className="pixel-card p-8 sm:p-10 text-center max-w-md w-full">
        <div className="flex items-center justify-center gap-3 mb-6">
          <AppLogo size={52} className="flex-shrink-0" />
          <Sprite name="chest" className="w-10 h-10" />
        </div>

        <p className="font-terminal text-xl text-arcade-coin mb-2">STAGE NOT FOUND // ERROR</p>
        <h1 className="font-pixel text-4xl sm:text-5xl text-arcade-coin mb-4">404</h1>

        <h2 className="font-pixel text-xs sm:text-sm text-foreground mb-4 leading-relaxed">
          GAME OVER — PAGE NOT FOUND
        </h2>
        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          The stage you&apos;re looking for doesn&apos;t exist or moved. Insert coin to return to base.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button type="button" onClick={handleGoBack} className="btn-arcade-ghost">
            [ ← Go Back ]
          </button>
          <Link href="/" className="btn-arcade">
            [ Return Home ]
          </Link>
        </div>
      </div>
    </main>
  );
}
