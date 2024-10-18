import { Schema, model, models, Document } from 'mongoose';

export interface IUser extends Document {
    bio: string;
    description: string;
    name: string;
    Email: string;
    profileImage: string;
    githubLink: string;
    linkedInLink: string;
    instaLink: string;
    stackLink: string;
    gitlabLink: string;
    npmLink: string;
}

const userSchema = new Schema<IUser>({
    bio: { type: String, required: true, default: '' },
    description: { type: String, required: true, default: '' },
    name: { type: String, required: true, default: '' },
    Email: { type: String, required: true, default: '' },
    profileImage: { type: String, required: true, default: '' },
    githubLink: { type: String, required: true, default: '' },
    linkedInLink: { type: String, required: true, default: '' },
    instaLink: { type: String, required: true, default: '' },
    stackLink: { type: String, required: true, default: '' },
    gitlabLink: { type: String, required: true, default: '' },
    npmLink: { type: String, required: true, default: '' }
}, { timestamps: true });

const UserModel = models.users || model<IUser>('users', userSchema);

export default UserModel;
