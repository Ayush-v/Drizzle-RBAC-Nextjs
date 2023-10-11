"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import TeamSwitcher from "./teamSwitcher";
import { Button } from "@/components/ui/button";
import { HomeIcon, NotionLogoIcon } from "@radix-ui/react-icons";
import { CommandSeparator } from "@/components/ui/command";
import { Separator } from "@/components/ui/separator";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <nav className="border p-4 rounded-lg hidden sm:block">
      <div
        className={cn(
          isOpen ? "w-[200px]" : "w-12",
          "mx-auto transition-[width] duration-700 @container space-y-2"
        )}
      >
        <div
          className={cn(
            isOpen ? "flex justify-between items-center" : "",
            "relative"
          )}
        >
          <div className="relative flex items-baseline">
            <svg
              // width="52"
              // height="44"
              viewBox="0 0 53 44"
              // viewBox="0 0 24 16"
              fill="none"
              className="w-8 h-6"
            >
              <path
                d="M23.2997 0L52.0461 28.6301V44H38.6311V34.1553L17.7522 13.3607L13.415 13.3607L13.415 44H0L0 0L23.2997 0ZM38.6311 15.2694V0L52.0461 0V15.2694L38.6311 15.2694Z"
                fill="#212326"
              ></path>
            </svg>
            {isOpen ? <span className="font-semibold">ote</span> : null}
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              isOpen ? "relative" : "absolute -right-6 top-0",
              "transition-transform duration-200"
            )}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="bg-white"
            >
              <path
                d="M20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12C2.5 7.52166 2.5 5.28248 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088Z"
                stroke="#141B34"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M9 21.5L9 2.5" stroke="#141B34" strokeWidth="2" />
            </svg>
          </button>
        </div>
        <TeamSwitcher navOpen={isOpen} />
        <div className="space-y-2">
          <span className="text-sm text-muted-foreground">Pages</span>
          <ul className="space-y-2">
            <li className="flex flex-col items-center">
              <Button
                className={cn(
                  isOpen
                    ? "w-full justify-start"
                    : "flex-col w-full justify-center items-center"
                )}
              >
                <HomeIcon className="h-4 w-4 shrink-0" />
                {isOpen ? <span className="ml-2">Home</span> : null}
              </Button>
              {!isOpen ? <span>Home</span> : null}
            </li>
            <li className="flex flex-col items-center">
              <Button
                variant={"outline"}
                className={cn(
                  isOpen
                    ? "w-full justify-start"
                    : "flex-col w-full justify-center items-center"
                )}
              >
                <HomeIcon className="h-4 w-4 shrink-0" />
                {isOpen ? <span className="ml-2">Todos</span> : null}
              </Button>
              {!isOpen ? <span>Todos</span> : null}
            </li>
            <li className="flex flex-col items-center">
              <Button
                variant={"outline"}
                className={cn(
                  isOpen
                    ? "w-full justify-start"
                    : "flex-col w-full justify-center items-center"
                )}
              >
                <NotionLogoIcon className="h-4 w-4 shrink-0" />
                {isOpen ? <span className="ml-2">Notes</span> : null}
              </Button>
              {!isOpen ? <span>Notes</span> : null}
            </li>
            <li className="flex flex-col items-center">
              <Button
                variant={"outline"}
                className={cn(
                  isOpen
                    ? "w-full justify-start"
                    : "flex-col w-full justify-center items-center"
                )}
              >
                <HomeIcon className="h-4 w-4 shrink-0" />
                {isOpen ? <span className="ml-2">Home</span> : null}
              </Button>
              {!isOpen ? <span>Home</span> : null}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
