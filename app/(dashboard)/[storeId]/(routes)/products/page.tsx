import prismadb from "@/lib/prismadb"
import {  ProductColumnType } from "./components/columns"
import {format} from 'date-fns'
import ProductClient from "./components/productClient"



const ProductPage = async (
    {params}:{params:{storeId:string}}
)=>{
    const product = await prismadb.product.findMany({
        where:{
            storeId: params.storeId
        },
        include:{
            category: true,
            size: true,
            color: true
        }
    })
    const productData: ProductColumnType[] = product.map((item)=>({
        id: item.id,
        name: item.name,
        isArchived: item.isArchived,
        isFeatured: item.isFeatured,
        price: (item.price.toNumber()).toString(),
        category: item.category.name,
        size: item.size.name,
        color: item.color.value,
        date: format(item.createdAt, 'MMMM do, yyyy')
    }))
    return(
        <div>
            <div className="m-3">
                <ProductClient product={productData}/>
            </div>
        </div>
    )
}

export default ProductPage