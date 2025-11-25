import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { amount, type, category_id, note, date } = await request.json()

        const supabase = await createClient()
        const { data, error } = await supabase.from("transactions").insert({
            amount,
            type,
            category_id,
            note,
            date,
            user_id: (await supabase.auth.getUser()).data.user?.id
        });

        if (error) return NextResponse.json(
            { error: error.message },
            { status: 400 }
        )
        return NextResponse.json({ data })

    } catch (error) {
        return NextResponse.json(
            { error: "internal server error" },
            { status: 500 }
        )
    }
}