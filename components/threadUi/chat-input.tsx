import { SetStateAction } from "react";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";


export default function ChatInput(
    {
        value,
        setValue,
        onKeyUp,
        isResponding
    }
    :
    {
        value:string,
        setValue: (v: SetStateAction<string>) => void,
        onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>,
        isResponding: boolean
    }
)
{

    return (
        <div className="flex-col items-center gap-2 rounded-full border px-4 py-2.5">
            <div className="flex">

            </div>
            <Separator/>
            <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Ask anything" className="flex-1 bg-transparent text-white placeholder:text-neutral-500 outline-none text-base border-none focus-visible:ring-0"
            onKeyUp={onKeyUp}
            disabled={isResponding}
            >
            </Input>

        </div>
    );

}