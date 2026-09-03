import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createThread } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import { Console } from "console"
import { Pencil } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function CreateThreadDialog() {
  const router = useRouter();

  const auth = useAuth();

  const [name, setName] = useState("");

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();



    try {
      const result = await createThread({
        name: name,
        userId: auth.user?.id!
      });
      router.push(`/user/threads/${result.id}`);
    } catch {

    }
  }


  return (
    <Dialog>
      <DialogTrigger render={<Button size="icon" className="bg-transparent cursor-pointer m-auto" ><Pencil className="size-4" /></Button>} />
      <DialogContent className="sm:max-w-sm">

        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create a new conversation</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Conversation name" onChange={(e) => setName(e.target.value)} />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit" className="cursor-pointer" >Create</Button>
          </DialogFooter>

        </form>
      </DialogContent>
    </Dialog>
  )
}
