import { LeadershipCommittee } from './leadership';

export type LeadBranch = {
  name: string;
  focus: string;
  overview: string;
  image: string;
  committee: LeadershipCommittee;
  keyFocus: string[];
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
    name: 'Web and Media (PR)',
    focus: 'Design, media & communications',
    overview:
      'Web and Media does website design and development, merch, photography, graphics, and Instagram.',
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

export const leadApplicationSteps: Array<{ title: string; detail: string }> = [
  {
    title: 'Pick a branch',
    detail: 'Read the position descriptions and pick the one that sounds like the work you want to do.',
  },
  {
    title: 'Fill out the form',
    detail: 'Some background info and a few short answers about the role you want.',
  },
  {
    title: 'Interview',
    detail: 'We read applications as they come in and email you to set up an interview.',
  },
];

export const leadRecruitingFacts: Array<{ label: string; value: string }> = [
  { label: 'Applications', value: 'Closed Friday, Oct. 2' },
  { label: 'Branches', value: 'Internal, External, Ops, and Web and Media' },
  { label: 'Time', value: 'About 5 hours a week, more around big events' },
  { label: 'Next cycle', value: 'Follow @ucbsasc or join the mailing list to hear when applications reopen' },
];
