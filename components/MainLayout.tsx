"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MobileMenu from "./MobileMenu";
import Header from "./Header";

import Footer from "./Footer";import { Stethoscope, Users, UserPlus, User, } from "lucide-react";

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
        { name: "Create Patient", view: "CreatePatient", href: "/create-patient", icon: UserPlus },
        { name: "All Patients", view: "AllPatients", href: "/patient-list", icon: User },
      ],
    },
    // {
    //   name: "Appointments",
    //   active: false,
    //   icon: Calendar,
    //   subItems: [
    //     { name: "Schedule Appointment", view: "ScheduleAppointment", href: "/schedule-appointment", icon: Calendar },
    //     { name: "View Appointments", view: "ViewAppointments", href: "/appointment-list", icon: FileText },
    //   ],
    // },
    // {
    //   name: "Billing",
    //   active: false,
    //   icon: DollarSign,
    //   subItems: [
    //     { name: "Generate Invoice", view: "GenerateInvoice", href: "/invoice/create", icon: FileText },
    //     { name: "View Bills", view: "ViewBills", href: "/invoice/list", icon: DollarSign },
    //   ],
    // },
    // {
    //   name: "Reports",
    //   active: false,
    //   icon: FileText,
    //   subItems: [
    //     { name: "Daily Consultations", view: "DailyConsultations", href: "/reports/daily-consultations", icon: Stethoscope },
    //     { name: "Patient Summary", view: "PatientSummary", href: "/reports/patient-summary", icon: Users },
    //   ],
    // },
    // {
    //   name: "Settings",
    //   active: false,
    //   icon: Settings,
    //   href: "/settings",
    //   view: "Settings",
    // },
  ];

interface MainLayoutProps {
  children: React.ReactNode;
  activeView: string;
}

export default function MainLayout({ children, activeView }: MainLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const handleNavClick = (itemName: string, subView?: string) => {
    if (subView) {
      window.location.href = subView === "CreatePatient" ? "/create-patient" : "/patient-list";
    } else if (navItems.find(item => item.name === itemName)?.subItems) {
      setExpandedMenu(expandedMenu === itemName ? null : itemName);
    } else {
      window.location.href = "/consultation";
      setExpandedMenu(null);
    }
    setMobileOpen(false);
  };

  const title = activeView === "CreatePatient" ? "Create Patient" :
                activeView === "AllPatients" ? "All Patients" :
                activeView;

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar
        navItems={navItems}
        activeView={activeView}
        expandedMenu={expandedMenu}
        onNavClick={handleNavClick}
        setExpandedMenu={setExpandedMenu}
      />
      <MobileMenu
        navItems={navItems}
        activeView={activeView}
        expandedMenu={expandedMenu}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        onNavClick={handleNavClick}
        setExpandedMenu={setExpandedMenu}
      />
      <div className="flex flex-1 flex-col sm:pl-64">
        <Header title={title} />
        <main className="flex-1 p-6">{children}</main>
        <Footer />
      </div>
    </div>
  );
}