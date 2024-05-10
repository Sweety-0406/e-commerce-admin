"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import AlertModal from "@/components/AlertModal"
import axios from "axios"
import toast from "react-hot-toast"


export type BillboardColumnType = {
  id: string
  label:string
  date:string
}



export const columns: ColumnDef<BillboardColumnType>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const billboard = row.original
      const router = useRouter()
      const params= useParams()
      const [isOpen,setIsOpen] = useState(false)
 
      const onDelete = async()=>{
        try {
            await axios.delete(`/api/${params.storeId}/billboards/${billboard.id}`)
            router.refresh()
            toast.success("Successfully deleted.")
        } catch (error) {
            toast.error("Something went wrong during deleting.")
        } finally{
            setIsOpen(false)
        }
    }

      return (
        <div>
            <AlertModal
             isOpen={isOpen}
             title="Are you sure?"
             description="This action can't be undo"
             onConfirm={onDelete}
             onClose={()=>setIsOpen(false)}
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
                      navigator.clipboard.writeText(billboard.id)
                      toast.success("copy to clipboard")
                    }}
                >
                    Copy ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={()=>router.push(`/${params.storeId}/billboards/${billboard.id}`)}
                >
                    Update
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={()=>setIsOpen(true)}
                >
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
      )
    },
  },
]


