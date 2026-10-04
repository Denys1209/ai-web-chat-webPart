"use client";

import ChatInput from "@/components/threadUi/chat-intput";
import ChatHistory from "@/components/threadUi/chatHistory/chat-history";
import ChatHistorySkeleton from "@/components/threadUi/chatHistory/chat-history-skeleton";
import { addMessageToThread, getMessagesForThread, streamMessageToThread } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { CreateImageAttachmentDto } from "@/lib/types/imageAttachmentTypes";
import { CreateMessageDto, GetMessageDto, Roles } from "@/lib/types/messageTypes";
import { Console } from "console";
import { SetStateAction, use, useEffect, useRef, useState } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [isLoading, setIsLoading] = useState(true);

  const [isResponding, setIsResponding] = useState(false);

  const [isStream, setIsStream] = useState(false);

  const auth = useAuth();

  const [messages, setMessages] = useState<GetMessageDto[]>([]);

  const abortRef = useRef<AbortController | null>(null);

  const [value, setValue] = useState<string>("");


  const [imagesAttached, setImagesAttached] = useState<CreateImageAttachmentDto[]>([]);



  useEffect(() => {
    getMessagesForThread(id).then((data) => {
      setMessages(data);
      console.log(data);
    }).finally(() => {
      setIsLoading(false);
    });
  }, [])


  

  const handleKeyUp = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter" || !value.trim()) return;

    const text = value;
    setValue("");
    setIsResponding(true);

    const tempId = crypto.randomUUID();
    const request: CreateMessageDto = {
      imageAttachments: imagesAttached,
      role: Roles.User,
      text,
      thoughts: "",
      userId: auth.user?.id!
    }

    const userMessage: GetMessageDto = {
      imageAttachments: [],
      role: Roles.User,
      text,
      thoughts: "",
      id: tempId,
    };

    setMessages(prev => [...prev, userMessage]);
    setImagesAttached([])

    try {
      if (!isStream){
        const response = await addMessageToThread(id, request);
        setMessages(prev => [
          ...prev.map(m => (m.id === tempId ? { ...m, id: response.userMessageId } : m)),
          response.messageDto,
        ]);
      }
      else
      {

        let instantOfMessage: GetMessageDto  = { role: Roles.Assistant, text: "", id: "", imageAttachments: [], thoughts: "" };

        setMessages(prev => [...prev, instantOfMessage ]);

        const controller = new AbortController();
        abortRef.current = controller;

        await streamMessageToThread(
                id,
                request, 
                token => {
                    setMessages(prev => {
                        const copy = [...prev];
                        const last = copy[copy.length - 1];
                        copy[copy.length - 1] = { ...last, text: last.text + token };
                        return copy;
                    });
                },
                controller.signal
            );
      }
    } catch (err) {
      console.error(err); 
      setMessages(prev => prev.filter(m => m.id !== tempId)); 
    } finally {
      setIsResponding(false);
    }
  };



  return (
    <div className="bg-black h-screen w-full flex flex-col">
      <div className="flex-1 overflow-y-auto ">
        <div className="w-full m-auto max-w-3xl">
          {isLoading ? <ChatHistorySkeleton /> :
            <ChatHistory history={messages} />
          }
        </div>
      </div>

      <div className="w-full flex justify-center pb-4 pt-2 bg-transparent shadow-lg shadow-black">
        <div className="w-full m-auto max-w-3xl">
          <ChatInput value={value} setValue={setValue} onKeyUp={handleKeyUp} isResponding={isResponding} setImagesAttached={setImagesAttached} isStream={isStream} setStream={setIsStream} imagesAttached={imagesAttached}  />
        </div>
      </div>
    </div>
  );
}