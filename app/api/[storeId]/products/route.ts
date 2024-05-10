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
        const {name, price,categoryId,sizeId,colorId,isFeatured, isArchived, } = body
        const {images} = body
    
        if(!name || !price || price==0 || !images || images.length==0 || !categoryId || !sizeId || !colorId){
            return new NextResponse("All fields are required.")
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
    
        const product = await prismadb.product.create({
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
    
        if(!product){
            return new NextResponse("Billboard is not created.")
        }
    
        return NextResponse.json(product)
    } catch (error) {
        console.log(error)
    }
}


export async function GET(
    req:Request,
    {params} :{params:{storeId:string}}
) {
    const storeId = params.storeId;
    const { searchParams } = new URL(req.url)
    const categoryId = searchParams.get('categoryId') || undefined;
    const colorId = searchParams.get('colorId') || undefined;
    const sizeId = searchParams.get('sizeId') || undefined;
    const isFeatured = searchParams.get('isFeatured');
    if(!storeId){
        return new NextResponse("sorry can't fetched data")
    }
    
    const product = await prismadb.product.findMany({
        where:{
            storeId,
            isArchived: false,
            categoryId,
            colorId,
            sizeId,
            isFeatured:isFeatured ? true : undefined
        },
        include:{
            category: true,
            color: true,
            size: true,
            images: true,
            store: true
        }
    })
    if(!product){
        return new NextResponse("No data yet")
    }
    return NextResponse.json(product)
}
