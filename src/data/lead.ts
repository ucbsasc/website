import { LeadershipCommittee } from './leadership';

export type BenefitIconKey = 'workspace' | 'groups' | 'campaign';

export const leadBenefits: Array<{
  title: string;
  description: string;
  icon: BenefitIconKey;
}> = [
  {
    title: 'Plan programs',
    description:
      'Officers help put on events, make calls with their branch, and bring newer members into how SASC works.',
    icon: 'workspace',
  },
  {
    title: 'Work with other SEA students',
    description:
      'You spend a lot of time with other Southeast Asian students. A lot of people stay close after they leave Berkeley.',
    icon: 'groups',
  },
  {
    title: 'Ship real events',
    description:
      'Room bookings, reimbursements, Instagram posts, Night Market setup. The work shows up as things people can go to.',
    icon: 'campaign',
  },
];

export type BranchKeyFocus = string[];

export type LeadBranch = {
  name: string;
  focus: string;
  overview: string;
  image: string;
  committee: LeadershipCommittee;
  keyFocus: BranchKeyFocus;
};

export const leadBranches: LeadBranch[] = [
  {
    name: 'Internal Affairs',
    focus: 'GMs & member life',
    overview:
      'Internal runs general meetings and semester goals. Bonding, wellness, and keeping members looped in also sit here.',
    image: '/internal.webp',
    committee: 'Internal',
    keyFocus: [
      'General meetings',
      'Semester goals',
      'Bonding and wellness',
      'New member check-ins',
    ],
  },
  {
    name: 'External Affairs',
    focus: 'Outreach & events',
    overview:
      'External does outreach and helps plan major events and collaborations with other orgs and campus partners.',
    image: '/grid/tabling.webp',
    committee: 'External',
    keyFocus: [
      'Campus and Bay Area outreach',
      'Major event planning',
      'Collabs with other orgs',
    ],
  },
  {
    name: 'Operations',
    focus: 'Money & venues',
    overview:
      'Ops handles money and logistics: budgets, fundraising, reimbursements, booking venues.',
    image: '/operations.webp',
    committee: 'Operations',
    keyFocus: [
      'Budgets and reimbursements',
      'Venue booking',
      'Fundraisers and ASUC funding',
    ],
  },
  {
    name: 'Public Relations',
    focus: 'Web, merch, photo',
    overview:
      'PR does website design and development, merch, photography, graphics, and Instagram.',
    image: '/pr.webp',
    committee: 'PR',
    keyFocus: [
      'Website design and development',
      'Photography',
      'Merch and graphics',
      'Instagram',
    ],
  },
];

export type ApplicationStepIconKey = 'lightbulb' | 'diversity' | 'event' | 'volunteer';

export const leadApplicationSteps: Array<{
  title: string;
  detail: string;
  icon: ApplicationStepIconKey;
}> = [
  {
    title: 'Pick a branch',
    detail: 'We’re recruiting for Internal, External, Ops, and PR for Fall 2026. Details are below.',
    icon: 'lightbulb',
  },
  {
    title: 'Watch for dates',
    detail:
      'Application dates aren’t set. We’ll post on Instagram (@ucbsasc), the mailing list, and at GMs.',
    icon: 'diversity',
  },
  {
    title: 'Ask someone',
    detail: 'Email a director under a branch, or DM @ucbsasc, if you want hours or workload info.',
    icon: 'event',
  },
];
