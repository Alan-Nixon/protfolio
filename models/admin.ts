import { model, models } from "mongoose";
import { Schema } from "mongoose";




const adminSchema = new Schema({
    Email: { type: String, required: true },
    Password: { type: String, required: true }
})

const AdminModel = models.admin || model('admin', adminSchema);

export default AdminModel;