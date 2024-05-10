import prismadb from "@/lib/prismadb"
import { ColorColumnType } from "./components/columns"
import {format} from 'date-fns'
import ColorClient from "./components/colorClient"



const ColorPage = async (
    {params}:{params:{storeId:string}}
)=>{
    const colors = await prismadb.color.findMany({
        where:{
            storeId: params.storeId
        }
    })
    const colorData: ColorColumnType[] = colors.map((item)=>({
        id: item.id,
        name: item.name,
        value: item.value,
        date: format(item.createdAt, 'MMMM do, yyyy')
    }))
    return(
        <div>
            <div className="m-3">
                <ColorClient color={colorData}/>
            </div>
        </div>
    )
}

export default ColorPage