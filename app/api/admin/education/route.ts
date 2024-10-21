import EducationModel from "@/models/education"


export const POST = async (req: Request) => {
    try {
        const body = await req.json() 
        await EducationModel.insertMany(body)
        const res = JSON.stringify({ status: true, message: "success" })
        return new Response(res, { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("error", { status: 500 })
    }
}

export const PUT = async (req: Request) => {
    try {
        const body = await req.json()
        const data = await EducationModel.findByIdAndUpdate(body._id, body);
        const res = JSON.stringify({ status: true, data, message: "success" })
        return new Response(res, { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("error", { status: 500 })
    }
}

export const DELETE = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url!);
        const educationId = searchParams.get('educationId');
        await EducationModel.findByIdAndDelete(educationId)
        const res = JSON.stringify({ status: true, data: "", message: "success" })
        return new Response(res, { status: 200 })
    } catch (error) {
        console.log(error)
    }
}

