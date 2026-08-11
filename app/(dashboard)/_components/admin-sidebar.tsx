"use client";

import {
  LayoutDashboard,
  Package,
  Users,
  ClipboardList,
  Tags,
  Settings,
  UserCircle,
} from "lucide-react";

import { SidebarNav, DashboardNavItem } from "./sidebar-nav";

const navItems: DashboardNavItem[] = [
  {
    label: "Overview",
    href: "/admin-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Gear",
    href: "/admin-dashboard/gear",
    icon: Package,
  },
  {
    label: "Categories",
    href: "/admin-dashboard/categories",
    icon: Tags,
  },
  {
    label: "Orders",
    href: "/admin-dashboard/orders",
    icon: ClipboardList,
  },
  {
    label: "Users",
    href: "/admin-dashboard/users",
    icon: Users,
  },
  { label: "My Profile", href: "/admin-dashboard/profile", icon: UserCircle },
  { label: "Settings", href: "/admin-dashboard/settings", icon: Settings },
];

export function AdminSidebar() {
  return <SidebarNav items={navItems} roleLabel="Admin" />;
}
