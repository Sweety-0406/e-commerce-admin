import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Product } from "@prisma/client";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function OPTIONS(){
    return NextResponse.json({},{headers: corsHeaders})
};

export async function POST(
    req: Request,
    {params}:{params:{storeId: string}}
) {
    const {productIds,userId} = await req.json()
    if(!productIds || productIds.length==0){
        return new NextResponse("Product ids are required")
    }

    console.log(userId)
    if(!userId){
        return new NextResponse("no user id")
    }
    const products = await prismadb.product.findMany({
        where:{
            id:{
                in:productIds
            }
        }
    })
    console.log(products)

    const line_items : Stripe.Checkout.SessionCreateParams.LineItem[] = []
    products.forEach((product:Product)=>{
        line_items.push({
            quantity:1,
            price_data:{
                currency:'INR',
                product_data:{
                    name: product.name,
                },
                unit_amount: product.price.toNumber()*100
            }
        })
    });
    console.log(line_items)

    const order = await prismadb.order.create({
        data:{
            storeId:params.storeId,
            isPaid:false,
            userId,
            orderItem:{
                create: productIds.map((productId:string)=>({
                    product:{
                        connect:{
                            id: productId
                        }
                    }
                }))
            }
        }
    });

    console.log(order)
    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        billing_address_collection: "required",
        phone_number_collection:{
            enabled: true
        },
        success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
        cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
        metadata:{
            orderId: order.id
        }
    });

    console.log("get session")
    return NextResponse.json({url: session.url},{
        headers: corsHeaders
    })

}