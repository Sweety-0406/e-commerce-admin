import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"


export async function GET(
    req : Request,
    {params} : {params : {colorId : string}}
) {
    try {
        const {colorId} = params
        if(!colorId ){
            return new NextResponse(" colorId is required.")
        }
    
        const color = await prismadb.color.findMany({
            where:{
                id : colorId
            }
        })
    
        if(!color){
            return new NextResponse("No records are found.")
        }
    
        return NextResponse.json(color)
    } catch (error) {
        console.log(error)
    }
}

export async function PATCH(
    req: Request,
    {params} : {params: { storeId:string, colorId:string}}
) {
    try {
        const {userId} = auth()
        if(!userId){
            return new NextResponse("user is not authenticated.")
        }

        const storeId = params.storeId
        if(!storeId){
            return new NextResponse("StoreId is not found.")
        }
        const store = await prismadb.store.findFirst({
            where:{
                userId,
                id:storeId
            }
        })
        if(!store){
            return new NextResponse("Store is not found for current user")
        }

        const {colorId} = params
        if(!colorId){
            return new NextResponse("colorId is not found.")
        }
        const body = await req.json();
        const {name, value} = body
    
        if(!name || !value){
            return new NextResponse("Fields are required.")
        }
    
        const updatedColor = await prismadb.color.update({
            where:{
                id: colorId
            },
            data: {
                name,
                value
            }
        })
    
        if(!updatedColor){
            return new NextResponse("Nothing is updated")
        }
    
        return NextResponse.json({updatedColor})
    } catch (error) {
        console.log(error)
        return new NextResponse("Something went wrong")
    }

}


export async function DELETE(
    req: Request,
    {params} : {params: { storeId:string, colorId:string}}
) {
    try {
        const {userId} = auth()
        if(!userId){
            return new NextResponse("user is not authenticated.")
        }

        const storeId = params.storeId
        if(!storeId){
            return new NextResponse("StoreId is not found.")
        }
        const store = await prismadb.store.findFirst({
            where:{
                userId,
                id:storeId
            }
        })
        if(!store){
            return new NextResponse("Store is not found for current user")
        }

        const {colorId} = params
        if(!colorId){
            return new NextResponse("colorId is not found.")
        }
    
        await prismadb.color.delete({
            where:{
                id: colorId
            }
        })
    
    
        return NextResponse.json("successsfully deleted category")
    } catch (error) {
        console.log(error)
        return new NextResponse("Something went wrong")
    }

}