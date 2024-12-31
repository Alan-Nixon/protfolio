import OpenSourceModel from "@/models/openSource"


export const POST = async (req: Request) => {
    try {
        const body = await req.json()
        const data = await OpenSourceModel.insertMany(body);
        console.log(data)
        const res = JSON.stringify({status:true,message:"success"})
        return new Response(res, { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("error", { status: 500 })
    }
}

export const PUT = async (req: Request) => {
    try {
        const body = await req.json()
        const data = await OpenSourceModel.findByIdAndUpdate(body._id,body)
        const res = JSON.stringify({status:true,data,message:"success"})
        return new Response(res, { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("error", { status: 500 })
    }
}

export const DELETE = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url!);
        const openSourceId = searchParams.get('openSourceId');
        const data = await OpenSourceModel.findByIdAndDelete(openSourceId)
        const res = JSON.stringify({status:true,data,message:"success"})
        return new Response(res, { status: 200 })
    } catch (error) {
        console.log(error)
    }
}

