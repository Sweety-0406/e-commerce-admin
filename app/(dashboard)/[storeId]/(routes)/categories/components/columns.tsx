'use client'

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import AlertModal from "@/components/AlertModal";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

export type CategoryColumnType = {
  id: string;
  name: string;
  billboard: string;
  date: string;
};

const CellActions: React.FC<{ row: { original: CategoryColumnType } }> = ({ row }) => {
  const category = row.original;
  const router = useRouter();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const onDelete = async () => {
    try {
      await axios.delete(`/api/${params.storeId}/categories/${category.id}`);
      router.refresh();
      toast.success("Successfully deleted.");
    } catch (error) {
      toast.error("Something went wrong during deleting.");
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <div>
      <AlertModal
        isOpen={isOpen}
        title="Are you sure?"
        description="This action can't be undone"
        onConfirm={onDelete}
        onClose={() => setIsOpen(false)}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(category.id);
              toast.success("Copy to clipboard");
            }}
          >
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/categories/${category.id}`)}>
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsOpen(true)}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const columns: ColumnDef<CategoryColumnType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboard",
    header: "Billboard",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    id: "actions",
    cell: CellActions,
  },
];
