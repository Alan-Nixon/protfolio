import { compare } from "bcrypt"

const data = {
    Email: 'alannixon2520@gmail.com',
    Password: '$2b$10$fYsZTOQWFmI7mMlR98uqWuLwsaOvxOiz6gt0HIqvGFHES66ZDiHZW'
}

export const POST = async (req: Request) => {
    try {
        const { Email, Password } = await req.json()
        if (!data) { return new Response("User not found", { status: 400 }) }

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