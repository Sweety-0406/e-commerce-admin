import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

interface IParams{
    productId : string,
    storeId : string
}


export async function GET(
    req : Request,
    {params} : {params : {productId : string}}
) {
    try {
        const {productId} = params
        if(!productId ){
            return new NextResponse(" productId is required.")
        }
    
        const product = await prismadb.product.findUnique({
            where:{
                id : productId
            },
            include:{
                color: true,
                size: true,
                images: true,
                category: true
            }
        })
    
        if(!product){
            return new NextResponse("No records are found.")
        }
    
        return NextResponse.json(product)
    } catch (error) {
        console.log(error)
    }
}


export async function PATCH(
    req : Request,
    {params} : {params : {storeId:string, productId:string}}
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
    
        const productId = params.productId
        if(!productId){
            return new NextResponse("productId is not found.")
        }
        
        const body = await req.json()
        const {name, price,categoryId,sizeId,colorId,isFeatured, isArchived, } = body
        const {images} = body
    
        if(!name || !price || price==0 || !images || images.length==0 || !categoryId || !sizeId || !colorId){
            return new NextResponse("All fields are required.")
        }
    
        const product = await prismadb.product.update({
            where:{
                id:productId
            },
            data:{
                name,
                storeId,
                categoryId,
                sizeId,
                colorId,
                price,
                isArchived,
                isFeatured,
                images: {
                    createMany: {
                      data: [
                        ...images.map((image: { url: string }) => image),
                      ],
                    },
                },
            },

        })
    
        return NextResponse.json(product)
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
    
        const productId = params.productId
        if(!productId){
            return new NextResponse("productId is not found.")
        }
        
        
        await prismadb.product.delete({
            where:{
                id:productId
            }
        })
    
        return new NextResponse("Successfully deleted product")
    } catch (error) {
        console.log(error)
    }
}