import { Schema, model, models, Document } from 'mongoose';

export interface IContact extends Document {
    name: string,
    email: string,
    message: string
}

const contactSchema = new Schema<IContact>({
    name: { type: String, required: true, default: '' },
    email: { type: String, required: true, default: '' },
    message: { type: String, required: true, default: '' }
}, { timestamps: true });

const ContactModel = models.contacts || model<IContact>('contacts', contactSchema);

export default ContactModel;
