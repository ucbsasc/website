export type Program = {
  title: string;
  description: string;
  goals: string;
};

export const programs: Program[] = [
  {
    title: 'Southeast Asian Mentorship Program (SEAM)',
    description:
      'Berkeley students mentor Southeast Asian high schoolers through college apps and financial aid. It wraps up with a few days on campus, paid for by SEAM.',
    goals: 'Support high school students through the college process and into their first years on campus.',
  },
  {
    title: 'Southeast Asian Orientation (SEASO)',
    description:
      'Orientation for new SEA students, first-years and transfers, co-hosted with AAPA every fall. You get dinner, a rundown of campus resources, and a chance to meet the SEA orgs before classes pick up.',
    goals: 'Help new SEA students get settled, find people, and plug into orgs early.',
  },
  {
    title: 'Southeast Asian Cultural Festival (SEACF)',
    description:
      'Dance and music sets from the SEA orgs on campus, with food. Besides Night Market, it’s the biggest stage those orgs get in front of the rest of Berkeley.',
    goals: 'Give SEA organizations a stage and share our cultures with the Berkeley community.',
  },
  {
    title: 'SEAGrad',
    description:
      'Our graduation for Southeast Asian seniors and their families, with performances and cultural sashes. It’s small, and the people handing out sashes usually know the seniors personally.',
    goals: 'Celebrate graduating seniors with their families and community.',
  },
];
