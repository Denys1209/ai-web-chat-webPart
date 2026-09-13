import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { GetMessageDto, Roles } from "@/lib/types/messageTypes";
import { Brain, Copy } from "lucide-react";
import ThoguhtsDialog from "./thoughtsDialog";




export default function Message({
    message
}: {
    message: GetMessageDto
}) {
    return (
        <div className="flex-col max-w-[90%]">
            <div className={` p-3 text-white flex-col  rounded-full h-auto text-wrap mt-5 ${message.role === Roles.User ? 'bg-indigo-700' : ''}`}>
                <span className="">{message.text}</span>

            </div>
            <div className="flex-row items-start mt-3">
                <Tooltip>
                    <TooltipTrigger render={<Button size="icon" className="bg-transparent cursor-pointer m-auto" onClick={() => {
                        navigator.clipboard.writeText(message.text);
                    }}><Copy className="size-4" /></Button>} ></TooltipTrigger>
                    <TooltipContent side="bottom">
                        <p>Copy</p>
                    </TooltipContent>
                </Tooltip>
                {
                    message.role !== Roles.User ?
                <ThoguhtsDialog message={message}/> : <></>
}
            </div>
        </div>
    );
}