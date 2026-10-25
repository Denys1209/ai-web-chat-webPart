"use client"
import { useAuth } from "@/lib/auth-context";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, useSidebar } from "../ui/sidebar";
import { useEffect, useState } from "react";
import { GetThreadDto } from "@/lib/types/threadTypes";
import { getThreads } from "@/lib/api";
import { Button } from "../ui/button";
import { PanelLeft, Search } from "lucide-react";
import { CreateThreadDialog } from "./create-thread-button-form";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import { ThreadSidebarItem } from "./thread-item";


export function AppSidebar()
{
    const auth = useAuth();

    const {toggleSidebar} = useSidebar();

    const [threads, setThreads] = useState<GetThreadDto[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getThreads().then((data) => {
            setThreads(data);
        }).finally(() => {
            setIsLoading(false);
        })
    }, []);


    return (
        <Sidebar collapsible="icon" className="bg-black border-gray-600 border-r">
            <SidebarHeader className="bg-black">
                <div className="flex items-center justify-between w-full">
                    <span 
                    className="font-semibold text-white text-2xl group-data-[collapsible=icon]:hidden"
                    >
                        AI Chat
                    </span>
                    <div className="items-center gap-1 group-data-[collapsible=icon]:flex-col flex ">
                        <Button size="icon"
                        className="bg-transparent cursor-pointer m-auto"
                        onClick={toggleSidebar}
                        >
                            <PanelLeft className="size-4"/>
                        </Button>
                        <CreateThreadDialog threads={threads} setThreads={setThreads}                        
                        />

                        <Button
                        size="icon"
                        className="bg-transparent cursor-pointer m-auto"
                        >
                            <Search
                                className="size-4"
                            />
                        </Button>

                    </div>
                </div>
                <Separator/>
            </SidebarHeader>
            <SidebarContent className="group-data-[collapsible=icon]:hidden bg-black group-data-[collapsible=icon]:bg-black">
                <SidebarMenu>
                    {
                        isLoading ? Array.from({ length: 5}).map((_, index) => (
                            <SidebarMenuItem key={index}>
                                <Skeleton className="h-4 w-full m-auto mb-5 bg-gray-700"/>
                            </SidebarMenuItem>
                        )) : threads!.map((thread, index) => 
                        (
                                <ThreadSidebarItem thread={thread} key={index}/>
                        ))
                    }
                </SidebarMenu>

            </SidebarContent>

            <SidebarFooter className="bg-black">
                <div className="flex-col group-data-[collapsible=icon]:hidden">
                    <Separator/>
                    <p className="text-2xl text-white">
                        {auth.user?.displayedName}
                    </p>
                </div>
            </SidebarFooter>

        </Sidebar>
    )
}