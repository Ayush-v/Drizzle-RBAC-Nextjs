import { ReactNode } from "react";
import NavBar from "./_components/navbar";
import Header from "./_components/header";

export default function DashBoardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen antialiased">
      <div className="h-full p-1 sm:p-2">
        <div className="flex flex-col">
          <div className="flex flex-grow h-[calc(100vh-8px)] sm:h-[calc(100vh-16px)] gap-2">
            <div className="hidden md:block">
              <NavBar />
            </div>
            <div className="flex flex-grow flex-col gap-2 overflow-x-hidden">
              <Header />
              <main className="flex flex-col h-full flex-grow border rounded-lg px-4 md:px-6 py-6 overflow-y-auto">
                {children}
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
