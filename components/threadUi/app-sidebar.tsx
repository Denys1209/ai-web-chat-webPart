"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { useAuth } from "@/lib/auth-context";
import { Button } from "../ui/button";
import { PanelLeftIcon, Pencil, Search } from "lucide-react";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";
import { GetThreadDto } from "@/lib/types/threadTypes";
import { getThreads } from "@/lib/api";
import { Console } from "console";
import { Skeleton } from "../ui/skeleton";
import { CreateThreadDialog } from "./create-thread-button-form";
import { ThreadSidebarItem } from "./thread-item";

export function AppSidebar() {
  const auth = useAuth();
  const { toggleSidebar } = useSidebar()

  const [threads, setThreads] = useState<GetThreadDto[]|null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
     getThreads().then((data) => {
      setThreads(data);
      console.log(data);
     }).finally(() => {
        setIsLoading(false);
     });
  }, [])



  return (
    <Sidebar collapsible="icon" className="bg-black border-gray-600  border-r">
      <SidebarHeader className="bg-black">
        <div className="flex items-center justify-between w-full ">
          <span className="font-semibold text-white text-2xl group-data-[collapsible=icon]:hidden">AI Chat</span>
          <div className="items-center gap-1 group-data-[collapsible=icon]:flex-col flex">
            <Button size="icon" className="bg-transparent cursor-pointer m-auto" onClick={toggleSidebar}><PanelLeftIcon className="size-4" /></Button>
            <CreateThreadDialog threads={threads} setThreads={setThreads} />
            <Button size="icon" className="bg-transparent cursor-pointer m-auto"><Search className="size-4" /></Button>
          </div>
        </div>
        <Separator />
      </SidebarHeader>
      <SidebarContent className="bg-black">
        <SidebarGroup className="group-data-[collapsible=icon]:hidden" >
          <SidebarMenu>
          {isLoading ? Array.from({ length: 5 }).map((_, index) => (
              <SidebarMenuItem key={index}>
                 <Skeleton className="h-4 w-full m-auto mb-5 bg-gray-700"/>
              </SidebarMenuItem>
            )) : 
              threads!.map((thread, index) => (
                <ThreadSidebarItem key={index} thread={thread} />
              ))
            } 
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-black ">
        <div className="flex-col group-data-[collapsible=icon]:hidden">
          <Separator />
          <p className="text-2xl text-white">
            {auth.user?.displayedName}
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}