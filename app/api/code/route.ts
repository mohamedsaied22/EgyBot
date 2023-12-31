import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai"

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscribtion";

const configuration = new Configuration ({
  apiKey: process.env.OPENAI_API_KEY,
});

const openapi = new OpenAIApi(configuration);
const instructorMessage: ChatCompletionRequestMessage = {
  role: "system",
  content: "You are a code generator, you must answer only in markdown code snippest. Use doce comments for explanations."
}

export async function POST(
  req: Request
) {
  try {
    const {userId} = auth();
    const body = await req.json();
    const { messages} = body;

    if (!userId) {
      return new NextResponse("unauthized", {status: 401});
    }

    if (!configuration.apiKey) {
      return new NextResponse("open ai not found", {status: 500});
    }

    if (!messages) {
      return new NextResponse("message is required", {status: 400});
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();
    
    if(!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired", {status:403});
    }

    const response = await openapi.createChatCompletion ({
      model: "gpt-3.5-turbo",
      messages: [instructorMessage, ...messages],
    })

if (!isPro) {
  await increaseApiLimit();

}

    return NextResponse.json(response.data.choices[0].message);

  } catch (error) {
    console.log("Code_error",error);
    return new NextResponse("inertnal error", {status: 500});
  }
}