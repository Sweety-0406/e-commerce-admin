

import prismadb from "@/lib/prismadb";
import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import StoreSwitcher from "./StoreSwitcher";
import MainNav from "./MainNav";
import { Separator } from "./ui/separator";
import { ModeToggle } from "./theme-button";
import HamburgerMenu from "./HamburgerMenu";


const Navbar = async()=>{
    const {userId} = auth();

    if(!userId){
        redirect('/sign-up')
    }
    const store = await prismadb.store.findMany({
        where:{
            userId
        }
    })
    return (
        <div>
            <div className="    
                grid
                gap-1
                grid-flow-col
                px-7
                py-3
            ">
                <div><StoreSwitcher store={store} /></div>
                <MainNav />
                <div className="flex flex-row-reverse">
                    <div className="mt-1 ml-2"><UserButton afterSignOutUrl="/"/></div>
                    <div className="ml-2"><ModeToggle/></div>
                    <HamburgerMenu />
                </div>
                
            </div> 
            <Separator />           
        </div>        
        
    )
}
export default Navbar