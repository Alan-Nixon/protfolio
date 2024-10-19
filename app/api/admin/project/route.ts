import { uploadImage } from "../(utils)/cloudinary"
import ProjectModel from "@/models/project"

const isShah = (str: string) => {
    return str.startsWith("data")
}

export const POST = async (req: Request) => {
    try {
        const body = await req.json()
        const project = await ProjectModel.findById(body._id);
        console.log(project)
        if (isShah(body.projectImage)) {
            body.projectImage = await uploadImage(body.projectImage, "protfolio/projectImages")
        }
        body.images = await Promise.all(body.images.map(async (item: string) => {
            return isShah(item) ? await uploadImage(item, "protfolio/projectImages") : item
        }))
        const data = await ProjectModel.insertMany(body)
        const res = JSON.stringify({ status: true, data, message: "success" })
        return new Response(res, { status: 200 })
    } catch (e) {
        console.log(e)
    }
}

export const PUT = async (req: Request) => {
    try {
        const body = await req.json();
        const project = await ProjectModel.findById(body._id);
        console.log(project)
        if (isShah(body.projectImage)) {
            body.projectImage = await uploadImage(body.projectImage, "protfolio/projectImages")
        }
        body.images = await Promise.all(body.images.map(async (item: string) => {
            return isShah(item) ? await uploadImage(item, "protfolio/projectImages") : item
        }))
        const data = await ProjectModel.findByIdAndUpdate(body._id, body)
        const res = JSON.stringify({ status: true, data, message: "success" })
        return new Response(res, { status: 200 })
    } catch (e) {
        console.log(e)
    }
}

export const DELETE = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url!);
        const projectId = searchParams.get('projectId');
        const data = await ProjectModel.findByIdAndDelete(projectId)
        const res = JSON.stringify({ status: true, data, message: 'success' });
        return new Response(res, { status: 200 });
    } catch (e) {
        console.log(e);
        return new Response(JSON.stringify({ status: false, message: 'error' }), { status: 500 });
    }
};
