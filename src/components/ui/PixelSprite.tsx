'use client';

import React from 'react';

type Palette = Record<string, string>;

/** Renders a tiny pixel-art sprite from an ASCII grid ('.' = transparent). */
export function PixelSprite({
  grid,
  palette,
  className = '',
  label,
}: {
  grid: string[];
  palette: Palette;
  className?: string;
  label?: string;
}) {
  const h = grid.length;
  const w = Math.max(...grid.map((r) => r.length));
  const rects: React.ReactNode[] = [];
  grid.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const c = row[x];
      if (c === '.' || !palette[c]) { x++; continue; }
      let run = 1;
      while (x + run < row.length && row[x + run] === c) run++;
      rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={run} height={1} fill={palette[c]} />);
      x += run;
    }
  });
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={className}
      shapeRendering="crispEdges"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {rects}
    </svg>
  );
}

const INK = '#111319';

export const SPRITES: Record<string, { grid: string[]; palette: Palette }> = {
  programmer: {
    grid: [
      '..hhhh..',
      '.hhhhhh.',
      '.ffffff.',
      '.fefeff.',
      '.ffffff.',
      '..bbbb..',
      '.bbbbbbl',
      '.bbbbbll',
      '.b....b.',
    ],
    palette: { h: '#5B3A29', f: '#F2C29B', e: INK, b: '#2F4A8A', l: '#C9CED9' },
  },
  artist: {
    grid: [
      '..rrrr..',
      '.rrrrrr.',
      '.ffffff.',
      '.fefeff.',
      '.ffffff.',
      '..gggg..',
      '.ggggggp',
      '.gggggpO',
      '.g....g.',
    ],
    palette: { r: '#C2410C', f: '#F2C29B', e: INK, g: '#2F8A57', p: '#8B5A2B', O: '#FF5E1E' },
  },
  sword: {
    grid: [
      '......ww',
      '.....www',
      '....www.',
      '.h.www..',
      '..www...',
      '..hh....',
      '.h.hh...',
      'hh......',
    ],
    palette: { w: '#E5E9F2', h: '#FF5E1E' },
  },
  coins: {
    grid: [
      '..yyyy..',
      '.yyooyy.',
      '.yoyyoy.',
      '..yyyy..',
      '.yyyyyy.',
      'yyooooyy',
      'yoyyyyoy',
      '.yyyyyy.',
    ],
    palette: { y: '#FFC933', o: '#EA580C' },
  },
  shield: {
    grid: [
      'bbbbbbbb',
      'boooooob',
      'boooxoob',
      'boooxoob',
      'boxxxxob',
      '.boooob.',
      '..booob.',
      '...bb...',
    ].map((r) => r),
    palette: { b: '#8A93A8', o: '#FF5E1E', x: '#FFF3B0' },
  },
  chart: {
    grid: [
      '......yy',
      '.....yyy',
      '..y.yyy.',
      '.yyyyy..',
      'yy.yy...',
      'o.o.o.o.',
      'oooooooo',
      'oooooooo',
    ],
    palette: { y: '#FFC933', o: '#FF5E1E' },
  },
  megaphone: {
    grid: [
      '....ww..',
      '...www..',
      'ooowww.w',
      'ooowwwww',
      'ooowww.w',
      '.o.www..',
      '.o..ww..',
      '........',
    ],
    palette: { o: '#FF5E1E', w: '#E5E9F2' },
  },
  quill: {
    grid: [
      '......oo',
      '.....ooo',
      '....oooo',
      '...oooo.',
      '..oooo..',
      '.oooy...',
      'ooy.....',
      'y.......',
    ],
    palette: { o: '#FF5E1E', y: '#FFC933' },
  },
  chest: {
    grid: [
      '.bbbbbb.',
      'bbyyyybb',
      'bbbbbbbb',
      'bbbyybbb',
      'bbbyybbb',
      'bbbbbbbb',
      'bbbbbbbb',
    ],
    palette: { b: '#8B5A2B', y: '#FFC933' },
  },
  heart: {
    grid: [
      '.rr..rr.',
      'rrrrrrrr',
      'rrrrrrrr',
      '.rrrrrr.',
      '..rrrr..',
      '...rr...',
    ],
    palette: { r: '#FF3B3B' },
  },
  star: {
    grid: [
      '...yy...',
      '...yy...',
      'yyyyyyyy',
      '.yyyyyy.',
      '..yyyy..',
      '.yyyyyy.',
      '.yy..yy.',
    ],
    palette: { y: '#FFC933' },
  },
  trophy: {
    grid: [
      'yyyyyyyy',
      'y.yyyy.y',
      'y.yyyy.y',
      '.yyyyyy.',
      '..yyyy..',
      '...yy...',
      '..yyyy..',
      '.yyyyyy.',
    ],
    palette: { y: '#FFC933' },
  },
  chat: {
    grid: [
      'wwwwwwww',
      'wo.o.o.w',
      'wwwwwwww',
      '.wwwwww.',
      '..ww....',
      '.w......',
    ],
    palette: { w: '#FBF9F5', o: '#111319' },
  },
  eye: {
    grid: [
      '..wwww..',
      '.wwbbww.',
      'wwbkkbww',
      'wwbkkbww',
      '.wwbbww.',
      '..wwww..',
    ],
    palette: { w: '#FBF9F5', b: '#2F6FD6', k: INK },
  },
  map: {
    grid: [
      'ppppppp.',
      'pgpppgp.',
      'ppgppgpp',
      'pppgpppp',
      'pgppppgp',
      'ppppppp.',
    ],
    palette: { p: '#E8D3A0', g: '#8B5A2B' },
  },
  rocket: {
    grid: [
      '....ww..',
      '...wrrw.',
      '..wwrrww',
      '..wwwwww',
      '..wwwwww',
      '.rw.ww.r',
      'r..yy..r',
      '...yy...',
    ],
    palette: { w: '#E5E9F2', r: '#FF5E1E', y: '#FFC933' },
  },
  save: {
    grid: [
      'bbbbbbb.',
      'bwwwwbb.',
      'bwwwwbbb',
      'bbbbbbbb',
      'bbwwwwbb',
      'bbwwwwbb',
      'bbwwwwbb',
      'bbbbbbbb',
    ],
    palette: { b: '#3B5BA8', w: '#FBF9F5' },
  },
};

export function Sprite({ name, className = '', label }: { name: keyof typeof SPRITES | string; className?: string; label?: string }) {
  const s = SPRITES[name];
  if (!s) return null;
  return <PixelSprite grid={s.grid} palette={s.palette} className={className} label={label} />;
}
