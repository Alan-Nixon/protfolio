import { model, models } from "mongoose";
import { Schema } from "mongoose";

export interface IAdmin extends Document {
    Email: string,
    Password: string,
}

const adminSchema = new Schema({
    Email: { type: String, required: true, default: '' },
    Password: { type: String, required: true, default: '' }
})

const AdminModel = models.admins || model<IAdmin>('admins', adminSchema);

export default AdminModel;