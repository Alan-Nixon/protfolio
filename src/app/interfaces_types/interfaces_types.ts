export interface layoutProps {
    children: React.ReactNode;
}

export interface IUser {
    bio: string
    description: string
    name: string
    Email: string
    profileImage: string
}

export interface IProject {
    _id: string;
    Title: string;
    projectImage: string;
    description: string;
    link: string;
    githubLink: string;
}

export interface ISkill {
    _id: string;
    title: string;
    icon: string;
    skill: string;
}
