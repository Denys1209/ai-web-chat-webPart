import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { getImageUrl } from "@/lib/api";
import { GetMessageDto, Roles } from "@/lib/types/messageTypes";
import { Copy } from "lucide-react";
import Image from "next/image";
import ThoughtsDialog from "./thoughts-dialog";

export default function Message({message} : {message: GetMessageDto})
{
    return (
        <div className="flex-col max-w-[90%]">
            <div className={`p-3 text-white flex-col rounded-full h-auto text-wrap mt-5 ${message.role === Roles.User ? "bg-indigo-700" : ""}`}>
                <span className="whitespace-pre-wrap">
                    {message.text}
                </span>

                <div className="flex">
                    {
                        message.imageAttachments.map((e, index) => <Image className="rounded-full object-cover h-12.5 w-12.5"
                        src={getImageUrl(e.url)}
                        alt={`image - ${index}`}
                        key={index}
                        width={50}
                        height={50}
                        loading="eager"
                        unoptimized
                        />)
                    }
                </div>
                
            </div>
            <div className="flex-row items-start mt-3">
                    <Tooltip>
                        <TooltipTrigger
                        render={<Button size="icon"
                        className="bg-transparent cursor-pointer m-auto"

                        onClick={() =>  
                            {
                                navigator.clipboard.writeText(message.text);
                            }}
                        ><Copy className="size-4" /> </Button>}
                        > 

                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Copy</p>
                        </TooltipContent>
                    </Tooltip>
                    {
                        message.role !== Roles.User ? <ThoughtsDialog message={message}></ThoughtsDialog> : <></>
                    }

                </div>
        </div>
    )
}
