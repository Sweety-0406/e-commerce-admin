import Heading from "@/components/Heading"
import { Separator } from "@/components/ui/separator"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
  } from "@/components/ui/card"
import { FaPlus } from "react-icons/fa6";
import { FaBoxOpen } from "react-icons/fa";
import { CiCreditCard1 } from "react-icons/ci";
import { IndianRupee } from "lucide-react"
import { getTotalRevenue } from "@/actions/getTotalRevenue";
import { getSalesCount } from "@/actions/getSalesCount";
import { getStockCount } from "@/actions/getStockCount";
import { Overview } from "@/components/overview";
import { getGraphRevenue } from "@/actions/getGraphRevenue";

interface DashboardPageProps{
    params:{storeId: string}
}

const DashboardPage:React.FC<DashboardPageProps> = async ({
    params
})=>{
    const totalRevenue = await  getTotalRevenue(params.storeId)
    const salesCount = await  getSalesCount(params.storeId)
    const stockCount = await  getStockCount(params.storeId)
    const graphData = await getGraphRevenue(params.storeId)
    return(
        <div className=" flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Heading 
                    title="Dashboard"
                    subtitle="Overview of your store"
                />
                <Separator className="my-4"/>
                <div className="grid grid-cols-3 gap-3">
                    <Card>
                    <CardContent>
                        <div className=" pt-2">
                            <div className="flex justify-between space-x-6">
                                <p className="text-sm">Total Revenue</p>
                                <p className="text-sm text-slate-500"> <IndianRupee className="mt-1" size={15}/> </p>
                            </div>
                            <div className="text-lg font-bold flex mt-4">
                            <IndianRupee size={18} className="mt-[6px]" />{totalRevenue}
                            </div>
                        </div>
                    </CardContent>
                    </Card>

                    <Card>
                    <CardContent>
                        <div className=" pt-2">
                            <div className="flex justify-between space-x-6">
                                <p className="text-sm">Sales</p>
                                <p className="text-sm text-slate-500"> <CiCreditCard1  size={19}/> </p>
                            </div>
                            <div className="text-lg font-bold flex mt-4">
                                +{salesCount}
                            </div>
                        </div>
                    </CardContent>
                    </Card>

                    <Card>
                    <CardContent>
                        <div className=" pt-2">
                            <div className="flex justify-between space-x-6">
                                <p className="text-sm">Product in stock</p>
                                <p className="text-sm text-slate-500"> <FaBoxOpen className="mt[1px]" size={19}/> </p>
                            </div>
                            <div className="text-lg font-bold flex mt-4">
                                {stockCount}
                            </div>
                        </div>
                    </CardContent>
                    </Card>
                </div>
                <Card className="col-span-4 mt-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Overview data={graphData}/>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default DashboardPage



