'use client'

import Heading from "@/components/Heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Billboard } from "@prisma/client"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { BillboardColumnType, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import ApiList from "@/components/ui/apiList"


interface billboardClientProps{
    billboard : BillboardColumnType[]
}
const BillboardClient:React.FC<billboardClientProps> = ({
    billboard
})=>{
    const router = useRouter()
    const params = useParams()

    const addHandler = ()=>{
        router.push(`/${params.storeId}/billboards/new`)
    }
    
    return(
        <div className="mt-7">
            <div className="flex justify-between my-7">
                <Heading 
                  title={`Billboard (${billboard.length})`}
                  subtitle="Manage billboard for your stores"
                />
                <Button onClick={addHandler}>
                    <Plus size={18} />Add New
                </Button>
            </div>
            <Separator />
            <div className="my-7">
                <DataTable searchKey="label" columns={columns} data={billboard} />
            </div>
            <Separator />
            <div>
                <div>
                    <Heading title={"API"} subtitle={"api calls for billboards"} />
                </div>
                <ApiList entityName="billboards" entityId="billboardId" />
            </div>
        </div>
    )
}

export default BillboardClient