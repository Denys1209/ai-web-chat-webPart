"use client";

import ChatInput from "@/components/threadUi/chat-intput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { SetStateAction, useState } from "react";

export default function page() {

    const [value, setValue] = useState("");

    return (
        <div className="bg-black h-screen flex flex-column items-center justify-center gap-6 ">
            <div className="flex-col max-w-3xl w-full ">
                <div className="text-center">
                    <h1 className="text-white text-3xl font-medium">Ready when you are.</h1>
                </div>
                <div className="w-full max-w-3xl px-4 mt-6">
                <ChatInput value={value} setValue={setValue} isResponding={false} />
                </div>
            </div>
        </div>
    );
}