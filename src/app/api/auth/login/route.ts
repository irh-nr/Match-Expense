// src/app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json()
        if (!email || !password) return NextResponse.json(
            { error: "Email and Password Required!" },
            { status: 401 }
        )

        const supabase = await createClient()
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) return NextResponse.json(
            { error: error.message },
            { status: 501 }
        )

        return NextResponse.json(
            {
                message: "Login Successfull!",
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