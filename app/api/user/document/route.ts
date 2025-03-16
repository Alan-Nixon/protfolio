import DocumentationModel from "@/models/documentation"


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