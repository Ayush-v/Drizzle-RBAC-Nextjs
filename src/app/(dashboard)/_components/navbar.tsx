"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <nav className="flex border p-4 rounded-lg">
      <div
        className={cn(
          isOpen ? "w-[250px]" : "w-[50px]",
          "mx-auto transition-[width] duration-700"
        )}
      >
        <div className="flex justify-between relative">
          <div className="relative flex items-end">
            <svg
              id="logo-72"
              width="52"
              height="44"
              viewBox="0 0 53 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="scale-50"
            >
              <path
                d="M23.2997 0L52.0461 28.6301V44H38.6311V34.1553L17.7522 13.3607L13.415 13.3607L13.415 44H0L0 0L23.2997 0ZM38.6311 15.2694V0L52.0461 0V15.2694L38.6311 15.2694Z"
                fill="#212326"
              ></path>
            </svg>
            {isOpen ? (
              <span className="-translate-x-2.5 -translate-y-1.5 font-semibold transition-transform duration-200">
                ote
              </span>
            ) : null}
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              isOpen ? "relative" : "absolute -right-6 top-3",
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
      </div>
    </nav>
  );
}
