"use client";

import { ShoppingBag, LayoutDashboardIcon, Package} from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/navbar/nav-main";
import Logo from "./logo";
import { LogoutButton } from "./logout";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Products",
      url: "/products",
      icon: Package,
    },
    {
      title: "Categories",
      url: "/categories",
      icon: ShoppingBag,
    },
    {
      title: "Orders",
      url: "/orders",
      icon: Package,
    }
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="h-19 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 
                top-0 z-40 flex items-center">
              <Logo className="!h-24 mx-auto" />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="mb-2">
        <LogoutButton />
      </SidebarFooter>
    </Sidebar>
  );
}
