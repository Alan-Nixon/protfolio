import ExperienceModel from "@/models/experience"


export const POST = async (req: Request) => {
    try {
        const body = await req.json() 
        console.log(body)
        const data =  await ExperienceModel.insertMany(body)
        const res = JSON.stringify({ status: true,data:data[0], message: "success" })
        return new Response(res, { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("error", { status: 500 })
    }
}

export const PUT = async (req: Request) => {
    try {
        const body = await req.json()
        const data = await ExperienceModel.findByIdAndUpdate(body._id, body);
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
        const experienceId = searchParams.get('experienceId');
        await ExperienceModel.findByIdAndDelete(experienceId)
        const res = JSON.stringify({ status: true, message: "success" })
        return new Response(res, { status: 200 })
    } catch (error) {
        console.log(error)
    }
}

