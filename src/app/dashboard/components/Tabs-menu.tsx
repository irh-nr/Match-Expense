import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import TransactionsPage from "./transactions-table/transactions-table";
import { SearchInput } from "./transactions-table/feature/search-input";
import Create from "./transactions-table/feature/create-trasactions";

export default function TabsMenu() {
  return (
    <div>
      <Tabs defaultValue="transactions" className="w-full">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="categories">Manage your Categories</TabsTrigger>
        </TabsList>
        <TabsContent value="transactions">
          <div className="flex justify-between mb-2">
            <SearchInput />
            <Create />
          </div>
          <TransactionsPage />
        </TabsContent>
        <TabsContent value="categories">Coming soon...</TabsContent>
      </Tabs>
    </div>
  );
}
