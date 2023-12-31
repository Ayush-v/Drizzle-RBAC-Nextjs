"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Search } from "lucide-react";
import Link from "next/link";
import { navlinks } from "@/lib/nav-links";
import { useNavbarState } from "@/hooks/store/useNavbarState";

export default function NavBar() {
  const { open, toggle } = useNavbarState();

  return (
    <nav className="border p-4 rounded-lg h-full">
      <div
        className={cn(
          open ? "w-[200px]" : "w-12",
          "mx-auto transition-[width] duration-700 @container"
        )}
      >
        <div
          className={cn(
            open ? "flex justify-between items-center" : "",
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
              className="w-12 @2xs:w-8 h-6 fill-secondary-foreground"
            >
              <path
                d="M23.2997 0L52.0461 28.6301V44H38.6311V34.1553L17.7522 13.3607L13.415 13.3607L13.415 44H0L0 0L23.2997 0ZM38.6311 15.2694V0L52.0461 0V15.2694L38.6311 15.2694Z"
                // fill="#212326"
              ></path>
            </svg>
            {open ? (
              <span className="font-semibold text-secondary-foreground">
                ote
              </span>
            ) : null}
          </div>
          <button
            onClick={toggle}
            className={cn(
              open ? "relative" : "absolute -right-6 top-0",
              "transition-transform duration-200"
            )}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="stroke-secondary-foreground"
            >
              <path
                d="M20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12C2.5 7.52166 2.5 5.28248 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088Z"
                // stroke="#141B34"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 21.5L9 2.5"
                // stroke="#141B34"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>
        {/* <TeamSwitcher navOpen={isOpen} /> */}
        <div className="mt-4 space-y-4">
          <Button
            variant="outline"
            className="relative h-10 w-full justify-start @2xs:px-3"
            onClick={toggle}
          >
            <Search
              className="h-4 w-4 @2xs:mr-2 shrink-0 @2xs:opacity-50"
              aria-hidden="true"
            />
            <span className="hidden @2xs:inline-flex opacity-50">
              Search...
            </span>
            <span className="sr-only">Search</span>
            <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 @2xs:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
          <div className="space-y-2">
            <span className="text-sm text-muted-foreground">Pages</span>
            <ul className="space-y-2">
              {navlinks.map((link) => (
                <li className="flex flex-col items-center" key={link.href}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={link.href} className="w-full">
                        <Button
                          variant={"outline"}
                          className="w-full justify-center flex-col @2xs:flex-row @2xs:justify-start @2xs:px-4 @2xs:py-2 px-1.5 py-3 transition-all"
                        >
                          {link.icon}
                          <span className="hidden @2xs:inline-block transition-all">
                            {link.title}
                          </span>
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="@2xs:hidden">
                      <p>{link.title}</p>
                    </TooltipContent>
                  </Tooltip>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
