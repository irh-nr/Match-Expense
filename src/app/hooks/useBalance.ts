
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { getBalanceThisMonth } from "@/lib/supabase/queries/balance";

export function useBalance() {
    const supabase = createClient();

    const [loading, setLoading] = useState(true);
    const [incomeThisMonth, setIncomeThisMonth] = useState(0);
    const [expenseThisMonth, setExpenseThisMonth] = useState(0);
    const [balanceThisMonth, setBalanceThisMonth] = useState(0);

    const fetchBalance = async () => {
        setLoading(true);
        const result = await getBalanceThisMonth();

        setIncomeThisMonth(result.incomeThisMonth);
        setExpenseThisMonth(result.expenseThisMonth);
        setBalanceThisMonth(result.balanceThisMonth);

        setLoading(false);
    };

    useEffect(() => {
        fetchBalance();

        // Subscribe realtime
        const channel = supabase
            .channel("balance-changes")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "transactions",
                },
                () => fetchBalance()
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return {
        loading,
        incomeThisMonth,
        expenseThisMonth,
        balanceThisMonth,
    };
}
