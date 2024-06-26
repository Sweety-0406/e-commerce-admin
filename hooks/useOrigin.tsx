import { useEffect, useState } from "react";

export const useOrigin =()=>{
    const [isMounted,setIsMaounted] = useState(false);
    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';

    useEffect(()=>{
        setIsMaounted(true)
    },[])

    if(!isMounted){
        return ''
    }
    
    return origin

}