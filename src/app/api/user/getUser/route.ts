import { existsSync, readFileSync } from "fs"
import { join } from "path"
import { BSON } from 'bson'
const { deserialize } = BSON



export const GET = async () => {
    try {
        const filePath = join(process.cwd(), 'public', 'user.bson');
        if (!existsSync(filePath)) { throw new Error(`File not found: ${filePath}`) }
        const data = deserialize(readFileSync(filePath))
        const res = JSON.stringify({ status: true, data, message: "success" })
        return new Response(res, { status: 200 })
    } catch (e) {
        console.error("Error in POST /api/admin/login:", e);
        return new Response("failure", { status: 500 });
    }
} 