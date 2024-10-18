import { Schema, model, models, Document } from 'mongoose';

export interface IExperience extends Document {
    title: string;
    companyName: string;
    roles: string[];
    achievements: string[];
}

const experienceSchema = new Schema<IExperience>({
    title: { type: String, required: true, default: '' },
    companyName: { type: String, required: true, default: '' },
    roles: { type: [String], required: true, default: [] },
    achievements: { type: [String], required: true, default: [] }
}, { timestamps: true });

const ExperienceModel = models.experiences || model<IExperience>('experiences', experienceSchema);

export default ExperienceModel;
