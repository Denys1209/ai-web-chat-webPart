import { Skeleton } from "@/components/ui/skeleton";



export default function MessageSkeleton({isUser}  : {isUser: boolean})
{
    return (
        <Skeleton className={`max-w-[90%] w-full p-3 text-white  rounded-full h-auto text-wrap mt-5 ${isUser ? 'bg-indigo-700' : 'bg-amber-700'}`}/>
    );
}