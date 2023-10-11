import { ReactNode } from "react";
import NavBar from "./_components/navbar";
import Breadcrumbs from "./_components/breadcrumbs";

export default function DashBoardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen antialiased">
      <div className="h-full p-1 sm:p-2">
        <div className="flex flex-col">
          <div className="flex flex-grow h-[calc(100vh-8px)] sm:h-[calc(100vh-16px)] gap-2">
            <NavBar />
            <div className="flex flex-grow flex-col gap-2">
              <Breadcrumbs />
              <main className="flex flex-col h-full flex-grow border rounded-lg px-6 py-6 overflow-y-auto">
                {children}
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
