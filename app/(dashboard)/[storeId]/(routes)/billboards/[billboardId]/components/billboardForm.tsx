'use client'

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import ImageUpload from "@/components/ui/image-upload"
import { Billboard } from "@prisma/client"
import toast from "react-hot-toast"
import axios from "axios"
import { useParams } from "next/navigation"
import { useState } from "react"
import AlertModal from "@/components/AlertModal"
import Heading from "@/components/Heading"
import { Separator } from "@/components/ui/separator"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"

interface billboardFormProps{
    initialData : Billboard | null
}

const formSchema = z.object({
    label:z.string().min(2,{
        message:"label must be at least two character."
    }),
    imageUrl: z.string().min(1,{
        message:"Must upload an image."
    })
})

const BillboardForm:React.FC<billboardFormProps> = ({
    initialData
}) => {
    const params = useParams()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen,setIsOpen] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:initialData || {
            label:"",
            imageUrl:""
        }
    })
    const title =  initialData ? "Edit billboard" : "Create billboard" 
    const subtitle = initialData ? "Edit a billboard for your store" : "Add a new billboard"
    const ButtonAction = initialData ? "Save changes" : "Create"

    const onSubmit = async (values: z.infer<typeof formSchema>)=>{
        console.log(params.storeId,params.billboardId)
        try {
            setIsLoading(true)
            if(initialData){
                const res = await axios.patch(`/api/${params.storeId}/billboards/${initialData.id}`,values)
                console.log(params.storeId,params.billboardId)
                toast.success("Successfully changes saved")
            }else{
                const res = await axios.post(`/api/${params.storeId}/billboards`,values)
                toast.success("Successfully billboard is created")
            }
            router.push(`/${params.storeId}/billboards`);
            router.refresh()
        } catch (error) {
            toast.error("something went wrong")
        } finally{
            setIsLoading(false)
        }
    }

    const onDelete = async()=>{
        try {
            await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`)
            toast.success("Successfully deleted.")
        } catch (error) {
            toast.error("Something went wrong during deleting.")
        } finally{
            setIsOpen(false)
        }
    }
    
    return(
        <>
            <AlertModal 
              isOpen={isOpen}
              onClose={()=>setIsOpen(false)}
              title="Are you sure?"
              description="This action can't be undo."
              onConfirm={onDelete}
            />
            <div className="m-7">
                <div className="mb-7 flex justify-between">
                    <Heading 
                    title = {title}
                    subtitle={subtitle}
                    />
                    <div>
                        {initialData && 
                            <Button variant="destructive" onClick={()=>setIsOpen(true)}>
                                <Trash className="w-4 h-5" />
                            </Button>
                        }
                    </div>
                </div>
                <Separator />
                <div className="mt-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField 
                    control={form.control}
                    name="imageUrl"
                    render={({field})=>(
                            <FormItem>
                                <FormLabel>Background Image</FormLabel>
                                <FormControl className="w-64">
                                    <ImageUpload 
                                    value={field.value ? [field.value] : []} 
                                    disabled={false} 
                                    onChange={(url) => field.onChange(url)}
                                    onRemove={() => field.onChange('')}
                                />
                                </FormControl>
                                <FormMessage />   
                            </FormItem>
                    )}
                    />
                    <FormField 
                    control={form.control}
                    name="label"
                    render={({field})=>(
                        <FormItem>
                                <FormLabel>Label</FormLabel>
                                <FormControl className="w-64">
                                    <Input placeholder="label" {...field} />
                                </FormControl>
                                <FormMessage />   
                            </FormItem>
                    )}
                    />
                    <Button className="mt-6" type="submit" disabled={isLoading}>{ButtonAction}</Button>
                    </form>
                </Form>
                </div>
            </div>
        </>
    )
}

export default BillboardForm