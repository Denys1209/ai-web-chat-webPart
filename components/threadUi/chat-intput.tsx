import { SetStateAction } from "react";
import { Button } from "../ui/button";
import { BaseUIEvent, Input, Separator } from "@base-ui/react";
import { Plus } from "lucide-react";


export function ChatInput({
    value,
    setValue,
    onKeyUp
}: {
    value: string,
    setValue: (v: SetStateAction<string>) => void,
    onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>,
}) {

    return (
        <div className="flex items-center gap-2 rounded-full bg-neutral-900 border px-4 py-2.5">
            <Button size="icon" className="bg-transparent cursor-pointer m-auto"><Plus className="size-4" /></Button>
            <Separator orientation="vertical" />
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Ask anything"
                className="flex-1 bg-transparent text-white placeholder:text-neutral-500 outline-none text-base border-none focus-visible:ring-0 "
                onKeyUp={onKeyUp}
            ></Input>
        </div>
    )

}
