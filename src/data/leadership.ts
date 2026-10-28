export type LeadershipCommittee = 'Internal' | 'External' | 'Operations' | 'PR' | 'Advocacy' | 'SEAM';

export type LeadershipMember = {
    name: string;
    role: string;
    committee: LeadershipCommittee;
    email: string;
    /** Omit until we have a headshot; the About page shows initials instead. */
    image?: string;
    type: 'director' | 'officer';
};

export const leadership: LeadershipMember[] = [
    {
        name: 'April Marie Le',
        role: 'Internal Director',
        committee: 'Internal',
        email: 'le.april@berkeley.edu',
        image: '/officers/april.webp',
        type: 'director',
    },
    {
        name: 'Lia Le-Nguyen',
        role: 'External Director',
        committee: 'External',
        email: 'lia_lenguyen@berkeley.edu',
        image: '/officers/lia.webp',
        type: 'director',
    },
    {
        name: 'Christine Ly',
        role: 'Internal Director',
        committee: 'Internal',
        email: 'christine_ly@berkeley.edu',
        image: '/officers/christine.webp',
        type: 'director',
    },
    {
        name: 'Lan Vy Nguyen',
        role: 'SEAM Director',
        committee: 'SEAM',
        email: 'nguyen_nvl@berkeley.edu',
        image: '/officers/lanvy.webp',
        type: 'director',
    },
    {
        name: 'Alida Phuthama',
        role: 'External Director',
        committee: 'External',
        email: 'alidaphuthama@berkeley.edu',
        image: '/officers/alidaphuthama.webp',
        type: 'director',
    },
    {
        name: 'Tyler Htut',
        role: 'Operations Director',
        committee: 'Operations',
        email: 'tylerhtut7@berkeley.edu',
        image: '/officers/tyler.jpeg',
        type: 'director',
    },
    {
        name: 'Jordan Vu',
        role: 'Operations Director',
        committee: 'Operations',
        email: 'jordanvu@berkeley.edu',
        image: '/officers/jordan.webp',
        type: 'director',
    },
    {
        name: 'Adonis Som',
        role: 'Web and Media Officer',
        committee: 'PR',
        email: 'adonisnsom@berkeley.edu',
        image: '/officers/adonis.webp',
        type: 'officer',
    },
    {
        name: 'Khoa Nguyen',
        role: 'Web and Media Director',
        committee: 'PR',
        email: 'khoan@berkeley.edu',
        image: '/officers/khoa.webp',
        type: 'director',
    },
    {
        name: 'Timothy Kwan',
        role: 'Operations Officer',
        committee: 'Operations',
        email: 'timothy.kwan.teemo@berkeley.edu',
        image: '/officers/timothy.webp',
        type: 'officer',
    },
    {
        name: 'Krishna Sam',
        role: 'Director of Legal & Policy Advocacy',
        committee: 'Advocacy',
        email: 'krishnaksam@berkeley.edu',
        image: '/officers/krishna.webp',
        type: 'director',
    },
    {
        name: 'Thu Ta',
        role: 'Operations Officer',
        committee: 'Operations',
        email: 'thu_ta@berkeley.edu',
        image: '/officers/thuta.webp',
        type: 'officer',
    },
    {
        name: 'Noah Brand',
        role: 'Internal Officer',
        committee: 'Internal',
        email: 'noahtbrand@berkeley.edu',
        image: '/officers/noah.webp',
        type: 'officer',
    },
    {
        name: 'Tanat Alberts',
        role: 'Internal Officer',
        committee: 'Internal',
        email: 'tanatalberts@berkeley.edu',
        image: '/officers/tanat.webp',
        type: 'officer',
    },
    {
        name: 'Mason Layug',
        role: 'SEAM Officer',
        committee: 'SEAM',
        email: 'masonlayug@berkeley.edu',
        image: '/officers/mason.webp',
        type: 'officer',
    },
    {
        name: 'Ann Nguyen',
        role: 'Operations Officer',
        committee: 'Operations',
        email: 'ann.nguyem@berkeley.edu',
        image: '/officers/ann.webp',
        type: 'officer',
    },
    {
        name: 'Jennilyn Nguy',
        role: 'Web and Media Officer · SEAM',
        committee: 'PR',
        email: 'jennilynminguy@berkeley.edu',
        type: 'officer',
    },
    {
        name: 'Josephine Pham',
        role: 'Operations Officer',
        committee: 'Operations',
        email: 'josephinethaopham18@berkeley.edu',
        type: 'officer',
    },
    {
        name: 'Isabella McGrade',
        role: 'External Officer',
        committee: 'External',
        email: 'isabellamcgrade@berkeley.edu',
        image: '/officers/isabella.webp',
        type: 'officer',
    },
    {
        name: 'Liam Lively',
        role: 'External Officer · SEAM',
        committee: 'External',
        email: 'wlively@berkeley.edu',
        image: '/officers/liam.webp',
        type: 'officer',
    },
    {
        name: 'Stella Gastanaga',
        role: 'Operations Officer',
        committee: 'Operations',
        email: 'stellagastanaga@berkeley.edu',
        image: '/officers/stella.webp',
        type: 'officer',
    },
];

export const directors = leadership.filter((member) => member.type === 'director');
export const officers = leadership.filter((member) => member.type === 'officer');
