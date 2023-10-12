import Breadcrumbs from "./breadcrumbs";
// import { BellIcon } from "@radix-ui/react-icons";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Header() {
  return (
    <div className="h-14 border flex items-center px-6 rounded-lg text-sm capitalize justify-between">
      <Breadcrumbs />
      <div className="space-x-2">
        {/* <Button size={"icon"} variant={"ghost"}>
          <BellIcon />
        </Button> */}
        <ThemeToggle />
      </div>
    </div>
  );
}
