export type PartnerCategory = 'Student Orgs' | 'Campus Resources' | 'SASC Programs';

export type Partner = {
    name: string;
    category: PartnerCategory;
    emails?: string[];
    instagram?: string;
    /** Optional path under /public/partners for an official logo asset */
    logo?: string;
};

export const partnerCategories: PartnerCategory[] = ['Student Orgs', 'Campus Resources', 'SASC Programs'];

export const partners: Partner[] = [
    // Southeast Asian & Asian American student orgs
    {
        name: 'Hmong Student Association at Berkeley (HSAB)',
        category: 'Student Orgs',
        emails: ['hsaberkeley@gmail.com'],
        instagram: '@hsaberkeley',
        logo: '/partners/hsab.png',
    },
    {
        name: 'Burmese Student Association (BURSA)',
        category: 'Student Orgs',
        emails: ['bab.berkeley@gmail.com'],
        instagram: '@calbursa',
        logo: '/partners/bursa.jpg',
    },
    {
        name: 'Khmer Student Association (KSA)',
        category: 'Student Orgs',
        emails: ['ksaberkeley@gmail.com'],
        instagram: '@ksaberkeley',
        logo: '/partners/ksa.jpg',
    },
    {
        name: 'Thai American Cultural Association (TACA)',
        category: 'Student Orgs',
        emails: ['taca.berkeley@gmail.com'],
        instagram: '@cal_taca',
        logo: '/partners/taca.jpg',
    },
    {
        name: 'Thai Students Association (ThaiSA)',
        category: 'Student Orgs',
        emails: ['cal.thaisa@gmail.com'],
        instagram: '@thaisaberkeley',
        logo: '/partners/thaisa.jpg',
    },
    {
        name: 'Vietnamese Student Association (VSA)',
        category: 'Student Orgs',
        instagram: '@cal_vsa',
        logo: '/partners/vsa.png',
    },
    {
        name: 'Laotian American Student Representative (LASR)',
        category: 'Student Orgs',
        emails: ['ucberkeleylasr@gmail.com'],
        instagram: '@cal.lasr',
        logo: '/partners/lasr.jpg',
    },
    {
        name: 'Pilipino American Alliance (PAA)',
        category: 'Student Orgs',
        emails: ['paa.chair@gmail.com'],
        instagram: '@ucbpaa',
        logo: '/partners/paa.jpg',
    },
    {
        name: 'Berkeley Indonesian Student Association (BISA)',
        category: 'Student Orgs',
        emails: ['berkeleybisa@gmail.com'],
        instagram: '@berkeleybisa',
        logo: '/partners/bisa.png',
    },
    {
        name: 'Malaysian Student Association at Berkeley (MASA)',
        category: 'Student Orgs',
        instagram: '@masaberkeley',
        logo: '/partners/masa.jpg',
    },
    {
        name: 'REACH! Asian American Recruitment and Retention Center',
        category: 'Student Orgs',
        emails: ['ucb.reachcore@gmail.com'],
        instagram: '@cal.reach',
        logo: '/partners/reach.jpg',
    },
    {
        name: 'Asian American Political Activation Program (AAPA & APASD)',
        category: 'Student Orgs',
        emails: ['aapa@berkeley.edu', 'apasd@berkeley.edu'],
        instagram: '@calaapa',
        logo: '/partners/aapa.jpg',
    },
    {
        name: 'Singapore Student Association (SSA)',
        category: 'Student Orgs',
        emails: ['ssaberkeley@gmail.com'],
        instagram: '@ucberkeleyssa',
        logo: '/partners/ssa.svg',
    },
    {
        name: 'Asian American Research Journal (AARJ)',
        category: 'Student Orgs',
        emails: ['chiefeditor@aarj.berkeley.edu'],
        instagram: '@ucberkeleyaarj',
        logo: '/partners/aarj.png',
    },

    // Campus academic & library resources
    {
        name: 'South/Southeast Asia Library',
        category: 'Campus Resources',
        emails: ['vshih@library.berkeley.edu'],
    },
    {
        name: 'Ethnic Studies Library',
        category: 'Campus Resources',
        emails: ['esl@library.berkeley.edu', 'csl@library.berkeley.edu'],
    },
    {
        name: 'Asian American and Asian Diaspora Studies (AAADS)',
        category: 'Campus Resources',
        emails: ['umk@berkeley.edu'],
    },

    // SASC's own subprograms
    {
        name: 'Southeast Asian Mentorship (SEAM)',
        category: 'SASC Programs',
        emails: ['ucb.seam@gmail.com'],
        instagram: '@ucbseam',
        logo: '/partners/seam.jpg',
    },
    {
        name: 'Southeast Asian Prison Outreach Project (SEAPOP)',
        category: 'SASC Programs',
    },
];
