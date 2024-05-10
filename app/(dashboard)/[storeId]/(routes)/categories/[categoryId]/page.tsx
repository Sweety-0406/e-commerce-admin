
import prismadb from "@/lib/prismadb"
import CategoryForm from "./components/categoryForm"



const categoryIdPage = async(
    {params} : {params : { storeId: string, categoryId : string}}
)=>{
    

    const category = await prismadb.category.findFirst({
        where:{
            id : params.categoryId
        }
    })
98
    const billboard = await prismadb.billboard.findMany({
        where:{
            storeId: params.storeId
        }
    })
    
    return( 
        <div className="my-7">
            <CategoryForm billboard={billboard} initialData={category}/>
        </div>
    )
}

export default categoryIdPage