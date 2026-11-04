import { Box, SxProps, Theme } from '@mui/material';
import { ElementType, ReactNode } from 'react';
import { colors, fonts } from '../theme/colors';
import { photoHalftone } from '../theme/textures';

/* Shared pieces of the fall 2026 look. Rules for when to use each are in docs/brand/style.md. */

type TapeColor = 'black' | 'pink' | 'cream';

const tapeColors: Record<TapeColor, { bg: string; fg: string }> = {
  black: { bg: colors.black, fg: colors.textOnBlack },
  pink: { bg: colors.pink, fg: colors.ink },
  cream: { bg: colors.cream, fg: colors.ink },
};

/** Label-maker strip: short uppercase text on flat tape, tilted a degree or two. */
export const LabelTape = ({
  children,
  color = 'black',
  tilt = -1.5,
  size = 'md',
  component = 'span',
  sx,
}: {
  children: ReactNode;
  color?: TapeColor;
  tilt?: number;
  size?: 'sm' | 'md';
  component?: ElementType;
  sx?: SxProps<Theme>;
}) => (
  <Box
    component={component}
    sx={{
      display: 'inline-block',
      bgcolor: tapeColors[color].bg,
      color: tapeColors[color].fg,
      fontFamily: fonts.sans,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: size === 'sm' ? '2px' : '3px',
      fontSize: size === 'sm' ? '0.7rem' : '0.8rem',
      lineHeight: 1.2,
      px: size === 'sm' ? 1.1 : 1.5,
      py: size === 'sm' ? 0.55 : 0.75,
      transform: `rotate(${tilt}deg)`,
      boxShadow: color === 'cream' ? `1px 1px 0 rgba(30,26,28,0.25)` : 'none',
      whiteSpace: 'nowrap',
      ...sx,
    }}
  >
    {children}
  </Box>
);

/** Translucent masking tape over a corner of a photo or paper card. Parent needs position: relative. */
export const MaskingTape = ({
  corner = 'tl',
  width = 76,
}: {
  corner?: 'tl' | 'tr' | 'bl' | 'br' | 'top';
  width?: number;
}) => {
  const place: Record<string, SxProps<Theme>> = {
    tl: { top: -10, left: -12, transform: 'rotate(-32deg)' },
    tr: { top: -10, right: -12, transform: 'rotate(34deg)' },
    bl: { bottom: -10, left: -12, transform: 'rotate(30deg)' },
    br: { bottom: -10, right: -12, transform: 'rotate(-28deg)' },
    top: { top: -12, left: '50%', transform: 'translateX(-50%) rotate(-2deg)' },
  };
  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        zIndex: 3,
        width,
        height: 24,
        bgcolor: colors.maskingTape,
        boxShadow: '0 1px 0 rgba(30,26,28,0.12)',
        pointerEvents: 'none',
        ...place[corner],
      }}
    />
  );
};

type Stock = { bg: string; fg: string; font: string; style?: 'italic' };

const stocks: Stock[] = [
  { bg: colors.cream, fg: colors.ink, font: fonts.sans },
  { bg: colors.pink, fg: colors.ink, font: fonts.sans },
  { bg: colors.black, fg: colors.cream, font: fonts.sans },
  { bg: colors.cream, fg: colors.ink, font: 'Georgia, "Times New Roman", serif' },
];

/** Fixed per-letter cut so the word doesn't reshuffle on every render. */
const cuts = [
  { stock: 0, tilt: -4, lift: 2, scale: 1 },
  { stock: 1, tilt: 3, lift: -4, scale: 0.94 },
  { stock: 2, tilt: -2, lift: 4, scale: 1.04 },
  { stock: 3, tilt: 5, lift: -2, scale: 0.96 },
  { stock: 1, tilt: -3, lift: 1, scale: 1 },
  { stock: 0, tilt: 2, lift: -3, scale: 0.98 },
];

/**
 * Ransom-note headline: each letter on its own paper scrap.
 * Use for one headline word, at most once per page.
 */
export const RansomWord = ({
  word,
  size,
  component = 'span',
  sx,
}: {
  word: string;
  /** Letter height, e.g. { xs: 56, md: 96 } */
  size: Record<string, number> | number;
  component?: ElementType;
  sx?: SxProps<Theme>;
}) => {
  const fontSize =
    typeof size === 'number'
      ? `${size}px`
      : Object.fromEntries(Object.entries(size).map(([bp, v]) => [bp, `${v}px`]));
  return (
    <Box
      component={component}
      aria-label={word}
      sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.06em', m: 0, fontSize, ...sx }}
    >
      {word.split('').map((letter, i) => {
        const cut = cuts[i % cuts.length];
        const stock = stocks[cut.stock];
        return (
          <Box
            key={`${letter}-${i}`}
            component="span"
            aria-hidden
            sx={{
              display: 'inline-block',
              bgcolor: stock.bg,
              color: stock.fg,
              fontFamily: stock.font,
              fontWeight: 700,
              fontStyle: stock.style ?? 'normal',
              fontSize: `${cut.scale}em`,
              lineHeight: 1,
              px: '0.12em',
              pt: '0.08em',
              pb: '0.06em',
              transform: `rotate(${cut.tilt}deg) translateY(${cut.lift}%)`,
              boxShadow: '2px 3px 0 rgba(20,16,18,0.45)',
            }}
          >
            {letter}
          </Box>
        );
      })}
    </Box>
  );
};

/**
 * Event photo in its own color with a light pink wash and a faint print halftone.
 * `darken` (0–1) adds a flat black layer so cream text on top stays readable.
 */
export const TintedPhoto = ({
  src,
  alt = '',
  position = 'center',
  darken = 0,
  loading = 'lazy',
  sx,
  imgSx,
}: {
  src: string;
  alt?: string;
  position?: string;
  darken?: number;
  loading?: 'lazy' | 'eager';
  sx?: SxProps<Theme>;
  imgSx?: SxProps<Theme>;
}) => (
  <Box
    sx={{
      position: 'relative',
      overflow: 'hidden',
      bgcolor: colors.black,
      isolation: 'isolate',
      '&::after': {
        content: '""',
        position: 'absolute',
        inset: 0,
        mixBlendMode: 'multiply',
        opacity: 0.18,
        backgroundImage: photoHalftone,
        backgroundSize: '6px 6px',
        pointerEvents: 'none',
      },
      ...sx,
    }}
  >
    <Box
      component="img"
      src={src}
      alt={alt}
      loading={loading}
      sx={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: position,
        display: 'block',
        filter: 'saturate(0.88) contrast(1.05)',
        ...imgSx,
      }}
    />
    <Box
      aria-hidden
      sx={{ position: 'absolute', inset: 0, bgcolor: colors.pink, opacity: 0.2, mixBlendMode: 'soft-light', pointerEvents: 'none' }}
    />
    <Box
      aria-hidden
      sx={{ position: 'absolute', inset: 0, bgcolor: colors.duotonePink, opacity: 0.12, mixBlendMode: 'multiply', pointerEvents: 'none' }}
    />
    {darken > 0 && (
      <Box
        aria-hidden
        sx={{ position: 'absolute', inset: 0, bgcolor: colors.black, opacity: darken, pointerEvents: 'none' }}
      />
    )}
  </Box>
);
