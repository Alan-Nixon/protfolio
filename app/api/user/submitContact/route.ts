

export const POST = async (req: Request) => {
    try {
        // send the email
        const body = await req.json()
        console.log(body)
        return new Response("success", { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("failed", { status: 500 })
    }
}