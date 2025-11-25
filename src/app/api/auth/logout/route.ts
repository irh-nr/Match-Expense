import { createClient } from "@/lib/supabase/server";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient()
        const { error } = await supabase.auth.signOut()

        if (error) return NextResponse.json(
            { error: error.message },
            { status: 400 }
        )

        return NextResponse.json(
            { message: "Successfully SignOut" },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json(
            { error: "internal server error" },
            { status: 500 }
        )
    }
}