/** Fall 2026 palette, matched to the Crafts + Home Language Social flyer. See docs/brand/style.md. */
export const colors = {
  ink: '#1E1A1C',
  black: '#141012',
  /** The one pink, shared with print. */
  pink: '#FF5C92',
  /** Sits under duotone photos. */
  duotonePink: '#FF7AA0',
  /** Page background: warm newsprint white. */
  page: '#FAF8F4',
  /** Cards. */
  paper: '#FFFFFF',
  /** A very pale pink band, used sparingly to break up long light stretches. */
  blush: '#FBEBEE',
  /** A material now, not a background: label tape, ransom scraps, small paper cards. */
  cream: '#F3ECE1',
  textOnBlack: '#F7F0E6',
  mutedOnBlack: '#B3A9AD',
  maskingTape: 'rgba(237, 226, 205, 0.82)',
  scrapGrey: '#D9D3CF',
  inkMuted: '#5A5154',

  // Older names still used by pages that haven't been restyled yet.
  lightPink: '#FFD3E1',
  darkPink: '#E8437A',
  gold: '#D4AF37',
  lightGold: '#F4E0A7',
  charcoal: '#1E1A1C',
  bayNavy: '#141012',
  bayFog: '#FAF8F4',
  calBlue: '#003262',
};

/** Paper is square-cornered. */
export const RADIUS = 0;

export const fonts = {
  /** Web stand-in for the print Helvetica Neue, loaded for every visitor so the site looks the same everywhere. */
  sans: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
  /** One graffiti word or short phrase per page, at most. */
  graffiti: '"Sedgwick Ave Display", "Inter", Helvetica, Arial, sans-serif',
};
