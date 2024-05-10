'use client'

import AlertModal from "@/components/AlertModal"
import Heading from "@/components/Heading"
import ApiAlert from "@/components/ui/api-alert"
import { Button } from "@/components/ui/button"
import { FormField, Form, FormLabel, FormItem, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useOrigin } from "@/hooks/useOrigin"
import { zodResolver } from "@hookform/resolvers/zod"
import { Store } from "@prisma/client"
import axios from "axios"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {  useForm } from "react-hook-form"
import toast from "react-hot-toast"
import {z} from 'zod'

interface settingFormProps{
    initialValue:Store
}

const formSchema = z.object({
    name : z.string().min(2,{
        message:"store name must be atleast two character."
    })
})

const SettingForm:React.FC<settingFormProps> =  ({
    initialValue
}) => {
    const router = useRouter()
    const [isLoading,setIsLoading]=useState(false)
    const [isOpen,setIsOpen] = useState(false)
    const origin = useOrigin()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues : {
            name: initialValue.name
        }
    })

    const onSubmit = async (values:z.infer<typeof formSchema>)=>{
        console.log(values)
        try {
            setIsLoading(true)
            await axios.patch(`/api/stores/${initialValue.id}`,values)
            toast.success("updation is successfully saved.")
            router.refresh()
        } catch (error) {
            toast.error("something went wrong during updating stores")
        } finally{
            setIsLoading(false)
        }
    }

    const confirmDeleteHandler = async()=>{
        try {
            await axios.delete(`/api/stores/${initialValue.id}`)
            toast.success("Successfully deleted stores")
            router.refresh()
        } catch (error) {
            toast.error("something went wrong during deleting the stores")
        }finally{
            setIsOpen(false)
        }
    }

    return(
        <div>
            <AlertModal 
             title="Are you sure you want to cancel it?"
             description="All the records related to this store will be deleted permanently"
             isOpen={isOpen}
             onClose={()=>setIsOpen(false)}
             onConfirm={confirmDeleteHandler}
            />
            <div className="flex justify-between mb-6">
                <div>
                    <Heading title="Settings" subtitle="Manage store preferences"/>
                </div>
                <Button className="bg-rose-600 hover:bg-rose-500 mt-1" onClick={()=>setIsOpen(true)} >
                    <Trash size={16}/>
                </Button>
            </div>
            <Separator />
            <div className="my-4 w-72">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField 
                            control={form.control}
                            name="name"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="store" disabled={isLoading} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="mt-4" disabled={isLoading}>Save Changes</Button>
                    </form>
                </Form>
            </div>
            <Separator />
            <div className="my-7">
                <ApiAlert 
                    title="NEXT_PUBLIC_API_URL"
                    description={`${origin}/api/${initialValue.id}`}
                    variant="public"
                />
            </div>
        </div>
    )
}

export default SettingForm