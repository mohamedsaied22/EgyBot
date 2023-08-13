import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai"

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscribtion";


const configuration = new Configuration ({
  apiKey: process.env.OPENAI_API_KEY,
});

const openapi = new OpenAIApi(configuration);

export async function POST(
  req: Request
) {
  try {
    const {userId} = auth();
    const body = await req.json();
    const { prompt, amount = 1 , resolution = "512x512"} = body;

    if (!userId) {
      return new NextResponse("unauthized", {status: 401});
    }

    if (!configuration.apiKey) {
      return new NextResponse("open ai not found", {status: 500});
    }

    if (!prompt) {
      return new NextResponse("prompt is required", {status: 400});
    }
    if (!amount) {
      return new NextResponse("Amount is required", {status: 400});
    }
    if (!resolution) {
      return new NextResponse("Resolution is required", {status: 400});
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();
    
    if(!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired", {status:403});
    }


    const response = await openapi.createImage ({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    })

    if (!isPro) {
      await increaseApiLimit();

    }
    
    return NextResponse.json(response.data.data);

  } catch (error) {
    console.log("Image_error",error);
    return new NextResponse("inertnal error", {status: 500});
  }
}