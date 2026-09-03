"use client";

import { ChatInput } from "@/components/threadUi/chat-intput";
import { SetStateAction, use, useState } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [value, setValue] = useState<string>("");


  return (
    <div className="bg-black h-screen w-full flex flex-col">
      <div className="flex-1 overflow-y-auto">

      </div>

      {/* input area - sits at bottom of flex column */}
      <div className="w-full flex justify-center pb-4 pt-2">
        <div className="w-full m-auto max-w-3xl">
          <ChatInput value={value} setValue={setValue} />
        </div>
      </div>
    </div>
  );
}