"use client";

import { GetThreadDto } from "@/lib/types/threadTypes";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export function ThreadSidebarItem({
    thread
}:
    {
        thread: GetThreadDto
    }) {

    const router = useRouter();

    return (
        <Button className="bg-transparent cursor-pointer m-auto w-full text-left justify-start" onClick={() => router.push(`/user/threads/${thread.id}`)} >
            <div className="min-w-0 flex-1">
                <p className="text-md truncate">
                    {thread.name}
                </p>
            </div>
        </Button>
    );
}