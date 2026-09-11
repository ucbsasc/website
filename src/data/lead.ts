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
    title: 'Put on real events',
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
    focus: 'General meetings & member life',
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
    focus: 'Outreach & event planning',
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
    focus: 'Finance & logistics',
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
    focus: 'Design, media & communications',
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
    detail: 'Read the position descriptions and figure out which branch fits what you want to do.',
    icon: 'lightbulb',
  },
  {
    title: 'Fill out the form',
    detail: 'Some background info and a few short-answer questions about the role you picked.',
    icon: 'diversity',
  },
  {
    title: 'Interview',
    detail: 'We read applications as they come in and reach out to schedule interviews.',
    icon: 'event',
  },
  {
    title: 'Apply by Sept. 25',
    detail: 'The form closes Friday, Sept. 25 at 11:59 p.m. Email a director if you want to know more about hours or workload.',
    icon: 'volunteer',
  },
];

export const leadRecruitingFacts: Array<{ label: string; value: string }> = [
  { label: 'Applications close', value: 'Friday, Sept. 25 at 11:59 p.m.' },
  { label: 'Info session', value: 'Thursday, Sept. 17, 8–9 PM in Wheeler 120, at our GM' },
  { label: 'Open branches', value: 'Internal, External, Ops, and PR' },
  { label: 'Time', value: 'About 5 hours a week, more around big events' },
  { label: 'After you apply', value: 'Interviews on a rolling basis' },
];
