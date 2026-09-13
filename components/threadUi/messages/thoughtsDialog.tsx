import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { GetMessageDto } from "@/lib/types/messageTypes";
import { Brain } from "lucide-react";




export default function ThoughtsDialog( {message} : {message:GetMessageDto}) {
  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger
          render={
            <DialogTrigger
              render={
                <Button size="icon" className="bg-transparent cursor-pointer m-auto">
                  <Brain className="size-4" />
                </Button>
              }
            />
          }
        />
        <TooltipContent side="bottom">
          <p>See thoughts</p>
        </TooltipContent>
      </Tooltip>

      <DialogContent className="text-white bg-black border-white border-2">
        <DialogHeader>
          <DialogTitle>Thought process</DialogTitle>
        </DialogHeader>
        <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
          
            <p  className="mb-4 leading-normal">
              {message.thoughts}
            </p>
         
        </div>
        <DialogFooter className="bg-black">
          <DialogClose render={<Button variant="outline" className="bg-black text-white cursor-pointer">Close</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}