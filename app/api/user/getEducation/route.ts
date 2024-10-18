import EducationModel from '@/models/education';


export const GET = async () => {
    try {
        const data = await EducationModel.find();
        const res = JSON.stringify({ status: true, data, message: "success" })
        return new Response(res, { status: 200 })
    } catch (error) {
        console.error("Error in POST /api/admin/login:", error);
        return new Response("failure", { status: 500 });
    }
}