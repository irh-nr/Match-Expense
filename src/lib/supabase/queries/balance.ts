import { createClient } from "@/lib/supabase/client";

export async function getBalanceThisMonth() {
    const supabase = await createClient();

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const { data: incomeRows } = await supabase
        .from("transactions")
        .select("amount")
        .eq("type", "income")
        .gte("date", startOfMonth.toISOString())
        .lte("date", endOfMonth.toISOString());

    const { data: expenseRows } = await supabase
        .from("transactions")
        .select("amount")
        .eq("type", "expense")
        .gte("date", startOfMonth.toISOString())
        .lte("date", endOfMonth.toISOString());

    const incomeThisMonth =
        incomeRows?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;

    const expenseThisMonth =
        expenseRows?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;

    return {
        incomeThisMonth,
        expenseThisMonth,
        balanceThisMonth: incomeThisMonth - expenseThisMonth,
    };
}

export async function getBalance() {
    const supabase = await createClient();

    const { data: incomeRows } = await supabase
        .from("transactions")
        .select("amount")
        .eq("type", "income")

    const { data: expenseRows } = await supabase
        .from("transactions")
        .select("amount")
        .eq("type", "expense")

    const income =
        incomeRows?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;

    const expense =
        expenseRows?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;

    return {
        income,
        expense,
        balance: income - expense,
    };
}