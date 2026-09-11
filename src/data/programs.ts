export type Program = {
  title: string;
  description: string;
  goals: string;
};

export const programs: Program[] = [
  {
    title: 'Southeast Asian Mentorship Program (SEAM)',
    description:
      'Berkeley students mentor Southeast Asian high schoolers through a semester of college apps, financial aid, and all the questions that are hard to ask when nobody in your family has done this before.',
    goals: 'Support high school students through the college process and into their first years on campus.',
  },
  {
    title: 'Southeast Asian Orientation (SEASO)',
    description:
      'Orientation for new SEA students, first-years and transfers, co-hosted with AAPA every fall. There’s dinner, workshops on campus resources, and a chance to meet the SEA orgs before the semester gets busy.',
    goals: 'Help new SEA students get settled, find people, and plug into orgs early.',
  },
  {
    title: 'Southeast Asian Cultural Festival (SEACF)',
    description:
      'A night of dance, music, and food put on with the SEA orgs on campus. Along with Night Market, it’s one of the main ways we get SEA orgs in front of the rest of Berkeley.',
    goals: 'Give SEA organizations a stage and share our cultures with the Berkeley community.',
  },
  {
    title: 'SEAGrad',
    description:
      'Our graduation for Southeast Asian seniors and their families, with performances and cultural sashes. It’s smaller than commencement on purpose, so every senior gets recognized by people who know them.',
    goals: 'Celebrate graduating seniors with their families and community.',
  },
];
