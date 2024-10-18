import { Schema, model, models, Document } from 'mongoose';

export interface IIntegratedApi extends Document {
    Title: string;
    Description: string;
    Docs: string;
}

const integratedApiSchema = new Schema<IIntegratedApi>({
    Title: { type: String, required: true, default: '' },
    Description: { type: String, required: true, default: '' },
    Docs: { type: String, required: true, default: '' }
}, { timestamps: true });

const IntegratedApiModel = models.integratedApis || model<IIntegratedApi>('integratedApis', integratedApiSchema);

export default IntegratedApiModel;
