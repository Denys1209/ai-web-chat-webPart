"use client";

import ChatInput from "@/components/threadUi/chat-intput";
import ChatHistory from "@/components/threadUi/chatHistory/chat-history";
import ChatHistorySkeleton from "@/components/threadUi/chatHistory/chat-history-skeleton";
import { addMessageToThread, getMessagesForThread } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { CreateMessageDto, GetMessageDto, Roles } from "@/lib/types/messageTypes";
import { Console } from "console";
import { SetStateAction, use, useEffect, useState } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [isLoading, setIsLoading] = useState(true);

  const [isResponding, setIsResponding] = useState(false);

  const auth = useAuth();

  const [messages, setMessages] = useState<GetMessageDto[]>([]);

  useEffect(() => {
    getMessagesForThread(id).then((data) => {
      setMessages(data);
      console.log(data);
    }).finally(() => {
      setIsLoading(false);
    });
  }, [])


  const [value, setValue] = useState<string>("");

  const handleKeyUp = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter" || !value.trim()) return;

    const text = value;
    setValue("");
    setIsResponding(true);

    const tempId = crypto.randomUUID();
    const request: CreateMessageDto = {
      imageAttachments: [],
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

    try {
      const response = await addMessageToThread(id, request);

      setMessages(prev => [
        ...prev.map(m => (m.id === tempId ? { ...m, id: response.userMessageId } : m)),
        response.messageDto,
      ]);
    } catch (err) {
      console.error(err); 
      setMessages(prev => prev.filter(m => m.id !== tempId)); 
    } finally {
      setIsResponding(false);
    }
  };


  // const messages: GetMessageDto[] = [
  //   {
  //     id: "1",
  //     role: Roles.User,
  //     text: "Teststsksjcdnjasn djcnajdncjdnacjkn jcknajn ldj kcn djks ncjkndk cnkjsncjd njcnjn cjnjnacjkd nacndjsn jkcndjs knc ljksnc jknsdj cns kncjsncjnsjc nsjnc nsn lcjs ncjn jks",
  //     thoughts: "",
  //     imageAttachments: []
  //   },
  //   {
  //     id: "2",
  //     role: Roles.Assistant,
  //     text: "Teststsksjcdnjasn djcnajdncjdnacjkn jcknajn ldj kcn djks ncjkndk cnkjsncjd njcnjn cjnjnacjkd nacndjsn jkcndjs knc ljksnc jknsdj cns kncjsncjnsjc nsjnc nsn lcjs ncjn jks",
  //     thoughts: "",
  //     imageAttachments: []
  //   },
  //   {
  //     id: "3",
  //     role: Roles.User,
  //     text: "Teststsksjcdnjasn djcnajdncjdnacjkn jcknajn ldj kcn djks ncjkndk cnkjsncjd njcnjn cjnjnacjkd nacndjsn jkcndjs knc ljksnc jknsdj cns kncjsncjnsjc nsjnc nsn lcjs ncjn jks",
  //     thoughts: "",
  //     imageAttachments: []
  //   },
  //   {
  //     id: "4",
  //     role: Roles.Assistant,
  //     text: "Teststs ksjcd njasnd ljcnajd ncjdna cjknjck najnd jkcn djksncjk ndkcnkjsn cjdnjcnj ncjn jnacjk dnacn djsnjkcn djskncjk sncjkn sdjc nsk ncj sncj nsjcns jnc nsn cj sn cjn jks",
  //     thoughts: "",
  //     imageAttachments: []
  //   },
  // {
  //     id: "1",
  //     role: Roles.User,
  //     text: "Teststsksjcdnjasn djcnajdncjdnacjkn jcknajn ldj kcn djks ncjkndk cnkjsncjd njcnjn cjnjnacjkd nacndjsn jkcndjs knc ljksnc jknsdj cns kncjsncjnsjc nsjnc nsn lcjs ncjn jks",
  //     thoughts: "",
  //     imageAttachments: []
  //   },
  //   {
  //     id: "2",
  //     role: Roles.Assistant,
  //     text: "Teststsksjcdnjasn djcnajdncjdnacjkn jcknajn ldj kcn djks ncjkndk cnkjsncjd njcnjn cjnjnacjkd nacndjsn jkcndjs knc ljksnc jknsdj cns kncjsncjnsjc nsjnc nsn lcjs ncjn jks",
  //     thoughts: "",
  //     imageAttachments: []
  //   },
  //   {
  //     id: "3",
  //     role: Roles.User,
  //     text: "Teststsksjcdnjasn djcnajdncjdnacjkn jcknajn ldj kcn djks ncjkndk cnkjsncjd njcnjn cjnjnacjkd nacndjsn jkcndjs knc ljksnc jknsdj cns kncjsncjnsjc nsjnc nsn lcjs ncjn jks",
  //     thoughts: "",
  //     imageAttachments: []
  //   },
  //   {
  //     id: "4",
  //     role: Roles.Assistant,
  //     text: "Teststs ksjcd njasnd ljcnajd ncjdna cjknjck najnd jkcn djksncjk ndkcnkjsn cjdnjcnj ncjn jnacjk dnacn djsnjkcn djskncjk sncjkn sdjc nsk ncj sncj nsjcns jnc nsn cj sn cjn jks",
  //     thoughts: "",
  //     imageAttachments: []
  //   },
  //   {
  //     id: "1",
  //     role: Roles.User,
  //     text: "Teststsksjcdnjasn djcnajdncjdnacjkn jcknajn ldj kcn djks ncjkndk cnkjsncjd njcnjn cjnjnacjkd nacndjsn jkcndjs knc ljksnc jknsdj cns kncjsncjnsjc nsjnc nsn lcjs ncjn jks",
  //     thoughts: "",
  //     imageAttachments: []
  //   },
  //   {
  //     id: "2",
  //     role: Roles.Assistant,
  //     text: "Teststsksjcdnjasn djcnajdncjdnacjkn jcknajn ldj kcn djks ncjkndk cnkjsncjd njcnjn cjnjnacjkd nacndjsn jkcndjs knc ljksnc jknsdj cns kncjsncjnsjc nsjnc nsn lcjs ncjn jks",
  //     thoughts: "",
  //     imageAttachments: []
  //   },
  //   {
  //     id: "3",
  //     role: Roles.User,
  //     text: "Teststsksjcdnjasn djcnajdncjdnacjkn jcknajn ldj kcn djks ncjkndk cnkjsncjd njcnjn cjnjnacjkd nacndjsn jkcndjs knc ljksnc jknsdj cns kncjsncjnsjc nsjnc nsn lcjs ncjn jks",
  //     thoughts: "",
  //     imageAttachments: []
  //   },
  //   {
  //     id: "4",
  //     role: Roles.Assistant,
  //     text: "Teststs ksjcd njasnd ljcnajd ncjdna cjknjck najnd jkcn djksncjk ndkcnkjsn cjdnjcnj ncjn jnacjk dnacn djsnjkcn djskncjk sncjkn sdjc nsk ncj sncj nsjcns jnc nsn cj sn cjn jks",
  //     thoughts: "",
  //     imageAttachments: []
  //   },
  // {
  //     id: "1",
  //     role: Roles.User,
  //     text: "Teststsksjcdnjasn djcnajdncjdnacjkn jcknajn ldj kcn djks ncjkndk cnkjsncjd njcnjn cjnjnacjkd nacndjsn jkcndjs knc ljksnc jknsdj cns kncjsncjnsjc nsjnc nsn lcjs ncjn jks",
  //     thoughts: "",
  //     imageAttachments: []
  //   },
  //   {
  //     id: "2",
  //     role: Roles.Assistant,
  //     text: "Teststsksjcdnjasn djcnajdncjdnacjkn jcknajn ldj kcn djks ncjkndk cnkjsncjd njcnjn cjnjnacjkd nacndjsn jkcndjs knc ljksnc jknsdj cns kncjsncjnsjc nsjnc nsn lcjs ncjn jks",
  //     thoughts: "",
  //     imageAttachments: []
  //   },
  //   {
  //     id: "3",
  //     role: Roles.User,
  //     text: "Teststsksjcdnjasn djcnajdncjdnacjkn jcknajn ldj kcn djks ncjkndk cnkjsncjd njcnjn cjnjnacjkd nacndjsn jkcndjs knc ljksnc jknsdj cns kncjsncjnsjc nsjnc nsn lcjs ncjn jks",
  //     thoughts: "",
  //     imageAttachments: []
  //   },
  //   {
  //     id: "4",
  //     role: Roles.Assistant,
  //     text: "Teststs ksjcd njasnd ljcnajd ncjdna cjknjck najnd jkcn djksncjk ndkcnkjsn cjdnjcnj ncjn jnacjk dnacn djsnjkcn djskncjk sncjkn sdjc nsk ncj sncj nsjcns jnc nsn cj sn cjn jks",
  //     thoughts: "",
  //     imageAttachments: []
  //   }
  // ]



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
          <ChatInput value={value} setValue={setValue} onKeyUp={handleKeyUp} isResponding={isResponding} />
        </div>
      </div>
    </div>
  );
}