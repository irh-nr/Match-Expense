import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Header from "./components/Header";
import TabsMenu from "./components/Tabs-menu";
import BalanceCard from "./components/BalanceCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Match Dashboard",
  description: "Your daily budgeting app",
};
export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <Header username={user.user_metadata.name} user={user.email} />
        <BalanceCard />

        <div className="mt-6">
          <TabsMenu />
        </div>
      </div>
    </div>
  );
}
