import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"


export async function GET(
    req : Request,
    {params} : {params : {categoryId : string}}
) {
    try {
        const {categoryId} = params
        if(!categoryId ){
            return new NextResponse(" categoryId is required.")
        }
    
        const category = await prismadb.category.findUnique({
            where:{
                id : categoryId
            },
            include:{
                billboard:true
            }
        })
    
        if(!category){
            return new NextResponse("No records are found.")
        }
    
        return NextResponse.json(category)
    } catch (error) {
        console.log(error)
    }
}

export async function PATCH(
    req: Request,
    {params} : {params: { storeId:string, categoryId:string}}
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

        const {categoryId} = params
        if(!categoryId){
            return new NextResponse("categoryId is not found.")
        }
        const body = await req.json();
        const {name, billboardId} = body
    
        if(!name || !billboardId){
            return new NextResponse("Fields are required.")
        }
    
        const updatedCategory = await prismadb.category.update({
            where:{
                id: categoryId
            },
            data: {
                name,
                billboardId
            }
        })
    
        if(!updatedCategory){
            return new NextResponse("Nothing is updated")
        }
    
        return NextResponse.json({updatedCategory})
    } catch (error) {
        console.log(error)
        return new NextResponse("Something went wrong")
    }

}


export async function DELETE(
    req: Request,
    {params} : {params: { storeId:string, categoryId:string}}
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

        const {categoryId} = params
        if(!categoryId){
            return new NextResponse("categoryId is not found.")
        }
    
        await prismadb.category.delete({
            where:{
                id: categoryId
            }
        })
    
    
        return NextResponse.json("successsfully deleted category")
    } catch (error) {
        console.log(error)
        return new NextResponse("Something went wrong")
    }

}