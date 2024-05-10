import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export  async function POST(
    req : Request,
    {params} : {params : {storeId:string}}
) {
    try {
        const {userId} = auth()
    
        console.log(userId)
        if(!userId){
            return new NextResponse("user is not authenticated.")
        }
    
        const storeId = params.storeId
        if(!storeId){
            return new NextResponse("storeId is not found.")
        }
    
        const body = await req.json()
        const {label, imageUrl} = body

    
        if(!label || !imageUrl){
            return new NextResponse("Label and image both are required.")
        }
    
        const store= await prismadb.store.findFirst({
            where: {
              id: storeId,
              userId,
            }
        });
    
        if (!store) {
        return new NextResponse("No store is created by user");
        }
    
        const billboard = await prismadb.billboard.create({
            data:{
                label,
                imageUrl,
                storeId
            }
        })
    
        if(!billboard){
            return new NextResponse("Billboard is not created.")
        }
    
        return NextResponse.json(billboard)
    } catch (error) {
        console.log(error)
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

    const billboard = await prismadb.billboard.findMany({
        where:{
            storeId
        }
    })
    if(!billboard){
        return new NextResponse("No data yet")
    }
    return NextResponse.json(billboard)
}
