"use client";

import { usePathname } from "next/navigation";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";


import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";


export const MobileSidebar = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const onOpen = useMobileSidebar((state) => state.onOpen);
  const onClose = useMobileSidebar((state) => state.onClose);
  const isOpen = useMobileSidebar((state) => state.isOpen);

  useEffect(() => { //ensures that is only rendered on client = no hydration errors
    setIsMounted(true)
  },[])

  useEffect(() => {
    onClose();
  }, [pathname, onClose])

  if(!isMounted){
    return null;
  }

  return(
    <>
      <Button
        onClick={onOpen}
        className="block md:hidden mr-2"
        variant="ghost"
        size="sm"
      >
        <Menu className="h-4 w-4"/>
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent
          side="left"
          className="p-2 pt-10"
        >
          <Sidebar 
            storageKey="t-sidebar-mobile-state"
          /> 
        </SheetContent>
      </Sheet>
    </>
  )
}