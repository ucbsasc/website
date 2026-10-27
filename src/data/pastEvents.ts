/**
 * The archive on the Events page. When an event ends, move it here from the
 * upcoming list in pages/Events.tsx. Newest first within each school year.
 */
export type PastEvent = {
  title: string;
  date: string;
  location?: string;
  summary: string;
  image?: { src: string; alt: string };
};

export type SchoolYear = {
  label: string;
  events: PastEvent[];
};

export const pastEvents: SchoolYear[] = [
  {
    label: 'Fall 2026',
    events: [
      {
        title: 'Fall General Meeting',
        date: 'Thu, Sept. 17, 2026 · 8–9 PM',
        location: 'Wheeler 130',
        summary:
          'First GM of the semester. We had pandan waffles and a few rounds of bầu cua cá cọp, then ran an info session for people applying to SASComm.',
        image: { src: '/gen9-17.webp', alt: 'Flyer for the September 17 SASC general meeting' },
      },
      {
        title: 'SEASO 2026',
        date: 'Thu, Sept. 3, 2026 · 4–9 PM',
        location: 'Tilden Room, MLK 5th floor',
        summary:
          'Our fifth orientation for new Southeast Asian students, co-hosted with AAPA. New students met current ones and the SEA orgs over dinner.',
        image: { src: '/seaso26.webp', alt: 'SEASO 2026 flyer with the Campanile' },
      },
    ],
  },
  {
    label: '2025–26',
    events: [
      {
        title: 'SEAGrad 2026',
        date: 'Sat, May 9, 2026 · 6–8 PM',
        location: 'Alumni House',
        summary:
          'Graduation for Southeast Asian seniors in the class of 2026, with their families there. First-gen and low-income grads could get their cap and gown rental reimbursed.',
        image: { src: '/seagrad26.webp', alt: 'SEAGrad 2026 flyer' },
      },
      {
        title: 'SEA Community Picnic',
        date: 'Wed, Apr. 29, 2026 · 5–7 PM',
        location: 'VLSB Lawn',
        summary: 'One last hangout before finals. Secrets of Tiger Thai Sensory catered, and there were games and a raffle.',
        image: { src: '/seapicnic.webp', alt: 'SEA Community Picnic flyer' },
      },
      {
        title: 'Taste of Sea Night Market',
        date: 'Mon, Apr. 6, 2026 · 6–9 PM',
        location: 'Lower Sproul Plaza',
        summary: 'SEA orgs and vendors sold food and merch on Lower Sproul, with performances in between.',
        image: { src: '/nightmarketflyer.webp', alt: 'Taste of Sea Night Market flyer calling for performers and vendors' },
      },
      {
        title: 'Resume Workshop',
        date: 'Wed, Apr. 1, 2026 · 6–7 PM',
        location: 'Wheeler 126',
        summary:
          'People brought their resumes for feedback on structure and bullet points, plus advice on applying and following up. Run by our Web and Media director.',
        image: { src: '/resume-workshop.webp', alt: 'Resume Workshop flyer' },
      },
      {
        title: 'Game Night',
        date: 'Wed, Mar. 11, 2026 · 7–8 PM',
        location: 'Wheeler 202',
        summary: 'Southeast Asian Jeopardy and a few other games. We brought milk tea.',
        image: { src: '/jeopardy.webp', alt: 'Game Night flyer' },
      },
      {
        title: 'SASCommunity Bonding Night',
        date: 'Sat, Feb. 21, 2026',
        summary:
          'Officers and members from every branch got together for games and food before midterms, and talked through plans for the rest of spring.',
      },
      {
        title: 'Spring General Meeting',
        date: 'Tue, Feb. 10, 2026',
        summary: 'First GM of the spring. Each branch gave an update and we went over what was coming up that semester.',
      },
      {
        title: 'Free Headshots',
        date: 'Fri, Feb. 6, 2026 · 2–5 PM',
        location: 'Doe Library entrance',
        summary: 'Free headshots and portraits for anyone who needed one. Everyone got edited photos afterward.',
        image: { src: '/headshots-feb6.webp', alt: 'Student posing for a headshot in front of a pink backdrop' },
      },
      {
        title: '25th Anniversary & SEAsgiving',
        date: 'Wed, Nov. 12, 2025',
        location: 'Clark Kerr Garden Room',
        summary:
          'SASC turned 25. Alumni and current members had SEAsgiving dinner together, sat in on alumni panels, and collected cans for the SEA Community Center in San Francisco.',
        image: { src: '/seasgivinggroup.webp', alt: 'Alumni and members at the 25th anniversary SEAsgiving dinner' },
      },
      {
        title: 'SEA History Workshop',
        date: 'Tue, Oct. 28, 2025 · 7–8 PM',
        location: 'VLSB 2060',
        summary:
          'A GM built around a presentation on Southeast Asian American history and refugee timelines, with snacks and a list of campus resources.',
      },
      {
        title: 'Halloween Movie Night',
        date: 'Fri, Oct. 24, 2025 · 7:30–10 PM',
        location: 'SOCS 60',
        summary: 'We watched Pee Mak, a Thai horror comedy that isn’t very scary. Costumes were optional, but they won prizes.',
        image: { src: '/halloween%20night.webp', alt: 'Halloween movie night and costume party flyer' },
      },
      {
        title: 'Free Headshots',
        date: 'Wed, Oct. 1, 2025 · 3–5 PM',
        location: 'Doe Library entrance',
        summary: 'Headshots for LinkedIn and resumes, with edited photos sent to people afterward.',
        image: { src: '/fhs.webp', alt: 'Free headshots flyer with a camera' },
      },
      {
        title: 'Fall General Meeting',
        date: 'Wed, Sept. 17, 2025 · 8–9 PM',
        summary: 'First GM of fall 2025. We introduced SASC, fed everyone, and played games with people from the other SEA orgs.',
        image: { src: '/internal.webp', alt: 'Members listening at a general meeting in a lecture room' },
      },
    ],
  },
  {
    label: '2024–25',
    events: [
      {
        title: 'Professional Headshots',
        date: 'Wed, May 7, 2025',
        summary: 'Free headshots for resumes and LinkedIn, with our media team helping people pose.',
        image: { src: '/headshots.webp', alt: 'SASC members in business clothes posing outside a campus building' },
      },
      {
        title: 'SEAGrad 2025',
        date: 'Sat, May 3, 2025 · 5–8 PM',
        location: 'YWCA Berkeley/Oakland',
        summary: 'Graduation for the class of 2025, held at the YWCA on Bancroft with performances and cultural sashes.',
        image: { src: '/seagrad-2024.webp', alt: 'A graduate receiving a sash at a past SEAGrad' },
      },
      {
        title: 'Taste of Sea Night Market',
        date: 'Fri, Mar. 14, 2025 · 7–10 PM',
        location: 'Upper Sproul Plaza',
        summary: 'Food stalls run by SEA orgs and performances on Upper Sproul.',
        image: { src: '/nightmarket-14.jpg', alt: 'Crowd at a past Taste of Sea Night Market' },
      },
    ],
  },
];
