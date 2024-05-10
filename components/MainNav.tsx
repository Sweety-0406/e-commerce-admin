'use client'

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";

const MainNav =  () => {
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
        <div>
            <nav className="flex justify-between text-sm mt-2 lg:mt-1 lg:text-base md:space-x-3 lg:space-x-6 xl:space-x-8 hidden md:block ">
                {routes.map((route)=>(
                    <Link
                        key={route.href}
                        href={route.href} 
                        className={`${route.active ? " font-bold underline underline-offset-2" : "text-gray-600 "} `}   
                    >
                        {route.title}
                    </Link>
                
                ))}
            </nav>
        </div>
    )
}

export default MainNav;