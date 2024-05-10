import prismadb from "@/lib/prismadb"
import { SizeColumnType } from "./components/columns"
import {format} from 'date-fns'
import SizeClient from "./components/sizeClient"



const SizePage = async (
    {params}:{params:{storeId:string}}
)=>{
    const sizes = await prismadb.size.findMany({
        where:{
            storeId: params.storeId
        }
    })
    const sizeData: SizeColumnType[] = sizes.map((item)=>({
        id: item.id,
        name: item.name,
        value: item.value,
        date: format(item.createdAt, 'MMMM do, yyyy')
    }))
    return(
        <div>
            <div className="m-3">
                <SizeClient size={sizeData}/>
            </div>
        </div>
    )
}

export default SizePage