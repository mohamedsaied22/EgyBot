"use client";

import { useState } from "react";

import {
  Check,
  CodeIcon,
  ImageIcon,
  MessagesSquare,
  Music,
  VideoIcon,
  Zap
} from "lucide-react";

import {
  Dialog,
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader,
  DialogTitle
  } from "@/components/ui/dialog";
import { useProModel } from "@/hooks/use-pro-model";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import axios from "axios";
import { toast } from "react-hot-toast";


const tools = [
  {
    label:'Conversation',
    icon: MessagesSquare,
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
  },
  {
    label:'Music Generation',
    icon: Music,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    label:'Image Generation',
    icon: ImageIcon,
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
  },
  {
    label:'Video Generation',
    icon: VideoIcon,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
  {
    label:'code Generation',
    icon: CodeIcon,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
  },
  
]

export const ProModel = () => {

  const proModel = useProModel();
  const [loading, setLoading] = useState(false);


  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Somthing went error");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <Dialog open= {proModel.isOpen} onOpenChange={proModel.onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center flex-col gap-y-4 pb-2 ">
              <div className="flex items-center justify-center font-bold gap-x-2 py-1">
                Upgrade to EgyBot
                <Badge variant={"premuim"} className=" uppercase text-sm py-1">
                  pro
                </Badge>
              </div>
            </DialogTitle> 
            <DialogDescription className=" text-center pt-2 space-y-2 text-zinc-900 font-medium">
              {tools.map((tool) => (
                <Card
                  key={tool.label}
                  className="p-3 border-black/5 flex items-center justify-between"
                > 
                <div className="flex items-center gap-x-4">
                  <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                    <tool.icon className={cn("w-6 h-6", tool.color)}/>
                  </div>
                  <div className=" font-semibold text-sm">
                    {tool.label}
                  </div>
                </div>
                <Check className="w-5 h-5 text-primary"/>
                </Card>
              ))}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
            disabled={loading}
            onClick={onSubscribe}
            size="lg"
            variant="premuim"
            className="w-full"
            >
              Upgrade
              <Zap className="w-4 h-4 ml-2 fill-white"/>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}