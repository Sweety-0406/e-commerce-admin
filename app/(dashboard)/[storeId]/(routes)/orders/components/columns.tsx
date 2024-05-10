"use client"

import { ColumnDef } from "@tanstack/react-table"


export type OrderColumnType = {
  id: string
  phone: string,
  address: string,
  totalPrice:string,
  isPaid: boolean,
  product: string
}



export const columns: ColumnDef<OrderColumnType>[] = [
  {
    accessorKey: "product",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
  
]


