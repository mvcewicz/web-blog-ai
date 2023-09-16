"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/src/components/ui/navigation-menu";

import { Auth } from "@/src/components/auth/auth-modal";
import { SignUpButton } from "@clerk/nextjs";
import { NavigationMenuTrigger } from "@radix-ui/react-navigation-menu";

const primaryLinks = [
  {
    href: "/",
    label: "WebBlog.AI",
  },
  {
    href: "/blogs",
    label: "Blogs",
  },
] as const;

export function Nav() {
  return (
    <NavigationMenu className="max-w-initial flex flex max-w-full flex-initial justify-between p-4">
      <NavigationMenuList>
        {primaryLinks.map((link) => (
          <NavigationMenuItem key={link.href}>
            <NavigationMenuLink
              href={link.href}
              className={navigationMenuTriggerStyle()}
            >
              {link.label}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Auth />
          </NavigationMenuTrigger>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
