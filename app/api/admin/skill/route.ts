import SkillModel from "@/models/skills";


export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        const data = await SkillModel.insertMany(body)
        const res = JSON.stringify({ status: true, data, message: "success" })
        return new Response(res, { status: 200 })
    } catch (error) {
        console.log(error)
    }
}

export const PUT = async (req: Request) => {
    try {
        const body = await req.json();
        const data = await SkillModel.findByIdAndUpdate(body._id, body)
        const res = JSON.stringify({ status: true, data, message: "success" })
        return new Response(res, { status: 200 })
    } catch (error) {
        console.log(error)
    }
}

export const DELETE = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url!);
        const skillId = searchParams.get('skillId');
        const data = await SkillModel.findByIdAndDelete(skillId)
        const res = JSON.stringify({ status: true, data, message: 'success' });
        return new Response(res, { status: 200 });
    } catch (e) {
        console.log(e);
        return new Response(JSON.stringify({ status: false, message: 'error' }), { status: 500 });
    }
};