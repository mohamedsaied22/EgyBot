"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web"

export const CrispChat = () => {
  useEffect(()=> {
    Crisp.configure("5de64548-a6d7-4077-a831-14a08fb09c11");
  }, [])


  return null;
}