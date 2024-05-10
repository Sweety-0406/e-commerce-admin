'use client'

import Heading from "@/components/Heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Billboard } from "@prisma/client"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import {  OrderColumnType, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import ApiList from "@/components/ui/apiList"


interface orderClientProps{
    order : OrderColumnType[]
}
const OrderClient:React.FC<orderClientProps> = ({
    order
})=>{
    
    return(
        <div className="mt-7">
            <div className="flex justify-between my-7">
                <Heading 
                  title={`Order (${order.length})`}
                  subtitle="Manage order for your stores"
                />
            </div>
            <Separator />
            <div className="my-7">
                <DataTable searchKey="label" columns={columns} data={order} />
            </div>
        </div>
    )
}

export default OrderClient