import Breadcrumbs from "./breadcrumbs";
// import { BellIcon } from "@radix-ui/react-icons";
import { ThemeToggle } from "@/components/theme-toggle";
import MobileNavbar from "./mobile-navbar";

export default function Header() {
  return (
    <div className="h-14 border flex items-center px-2 md:px-6 rounded-lg text-sm capitalize justify-between">
      <div className="flex gap-2">
        <div className="flex items-center md:hidden">
          <MobileNavbar />
          {/* <svg
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
          </svg> */}
        </div>
        <Breadcrumbs />
      </div>
      <div className="space-x-2">
        {/* <Button size={"icon"} variant={"ghost"}>
          <BellIcon />
        </Button> */}
        <ThemeToggle />
      </div>
    </div>
  );
}
