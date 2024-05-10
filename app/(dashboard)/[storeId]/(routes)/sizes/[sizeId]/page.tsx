
import prismadb from "@/lib/prismadb"
import SizeForm from "./components/sizeForm"



const sizeIdPage = async(
    {params} : {params : { storeId: string, sizeId : string}}
)=>{
    

    const size = await prismadb.size.findFirst({
        where:{
            id : params.sizeId
        }
    })

    
    return( 
        <div className="my-7">
            <SizeForm  initialData={size}/>
        </div>
    )
}

export default sizeIdPage