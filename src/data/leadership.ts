export type LeadershipCommittee = 'Internal' | 'External' | 'Operations' | 'PR';

export type LeadershipMember = {
    name: string;
    role: string;
    committee: LeadershipCommittee;
    email: string;
    image: string;
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
        email: 'lialenguyen@berkeley.edu',
        image: '/officers/lialenguyen.webp',
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
        committee: 'External',
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
        image: '/officers/tyler.webp',
        type: 'director',
    },
    {
        name: 'Jordan Vu',
        role: 'Operations Director',
        committee: 'Operations',
        email: 'jordanvu@berkeley.edu',
        image: '/officers/jordanvu.webp',
        type: 'director',
    },
    {
        name: 'Earn Maneenop',
        role: 'PR Officer',
        committee: 'PR',
        email: 'rinradamaneenop7@berkeley.edu',
        image: '/officers/rinrada.webp',
        type: 'officer',
    },
    {
        name: 'Adonis Som',
        role: 'PR Officer',
        committee: 'PR',
        email: 'adonisnsom@berkeley.edu',
        image: '/officers/adonissom.avif',
        type: 'officer',
    },
    {
        name: 'Khoa Nguyen',
        role: 'PR Director',
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
        role: 'Internal Officer',
        committee: 'Internal',
        email: 'krishnaksam@berkeley.edu',
        image: '/officers/krishna.webp',
        type: 'officer',
    },
    {
        name: 'Noah Brand',
        role: 'Internal Officer',
        committee: 'Internal',
        email: 'noahtbrand@berkeley.edu',
        image: '/headshots.webp',
        type: 'officer',
    },
];

export const directors = leadership.filter((member) => member.type === 'director');
export const officers = leadership.filter((member) => member.type === 'officer');
