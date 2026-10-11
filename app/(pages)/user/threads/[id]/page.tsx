"use client";

import { useAuth } from "@/lib/auth-context";
import { GetMessageDto } from "@/lib/types/messageTypes";
import { use, useState } from "react";

const page = ({params}:{params: Promise<{id: string}>}) => {

  const {id} = use(params);

  const [isLoading, setIsLoading]  = useState(true);

  const [isResponsing, setIsResponsing] = useState(false);

  const auth = useAuth();

  const [messages, setMessages] = useState<GetMessageDto[]>([]);

  const [value, setValue] = useState("");

  return (
    <div className="bg-black h-screen w-full flex flex-col">
        <div className="flex-1 overflow-y-auto">
            <div className="w-full m-auto max-w-3xl">
                {
                    <></>
                }
            </div>
        </div>

        <div className="w-full flex justify-center pb-4 pt-2 bg-transparent shadow-lg shadow-black">
            <div className="w-full m-auto max-w-3xl" >
                <ChatInput
                
                />
            </div>

        </div>
    </div>
  )
}

export default page