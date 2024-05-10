'use client'

import StoreModal from "@/components/modal/StoreModal"
import { useEffect, useState } from "react"

const StoreProveder=()=>{
    const [isMounted,setIsMounted] = useState(false)

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if(!isMounted){
        return null
    }

    return (
        <>
          <StoreModal />
        </>
    )
}

export default StoreProveder