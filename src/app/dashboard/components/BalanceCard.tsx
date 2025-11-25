"use client";
import { useBalance } from "@/app/hooks/useBalance";
import Loading from "@/components/section/Loading";

export default function BalanceCard() {
  const { loading, incomeThisMonth, expenseThisMonth, balanceThisMonth } =
    useBalance();

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="p-6 border rounded-lg">
        <p className="text-muted mb-2">Total Income</p>
        <span className="text-3xl font-bold text-teal-600">
          Rp {incomeThisMonth.toLocaleString("id-ID")}
        </span>
      </div>
      <div className="p-6 border rounded-lg">
        <p className="text-muted mb-2">Total Expense</p>
        <span className="text-3xl font-bold text-rose-900">
          Rp {expenseThisMonth.toLocaleString("id-ID")}
        </span>
      </div>
      <div className="p-6 border rounded-lg">
        <p className="text-muted mb-2">Balance</p>
        <span className="font-bold text-3xl">
          Rp {balanceThisMonth.toLocaleString("id-ID")}
        </span>
      </div>
    </div>
  );
}
