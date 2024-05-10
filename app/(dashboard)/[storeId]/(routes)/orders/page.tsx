import prismadb from "@/lib/prismadb"
import BillboardClient from "./components/orderClient"
import { DataTable } from "@/components/ui/data-table"
import { OrderColumnType } from "./components/columns"
import axios from "axios"
import {format} from 'date-fns'
import OrderClient from "./components/orderClient"



const OrderPage = async (
    {params}:{params:{storeId:string}}
)=>{
    const order = await prismadb.order.findMany({
        where:{
            storeId: params.storeId
        },
        include:{
            orderItem:{
                include:{
                    product: true
                }
            }
            
        },
        orderBy:{
            createdAt:'desc'
        }
    })
    const orderData: OrderColumnType[] = order.map((item)=>({
        id: item.id,
        phone: item.phone,
        address: item.address,
        isPaid: item.isPaid,
        product: item.orderItem.map((productItem)=>(
            productItem.product.name
        )).join(', '),
        totalPrice: (item.orderItem.reduce((total,productItem)=>{
            return total + (productItem.product.price).toNumber()
        },0)).toString()
    }))
    return(
        <div>
            <div className="m-3">
                <OrderClient order={orderData}/>
            </div>
        </div>
    )
}

export default OrderPage