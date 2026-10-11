"use client";
import { createThread } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { GetThreadDto } from "@/lib/types/threadTypes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import { Field, FieldGroup } from "../ui/field";
import { Label } from "../ui/label";
import { Input } from "../ui/input";


export function CreateThreadDialog(
    {
        threads,
        setThreads,

    } : 
    {
        threads: GetThreadDto[] | null
        setThreads: (value: GetThreadDto[]) => void,
    }
)
{
    const router = useRouter();

    const auth = useAuth();

    const [name, setName] = useState("");

    const handleSubmit = async (e: React.SubmitEvent) => 
    {
        e.preventDefault();
        if (name === "") return;

        try
        {
            if (threads != null)
            {
                const result = await createThread({
                    name: name,
                    userId: auth.user?.id!
                });

                const newThread: GetThreadDto = {
                    id: result.id,
                    name: name
                };

                setThreads([newThread, ...threads!]);

                router.push(`/user/threads/${result.id}`);

            }
        }
        catch {

        }
    }

    return (
        <Dialog>
            <DialogTrigger render={<Button size="icon"
            className="bg-transparent cursor-pointer m-auto"
            >
                <Pencil className="size-4"></Pencil>
            </Button>}>

            </DialogTrigger>

            <DialogContent className="sm:max-w-sm bg-black text-white ">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create a new conversation</DialogTitle>
                    </DialogHeader>
                    <FieldGroup className=" ">
                        <Field>
                            <Label htmlFor="name-1">
                                Name
                            </Label>
                            <Input
                            id="name-1"
                            name="name"
                            defaultValue="Conversation name"
                            onChange={(e) => setName(e.target.value)}
                            />
                        </Field>
                    </FieldGroup>
                    <DialogFooter className="bg-black text-black border-t-0" >
                        <DialogClose
                        render={<Button variant="outline" className="bg-destructive hover:bg-destructive cursor-pointer">Cancel</Button>}
                        >
                        </DialogClose>
                        <DialogClose
                        render={<Button type="submit" variant="outline" className="cursor-pointer bg-amber-600 hover:bg-amber-800 ">Create</Button>}
                        >
                        </DialogClose>
                    </DialogFooter>

                </form>
            </DialogContent>

        </Dialog>
    );
}