'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"

interface alertModalProps{
    title:string,
    description:string,
    isOpen:boolean,
    onConfirm : ()=>void,
    onClose : ()=>void
}
const AlertModal:React.FC<alertModalProps> =  ({
    title,
    description,
    isOpen,
    onClose,
    onConfirm
}) => {
    return(
        <div>
            <AlertDialog open={isOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle> {title} </AlertDialogTitle>
                <AlertDialogDescription> {description} </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default AlertModal;