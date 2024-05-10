'use client'

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import ImageUpload from "@/components/ui/image-upload"
import { Category, Color, Image, Product, Size } from "@prisma/client"
import toast from "react-hot-toast"
import axios from "axios"
import { useParams } from "next/navigation"
import { useState } from "react"
import AlertModal from "@/components/AlertModal"
import Heading from "@/components/Heading"
import { Separator } from "@/components/ui/separator"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface productFormProps{
    initialData : Product & {
        images: Image[]
    } | null,
    category: Category[],
    size: Size[],
    color: Color[]
}

const formSchema = z.object({
    name: z.string().min(2,{
        message:"label must be at least two character."
    }),
    isArchived: z.boolean().default(false).optional(),
    isFeatured: z.boolean().default(false).optional(),
    price: z.coerce.number().min(1),
    categoryId: z.string(),
    sizeId: z.string(),
    colorId: z.string(),
    images: z.object({ url: z.string()}).array()
    
    
})

const ProductForm:React.FC<productFormProps> = ({
    initialData,
    category,
    color,
    size
}) => {
    const params = useParams()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen,setIsOpen] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? 
            {
                ...initialData,
                price: initialData?.price as unknown as number
            }:{
                name:"",
                isArchived: false,
                isFeatured: false,
                price: 0,
                categoryId: "",
                sizeId: "",
                colorId: "",
                images:[]
            }
        
    })
    const title =  initialData ? "Edit product" : "Create product" 
    const subtitle = initialData ? "Edit a product for your store" : "Add a new product"
    const ButtonAction = initialData ? "Save changes" : "Create"

    const onSubmit = async (values: z.infer<typeof formSchema>)=>{
        console.log(params.storeId,params.billboardId)
        try {
            setIsLoading(true)
            if(initialData){
                const res = await axios.patch(`/api/${params.storeId}/products/${initialData.id}`,values)
                console.log(params.storeId,params.billboardId)
                toast.success("Successfully changes saved")
            }else{
                const res = await axios.post(`/api/${params.storeId}/products`,values)
                toast.success("Successfully product is created")
            }
            router.push(`/${params.storeId}/products`);
            router.refresh()
        } catch (error) {
            toast.error("something went wrong")
        } finally{
            setIsLoading(false)
        }
    }

    const onDelete = async()=>{
        try {
            await axios.delete(`/api/${params.storeId}/products/${params.productId}`)
            toast.success("Successfully deleted.")
            router.push(`/${params.storeId}/products`);
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
                <div className="mt-7 ">
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
                    <FormField 
                    control={form.control}
                    name="images"
                    render={({field})=>(
                            <FormItem>
                                <FormLabel> Image</FormLabel>
                                <FormControl className="w-64">                                
                                <ImageUpload 
                                    value={field.value.map((image) => image.url)} 
                                    disabled={false} 
                                    onChange={(url) => field.onChange([...field.value, { url }])}
                                    onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}
                                />
                                </FormControl>
                                <FormMessage />   
                            </FormItem>
                    )}
                    />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        <FormField 
                        control={form.control}
                        name="name"
                        render={({field})=>(
                            <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl className="w-50">
                                        <Input placeholder="product name" {...field} />
                                    </FormControl>
                                    <FormMessage />   
                                </FormItem>
                        )}
                        />
                        <FormField 
                        control={form.control}
                        name="price"
                        render={({field})=>(
                            <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl className="w-50">
                                        <Input type="number" placeholder="product price" {...field} />
                                    </FormControl>
                                    <FormMessage />   
                                </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select a category " />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent className={`${category.length >5 ? "h-48":"h-auto"}`}>
                                    {category.map((item)=>(
                                        <SelectItem key={item.id} value={item.id} > {item.name} </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="sizeId"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Size</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select a size " />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent className={`${size.length >5 ? "h-48":"h-auto"}`}>
                                    {size.map((item)=>(
                                        <SelectItem key={item.id} value={item.id} > {item.name} </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                       />
                        <FormField
                        control={form.control}
                        name="colorId"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Color</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select a color " />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent className={`${color.length >5 ? "h-48":"h-auto"}`}>
                                    {color.map((item)=>(
                                        <SelectItem key={item.id} value={item.id} > {item.name} </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                       />
                       <FormField
                            control={form.control}
                            name="isFeatured"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                    <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                        Featured
                                    </FormLabel>
                                    <FormDescription>
                                        This product will be shown on home page.
                                    </FormDescription>
                                </div>
                                </FormItem>
                            )}
                        />
                       <FormField
                            control={form.control}
                            name="isArchived"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                    <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                        Archived
                                    </FormLabel>
                                    <FormDescription>
                                        This product will not be shown in home page.
                                    </FormDescription>
                                </div>
                                </FormItem>
                            )}
                        />
                    </div>
                    
                    <Button className="mt-6" type="submit" disabled={isLoading}>{ButtonAction}</Button>
                    </form>
                </Form>
                </div>
            </div>
        </>
    )
}

export default ProductForm