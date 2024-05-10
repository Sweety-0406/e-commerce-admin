
import prismadb from "@/lib/prismadb"
import ColormForm from "./components/colorForm"



const colorIdPage = async(
    {params} : {params : { colorId : string}}
)=>{
    

    const color = await prismadb.color.findFirst({
        where:{
            id : params.colorId
        }
    })

    
    return( 
        <div className="my-7">
            <ColormForm initialData={color}/>
        </div>
    )
}

export default colorIdPage