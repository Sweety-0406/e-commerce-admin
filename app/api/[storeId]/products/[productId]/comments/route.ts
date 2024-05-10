
import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function POST(
    req:Request,
    {params}:{params:{productId:string}}
) {
    try {
        const productId = params.productId
        if(!productId || typeof productId !== 'string'){
            return new NextResponse("productId id is not found.")
        }
    
        const body =  await req.json()
        const content = body.content

        if(!content || typeof content !== 'string'){
            return new NextResponse("Content is not found.")
        }        
        
        const newComment = await prismadb.comment.create({
            data:{
                content:content,
                productId
            }
        })
        if(!newComment){
            return new NextResponse("No comment is created.")
        }
    
        return NextResponse.json(newComment)
    } catch (error) {
        console.log(error)
        return new NextResponse("something went wrong")
    }
}



export async function GET(
    req: Request,
    {params}:{params:{productId:string}}
) {
    try {
        const productId = params.productId;
        if(!productId || typeof productId !== 'string'){
            return new NextResponse("productId id is not found.")
        }
    
    
        const comments = await prismadb.comment.findMany({
            where:{
                productId
            },
            orderBy:{
                createdAt:'desc'
            }
        })
    
        if(!comments){
            return new NextResponse("No comments is found")
        }
    
        return NextResponse.json(comments)
    } catch (error) {
        console.log(error)
        return new NextResponse("something went wrong during fetching comments")
    }

}