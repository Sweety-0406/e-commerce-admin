import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"


export async function GET(
    req : Request,
    {params} : {params : {orderId : string}}
) {
    try {
        const {orderId} = params
        if(!orderId ){
            return new NextResponse(" OrderId is required.")
        }
    
        const order = await prismadb.order.findMany({
            where:{
                userId : orderId
            }
        })
    
        if(!order){
            return new NextResponse("No records are found.")
        }
    
        return NextResponse.json(order)
    } catch (error) {
        console.log(error)
    }
}