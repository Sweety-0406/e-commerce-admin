
import prismadb from "@/lib/prismadb"
import BillboardForm from "./components/billboardForm"


const BillboardIdPage = async(
    {params} : {params : {billboardId : string}}
)=>{
    

    const billboard = await prismadb.billboard.findFirst({
        where:{
            id : params.billboardId
        }
    })
    
    return( 
        <div className="my-7">
            <BillboardForm initialData={billboard}/>
        </div>
    )
}

export default BillboardIdPage