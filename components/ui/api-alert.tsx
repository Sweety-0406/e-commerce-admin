// 'use client'

import { Copy, CopyCheck, Server } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "./alert"
import { Badge } from "./badge"
import toast from "react-hot-toast"
import { cn } from "@/lib/utils"


interface apiAlertProps{
    title:string,
    description:string,
    variant:string
}
const ApiAlert:React.FC<apiAlertProps> =  ({
    title,
    description,
    variant
}) => {
    // const [isCopy,setIsCopy] = useState(false)
    const copyFn = async ()=>{
        try {
            await navigator.clipboard.writeText(`${description}`)
            toast.success("Copied in clipboard.")
            // setIsCopy(true)
        } catch (error) {
            toast.error("Not copied in clipboard.")
        } 
    }

    return(
        <div className="my-4">
            <Alert>
                <Server className="h-4 w-4"/>
                <AlertTitle>
                    {title} 
                    <Badge variant={variant === "public" ? "secondary" : "destructive"} className="ml-4">
                       {variant} 
                    </Badge >
                </AlertTitle>
                <AlertDescription className="flex justify-between">
                    <code className={cn(" bg-slate-100 p-1 text-sm font-bold rounded-xl dark:text-black",)}>
                      {description}                  
                    </code>
                            <Copy className="
                                h-6
                                w-6
                                p-1 
                                rounded-md 
                                border-2
                                border-gray-200
                                font-light 
                                hover:bg-slate-100 
                                cursor-pointer "
                                onClick={copyFn}
                            />
                        {/* )
                    } */}
                </AlertDescription>
            </Alert>
        </div>
    )
}


export default ApiAlert