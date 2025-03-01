"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChevronRight, LogOut } from "lucide-react";

interface NavItem {
  name: string;
  view: string;
  href?: string;
  active?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  subItems?: { name: string; view: string; icon: React.ComponentType<{ className?: string }> }[];
}

interface SidebarProps {
  navItems: NavItem[];
  activeView: string;
  expandedMenu: string | null;
  onNavClick: (itemName: string, subView?: string) => void;
  setExpandedMenu: (value: string | null) => void;
}

export default function Sidebar({ navItems, activeView, expandedMenu, onNavClick, setExpandedMenu }: SidebarProps) {
  const renderNavItem = (item: NavItem) => (
    <div key={item.name} className="space-y-1">
      <button
        onClick={() => onNavClick(item.name)}
        className={cn(
          "flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-left w-full transition-colors",
          activeView === item.name || (item.subItems && item.subItems.some(sub => sub.view === activeView))
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        )}
      >
        <div className="flex items-center gap-3">
          <item.icon className="h-4 w-4" />
          <span>{item.name}</span>
        </div>
        {item.subItems && (
          <ChevronRight
            className={cn(
              "h-4 w-4 transition-transform",
              expandedMenu === item.name && "rotate-90"
            )}
          />
        )}
      </button>
      {item.subItems && expandedMenu === item.name && (
        <div className="ml-6 space-y-1 border-l pl-3">
          {item.subItems.map((subItem) => (
            <button
              key={subItem.name}
              onClick={(e) => {
                e.stopPropagation();
                onNavClick(item.name, subItem.view);
              }}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-left w-full transition-colors",
                activeView === subItem.view
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
              )}
            >
              <subItem.icon className="h-4 w-4" />
              <span>{subItem.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex">
      <div className="flex h-16 items-center border-b px-6">
        <h2 className="text-lg font-semibold tracking-tight">Healthcare Lite</h2>
      </div>
      <ScrollArea className="flex-1 py-4">
        <nav className="flex flex-col gap-2 px-2">{navItems.map(renderNavItem)}</nav>
      </ScrollArea>
      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start gap-3">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}