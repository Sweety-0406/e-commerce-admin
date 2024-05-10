import prismadb from "@/lib/prismadb"
import BillboardClient from "./components/billboardClient"
import { DataTable } from "@/components/ui/data-table"
import { BillboardColumnType, columns } from "./components/columns"
import axios from "axios"
import {format} from 'date-fns'



const BillboardPage = async (
    {params}:{params:{storeId:string}}
)=>{
    const billboard = await prismadb.billboard.findMany({
        where:{
            storeId: params.storeId
        }
    })
    const billboardData: BillboardColumnType[] = billboard.map((item)=>({
        id: item.id,
        label: item.label,
        date: format(item.createdAt, 'MMMM do, yyyy')
    }))
    return(
        <div>
            <div className="m-3">
                <BillboardClient billboard={billboardData}/>
            </div>
        </div>
    )
}

export default BillboardPage