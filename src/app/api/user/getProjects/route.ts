import { existsSync, readFileSync } from 'fs'
import { join } from 'path'
import { BSON } from 'bson'
const { deserialize } = BSON


export const GET = () => {
    try {
        const filePath = join(process.cwd(), 'public', 'projects.bson');
        if (!existsSync(filePath)) { throw new Error(`File not found: ${filePath}`) }
        const data = deserialize(readFileSync(filePath))
        const res = JSON.stringify({ status: true, data, message: "success" })
        return new Response(res, { status: 200 })
    } catch (error) {
        console.error("Error in POST /api/admin/login:", error);
        return new Response("failure", { status: 500 });
    }
}