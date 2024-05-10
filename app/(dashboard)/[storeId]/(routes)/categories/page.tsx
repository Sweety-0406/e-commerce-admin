import prismadb from "@/lib/prismadb"
import { CategoryColumnType } from "./components/columns"
import {format} from 'date-fns'
import CategoryClient from "./components/categoryClient"



const CategoryPage = async (
    {params}:{params:{storeId:string}}
)=>{
    const categories = await prismadb.category.findMany({
        where:{
            storeId: params.storeId
        },
        include:{
            billboard: true
        }
    })
    const categoryData: CategoryColumnType[] = categories.map((item)=>({
        id: item.id,
        name: item.name,
        billboard: item.billboard.label,
        date: format(item.createdAt, 'MMMM do, yyyy')
    }))
    return(
        <div>
            <div className="m-3">
                <CategoryClient category={categoryData}/>
            </div>
        </div>
    )
}

export default CategoryPage