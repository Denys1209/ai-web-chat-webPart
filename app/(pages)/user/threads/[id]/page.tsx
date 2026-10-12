"use client";

import ChatInput from "@/components/threadUi/chat-input";
import ChatHistory from "@/components/threadUi/chatHistory/chat-history";
import ChatHistorySkeleton from "@/components/threadUi/chatHistory/chat-history-skeleton";
import { addMessageToThread, getMessagesForThread } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { CreateMessageDto, GetMessageDto, Roles } from "@/lib/types/messageTypes";
import { use, useEffect, useState } from "react";

const page = ({params}:{params: Promise<{id: string}>}) => {

  const {id} = use(params);

  const [isLoading, setIsLoading]  = useState(true);

  const [isResponding, setIsResponding] = useState(false);

  const auth = useAuth();

  const [messages, setMessages] = useState<GetMessageDto[]>([]);

  const [value, setValue] = useState("");

  useEffect(() => {
    getMessagesForThread(id).then((data) => {
        setMessages(data);
    }).finally(() => {
        setIsLoading(false);
    })

  }, []);

  const handleKeyUp = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter" || !value.trim()) return;

    const text = value;
    setValue("");
    setIsResponding(true);

    const tempId = crypto.randomUUID();

    const request: CreateMessageDto = 
    {
        imageAttachments: [],
        role: Roles.User,
        text: text,
        thoughts: "",
        userId: auth.user?.id!
    }

    const userMessage: GetMessageDto = {
        imageAttachments: [],
        role: Roles.User,
        text: text,
        thoughts: "",
        id: tempId
    };

    setMessages(prev => [...prev, userMessage]);

    try
    {
        const response = await addMessageToThread(id, request);
        setMessages(prev => [
            ...prev.map(m => (m.id === tempId ? {...m, id:response.userMessageId} : m)),
            response.messageDto
        ]);
    }catch{}
    finally
    {
        setIsResponding(false);
    }
  }



  return (
    <div className="bg-black h-screen w-full flex flex-col">
        <div className="flex-1 overflow-y-auto">
            <div className="w-full m-auto max-w-3xl">
                {
                    isLoading ? <ChatHistorySkeleton></ChatHistorySkeleton> : <ChatHistory history={messages}                    />
                }
            </div>
        </div>

        <div className="w-full flex justify-center pb-4 pt-2 bg-transparent shadow-lg shadow-black">
            <div className="w-full m-auto max-w-3xl" >
                <ChatInput
                isResponding={isResponding}
                setValue={setValue}
                value={value}
                onKeyUp={handleKeyUp}
                
                />
            </div>

        </div>
    </div>
  )
}

export default page