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
        image: '/officers/april.jpg',
        type: 'director',
    },
    {
        name: 'Lia Le-Nguyen',
        role: 'External Director',
        committee: 'External',
        email: 'lialenguyen@berkeley.edu',
        image: '/officers/lialenguyen.png',
        type: 'director',
    },
    {
        name: 'Christine Ly',
        role: 'Internal Director',
        committee: 'Internal',
        email: 'christine_ly@berkeley.edu',
        image: '/officers/christine.jpeg',
        type: 'director',
    },
    {
        name: 'Lan Vy Nguyen',
        role: 'SEAM Director',
        committee: 'External',
        email: 'nguyen_nvl@berkeley.edu',
        image: '/officers/lanvy.jpeg',
        type: 'director',
    },
    {
        name: 'Alida Phuthama',
        role: 'External Director',
        committee: 'External',
        email: 'alidaphuthama@berkeley.edu',
        image: '/officers/alidaphuthama.png',
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
        image: '/officers/jordanvu.jpeg',
        type: 'director',
    },
    {
        name: 'Earn Maneenop',
        role: 'PR Officer',
        committee: 'PR',
        email: 'rinradamaneenop7@berkeley.edu',
        image: '/officers/rinrada.jpeg',
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
        image: '/officers/khoa.png',
        type: 'director',
    },
    {
        name: 'Timothy Kwan',
        role: 'Operations Officer',
        committee: 'Operations',
        email: 'timothy.kwan.teemo@berkeley.edu',
        image: '/officers/timothy.jpg',
        type: 'officer',
    },
    {
        name: 'Krishna Sam',
        role: 'Internal Officer',
        committee: 'Internal',
        email: 'krishnaksam@berkeley.edu',
        image: '/officers/krishna.jpg',
        type: 'officer',
    },
    {
        name: 'Noah Brand',
        role: 'Internal Officer',
        committee: 'Internal',
        email: 'noahtbrand@berkeley.edu',
        image: '/headshots.jpg',
        type: 'officer',
    },
];

export const directors = leadership.filter((member) => member.type === 'director');
export const officers = leadership.filter((member) => member.type === 'officer');
