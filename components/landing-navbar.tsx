"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const font = Montserrat({ weight: '600', subsets: ['latin'] });

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="p-4 bg-[#111827] flex items-center justify-between fixed top-0 left-0 right-0 mx-2 md:mx-4 lg:mx-16  ">
      <Link href="/" className="flex items-center">
        <div className="relative h-8 w-8 mr-4">
          <Image fill alt="Logo" src="/logo1.png" />
        </div>
        <h1 className={cn("text-2xl font-bold text-white ", font.className)}>
          EgyBot
        </h1>
      </Link>
      <div className="flex items-center gap-x-2">
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant="premuim" className="rounded-full shadow-lg shadow-black hover:scale-[1.1] transition-all duration-100">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
};