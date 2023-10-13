"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import * as Dialog from "@radix-ui/react-dialog";
import { MoreVertical } from "lucide-react";
import NavBar from "./navbar";

export default function MobileNavbar() {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size={"icon"}>
            <MoreVertical />
          </Button>
        </SheetTrigger>
        <Dialog.Content className="fixed z-50 gap-4 bg-background shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 inset-y-0 left-0 h-full data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm m-1">
          <NavBar />
        </Dialog.Content>
      </Sheet>
    </div>
  );
}
