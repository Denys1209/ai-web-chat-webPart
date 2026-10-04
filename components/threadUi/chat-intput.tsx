import { SetStateAction, useRef } from "react";
import { Button } from "../ui/button";
import { Brain, Check, Paperclip, Plus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Input, Separator } from "@base-ui/react";
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "../ui/popover";
import { CreateImageAttachmentDto, fileToImageAttachmentDto, GetImageAttachmentDto } from "@/lib/types/imageAttachmentTypes";
import Image from "next/image";

export default function ChatInput({
    value,
    setValue,
    onKeyUp,
    isResponding,
    setImagesAttached,
    setStream,
    isStream,
    imagesAttached
}: {
    value: string,
    setValue: (v: SetStateAction<string>) => void,
    onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>,
    isResponding: boolean,
    isStream: boolean,
    setImagesAttached: (files: CreateImageAttachmentDto[]) => void,
    setStream: (state: boolean) => void,
    imagesAttached: CreateImageAttachmentDto[]

}) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };



    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const dto = await fileToImageAttachmentDto(file);
            setImagesAttached([...imagesAttached, dto]);
            e.target.value = "";
        }
    };

    return (
        <div className="flex-col items-center gap-2 rounded-full border px-4 py-2.5">
            <div className="flex">
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
                            <p>More options</p>
                        </TooltipContent>
                        <PopoverContent className={"bg-black text-white border border-white flex-col w-28"}>

                            <Button
                                className="cursor-pointer rounded-full bg-black"
                                onClick={() => setStream(!isStream)}
                            >
                                <div className="flex-row flex p-2 justify-around ">
                                    <Brain size="icon" />
                                    <span className="ml-1 mr-1">
                                        Stream
                                    </span>
                                    {
                                        isStream ? <Check size="icon" className="m-auto"></Check> : <></>

                                    }
                                </div>
                            </Button>
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
                <Separator orientation="vertical" className="text-white border ml-1 mr-1" />
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
            <div className="mt-2 flex">
                {imagesAttached.map((e, index) => (
        <div key={index} className="relative ml-2 h-12.5 w-12.5">
          <Image
            className="rounded-full object-cover"
            src={`data:${e.mimeType};base64,${e.data}`}
            alt={`image-${index}`}
            width={50}
            height={50}
            loading="eager"
            unoptimized
          />

          <Button
            type="button"
            onClick={() => {
                const newImages: CreateImageAttachmentDto[] = imagesAttached.filter((_, imageAttachIndex) => imageAttachIndex !== index) 
                setImagesAttached(newImages);
            }}
            aria-label={`Remove image ${index + 1}`}
            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full  text-xs leading-none text-white shadow cursor-pointer "
          >
            ×
          </Button>
        </div>
      ))}

            </div>
        </div>
    )
}