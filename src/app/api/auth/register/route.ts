import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { email, password, name } = await request.json()
        if (!email || !password || !name) {
            return NextResponse.json(
                { error: 'email, password, and name are required!' },
                { status: 401 }
            )
        }

        const supabase = await createClient()
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name: name
                }
            }
        })

        if (error) return NextResponse.json(
            { error: error.message },
            { status: 400 }
        )
        return NextResponse.json(
            {
                message: "Register Successufull",
                user: data.user
            },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json(
            { error: "internal server error" },
            { status: 500 }
        )
    }
}