"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";

import axios from "axios";
import * as z from "zod";

import {  VideoIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { infer } from "zod";

import { formSchema } from "./constant";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";

import { useRouter } from "next/navigation";
import { useProModel } from "@/hooks/use-pro-model";


const VideoPage = () => {
  const proModel = useProModel ();

  const router = useRouter();
  const [video, setVideo] =useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSumbit = async (values: z.infer<typeof formSchema>) => {
    try {
      // throw new Error ("somthing");

      setVideo(undefined);
      
      const response = await axios.post("/api/video", values);
      
      setVideo(response.data[0]);

      form.reset();
    }catch (error: any) {
      if (error?.response?.status === 403) {
        proModel.onOpen();
      }else {
        toast.error("somthing went error")
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Vedio Generation"
        describtion="Turn your prompt into vedio."
        icon={VideoIcon}
        iconColor="text-orange-500"
        bgColor="bg-orange-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSumbit)}
              className="
          rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2 
            "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className=" col-span-12 lg:col-span-10 ">
                    <FormControl className="p-0 m-0">
                      <Input 
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent "
                      disabled={isLoading}
                      placeholder="Welcome, how can i help you ?"
                      {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="col-span-12 hover:shadow-md hover:shadow-black transition-all duration-100 rounded-lg lg:col-span-2 w-full" disabled={isLoading}>Generate</Button>
            </form>
          </Form>
        </div>
        <div className="mt-4 space-y-4">
          {isLoading && (
            <div className="w-full p-8 rounded-lg flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {!video && !isLoading && (
            
              <Empty label="No video generated."/>
            
          )}
      {video && (
        <video controls className="w-full mt-8 aspect-video rounded-lg border bg-black">
          <source src={video} />
        </video>
      )}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
