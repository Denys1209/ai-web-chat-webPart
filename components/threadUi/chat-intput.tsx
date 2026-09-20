import { SetStateAction, useRef } from "react";
import { Button } from "../ui/button";
import { Paperclip, Plus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Input, Separator } from "@base-ui/react";
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "../ui/popover";
import { CreateImageAttachmentDto, fileToImageAttachmentDto } from "@/lib/types/imageAttachmentTypes";

export default function ChatInput({
    value,
    setValue,
    onKeyUp,
    isResponding,
    onFileSelect
}: {
    value: string,
    setValue: (v: SetStateAction<string>) => void,
    onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>,
    isResponding: boolean,
    onFileSelect?: (files: CreateImageAttachmentDto) => void
}) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };



    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const dto = await fileToImageAttachmentDto(file);
            onFileSelect?.(dto);
            e.target.value = "";
        }
    };

    return (
        <div className="flex items-center gap-2 rounded-full border px-4 py-2.5">
            {/* Hidden native file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                multiple
            />

            <Popover>
                <Tooltip>
                    <PopoverTrigger render={
                        <TooltipTrigger
                            render={
                                <Button size="icon" className="bg-transparent cursor-pointer m-auto"><Plus className="size-4" /></Button>}
                        >
                        </TooltipTrigger>
                    }>
                    </PopoverTrigger>
                    <TooltipContent>
                        <p>Add to library</p>
                    </TooltipContent>
                    <PopoverContent className={"bg-black text-white border-1 border-white flex-col w-28"}>
                        <Button
                            className="cursor-pointer rounded-full bg-black"
                            onClick={handleUploadClick}
                        >
                            <div className="flex-row flex p-2 justify-around">
                                <Paperclip size="icon" />
                                <span className="ml-1">
                                    Upload file
                                </span>
                            </div>
                        </Button>
                    </PopoverContent>
                </Tooltip>
            </Popover>
            <Separator orientation="vertical" className="text-white" />
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Ask anything"
                className="flex-1 bg-transparent text-white placeholder:text-neutral-500 outline-none text-base border-none focus-visible:ring-0"
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