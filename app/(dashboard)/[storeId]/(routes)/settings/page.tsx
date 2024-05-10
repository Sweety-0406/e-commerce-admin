
import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { redirect} from "next/navigation"
import SettingForm from "./components/settings-form"


const SettingPage = async (
    {params}:{params :{ storeId: string} }
) => {
    const {userId} = auth()
    if(!userId){
        redirect('/sign-in')
    }
    const stores = await prismadb.store.findFirst({
        where:{
            id : params.storeId,
            userId
        }
    })
    if(!stores){
        redirect('/')
    }
    return(
        <div className="m-7">
            <SettingForm initialValue = {stores} />
        </div>
    )
}

export default SettingPage