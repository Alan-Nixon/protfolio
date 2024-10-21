import IntegratedApiModel from "@/models/integratedApi"


export const POST = async (req: Request) => {
    try {
        const body = await req.json()
        await IntegratedApiModel.insertMany(body)
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
        const data = await IntegratedApiModel.findByIdAndUpdate(body._id,body)
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
        const apiId = searchParams.get('apiId');
        console.log(apiId)
    } catch (error) {
        console.log(error)
    }
}

