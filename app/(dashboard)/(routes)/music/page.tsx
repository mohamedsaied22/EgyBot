"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";

import axios from "axios";
import * as z from "zod";

import {  Music } from "lucide-react";
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



const MusicPage = () => {
  const proModel = useProModel();
  const router = useRouter();
  const [music, setMusic] =useState<string>();

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

      setMusic(undefined);
      
      const response = await axios.post("/api/music", values);
      
      setMusic(response.data.audio);

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
        title="Music Generation"
        describtion="Turn your prompt into music."
        icon={Music}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
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
          {!music && !isLoading && (
            
              <Empty label="No music generated."/>
            
          )}
      {music && (
        <audio controls className="w-full mt-8">
          <source src={music} />
        </audio>
      )}
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
