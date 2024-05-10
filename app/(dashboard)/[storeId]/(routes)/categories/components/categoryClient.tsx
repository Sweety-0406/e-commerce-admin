'use client'

import Heading from "@/components/Heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { CategoryColumnType, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import ApiList from "@/components/ui/apiList"


interface categoryClientProps{
    category : CategoryColumnType[]
}
const CategoryClient:React.FC<categoryClientProps> = ({
    category
})=>{
    const router = useRouter()
    const params = useParams()

    const addHandler = ()=>{
        router.push(`/${params.storeId}/categories/new`)
    }
    
    return(
        <div className="mt-7">
            <div className="flex justify-between my-7">
                <Heading 
                  title={`Category (${category.length})`}
                  subtitle="Manage category for your stores"
                />
                <Button onClick={addHandler}>
                    <Plus size={18} />Add New
                </Button>
            </div>
            <Separator />
            <div className="my-7">
                <DataTable searchKey="name" columns={columns} data={category} />
            </div>
            <Separator />
            <div>
                <div>
                    <Heading title={"API"} subtitle={"api calls for categories"} />
                </div>
                <ApiList entityName="categories" entityId="categoryId" />
            </div>
        </div>
    )
}

export default CategoryClient