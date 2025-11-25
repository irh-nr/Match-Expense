import { createClient } from "@/lib/supabase/server";
import { Transactions } from "@/app/dashboard/components/transactions-table/columns";

export async function getTransaction(): Promise<Transactions[]> {
    // Fetch data from your API here.

    const supabase = await createClient();

    const { data, error } = await supabase
        .from("transactions")
        .select('*, category:categories(name)')
        .order("created_at", { ascending: false });

    if (error) {
        console.log("error fetching transactions");
        return [];
    }

    return data ?? [];
}


