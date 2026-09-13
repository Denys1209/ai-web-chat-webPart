import MessageSkeleton from "../messages/messageSkeleton";


export default function ChatHistorySkeleton() {
    return (
        <div className="flex flex-col gap-2 overflow-y-scroll h-full">
            {Array.from({ length: 10 }).map((_, index) => (
                <div
                    key={index}
                    className={`flex w-full ${index % 2 === 1 ? 'justify-end' : 'justify-start'}`}
                >
                    <MessageSkeleton isUser={index % 2 === 1} />
                </div>
            ))}
        </div>
    );
}