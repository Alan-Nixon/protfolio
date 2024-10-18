import SkillModel from "@/models/skills"



export const GET = async () => {
    try {
        const data = await SkillModel.find();
        const res = JSON.stringify({ status: true, data, message: "success" })
        return new Response(res, { status: 200 })
    } catch (e) {
        console.error("Error in POST /api/admin/login:", e);
        return new Response("failure", { status: 500 });
    }
} 