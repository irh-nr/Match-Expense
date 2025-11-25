import { Transactions } from "../dashboard/components/transactions-table/columns";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export function useTransactions() {
    const [data, setData] = useState<Transactions[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    const fetchSingleTransaction = async (id: string) => {
        const { data: transaction, error } = await supabase
            .from("transactions")
            .select(
                `
          *,
          category:categories (
            name
          )
        `
            )
            .eq("id", id)
            .single();

        if (error) {
            console.error("Error fetching transaction:", error);
        } else if (transaction) {
            setData((prev) => [transaction, ...prev]);
        }
    };

    const fetchTransactions = async () => {
        setLoading(true);
        const { data: transactions, error } = await supabase
            .from("transactions")
            .select(
                `
          *,
          category:categories (
            name
          )
        `
            )
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching transactions:", error);
        } else {
            setData(transactions || []);
        }
        setLoading(false);
    };

    // Fetch initial data
    useEffect(() => {
        fetchTransactions();
    }, []);

    // Subscribe to changes
    useEffect(() => {
        const channel = supabase
            .channel("transactions-changes")
            .on(
                "postgres_changes",
                {
                    event: "*", // INSERT, UPDATE, DELETE
                    schema: "public",
                    table: "transactions",
                },

                (payload) => {
                    console.log("Change received!", payload);

                    if (payload.eventType === "INSERT") {
                        // Fetch the new transaction with category data
                        fetchSingleTransaction(payload.new.id);
                    } else if (payload.eventType === "UPDATE") {
                        // Update existing transaction
                        setData((prev) =>
                            prev.map((item) =>
                                item.id === payload.new.id ? { ...item, ...payload.new } : item
                            )
                        );
                    } else if (payload.eventType === "DELETE") {
                        // Remove deleted transaction
                        setData((prev) =>
                            prev.filter((item) => item.id !== payload.old.id)
                        );
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return {
        data,
        loading
    }
}
