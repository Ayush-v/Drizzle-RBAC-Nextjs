"use client";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

export default function Breadcrumbs() {
  const segments = useSelectedLayoutSegments();
  return (
    <ol role="list" className="flex items-center space-x-2">
      <li>
        <div>
          <Link href={`/`} className="text-gray-400 hover:text-gray-500">
            <HomeIcon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
            <span className="sr-only">Home</span>
          </Link>
        </div>
      </li>
      {segments.map((segment, index) => (
        <li key={index}>
          <div className="flex items-center">
            <svg
              className="h-5 w-5 flex-shrink-0 text-gray-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
            </svg>
            <Link
              href={`/${segments.slice(0, index + 1).join("/")}`}
              className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700"
              aria-current={index ? "page" : undefined}
            >
              {segment}
            </Link>
          </div>
        </li>
      ))}
    </ol>
  );
}
