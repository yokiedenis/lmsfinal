"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog"

interface ConfirmModalProps{
    children: React.ReactNode;
    onConfirm: () => void;
};

export const ConfirmModal = ({
    children,
    onConfirm,

}:ConfirmModalProps) =>{
    return(
        <div>
            <AlertDialog>
            <AlertDialogTrigger asChild> 
              {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are You Sure</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action can not be undone
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>

            </AlertDialog>

        </div>
    )
}