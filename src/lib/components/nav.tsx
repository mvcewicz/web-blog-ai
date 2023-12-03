"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/src/lib/ui/navigation-menu";

import { NavigationMenuTrigger } from "@radix-ui/react-navigation-menu";
import { AuthButton } from "@/src/lib/features/auth/auth-modal";
import { Suspense } from "react";

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
            <Suspense>{/*<AuthButton />*/}</Suspense>
          </NavigationMenuTrigger>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
