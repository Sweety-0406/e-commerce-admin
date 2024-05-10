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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {Billboard, Category } from "@prisma/client"
import toast from "react-hot-toast"
import axios from "axios"
import { useParams } from "next/navigation"
import { useState } from "react"
import AlertModal from "@/components/AlertModal"
import Heading from "@/components/Heading"
import { Separator } from "@/components/ui/separator"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"

interface categoryFormProps{
    initialData : Category | null,
    billboard: Billboard[]
}

const formSchema = z.object({
    name:z.string().min(2,{
        message:"name must be at least two character."
    }),
    billboardId: z.string()
})

const CategoryForm:React.FC<categoryFormProps> = ({
    initialData,
    billboard
}) => {
    const params = useParams()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen,setIsOpen] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name:"",
            billboardId:""
        }
    })
    const title =  initialData ? "Edit category" : "Create category" 
    const subtitle = initialData ? "Edit a category for your store" : "Add a new category"
    const ButtonAction = initialData ? "Save changes" : "Create"

    const onSubmit = async (values: z.infer<typeof formSchema>)=>{
        try {
            setIsLoading(true)
            if(initialData){
                const res = await axios.patch(`/api/${params.storeId}/categories/${initialData.id}`,values)
                toast.success("Successfully changes saved")
            }else{
                const res = await axios.post(`/api/${params.storeId}/categories`,values)
                toast.success("Successfully category is created")
            }
            router.push(`/${params.storeId}/categories`);
            router.refresh()
        } catch (error) {
            toast.error("something went wrong")
        } finally{
            setIsLoading(false)
        }
    }

    const onDelete = async()=>{
        try {
            await axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`)
            toast.success("Successfully deleted.")
            router.push(`/${params.storeId}/categories`);
            router.refresh()
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
                <div className="mt-7 flex ">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField 
                    control={form.control}
                    name="name"
                    render={({field})=>(
                        <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl className="w-64">
                                    <Input placeholder="name" {...field} />
                                </FormControl>
                                <FormMessage />   
                        </FormItem>
                    )}
                    />
                    <FormField
                        control={form.control}
                        name="billboardId"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Billboard</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select a billboard " />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent className={`${billboard.length > 5? "h-48" : "h-auto"}`}>
                                    {billboard.map((item)=>(
                                        <SelectItem key={item.id} value={item.id} > {item.label} </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
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

export default CategoryForm