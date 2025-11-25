import { createClient } from "@/lib/supabase/server"
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const { ids } = await request.json();

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return new Response("Unauthorized", { status: 401 });

    const { error } = await supabase
        .from("transactions")
        .delete()
        .in("id", ids)
        .eq("user_id", user.id);

    if (error) return new Response(error.message, { status: 500 });

    return new Response("OK");
}
