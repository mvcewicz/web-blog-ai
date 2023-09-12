"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/src/components/ui/navigation-menu";

import { SignIn, SignInButton, SignUp } from "@clerk/nextjs";
import { Auth, AuthModal } from "@/src/components/auth/auth-modal";

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

function UserNav() {
  return <SignInButton />;
}

export function Nav() {
  return (
    <NavigationMenu className="max-w-initial m-4 flex flex max-w-full flex-initial justify-between">
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
        <Auth />
      </NavigationMenuList>
    </NavigationMenu>
  );
}