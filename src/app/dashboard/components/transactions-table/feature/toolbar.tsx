"use client";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Toolbar({ table }: { table: any }) {
  const selectedRows = table.getSelectedRowModel().rows;
  const handleDeleteSelected = async () => {
    const ids = selectedRows.map((r: any) => r.original.id);
    /* eslint-disable @typescript-eslint/no-explicit-any */
    await fetch("/api/action/delete-transaction/bulk-delete", {
      method: "POST",
      body: JSON.stringify({ ids }),
    });

    window.location.reload();
  };

  return (
    <div className="flex items-center gap-2 mb-3 p-2">
      {selectedRows.length > 0 && (
        <AlertDialog>
          <AlertDialogTrigger>
            <Button variant="destructive">
              Delete Selected ({selectedRows.length})
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="border-b-0! text-2xl!">
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription className="mt-0!">
                This action cannot be undone. This will permanently delete your
                transaction and remove your transaction data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteSelected}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
