"use client";
import { useSelectedLayoutSegments } from "next/navigation";

export default function Breadcrumbs() {
  const segments = useSelectedLayoutSegments();
  return (
    <div className="h-14 border flex items-center pl-6 rounded-lg text-sm capitalize">
      <ul className="flex items-center gap-2">
        <li>Home</li>
        {segments.map((segment, index) => (
          <li key={index}>{segment}</li>
        ))}
      </ul>
    </div>
  );
}
