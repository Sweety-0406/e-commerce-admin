
import prismadb from "@/lib/prismadb"
import ProductForm from "./components/productForm"


const PorductIdPage = async(
    {params} : {params : { storeId: string ,productId : string}}
)=>{
    

    const product = await prismadb.product.findUnique({
        where:{
            id : params.productId
        },
        include:{
            images: true
        }
    })

    const category = await prismadb.category.findMany({
        where:{
            storeId: params.storeId
        }
    })
    const size = await prismadb.size.findMany({
        where:{
            storeId: params.storeId
        }
    })
    const color = await prismadb.color.findMany({
        where:{
            storeId: params.storeId
        }
    })
    
    return( 
        <div className="my-7">
            <ProductForm category={category} size={size} color={color} initialData={product}/>
        </div>
    )
}

export default PorductIdPage