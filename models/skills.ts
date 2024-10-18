import { Schema, model, models, Document } from 'mongoose';

export interface ISkill extends Document {
    title: string;
    icon: string;
    skill: string;
}

const skillSchema = new Schema<ISkill>({
    title: { type: String, required: true, default: '' },
    icon: { type: String, required: true, default: '' },
    skill: { type: String, required: true, default: '' }
}, { timestamps: true });

const SkillModel = models.skills || model<ISkill>('skills', skillSchema);

export default SkillModel;
