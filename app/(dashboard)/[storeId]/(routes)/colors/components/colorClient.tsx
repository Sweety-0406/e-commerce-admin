'use client'

import Heading from "@/components/Heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { ColorColumnType, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import ApiList from "@/components/ui/apiList"


interface colorClientProps{
    color : ColorColumnType[]
}
const ColorClient:React.FC<colorClientProps> = ({
    color
})=>{
    const router = useRouter()
    const params = useParams()

    const addHandler = ()=>{
        router.push(`/${params.storeId}/colors/new`)
    }
    
    return(
        <div className="mt-7">
            <div className="flex justify-between my-7">
                <Heading 
                  title={`Color (${color.length})`}
                  subtitle="Manage color for your stores"
                />
                <Button onClick={addHandler}>
                    <Plus size={18} />Add New
                </Button>
            </div>
            <Separator />
            <div className="my-7">
                <DataTable searchKey="name" columns={columns} data={color} />
            </div>
            <Separator />
            <div>
                <div>
                    <Heading title={"API"} subtitle={"api calls for colors"} />
                </div>
                <ApiList entityName="colors" entityId="colorId" />
            </div>
        </div>
    )
}

export default ColorClient