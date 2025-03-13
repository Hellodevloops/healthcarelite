"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChevronRight, LogOut, User, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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
  isCollapsed?: boolean;
  toggleCollapse?: () => void;
}

export default function Sidebar({
  navItems,
  activeView,
  expandedMenu,
  onNavClick,
  setExpandedMenu,
  isCollapsed = false,
  toggleCollapse,
}: SidebarProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const renderNavItem = (item: NavItem) => (
    <div key={item.name} className="relative space-y-1">
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              whileHover={{ scale: isCollapsed ? 1.1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                onNavClick(item.name);
                if (item.subItems) {
                  setExpandedMenu(expandedMenu === item.name ? null : item.name);
                }
              }}
              className={cn(
                "flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium w-full transition-all duration-200 ease-in-out",
                activeView === item.name || (item.subItems && item.subItems.some(sub => sub.view === activeView))
                  ? "bg-gradient-to-r from-primary/10 to-transparent text-primary shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                isCollapsed && "justify-center px-2"
              )}
              aria-expanded={expandedMenu === item.name}
              aria-controls={`submenu-${item.name}`}
            >
              <div className={cn("flex items-center gap-3", isCollapsed && "gap-0")}>
                <item.icon className="h-5 w-5 transition-colors flex-shrink-0" />
                {!isCollapsed && (
                  <span className="truncate flex-1 text-left">{item.name}</span>
                )}
              </div>
              {!isCollapsed && item.subItems && (
                <ChevronRight
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    expandedMenu === item.name && "rotate-90"
                  )}
                />
              )}
            </motion.button>
          </TooltipTrigger>
          {isCollapsed && (
            <TooltipContent side="right" className="ml-2">
              {item.name}
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>

      <AnimatePresence>
        {!isCollapsed && item.subItems && expandedMenu === item.name && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="ml-6 space-y-1 border-l-2 border-primary/20 pl-4"
            id={`submenu-${item.name}`}
          >
            {item.subItems.map((subItem) => (
              <TooltipProvider key={subItem.name} delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavClick(item.name, subItem.view);
                      }}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium w-full transition-all duration-200",
                        activeView === subItem.view
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-accent/20 hover:text-accent-foreground"
                      )}
                    >
                      <subItem.icon className="h-4 w-4 transition-colors flex-shrink-0" />
                      <span className="truncate">{subItem.name}</span>
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="ml-2">
                    {subItem.name}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const profileMenuItems = [
    { name: "Profile", action: () => console.log("Profile clicked") },
    { name: "Settings", action: () => console.log("Settings clicked") },
    { name: "Help", action: () => console.log("Help clicked") },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 64 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex-col border-r bg-background shadow-lg hidden sm:flex overflow-hidden",
        isCollapsed && "items-center"
      )}
    >
      <div className="flex h-16 items-center border-b px-4 bg-gradient-to-r from-primary/5 to-transparent shrink-0">
        {!isCollapsed && (
          <h2 className="text-lg font-semibold tracking-tight text-foreground flex items-center gap-2 truncate">
            <span className="h-2 w-2 bg-primary rounded-full animate-pulse" />
            Healthcare Lite
          </h2>
        )}
        {toggleCollapse && (
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto"
            onClick={toggleCollapse}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronRight className={cn("h-4 w-4 transition-transform", isCollapsed && "rotate-180")} />
          </Button>
        )}
      </div>

      <ScrollArea className="flex-1 py-4">
        <nav className={cn("flex flex-col gap-2 px-2", isCollapsed && "px-1")}>
          {navItems.map(renderNavItem)}
        </nav>
      </ScrollArea>

      <div className="p-3 border-t bg-gradient-to-t from-muted/10 to-transparent shrink-0">
        <div className={cn("flex items-center gap-2", isCollapsed && "flex-col gap-3")}>
          {/* Profile Avatar with Dropdown */}
          <Popover open={isProfileOpen} onOpenChange={setIsProfileOpen}>
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size={isCollapsed ? "icon" : "default"}
                    className={cn(
                      "flex items-center gap-2",
                      isCollapsed && "p-0 w-10 h-10 justify-center"
                    )}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatar.jpg" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    {!isCollapsed && <span className="text-sm font-medium">John Doe</span>}
                  </Button>
                </PopoverTrigger>
                {isCollapsed && <TooltipContent side="right">Profile</TooltipContent>}
              </Tooltip>
            </TooltipProvider>
            <PopoverContent className="w-48 p-1" align="end" side="top">
              <div className="flex flex-col gap-1">
                {profileMenuItems.map((item) => (
                  <Button
                    key={item.name}
                    variant="ghost"
                    className="justify-start w-full text-left"
                    onClick={() => {
                      item.action();
                      setIsProfileOpen(false);
                    }}
                  >
                    {item.name}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Dark Mode Toggle */}
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="hover:bg-primary/5"
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              <TooltipContent side="right">
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Logout Button */}
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/5"
                onClick={() => console.log("Logout clicked")}
                aria-label="Logout"
              >
                <LogOut className="h-5 w-5" />
              </Button>
              <TooltipContent side="right">Logout</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </motion.aside>
  );
}