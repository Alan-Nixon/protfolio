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


export interface IuseProjects {
    mainProjects: IProject[];
    miniProjects: IProject[]
}


export interface IProject {
    _id: string;
    Title: string;
    projectImage: string;
    description: string;
    link: string;
    githubLink: string;
    videoUrl: string
    images: string[]
    mainProject: boolean
    technologies: string[]
}
export interface IDownloads {
    value: number
    downloads: number;
    day: string
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
    _id: string
    title: string;
    description: string;
    githubLink: string
}

export interface IEducation {
    _id: string,
    Title: string;
    institution: string;
    Year: string;
    details: string[];
}

export interface ILoginCred {
    Email: string,
    Password: string
}

export interface IIntegratedApi {
    _id: string;
    Title: string;
    Description: string;
    Docs: string;
}

export interface IContact {
    _id: string
    name: string,
    email: string,
    message: string,
    createdAt: Date
}


export interface IMailOptions {
    from: string
    to: string
    subject: string
    html: string
}

export interface IMailOptionsArgs {
    from: string
    to: string
    name: string
    message: string
}

export interface sendReplyProps {
    replyTo: string,
    replyMessage: string
}