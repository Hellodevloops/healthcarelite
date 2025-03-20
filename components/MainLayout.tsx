"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MobileMenu from "./MobileMenu";
import Header from "./Header";
import Footer from "./Footer";
import { 
  Stethoscope, 
  Users, 
  UserPlus, 
  User, 
  Calendar, 
  FileText, 
  DollarSign, 
  Settings, 
  PieChart, 
  Pill, 
  Clipboard, 
  Activity, 
  UserCheck, 
  FlaskConical ,  
  PlusSquare, 
  ClipboardList,
  MessageSquare
} from "lucide-react";

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
        { name: "Patient History", view: "PatientHistory", href: "/patient-history", icon: Clipboard },
      ],
    },
    {
      name: "Appointments",
      active: false,
      icon: Calendar,
      subItems: [
        { name: "Schedule Appointment", view: "ScheduleAppointment", href: "/schedule-appointment", icon: Calendar },
        { name: "View Appointments", view: "ViewAppointments", href: "/appointment-list", icon: FileText },
        { name: "Waiting List", view: "WaitingList", href: "/waiting-list", icon: ClipboardList },
      ],
    },
    {
      name: "Medical Records",
      active: false,
      icon: Clipboard,
      subItems: [
        { name: "Patient Records", view: "PatientRecords", href: "/medical-records", icon: User },
        { name: "Add Record", view: "AddRecord", href: "/medical-records/add", icon: PlusSquare },
        { name: "Prescriptions", view: "Prescriptions", href: "/prescriptions", icon: Pill },
      ],
    },
      {
        name: "Diagnostics",
        active: false,
        icon: Activity,
        subItems: [
          { name: "Order Tests", view: "OrderTests", href: "/diagnostics/order", icon: FlaskConical  },
          { name: "Test Results", view: "TestResults", href: "/diagnostics/results", icon: FileText },
        ],
      },
    {
      name: "Billing",
      active: false,
      icon: DollarSign,
      subItems: [
        { name: "Generate Invoice", view: "GenerateInvoice", href: "/invoice/create", icon: FileText },
        { name: "View Bills", view: "ViewBills", href: "/invoice/list", icon: DollarSign },
        { name: "Insurance Claims", view: "InsuranceClaims", href: "/insurance-claims", icon: UserCheck },
      ],
    },
    {
      name: "Inventory",
      active: false,
      icon: Pill,
      subItems: [
        { name: "Medications", view: "Medications", href: "/inventory/medications", icon: Pill },
        { name: "Supplies", view: "Supplies", href: "/inventory/supplies", icon: PlusSquare },
        { name: "Equipment", view: "Equipment", href: "/inventory/equipment", icon: Stethoscope },
      ],
    },
    {
      name: "Communication",
      active: false,
      icon: MessageSquare,
      subItems: [
        { name: "Patient Messages", view: "PatientMessages", href: "/messages/patients", icon: User },
        { name: "Staff Notifications", view: "StaffNotifications", href: "/messages/staff", icon: Users },
      ],
    },
    {
      name: "Reports",
      active: false,
      icon: PieChart,
      subItems: [
        { name: "Daily Consultations", view: "DailyConsultations", href: "/reports/daily-consultations", icon: Stethoscope },
        { name: "Patient Summary", view: "PatientSummary", href: "/reports/patient-summary", icon: Users },
        { name: "Financial Reports", view: "FinancialReports", href: "/reports/financial", icon: DollarSign },
        { name: "Performance Analytics", view: "PerformanceAnalytics", href: "/reports/analytics", icon: Activity },
      ],
    },
    {
      name: "Settings",
      active: false,
      icon: Settings,
      href: "/settings",
      view: "Settings",
    },
  ];

interface MainLayoutProps {
  children: React.ReactNode;
  activeView: string;
}

export default function MainLayout({ children, activeView }: MainLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const handleNavClick = (itemName: string, subView?: string) => {
    // Find the corresponding item
    const item = navItems.find(item => item.name === itemName);
    
    if (subView) {
      // If a subView is specified, navigate to its href
      const subItem = item?.subItems?.find(sub => sub.view === subView);
      if (subItem?.href) {
        window.location.href = subItem.href;
      }
    } else if (item?.subItems) {
      // Toggle expandedMenu if the item has subitems
      setExpandedMenu(expandedMenu === itemName ? null : itemName);
    } else if (item?.href) {
      // Navigate to the item's href if it has one
      window.location.href = item.href;
      setExpandedMenu(null);
    }
    
    // Close the mobile menu after navigation
    setMobileOpen(false);
  };

  // Determine the page title based on the active view
  const title = navItems.flatMap(item => 
    item.subItems ? item.subItems : [item]
  ).find(item => item.view === activeView)?.name || activeView;

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