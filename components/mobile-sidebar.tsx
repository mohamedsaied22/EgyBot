"use client";
import Sidebar from "@/components/sidebar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";


interface MobileSidebarProps {
  apiLimitCont: number; 
  isPro: boolean
}

const MobileSidebar = ({
  apiLimitCont= 0,
  isPro= false,
}: MobileSidebarProps) => {

  const [isMounted, setIsMounted] = useState(false);
  useEffect (()=> {
      setIsMounted(true);
  },[])
  if(!isMounted) {
    return null;
  }
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden ">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className="p-0">
        <Sidebar isPro={isPro} apiLimitCount={apiLimitCont} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
