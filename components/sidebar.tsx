"use client";
import Link from "next/link";
import Image from "next/image";
import { Code2Icon, ImageIcon, LayoutDashboard, MessagesSquare, Music, Settings, VideoIcon, } from "lucide-react";
import { cn } from "@/lib/utils";
import {usePathname} from 'next/navigation'
import { FreeCounter } from "@/components/free-counter";


// side bar objects
const routs = [
  {
    label:'Dashboard',
    icon: LayoutDashboard,
    href:'/dashboard',
    color: 'text-sky-500',
  },
  {
    label:'Conversation',
    icon: MessagesSquare,
    href:'/conversation',
    color: 'text-violet-500',
  },
  {
    label:'Image Generation',
    icon: ImageIcon,
    href:'/image',
    color: 'text-pink-500',
  },
  {
    label:'Vedio Generation',
    icon: VideoIcon,
    href:'/video',
    color: 'text-orange-500',
  },
  {
    label:'Music Generation',
    icon: Music,
    href:'/music',
    color: 'text-emerald-500',
  },
  {
    label:'Code Generation',
    icon: Code2Icon,
    href:'/code',
    color: 'text-cyan-500',
  },
  {
    label:'Settings',
    icon: Settings,
    href:'/settings',
    // color: 'text-emerald-500',
  },
];

interface SidebarProps {
  apiLimitCount: number;
  isPro: boolean,

}

const Sidebar = ({
  apiLimitCount = 0,
  isPro = false,
}:SidebarProps ) => {
  const pathname = usePathname();
return (
  <div className=" space-y-4 py-4 h-full flex flex-col bg-[#111827] text-white ">
      <div className="px-3 py-2 flex-1">
          <Link href='/' className="flex items-center pl-3 mb-14">
            <div className=" relative w-8 h-8 mr-4">
              <Image 
                fill
                alt="logo"
                src="/logo1.png"
              />
            </div>
            <h1 className=" text-2xl font-bold">EgyBot</h1>
          </Link>
          {/* links */}
          <div className=" space-y-1">
              {routs.map((route)=>(
                <Link
                  href={route.href}
                  key={route.href}
                  className={cn("text-sm group flex p-3 w-full justify-center font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-xl hover:shadow-md hover:shadow-black transition-all duration-150"
                  ,pathname === route.href ? "bg-white/10 text-white shadow-md shadow-black" : "text-zinc-400"
                  )}
                  >
                <div className="flex flex-1 items-center">
                  <route.icon className={cn('h-5 w-5 mr-3', route.color)}/>
                  {route.label} 
                </div>
                </Link>
              ))}
          </div>
      </div>
      <FreeCounter
      apiLimitCount = {apiLimitCount}
      isPro={isPro}
      />
  </div>
);
}

export default Sidebar;