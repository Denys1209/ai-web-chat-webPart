import { SetStateAction } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Input, Separator } from "@base-ui/react";



export default function ChatInput({
    value,
    setValue,
    onKeyUp,
    isResponding
}: {
    value: string,
    setValue: (v: SetStateAction<string>) => void,
    onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>,
    isResponding: boolean
}) {

    return (
        <div className="flex items-center gap-2 rounded-full  border px-4 py-2.5">
            <Tooltip>
                <TooltipTrigger
                render={
                   <Button size="icon" className="bg-transparent cursor-pointer m-auto"><Plus className="size-4" /></Button>}
                > 
                </TooltipTrigger>
                <TooltipContent>
                    <p>Add to library</p>
                </TooltipContent>
            </Tooltip>
            <Separator orientation="vertical" />
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Ask anything"
                className="flex-1 bg-transparent text-white placeholder:text-neutral-500 outline-none text-base border-none focus-visible:ring-0 "
                onKeyUp={onKeyUp}
                disabled={isResponding}
            ></Input>
            <Separator orientation="vertical" />
            {
                !isResponding ? <div></div> : <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            }
        </div>
    )

}
