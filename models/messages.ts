import { Schema, model, models, Document } from 'mongoose';

export interface IMessage extends Document {
    Name: string;
    Email: string;
    Message: string;
    Date: string;
}

const messageSchema = new Schema<IMessage>({
    Name: { type: String, required: true, default: '' },
    Email: { type: String, required: true, default: '' },
    Message: { type: String, required: true, default: '' },
    Date: { type: String, required: true, default: '' }
}, { timestamps: true });

const MessageModel = models.messages || model<IMessage>('messages', messageSchema);

export default MessageModel;
