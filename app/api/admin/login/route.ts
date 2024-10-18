import { existsSync, readFileSync } from 'fs'
import { join } from 'path'
import { compare } from "bcrypt"
import { BSON } from 'bson'
const { deserialize } = BSON

export const POST = async (req: Request) => {
    try {
        const { Email, Password } = await req.json();
        const filePath = join(process.cwd(), 'public', 'admin.bson');
        if (!existsSync(filePath)) { throw new Error(`File not found: ${filePath}`) }
        const data = deserialize(readFileSync(filePath))
        if (data.Email !== Email) {
            const res = JSON.stringify({ status: false, message: "Email doesn't match" })
            return new Response(res, { status: 200 });
        }
        if (!await compare(Password, data.Password)) {
            const res = JSON.stringify({ status: false, message: "Incorrect Password try again" })
            return new Response(res, { status: 200 });
        }
        const res = JSON.stringify({ status: true, message: "success", data })
        return new Response(res, { status: 200 });
    } catch (error) {
        console.error("Error in POST /api/admin/login:", error);
        return new Response("failure", { status: 500 });
    }
};
