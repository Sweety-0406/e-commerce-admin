'use client'

import Heading from "@/components/Heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { ProductColumnType, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import ApiList from "@/components/ui/apiList"


interface productClientProps{
    product : ProductColumnType[]
}
const ProductClient:React.FC<productClientProps> = ({
    product
})=>{
    const router = useRouter()
    const params = useParams()

    const addHandler = ()=>{
        router.push(`/${params.storeId}/products/new`)
    }
    
    return(
        <div className="mt-7">
            <div className="flex justify-between my-7">
                <Heading 
                  title={`Product (${product.length})`}
                  subtitle="Manage product for your stores"
                />
                <Button onClick={addHandler}>
                    <Plus size={18} />Add New
                </Button>
            </div>
            <Separator />
            <div className="my-7">
                <DataTable searchKey="name" columns={columns} data={product} />
            </div>
            <Separator />
            <div>
                <div>
                    <Heading title={"API"} subtitle={"api calls for product"} />
                </div>
                <ApiList entityName="products" entityId="productId" />
            </div>
        </div>
    )
}

export default ProductClient