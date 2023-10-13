import { HomeIcon, Users2Icon } from "lucide-react";

export const navlinks = [
  {
    title: "Home",
    icon: (
      <HomeIcon className="@2xs:mr-2 h-4 w-4 flex-shrink-0 transition-all" />
    ),
    href: "/",
  },
  {
    title: "Users",
    icon: (
      <Users2Icon className="@2xs:mr-2 h-4 w-4 flex-shrink-0 transition-all" />
    ),
    href: "/users",
  },
];
