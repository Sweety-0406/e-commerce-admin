import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"

export async function GET(
    req : Request,
    {params} : {params : {sizeId : string}}
) {
    try {
        const {sizeId} = params
        if(!sizeId ){
            return new NextResponse(" sizeId is required.")
        }
    
        const size = await prismadb.size.findUnique({
            where:{
                id : sizeId
            }
        })
    
        if(!size){
            return new NextResponse("No records are found.")
        }
    
        return NextResponse.json(size)
    } catch (error) {
        console.log(error)
    }
}

export async function PATCH(
    req: Request,
    {params} : {params: { storeId:string, sizeId:string}}
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

        const {sizeId} = params
        if(!sizeId){
            return new NextResponse("sizeId is not found.")
        }
        const body = await req.json();
        const {name, value} = body
    
        if(!name || !value){
            return new NextResponse("Fields are required.")
        }
    
        const updatedSize = await prismadb.size.update({
            where:{
                id: sizeId
            },
            data: {
                name,
                value
            }
        })
    
        if(!updatedSize){
            return new NextResponse("Nothing is updated")
        }
    
        return NextResponse.json({updatedSize})
    } catch (error) {
        console.log(error)
        return new NextResponse("Something went wrong")
    }

}


export async function DELETE(
    req: Request,
    {params} : {params: { storeId:string, sizeId:string}}
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

        const {sizeId} = params
        if(!sizeId){
            return new NextResponse("sizeId is not found.")
        }
    
        await prismadb.size.delete({
            where:{
                id: sizeId
            }
        })
    
    
        return NextResponse.json("successsfully deleted size")
    } catch (error) {
        console.log(error)
        return new NextResponse("Something went wrong")
    }

}