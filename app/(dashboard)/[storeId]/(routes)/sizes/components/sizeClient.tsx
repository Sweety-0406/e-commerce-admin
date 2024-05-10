'use client'

import Heading from "@/components/Heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { SizeColumnType, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import ApiList from "@/components/ui/apiList"


interface sizeClientProps{
    size : SizeColumnType[]
}
const SizeClient:React.FC<sizeClientProps> = ({
    size
})=>{
    const router = useRouter()
    const params = useParams()

    const addHandler = ()=>{
        router.push(`/${params.storeId}/sizes/new`)
    }
    
    return(
        <div className="mt-7">
            <div className="flex justify-between my-7">
                <Heading 
                  title={`Size (${size.length})`}
                  subtitle="Manage size for your stores"
                />
                <Button onClick={addHandler}>
                    <Plus size={18} />Add New
                </Button>
            </div>
            <Separator />
            <div className="my-7">
                <DataTable searchKey="name" columns={columns} data={size} />
            </div>
            <Separator />
            <div>
                <div>
                    <Heading title={"API"} subtitle={"api calls for sizes"} />
                </div>
                <ApiList entityName="sizes" entityId="sizeId" />
            </div>
        </div>
    )
}

export default SizeClient