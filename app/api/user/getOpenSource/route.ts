import OpenSourceModel from '@/models/openSource'
import { NextRequest } from 'next/server';


export const GET = async (request: NextRequest) => {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("openId");
        if(id) {
            const data = await OpenSourceModel.findById(id);
            const res = JSON.stringify({ status: true, data, message: "success" });
            return new Response(res, { status: 200 });
        }
        const data = await OpenSourceModel.find();
        const res = JSON.stringify({ status: true, data, message: "success" })
        return new Response(res, { status: 200 })
    } catch (error) {
        console.error("Error in POST /api/admin/login:", error);
        return new Response("failure", { status: 500 });
    }
}