import { Schema, model, models, Document } from 'mongoose';

export interface IProject extends Document {
    Title: string;
    projectImage: string;
    description: string;
    link: string;
    githubLink: string;
    videoUrl: string;
    images: string[];
    mainProject: boolean
    technologies: string[];
}

const projectSchema = new Schema<IProject>({
    Title: { type: String, required: true, default: '' },
    projectImage: { type: String, required: true, default: '' },
    description: { type: String, required: true, default: '' },
    link: { type: String, required: true, default: '' },
    githubLink: { type: String, required: true, default: '' },
    videoUrl: { type: String, required: true, default: '' },
    images: { type: [String], required: true, default: [] },
    technologies: { type: [String], required: true, default: [] },
    mainProject: { type: Boolean, required: true, default: false }
}, { timestamps: true });

const ProjectModel = models.projects || model<IProject>('projects', projectSchema);

export default ProjectModel;
