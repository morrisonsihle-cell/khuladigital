'use client';

import React from 'react';
import {
  QuestionMarkCircleIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import {
  QuestionMarkCircleIcon as QuestionMarkCircleIconSolid,
  SparklesIcon as SparklesIconSolid,
} from '@heroicons/react/24/solid';

type IconVariant = 'outline' | 'solid';

interface IconProps {
  name: string;
  variant?: IconVariant;
  size?: number;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  [key: string]: unknown;
}

const OUTLINE_ICONS: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  SparklesIcon,
  QuestionMarkCircleIcon,
};

const SOLID_ICONS: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  SparklesIcon: SparklesIconSolid,
  QuestionMarkCircleIcon: QuestionMarkCircleIconSolid,
};

function Icon({
  name,
  variant = 'outline',
  size = 24,
  className = '',
  onClick,
  disabled = false,
  ...props
}: IconProps) {
  const iconSet = variant === 'solid' ? SOLID_ICONS : OUTLINE_ICONS;
  const IconComponent = iconSet[name];

  if (!IconComponent) {
    return (
      <QuestionMarkCircleIcon
        width={size}
        height={size}
        className={`text-gray-400 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        onClick={disabled ? undefined : onClick}
        {...props}
      />
    );
  }

  return (
    <IconComponent
      width={size}
      height={size}
      className={`${disabled ? 'opacity-50 cursor-not-allowed' : onClick ? 'cursor-pointer hover:opacity-80' : ''} ${className}`}
      onClick={disabled ? undefined : onClick}
      {...props}
    />
  );
}

export default Icon;