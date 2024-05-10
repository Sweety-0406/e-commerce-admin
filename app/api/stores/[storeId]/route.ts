import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

interface IParams{
    storeId:string
}

export async function PATCH(
    req:Request,
    {params}:{params:IParams}
) {
    try {
        const storeId = params.storeId;
        const body = await req.json();
        const name = body.name;
        if(!storeId){
            console.log('storeId is not found')
            return new NextResponse("StoreId is not found")
        }
        if(!name){
            console.log('name is not found')
            return new NextResponse("New data is not found.")
        }
        const UpdatedStore = await prismadb.store.update({
            where:{
                id : storeId
            },
            data:{
                name : name
            }
        }) 
        if(!UpdatedStore){
            console.log("nothing is updated")
            return new NextResponse("Nothing is updated !")
        }
    
        return  NextResponse.json(UpdatedStore)
    } catch (error) {
        console.log(error)
    }
}



export async function DELETE(
    req:Request,
    {params}:{params:IParams}
) {
    try {
        const storeId = params.storeId;
        if(!storeId){
            console.log('storeId is not found')
            return new NextResponse("StoreId is not found")
        }
        await prismadb.store.delete({
            where:{
                id : storeId
            }
        }) 
    
        return  NextResponse.json("deleted successfully")
    } catch (error) {
        console.log(error)
    }
}
