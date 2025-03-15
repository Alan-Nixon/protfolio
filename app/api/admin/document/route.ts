import DocumentationModel from "@/models/documentation"
import { deleteImage, uploadImage } from "../(utils)/cloudinary"


export async function POST(req: Request) {
    const body = await req.json()
    const image = await uploadImage(body.image, 'protfolio/documentations')
    try {
        await DocumentationModel.insertMany({
            title: body.title,
            description: body.description,
            image, url: body.url
        })
        const response = JSON.stringify({ status: true, message: "success" })
        return new Response(response, { status: 200 })
    } catch (error) {
        console.log(error)
        await deleteImage(image, "protfolio/documentations")
        return new Response("error", { status: 500 })
    }
}

export async function GET() {
    try {
        const data = await DocumentationModel.find()
        const response = JSON.stringify({ status: true, data, message: "success" })
        return new Response(response, { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("error", { status: 500 })
    }
}

export async function PUT(req: Request) {
    try {
        const body = await req.json()
        const data = await DocumentationModel.findByIdAndUpdate(body._id, body)
        if (body.image.startsWith("data:image")) {
            const image = await uploadImage(body.image, 'protfolio/documentations')
            await deleteImage(data.image, 'protfolio/documentations')
            data.image = image
        }
        const response = JSON.stringify({ status: true, data, message: "success" })
        return new Response(response, { status: 200 })
    } catch (error) {
        console.log(error)

        return new Response("error", { status: 500 })
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url!);
        const id = searchParams.get('documentId');
        const data = await DocumentationModel.findByIdAndDelete(id)
        await deleteImage(data.image, "protfolio/documentations")
        const response = JSON.stringify({ status: true, message: "success" })
        return new Response(response, { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("error", { status: 500 })
    }
}