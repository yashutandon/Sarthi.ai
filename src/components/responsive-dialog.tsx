'use client'
import { Dialog,DialogContent,DialogDescription,DialogTitle,DialogHeader } from "@/components/ui/dialog"
import { Drawer, DrawerContent,DrawerDescription,DrawerHeader,DrawerTitle } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import React from "react";

interface ResponsiveDialogProps{
    title:string;
    description:string;
    children:React.ReactNode;
    open:boolean;
    onOpenChange:(open:boolean)=> void;
}

const ResponsiveDialog = ({title,description,children,open,onOpenChange}:ResponsiveDialogProps) => {
    const isMobile = useIsMobile();
    if(isMobile){
        return(
            <Drawer open={open} onOpenChange={onOpenChange}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>
                            {title}
                        </DrawerTitle>
                        <DrawerDescription>
                            {description}
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4">
                        {children}
                    </div>
                </DrawerContent>

            </Drawer>
        )
    }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    {title}
                </DialogTitle>
                <DialogDescription>
                    {description}
                </DialogDescription>
            </DialogHeader>
            {children}
        </DialogContent>
    </Dialog>
  )
}

export default ResponsiveDialog