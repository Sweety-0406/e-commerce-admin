'use client'

import { useParams, usePathname } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi"
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
  } from "@/components/ui/menubar"
import Link from "next/link";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";

const HamburgerMenu = ()=>{
    const params = useParams();
    const pathname = usePathname()
    const routes = [
        {
            href : `/${params.storeId}`,
            title: "Overview",
            active : pathname ===  `/${params.storeId}`
        },
        {
            href : `/${params.storeId}/billboards`,
            title: "Billboards",
            active : pathname ===  `/${params.storeId}/billboards`
        },
        {
            href : `/${params.storeId}/categories`,
            title: "Categories",
            active : pathname ===  `/${params.storeId}/categories`
        },
        {
            href : `/${params.storeId}/sizes`,
            title: "Sizes",
            active : pathname ===  `/${params.storeId}/sizes`
        },
        {
            href : `/${params.storeId}/colors`,
            title: "Colors",
            active : pathname ===  `/${params.storeId}/colors`
        },
        {
            href : `/${params.storeId}/products`,
            title: "Products",
            active : pathname ===  `/${params.storeId}/products`
        },
        {
            href : `/${params.storeId}/orders`,
            title: "Order",
            active : pathname ===  `/${params.storeId}/orders`
        },
        {
            href : `/${params.storeId}/settings`,
            title: "Settings",
            active : pathname ===  `/${params.storeId}/settings`
        },
    ]
    return(
        <div className="block md:hidden ">
            <Menubar>
            <MenubarMenu>
                <MenubarTrigger><GiHamburgerMenu /></MenubarTrigger>
                <MenubarContent className="flex flex-col">
                    {routes.map((route)=>(
                       <div>
                        <MenubarItem>
                        <Link
                            key={route.href}
                            href={route.href} 
                            className={
                                cn(route.active ? "  font-bold " : "text-gray-600 " 
                                )
                            }   
                        >
                            {route.title}
                        </Link>
                        </MenubarItem>
                        <Separator />
                       </div>
                    
                    ))}
                </MenubarContent>
            </MenubarMenu>
            </Menubar>

        </div>
    )
}

export default HamburgerMenu;