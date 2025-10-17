import type React from 'react';
import { cn } from '@/lib/utils';

interface RippleEffectProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  color?: string;
  intensity?: 'light' | 'medium' | 'strong';
  rings?: number;
  position?:
    | 'center'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'top-center'
    | 'bottom-center';
  className?: string;
}

export function RippleEffect({
  size = 'md',
  color = 'primary',
  intensity = 'medium',
  rings = 5,
  position = 'center',
  className,
}: RippleEffectProps) {
  const sizeConfig = {
    sm: { base: 8, increment: 2 },
    md: { base: 12, increment: 4 },
    lg: { base: 16, increment: 6 },
    xl: { base: 28, increment: 14 },
    xxl: { base: 36, increment: 16 },
  };

  const intensityConfig = {
    light: [4, 6, 8, 10, 12],
    medium: [6, 8, 10, 12, 16],
    strong: [8, 12, 16, 20, 25],
  };

  const positionConfig = {
    center: 'items-center justify-center',
    'top-left': 'items-start justify-start',
    'top-right': 'items-start justify-end',
    'bottom-left': 'items-end justify-start',
    'bottom-right': 'items-end justify-end',
    'top-center': 'items-start justify-center',
    'bottom-center': 'items-end justify-center',
  };

  // Mapa de cores para valores RGB/hex
  const colorMap: Record<string, string> = {
    primary: '#388BFF',
    'red-600': '#DC2626',
    red: '#DC2626',
    blue: '#388BFF',
    green: '#10B981',
    yellow: '#F59E0B',
  };

  const { base, increment } = sizeConfig[size];
  const opacities = intensityConfig[intensity];
  const positionClasses = positionConfig[position];
  const baseColor = colorMap[color] || color;

  // Função para converter hex para rgba
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha / 100})`;
  };

  return (
    <div className={cn('absolute inset-0 flex pointer-events-none', positionClasses, className)}>
      <div className="relative">
        {Array.from({ length: rings }).map((_, index) => {
          const ringSize = base + increment * (rings - index - 1);
          const opacity = opacities[index] || opacities[opacities.length - 1];

          return (
            <div
              key={index}
              className={`absolute border rounded-full`}
              style={{
                width: `${ringSize * 4}px`,
                height: `${ringSize * 4}px`,
                borderColor: hexToRgba(baseColor, opacity),
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

interface RippleWrapperProps {
  children: React.ReactNode;
  rippleProps?: RippleEffectProps;
  className?: string;
}

export function RippleWrapper({ children, rippleProps, className }: RippleWrapperProps) {
  return (
    <div className={cn('relative', className)}>
      <RippleEffect {...rippleProps} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
