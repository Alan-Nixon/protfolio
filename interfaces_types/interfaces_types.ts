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
    mainProject:boolean
    technologies: string[]
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
    githubLink:string
}

export interface IEducation {
    Title: string;
    institution: string;
    Year: string;
    details: string[];
}

export interface IMessage {
    _id: string
    Name: string
    Email: string
    Message: string
    Date: string
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