import ContactModel from "@/models/contact";
import { sendMail } from "../(nodemailer)/functions"

export const GET = async () => {
    try {
        const data = await ContactModel.find()
        const res = JSON.stringify({ data, message: "success", status: true })
        return new Response(res, { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("failed", { status: 500 })
    }
}

export const POST = async (req: Request) => {
    try {
        const Data = await req.json()
        sendMail({
            from: Data.email,
            message: Data.message,
            name: Data.name,
            to: "alannixon2520@gmail.com"
        });
        const data = JSON.stringify({ data: await ContactModel.insertMany(Data), message: "success", status: true })
        return new Response(data, { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("failed", { status: 500 })
    }
}


export const PUT = async (req: Request) => {
    try {
        const Data = await req.json()
        sendMail({
            to: Data.replyTo,
            message: Data.replyMessage,
            name: "Alan Nixon",
            from: "alannixon2520@gmail.com"
        });
        const data = JSON.stringify({ data: Data, message: "success", status: true })
        return new Response(data, { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("failed", { status: 500 })
    }
}

