import { GetMessageDto, Roles } from "@/lib/types/messageTypes";

export default function Message({message} : {message: GetMessageDto})
{
    return (
        <div className="flex-col max-w-[90%]">
            <div className={`p-3 text-white flex-col rounded-full h-auto text-wrap mt-5 ${message.role === Roles.User ? "bg-indigo-700" : ""}`}>
                <span className="whitespace-pre-wrap">
                    {message.text}
                </span>
            </div>

        </div>
    )
}
