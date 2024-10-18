import { Schema, model, models, Document } from 'mongoose';

export interface IOpenSource extends Document {
    title: string;
    description: string;
}

const openSourceSchema = new Schema<IOpenSource>({
    title: { type: String, required: true, default: '' },
    description: { type: String, required: true, default: '' }
}, { timestamps: true });

const OpenSourceModel = models.openSources || model<IOpenSource>('openSources', openSourceSchema);

export default OpenSourceModel;
