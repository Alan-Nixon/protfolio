import { Schema, model, models, Document } from 'mongoose';

export interface IEducation extends Document {
    Title: string;
    institution: string;
    Year: string;
    details: string[];
}

const educationSchema = new Schema<IEducation>({
    Title: { type: String, required: true, default: '' },
    institution: { type: String, required: true, default: '' },
    Year: { type: String, required: true, default: '' },
    details: { type: [String], required: true, default: [] }
}, { timestamps: true });

const EducationModel = models.educations || model<IEducation>('educations', educationSchema);

export default EducationModel;
