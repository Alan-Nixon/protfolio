import OpenSourceModel from "@/models/openSource";
import { NextRequest, NextResponse } from 'next/server';



export const GET = async (request: NextRequest) => {
    try {
        const { searchParams } = new URL(request.url);
        console.log(searchParams.get("openId"));
        const data = await OpenSourceModel.findOne({ _id: searchParams.get("openId") });
        const res = { status: true, data, message: "success" };
        return new Response(JSON.stringify(res), { status: 200 });
    } catch (error) {
        console.error("Error in POST /api/admin/login:", error);
        return new Response("failure", { status: 500 });
    }
}