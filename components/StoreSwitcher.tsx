'use client'

import { Check, ChevronsUpDown,PlusCircle,Store } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useStoreModal from "@/hooks/useStoreModal";

interface StoreSwitcherProps{
    store:Record<string, any>[];
}


const StoreSwitcher:React.FC<StoreSwitcherProps> = ({
    store = []
}) => {
    const[open,setOpen] = useState(false)
    const[value,setValue] = useState("")
    const storemodal = useStoreModal()
    const params = useParams()
    const router = useRouter()

    const items = store.map((item)=>({
        value:item.id,
        label:item.name
    }))

    const onSelectFn = (itemValue : string)=>{
        setValue(itemValue === value ? "" : itemValue)
        console.log(itemValue)
        setOpen(false)
        router.push(`/${itemValue}`)
        router.refresh()
    }

    const currentStore = items.find((item)=>item.value === params.storeId)
    return(
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button 
                variant="outline"
                role="combobox"
                aria-expanded={open}
                aria-label="Select a store"
                className=" lg:w-[200px] justify-between"
                >
                     <Store size={20}/> 
                    {currentStore?.label}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                <CommandList>
                    <CommandGroup heading="Stores" className="">
                        {store.map((item) => (
                        <div 
                           key={item.id}
                           onSelect={()=>{}}
                           onClick={()=>onSelectFn(item.id)} 
                           className={`
                            cursor-pointer  
                            hover:text-black 
                            hover:bg-slate-50
                            pl-2 
                            flex 
                            justify-between
                            p-1
                            ${params.storeId == item.id ? "text-black bg-slate-100 " : "text-gray-500"}
                            `}
                        >
                            <Store size={16} className="mt-1"/> 
                            {item.name}
                            <Check
                            className={`
                                mr-2
                                h-4 
                                w-4 
                                mt-1
                                ${params.storeId === item.id ? "opacity-100" : "opacity-0"}
                            `}
                            />
                        </div>
                        ))}
                    </CommandGroup>
                </CommandList>
                <CommandSeparator />
                </Command>
                <div className="m-2 flex cursor-pointer" onClick={storemodal.onOpen}>
                    <div className="mr-3 ">
                    <PlusCircle />
                    </div>
                    <div className="text-sm"> Create New Store </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default StoreSwitcher;