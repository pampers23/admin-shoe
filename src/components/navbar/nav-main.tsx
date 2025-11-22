"use client";

import { type LucideIcon } from "lucide-react";

// import { buttonVariants } from "@/components/ui/button";
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { NavLink } from "react-router";


export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-2 w-full px-4 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'text-black hover:bg-blue-500 hover:text-white'
                  }`
                }
                to={item.url}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
            </NavLink>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
