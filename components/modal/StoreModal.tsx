'use client'

import useStoreModal from "@/hooks/useStoreModal"
import Modal from "../Modal"
import * as z  from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useState } from "react"
import axios from 'axios'
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"


const formSchema = z.object({
    name: z.string().min(2,{
        message: "name must contain at least two character."
    })
})

const StoreModal = () => {
    const [isLoading,setIsLoading] = useState(false)
    const storeModal = useStoreModal()
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            name:""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>)=>{
        try {
            setIsLoading(true)
            const response = await axios.post('/api/stores',values)
            toast.success("Store is successfully created.")
            console.log(response.data)
            // router.push(`/${response.data.id}`)
            window.location.assign(`/${response.data.id}`)
        } catch (error) {
            toast.error("Something went wrong while creating store")
            console.log(error)
        } finally{
            setIsLoading(false)
        }
    }

    return(
        <Modal 
            title="Create store" 
            description="Add a new store to manage products and categories" 
            isOpen={storeModal.isOpen} 
            onClose={storeModal.onClose}
        >
            <div>
                <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Store" disabled={isLoading} {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div className=" flex flex-row-reverse ">
                            <Button type="submit" disabled={isLoading} className="ml-5">Continue</Button>
                            <Button onClick={storeModal.onClose} disabled={isLoading} variant="outline" >Cancel</Button>
                        </div>
                    </form>
                </Form>
                </div>
            </div>
        </Modal>
    )
}

export default StoreModal