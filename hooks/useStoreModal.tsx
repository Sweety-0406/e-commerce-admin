import { create } from "zustand";

interface StoreModalHookInterface{
    isOpen:boolean,
    onOpen:()=>void,
    onClose:()=>void
}

const useStoreModal = create<StoreModalHookInterface>()((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false})
}))

export default useStoreModal;