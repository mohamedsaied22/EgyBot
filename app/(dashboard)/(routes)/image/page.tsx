"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";

import axios from "axios";
import * as z from "zod";

import { Download, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
// import { infer } from "zod";


import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { Card, CardFooter } from "@/components/ui/card";



import { amountOptions, formSchema, resolutionOptions } from "./constant";
import { useProModel } from "@/hooks/use-pro-model";

const ImagePage = () => {
  const proModel = useProModel ();

  const router = useRouter();
  const [images, setImages] = useState<string[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    }
  });

  const isLoading = form.formState.isSubmitting;
  const onSumbit = async (values: z.infer<typeof formSchema>) => {
    try {
      // throw new Error ("somthing");

      setImages([]);

      const response = await axios.post("/api/image", values);

      const url = response.data.map((image: {url: string }) => image.url);

      setImages(url);

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
        title="Image Generation"
        describtion="Turn your prompt into an image."
        icon={ImageIcon}
        iconColor="text-pink-500"
        bgColor="bg-pink-500/10"
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
                  <FormItem className=" col-span-12 lg:col-span-6 ">
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
              <FormField 
              control={form.control}
              name="resolution"
              render={({ field }) =>(
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue  defaultValue={field.value}/>

                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {resolutionOptions.map((option) => (
                        <SelectItem
                        key={option.value}
                        value={option.value}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
              />
              <FormField 
              control={form.control}
              name="amount"
              render={({ field }) =>(
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue  defaultValue={field.value}/>

                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {amountOptions.map((option) => (
                        <SelectItem
                        key={option.value}
                        value={option.value}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
              />
              <Button className="col-span-12 hover:shadow-md hover:shadow-black transition-all duration-100 rounded-lg lg:col-span-2 w-full" disabled={isLoading}>Generate</Button>
            </form>
          </Form>
        </div>
        <div className="mt-4 space-y-4">
          {isLoading && (
            <div className="p-20">
              <Loader />
            </div>
          )}
          {images.length === 0 && !isLoading && (
              <Empty label="No Images generated."/>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
            {images.map((src) => (
              <Card
              key={src}
              className=" rounded-lg overflow-hidden"
              >
                <div className=" relative aspect-square">
                  <Image
                  alt="image"
                  fill
                  src={src}
                  >

                  </Image>
                </div>
                <CardFooter className="p-2">
                  <Button 
                    onClick={() => window.open(src)}
                    variant="secondary" 
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2"/>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImagePage;
