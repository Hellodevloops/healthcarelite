"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Menu, 
  LogOut, 
  ChevronRight, 
  Stethoscope, 
  Users, 
  UserPlus, 
  User,
  Code
} from "lucide-react";
import PatientForm from "@/components/PatientForm";
import PatientsList from "@/components/PatientsList";
import ConsultationForm from "@/components/ConsultationForm";
import DashboardFilters from "@/components/DashboardFilters";

const navItems = [
  { 
    name: "Consultation", 
    view: "Consultation", 
    href: "/consultation", 
    active: true, 
    icon: Stethoscope 
  },
  {
    name: "Patients",
    active: false,
    icon: Users,
    subItems: [
      { name: "Create Patient", view: "CreatePatient", icon: UserPlus },
      { name: "All Patients", view: "AllPatients", icon: User },
    ],
  },
];

export default function AdminDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeView, setActiveView] = useState("Dashboard");
  const [expandedMenu, setExpandedMenu] = useState(null);

  const handleNavClick = (itemName, subView = null) => {
    if (subView) {
      setActiveView(subView);
    } else if (navItems.find(item => item.name === itemName)?.subItems) {
      setExpandedMenu(expandedMenu === itemName ? null : itemName);
    } else {
      setActiveView(itemName);
      setExpandedMenu(null);
    }
    setMobileOpen(false);
  };

  const renderNavItem = (item) => (
    <div key={item.name} className="space-y-1">
      <button
        onClick={() => handleNavClick(item.name)}
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
                handleNavClick(item.name, subItem.view);
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
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex">
        <div className="flex h-16 items-center border-b px-6">
          <h2 className="text-lg font-semibold tracking-tight">Healthcare Lite</h2>
        </div>
        <ScrollArea className="flex-1 py-4">
          <nav className="flex flex-col gap-2 px-2">
            {navItems.map(renderNavItem)}
          </nav>
        </ScrollArea>
        <div className="p-4 border-t">
          <Button variant="ghost" className="w-full justify-start gap-3">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
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
          <div className="flex h-16 items-center border-b px-6">
            <h2 className="text-lg font-semibold tracking-tight">Healthcare Lite</h2>
          </div>
          <ScrollArea className="flex-1 py-4">
            <nav className="flex flex-col gap-2 px-2">
              {navItems.map(renderNavItem)}
            </nav>
          </ScrollArea>
          <div className="p-4 border-t">
            <Button variant="ghost" className="w-full justify-start gap-3">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-1 flex-col sm:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-6">
          <h1 className="text-xl font-semibold tracking-tight">
            {activeView === "CreatePatient" ? "Create Patient" : 
             activeView === "AllPatients" ? "All Patients" : 
             activeView}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
              Welcome, Admin
            </span>
            <Button variant="ghost" size="icon" className="sm:hidden">
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Logout</span>
            </Button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              {activeView === "Dashboard" && (
                <Card>
                  <CardHeader>
                    <CardTitle>New Patient Registration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PatientForm />
                  </CardContent>
                </Card>
              )}
              {activeView === "Consultation" && (
                <Card>
                  <CardHeader>
                    <CardTitle>New Consultation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ConsultationForm />
                  </CardContent>
                </Card>
              )}
              {activeView === "CreatePatient" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Create New Patient</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PatientForm />
                  </CardContent>
                </Card>
              )}
              {activeView === "AllPatients" && <PatientsList />}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t bg-background py-4 px-6 mt-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Code className="h-5 w-5 text-primary" />
              <span>
                Built by{" "}
                <a 
                  href="https://devloops.io" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline"
                >
                  Devloops Technologies
                </a>
              </span>
            </div>
            <div className="text-center">
              © {new Date().getFullYear()} Healthcare Lite. All rights reserved.
            </div>
            <div>
              <span className="font-medium">Version:</span> v1.0
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}