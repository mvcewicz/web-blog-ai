"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/src/components/ui/navigation-menu";

const primaryLinks = [
  {
    href: "/",
    label: "WebBlog.AI",
  },
  {
    href: "/blogs",
    label: "Blogs",
  },
  {
    href: "/about",
    label: "About",
  },
] as const;

export function Nav() {
  return (
    <NavigationMenu className="m-4 flex-initial">
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
    </NavigationMenu>
  );
}
