export interface layoutProps {
    children: React.ReactNode;
}

export interface IUser {
    bio: string
    description: string
    name: string
    Email: string
    profileImage: string,
    githubLink: string,
    linkedInLink: string
    instaLink: string
    stackLink: string
    gitlabLink: string,
    npmLink: string
}

export interface IProject {
    _id: string;
    Title: string;
    projectImage: string;
    description: string;
    link: string;
    githubLink: string;
    images: string[]
    videoUrl:string
    technologies:string[]
}

export interface ISkill {
    _id: string;
    title: string;
    icon: string;
    skill: string;
}


export interface IExperience {
    _id: string
    title: string;
    companyName: string;
    roles: string[];
    achievements: string[];
}



export interface IOpenSource {
    title: string;
    description: string;
}

export interface IEducation {
    degree: string;
    institution: string;
    graduationYear: string;
    details: string[];
}