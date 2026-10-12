import { GetMessageDto, Roles } from "@/lib/types/messageTypes";
import Message from "../messages/message";

export default function ChatHistory({history} : {history: GetMessageDto[]})
{
    return (
        <div className="flex flex-col gap-2 overflow-y-scroll h-full">
            {
                history.map((e, index) => (
                    <div 
                    key={index}
                    className={`flex ${e.role === Roles.User ? 'justify-end' : 'justify-start'}`}
                    >
                        <Message
                        message={e}
                        />
                    </div>
                ))
            }
        </div>
    );
}