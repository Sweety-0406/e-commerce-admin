'use client'

import { useOrigin } from "@/hooks/useOrigin"
import ApiAlert from "./api-alert"
import { useParams } from "next/navigation"

interface apiListProps{
    entityName:string,
    entityId:string
}

const ApiList:React.FC<apiListProps> = ({
    entityId,
    entityName
})=>{
    const origin = useOrigin()
    const params = useParams()
    const storeId = params.storeId
    return(
        <div>
            <ApiAlert
                title="GET"
                description={`${origin}/api/${storeId}/${entityName}`}
                variant="public"
            />
            <ApiAlert
                title="GET"
                description={`${origin}/api/${storeId}/${entityName}/{${entityId}}`}
                variant="public"
            />
            <ApiAlert
                title="POST"
                description={`${origin}/api/${storeId}/${entityName}`}
                variant="Admin"
            />
            <ApiAlert
                title="PATCH"
                description={`${origin}/api/${storeId}/${entityName}/{${entityId}}`}
                variant="Admin"
            />
            <ApiAlert
                title="DELETE"
                description={`${origin}/api/${storeId}/${entityName}/{${entityId}}`}
                variant="Admin"
            />
        </div>
    )
}

export default ApiList