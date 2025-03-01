"use client";

import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, LogOut } from "lucide-react";
import Sidebar from "./Sidebar";

interface MobileMenuProps {
  navItems: any[];
  activeView: string;
  expandedMenu: string | null;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  onNavClick: (itemName: string, subView?: string) => void;
  setExpandedMenu: (value: string | null) => void;
}

export default function MobileMenu({
  navItems,
  activeView,
  expandedMenu,
  mobileOpen,
  setMobileOpen,
  onNavClick,
  setExpandedMenu,
}: MobileMenuProps) {
  return (
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="sm:hidden fixed top-4 left-4 z-50"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <Sidebar
          navItems={navItems}
          activeView={activeView}
          expandedMenu={expandedMenu}
          onNavClick={onNavClick}
          setExpandedMenu={setExpandedMenu}
        />
      </SheetContent>
    </Sheet>
  );
}