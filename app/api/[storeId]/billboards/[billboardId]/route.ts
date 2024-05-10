import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

interface IParams{
    billboardId : string,
    storeId : string
}


export async function GET(
    req : Request,
    {params} : {params : {billboardId : string}}
) {
    try {
        const {billboardId} = params
        if(!billboardId ){
            return new NextResponse(" billboardId is required.")
        }
    
        const billboard = await prismadb.billboard.findUnique({
            where:{
                id : billboardId
            }
        })
    
        if(!billboard){
            return new NextResponse("No records are found.")
        }
    
        return NextResponse.json(billboard)
    } catch (error) {
        console.log(error)
    }
}


export async function PATCH(
    req : Request,
    {params} : {params : {storeId:string, billboardId:string}}
) {
    // console.log(params.storeId)
    try {
        const {userId} = auth()
        if(!userId){
            return new NextResponse("User is not authorized",{status:400})
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
    
        const billboardId = params.billboardId
        if(!billboardId){
            return new NextResponse("BillboardId is not found.")
        }
        
        const body = await req.json()
        const {label, imageUrl} = body
    
        if(!label || !imageUrl){
            return new NextResponse("Label and image both are required.")
        }
        const billboard = await prismadb.billboard.update({
            where:{
                id:billboardId
            },
            data:{
                label,
                imageUrl
            }
        })
    
        return NextResponse.json(billboard)
    } catch (error) {
        console.log(error)
    }
}



export async function DELETE(
    req : Request,
    {params} : {params : IParams}
) {
    try {
        const {userId} = auth()
        if(!userId){
            return new NextResponse("User is not authorized",{status:400})
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
    
        const billboardId = params.billboardId
        if(!billboardId){
            return new NextResponse("BillboardId is not found.")
        }
        
        
        await prismadb.billboard.delete({
            where:{
                id:billboardId
            }
        })
    
        return new NextResponse("Successfully deleted billboard")
    } catch (error) {
        console.log(error)
    }
}