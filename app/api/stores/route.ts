import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"

export async function POST(req:Request){
    try {
        const {userId} = auth()
        if(!userId){
            // throw new Error("user not authorized")
            return new NextResponse("user not authorized",{status:500})
            
        }
       const body = await req.json()
       const {name} = body
       if(!name || typeof name !== "string"){
            // throw new Error("store name is not found")
            return new NextResponse("store name is not found",{status:500})
        }
    
        const store = await prismadb.store.create({
            data:{
                userId,
                name
            }
        })
    
        return NextResponse.json(store)
    } catch (error) {
        console.log(error)
        // return NextResponse.error()
        return new NextResponse("internal error",{status:500})
    } 
}













// import { asyncHandler } from "@/utils/asyncHandler";
// import prisma from "@/lib/prismadb"
// import { NextResponse,NextRequest } from "next/server";

// const storeUser = asyncHandler(async (req:NextRequest,res:NextResponse){
//     const body = await req.json()
//     const {name,userId} = body
//     if(!name || typeof name !== "string"){
//         throw new Error("invalid data")
//     }

//     const store = await prisma.store.create({
//         data:{
//             name,
//             userId
//         }
//     })

//     res.status(200).json(store)
// })

// export default storeUser
