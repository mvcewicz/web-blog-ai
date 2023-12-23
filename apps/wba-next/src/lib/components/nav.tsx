"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@wba/next/src/lib/ui/navigation-menu";

import { NavigationMenuTrigger } from "@radix-ui/react-navigation-menu";
import { AuthButton } from "@wba/next/src/lib/features/auth/auth-modal";
import { twMerge } from "tailwind-merge";

type PrimaryLink = {
  href: string;
  label: string;
  isHighlighted?: boolean;
};

const primaryLinks: PrimaryLink[] = [
  {
    href: "/",
    label: "WebBlog.AI",
    isHighlighted: true,
  },
  {
    href: "/blogs",
    label: "Blogs",
  },
] as const;

export function Nav() {
  return (
    <NavigationMenu className="max-w-initial flex max-w-full flex-initial justify-between p-4">
      <NavigationMenuList>
        {primaryLinks.map((link) => (
          <NavigationMenuItem key={link.href}>
            <NavigationMenuLink
              href={link.href}
              className={twMerge(
                navigationMenuTriggerStyle(),
                link.isHighlighted && "border",
              )}
            >
              {link.label}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <AuthButton />
          </NavigationMenuTrigger>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
