import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export  async function POST(
    req: Request,
    {params} : {params:{storeId:string}}
) {
    try {
        const {userId} = auth()
        
        if(!userId){
            return new NextResponse("user is not authenticated.")
        }
    
        const storeId = params.storeId
        if(!storeId){
            return new NextResponse("storeId is not found.")
        }

        const store = await prismadb.store.findFirst({
            where:{
                id:storeId,
                userId
            }
        })

        if(!store){
            return new NextResponse("user is not autthenticated")
        }
    
        const body = await req.json()
        const {name, value} = body
    
        if(!name || !value){
            return new NextResponse("Both fields are required")
        }
    
        const size = await prismadb.size.create({
            data:{
                name,
                value,
                storeId
            }
        })
    
        if(!size){
            return new NextResponse("size is not created.")
        }
    
        return NextResponse.json({size})
    } catch (error) {
        console.log(error)
        return new NextResponse("Something went wrong")
    }
}


export async function GET(
    req:Request,
    {params} :{params:{storeId:string}}
) {
    const storeId = params.storeId;
    if(!storeId){
        return new NextResponse("sorry can't fetched data")
    }

    const size = await prismadb.size.findMany({
        where:{
            storeId
        }
    })
    if(!size){
        return new NextResponse("No data yet")
    }
    return NextResponse.json(size)
}