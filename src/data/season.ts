/**
 * Update this file when the school year or recruitment cycle changes.
 * Home and Events read from here so seasonal CTAs stay in one place.
 */
export type SeasonMode = 'quiet' | 'recruitment' | 'active';

export type NextEvent = {
  title: string;
  dateLabel: string;
  location?: string;
  /** Optional deep link (events page, form, calendar, etc.) */
  href?: string;
  /** Button label when href is set (defaults to Details) */
  ctaLabel?: string;
};

export const siteSeason: {
  mode: SeasonMode;
  /** Set when the next GM / public event is confirmed */
  nextEvent: NextEvent | null;
} = {
  mode: 'recruitment',
  nextEvent: {
    title: 'Fall General Meeting',
    dateLabel: 'Thu, Sept 17 · 8–9 PM',
    location: 'Wheeler 130',
    href: '/events',
  },
};
