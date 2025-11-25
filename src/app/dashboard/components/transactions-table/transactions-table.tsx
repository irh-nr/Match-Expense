"use client";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useTransactions } from "@/app/hooks/useTransactions";
import Loading from "@/components/section/Loading";
export default function TransactionsPage() {
  const { data, loading } = useTransactions();

  if (loading)
    return (
      <div className="mt-24">
        <Loading />
      </div>
    );

  return <DataTable columns={columns} data={data} />;
}
