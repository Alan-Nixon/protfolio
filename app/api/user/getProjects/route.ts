import ProjectModel from '@/models/project'


export const GET = async () => {
    try {
        const mainProjects = await ProjectModel.find({ mainProject: true })
        const miniProjects = await ProjectModel.find({ mainProject: false })
        const res = JSON.stringify({ status: true, data: { mainProjects , miniProjects}, message: "success" })
        return new Response(res, { status: 200 })
    } catch (error) {
        console.error("Error in POST /api/admin/login:", error);
        return new Response("failure", { status: 500 });
    }
}