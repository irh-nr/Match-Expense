import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import TransactionForm from "./transaction-form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Create() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button>
            <PlusCircle />
            <span className="hidden md:inline">Add Transaction</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Add transaction</DialogTitle>
            <DialogDescription className="mt-0!">
              Add your transactions here. Click add when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <TransactionForm />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" form="transaction-form">
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
