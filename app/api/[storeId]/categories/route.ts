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
        const {name, billboardId} = body
    
        if(!name || !billboardId){
            return new NextResponse("Both fields are required")
        }
    
        const category = await prismadb.category.create({
            data:{
                name,
                billboardId,
                storeId
            }
        })
    
        if(!category){
            return new NextResponse("category is not created.")
        }
    
        return NextResponse.json({category})
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

    const category = await prismadb.category.findMany({
        where:{
            storeId
        },
        include:{
            billboard: true
        }
    })
    if(!category){
        return new NextResponse("No data yet")
    }
    return NextResponse.json(category)
}