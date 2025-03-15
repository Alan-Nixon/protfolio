import UserModel from "@/models/user"
import { deleteImage, uploadImage } from "../(utils)/cloudinary";



export const GET = async () => {
    try {
        const data = await UserModel.findOne();
        const res = JSON.stringify({ status: true, data, message: "success" })
        return new Response(res, { status: 200 })
    } catch (e) {
        console.error("Error in POST /api/admin/login:", e);
        return new Response("failure", { status: 500 });
    }
}


export const PATCH = async (req: Request) => {
    try {
        const body = await req.json();
        const user = await UserModel.findById(body._id);
        if (body.profileImage.startsWith("data:image")) {
            body.profileImage = await uploadImage(body.profileImage, "protfolio")
            await deleteImage(user.profileImage, "protfolio")
        }
        const data = await UserModel.findByIdAndUpdate(body._id, body);
        const res = JSON.stringify({ status: true, data, message: "success" })
        return new Response(res, { status: 200 })
    } catch (e) {
        console.error("Error in POST /api/admin/login:", e);
        return new Response("failure", { status: 500 });
    }
}


