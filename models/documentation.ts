import { models, model, Schema } from "mongoose";

const documentationSchema = new Schema({
    title: { type: String, required: true, default: '' },
    description: { type: String, required: true, default: '' },
    image: { type: String, required: true, default: '' },
    url: { type: String, required: true, default: '' },
});

const DocumentationModel = models.documentations || model('documentations', documentationSchema);

export default DocumentationModel;
