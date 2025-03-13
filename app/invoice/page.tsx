"use client";

import React, { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, DollarSign, UserCheck, Plus, Download, Eye, Filter, Search,
  Calendar, CreditCard, FileDown, Printer, ChevronRight, Bell, MoreHorizontal,
  Check, Clock, RefreshCw, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Define interfaces for data structures
interface BillingTab {
  name: string;
  view: string;
  icon: React.ElementType;
}

interface StatusStyle {
  bg: string;
  text: string;
  icon: React.ReactNode;
}

interface Bill {
  id: string;
  patient: string;
  patientId: string;
  date: string;
  amount: string;
  status: string;
  insurance: string;
  email: string;
}

interface Claim {
  id: string;
  patient: string;
  patientId: string;
  date: string;
  amount: string;
  status: string;
  insurance: string;
  submitDate: string;
}

interface Activity {
  id: number;
  action: string;
  details: string;
  time: string;
  icon: React.ReactNode;
}

export default function BillingsPage() {
  const [activeTab, setActiveTab] = useState<string>("GenerateInvoice");
  const [selectedBilling, setSelectedBilling] = useState<string | null>(null);

  const billingTabs: BillingTab[] = [
    { name: "Generate Invoice", view: "GenerateInvoice", icon: FileText },
    { name: "View Bills", view: "ViewBills", icon: DollarSign },
    { name: "Insurance Claims", view: "InsuranceClaims", icon: UserCheck },
    { name: "Payment Analytics", view: "PaymentAnalytics", icon: CreditCard },
  ];

  const statusColors: Record<string, StatusStyle> = {
    Paid: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      icon: <Check className="h-3.5 w-3.5 text-emerald-600" />
    },
    Pending: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      icon: <Clock className="h-3.5 w-3.5 text-amber-600" />
    },
    Overdue: {
      bg: "bg-red-50",
      text: "text-red-700",
      icon: <X className="h-3.5 w-3.5 text-red-600" />
    },
    Approved: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      icon: <Check className="h-3.5 w-3.5 text-emerald-600" />
    },
    Denied: {
      bg: "bg-red-50",
      text: "text-red-700",
      icon: <X className="h-3.5 w-3.5 text-red-600" />
    },
    Processing: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      icon: <RefreshCw className="h-3.5 w-3.5 text-blue-600" />
    }
  };

  const billsData: Bill[] = [
    { id: "INV-001", patient: "John Smith", patientId: "P-7239", date: "Mar 13, 2025", amount: "$150.00", status: "Paid", insurance: "Blue Cross", email: "john.smith@example.com" },
    { id: "INV-002", patient: "Sarah Lee", patientId: "P-5621", date: "Mar 12, 2025", amount: "$250.00", status: "Pending", insurance: "Aetna", email: "sarah.lee@example.com" },
    { id: "INV-003", patient: "Mike Brown", patientId: "P-3456", date: "Mar 11, 2025", amount: "$100.00", status: "Overdue", insurance: "Medicare", email: "mike.brown@example.com" },
    { id: "INV-004", patient: "Emma Wilson", patientId: "P-1290", date: "Mar 10, 2025", amount: "$320.00", status: "Paid", insurance: "Cigna", email: "emma.wilson@example.com" },
    { id: "INV-005", patient: "Robert Johnson", patientId: "P-8734", date: "Mar 09, 2025", amount: "$175.00", status: "Pending", insurance: "UnitedHealth", email: "robert.johnson@example.com" },
  ];

  const claimsData: Claim[] = [
    { id: "CLM-001", patient: "John Smith", patientId: "P-7239", date: "Mar 10, 2025", amount: "$300.00", status: "Approved", insurance: "Blue Cross", submitDate: "Mar 05, 2025" },
    { id: "CLM-002", patient: "Sarah Lee", patientId: "P-5621", date: "Mar 09, 2025", amount: "$450.00", status: "Pending", insurance: "Aetna", submitDate: "Mar 04, 2025" },
    { id: "CLM-003", patient: "Mike Brown", patientId: "P-3456", date: "Mar 08, 2025", amount: "$200.00", status: "Denied", insurance: "Medicare", submitDate: "Mar 03, 2025" },
    { id: "CLM-004", patient: "Emma Wilson", patientId: "P-1290", date: "Mar 07, 2025", amount: "$520.00", status: "Processing", insurance: "Cigna", submitDate: "Mar 02, 2025" },
    { id: "CLM-005", patient: "Robert Johnson", patientId: "P-8734", date: "Mar 06, 2025", amount: "$280.00", status: "Approved", insurance: "UnitedHealth", submitDate: "Mar 01, 2025" },
  ];

  const recentActivity: Activity[] = [
    { id: 1, action: "Invoice Generated", details: "INV-005 for Robert Johnson", time: "10:45 AM", icon: <FileText className="h-4 w-4 text-blue-600" /> },
    { id: 2, action: "Payment Received", details: "$320.00 from Emma Wilson", time: "Yesterday", icon: <DollarSign className="h-4 w-4 text-emerald-600" /> },
    { id: 3, action: "Claim Submitted", details: "CLM-004 to Cigna Insurance", time: "Yesterday", icon: <UserCheck className="h-4 w-4 text-amber-600" /> },
    { id: 4, action: "Claim Approved", details: "CLM-001 by Blue Cross", time: "Mar 10, 2025", icon: <Check className="h-4 w-4 text-emerald-600" /> },
  ];

  const handleSelectBilling = (id: string) => {
    setSelectedBilling(selectedBilling === id ? null : id);
  };

  const handleGenerateInvoice = () => {
    console.log("Generating invoice...");
    // Implement actual invoice generation logic here
  };

  return (
    <MainLayout activeView="Billings">
      <div className="bg-gray-50 min-h-screen">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Billing & Invoices</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-gray-500">Dashboard</span>
                  <ChevronRight className="h-3 w-3 text-gray-400" />
                  <span className="text-sm font-medium text-indigo-600">Billing Management</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" className="border-gray-200 text-gray-700 flex items-center gap-2 hover:bg-gray-50">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>Mar 1 - Mar 15, 2025</span>
                </Button>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="relative border-gray-200 text-gray-700 hover:bg-gray-50">
                        <Bell className="h-4 w-4" />
                        <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">3</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Notifications</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-9">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <Card className="bg-white rounded-xl shadow-sm overflow-hidden border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">$12,354.75</h3>
                        <p className="text-xs font-medium text-emerald-600 mt-1 flex items-center">
                          <span className="bg-emerald-50 text-emerald-600 p-0.5 rounded mr-1">↑</span>
                          8.2% from last month
                        </p>
                      </div>
                      <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
                        <DollarSign className="h-6 w-6 text-indigo-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white rounded-xl shadow-sm overflow-hidden border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Pending Invoices</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">8</h3>
                        <p className="text-xs font-medium text-amber-600 mt-1 flex items-center">
                          $1,245.50 total value
                        </p>
                      </div>
                      <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                        <Clock className="h-6 w-6 text-amber-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white rounded-xl shadow-sm overflow-hidden border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Successful Claims</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">24</h3>
                        <p className="text-xs font-medium text-emerald-600 mt-1 flex items-center">
                          <span className="bg-emerald-50 text-emerald-600 p-0.5 rounded mr-1">↑</span>
                          4.5% rate increase
                        </p>
                      </div>
                      <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
                        <Check className="h-6 w-6 text-emerald-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white rounded-xl shadow-sm overflow-hidden border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Denied Claims</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">3</h3>
                        <p className="text-xs font-medium text-red-600 mt-1 flex items-center">
                          <span className="bg-red-50 text-red-600 p-0.5 rounded mr-1">↓</span>
                          2.1% from last month
                        </p>
                      </div>
                      <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                        <X className="h-6 w-6 text-red-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="bg-white p-1.5 rounded-xl shadow-sm flex justify-start gap-2 border border-gray-100">
                  {billingTabs.map((tab) => (
                    <TabsTrigger
                      key={tab.view}
                      value={tab.view}
                      className="flex items-center gap-2 py-2 px-4 rounded-lg data-[state=active]:bg-indigo-600 data-[state=active]:text-white text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <tab.icon className="h-4 w-4" />
                      {tab.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="GenerateInvoice" className="mt-0">
                  <Card className="bg-white shadow-sm rounded-xl border-0">
                    <CardHeader className="border-b border-gray-100 pb-4">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-indigo-600" />
                        <div>
                          <CardTitle className="text-xl text-gray-900">Generate Invoice</CardTitle>
                          <CardDescription className="text-gray-500 text-sm mt-1">Create a new invoice for a patient</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-md font-semibold text-gray-900 mb-4">Patient Information</h3>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name *</label>
                                <Input className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" placeholder="Search or select patient" />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient ID</label>
                                  <Input className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" placeholder="Patient ID" disabled value="P-5621" />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                                  <Input type="date" className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" />
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <Input className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" placeholder="patient@example.com" />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Provider</label>
                                <Select>
                                  <SelectTrigger className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
                                    <SelectValue placeholder="Select provider" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="bluecross">Blue Cross Blue Shield</SelectItem>
                                    <SelectItem value="aetna">Aetna</SelectItem>
                                    <SelectItem value="cigna">Cigna</SelectItem>
                                    <SelectItem value="united">UnitedHealthcare</SelectItem>
                                    <SelectItem value="medicare">Medicare</SelectItem>
                                    <SelectItem value="medicaid">Medicaid</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div>
                            <h3 className="text-md font-semibold text-gray-900 mb-4">Invoice Details</h3>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Number</label>
                                  <Input className="w-full border-gray-300 bg-gray-50" value="INV-006" disabled />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Date *</label>
                                  <Input type="date" className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" />
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Service Type *</label>
                                <Select>
                                  <SelectTrigger className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
                                    <SelectValue placeholder="Select service" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="consultation">Consultation</SelectItem>
                                    <SelectItem value="procedure">Medical Procedure</SelectItem>
                                    <SelectItem value="surgery">Surgery</SelectItem>
                                    <SelectItem value="lab">Laboratory Test</SelectItem>
                                    <SelectItem value="imaging">Imaging</SelectItem>
                                    <SelectItem value="therapy">Therapy Session</SelectItem>
                                    <SelectItem value="medication">Medication</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <Input className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" placeholder="Brief description of service" />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount *</label>
                                  <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                      <span className="text-gray-500 sm:text-sm">$</span>
                                    </div>
                                    <Input type="number" className="w-full pl-7 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" placeholder="0.00" />
                                  </div>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Due</label>
                                  <Input type="date" className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator className="my-4" />

                      <div>
                        <h3 className="text-md font-semibold text-gray-900 mb-4">Line Items</h3>
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-gray-50">
                              <TableHead className="py-2 px-4 text-xs text-gray-600 font-medium">Item</TableHead>
                              <TableHead className="py-2 px-4 text-xs text-gray-600 font-medium">Description</TableHead>
                              <TableHead className="py-2 px-4 text-xs text-gray-600 font-medium">Quantity</TableHead>
                              <TableHead className="py-2 px-4 text-xs text-gray-600 font-medium">Unit Price</TableHead>
                              <TableHead className="py-2 px-4 text-xs text-gray-600 font-medium">Total</TableHead>
                              <TableHead className="py-2 px-4 text-xs text-gray-600 font-medium w-8"></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="py-2 px-4">
                                <Select>
                                  <SelectTrigger className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
                                    <SelectValue placeholder="Select item" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="consultation">Initial Consultation</SelectItem>
                                    <SelectItem value="followup">Follow-up Visit</SelectItem>
                                    <SelectItem value="bloodwork">Blood Work</SelectItem>
                                    <SelectItem value="xray">X-Ray</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell className="py-2 px-4">
                                <Input className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" placeholder="Description" />
                              </TableCell>
                              <TableCell className="py-2 px-4">
                                <Input type="number" className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" placeholder="1" />
                              </TableCell>
                              <TableCell className="py-2 px-4">
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 sm:text-sm">$</span>
                                  </div>
                                  <Input type="number" className="w-full pl-7 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" placeholder="0.00" />
                                </div>
                              </TableCell>
                              <TableCell className="py-2 px-4">
                                <div className="text-gray-900 font-medium">$0.00</div>
                              </TableCell>
                              <TableCell className="py-2 px-4">
                                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-600 p-1 h-auto">
                                  <X className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                        <Button variant="outline" className="mt-3 text-indigo-600 border-indigo-200 hover:bg-indigo-50">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Line Item
                        </Button>
                      </div>

                      <div className="flex justify-end gap-3 mt-8">
                        <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-100">
                          Save as Draft
                        </Button>
                        <Button
                          onClick={handleGenerateInvoice}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Generate Invoice
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="ViewBills" className="mt-0">
                  <Card className="bg-white shadow-sm rounded-xl border-0">
                    <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 pb-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-indigo-600" />
                        <div>
                          <CardTitle className="text-xl text-gray-900">View Bills</CardTitle>
                          <CardDescription className="text-gray-500 text-sm mt-1">Manage and track all patient invoices</CardDescription>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input className="pl-9 w-64 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" placeholder="Search invoices..." />
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-100">
                              <Filter className="h-4 w-4 mr-2" />
                              Filter
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>All Invoices</DropdownMenuItem>
                            <DropdownMenuItem>Paid</DropdownMenuItem>
                            <DropdownMenuItem>Pending</DropdownMenuItem>
                            <DropdownMenuItem>Overdue</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                          <Plus className="h-4 w-4 mr-2" />
                          New Invoice
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-gray-50">
                              <TableHead className="py-3 px-6 text-xs text-gray-600 font-medium">Invoice ID</TableHead>
                              <TableHead className="py-3 px-6 text-xs text-gray-600 font-medium">Patient</TableHead>
                              <TableHead className="py-3 px-6 text-xs text-gray-600 font-medium">Date</TableHead>
                              <TableHead className="py-3 px-6 text-xs text-gray-600 font-medium">Amount</TableHead>
                              <TableHead className="py-3 px-6 text-xs text-gray-600 font-medium">Insurance</TableHead>
                              <TableHead className="py-3 px-6 text-xs text-gray-600 font-medium">Status</TableHead>
                              <TableHead className="py-3 px-6 text-xs text-gray-600 font-medium">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {billsData.map((bill) => (
                              <TableRow
                                key={bill.id}
                                onClick={() => handleSelectBilling(bill.id)}
                                className={`hover:bg-gray-50 transition-colors cursor-pointer ${selectedBilling === bill.id ? 'bg-indigo-50' : ''}`}
                              >
                                <TableCell className="py-4 px-6 text-sm text-gray-700 font-medium">{bill.id}</TableCell>
                                <TableCell className="py-4 px-6">
                                  <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                      <AvatarFallback className="bg-indigo-100 text-indigo-700">{bill.patient.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <p className="text-sm font-medium text-gray-900">{bill.patient}</p>
                                      <p className="text-xs text-gray-500">{bill.patientId}</p>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell className="py-4 px-6 text-sm text-gray-700">{bill.date}</TableCell>
                                <TableCell className="py-4 px-6 text-sm font-medium text-gray-900">{bill.amount}</TableCell>
                                <TableCell className="py-4 px-6 text-sm text-gray-700">{bill.insurance}</TableCell>
                                <TableCell className="py-4 px-6">
                                  <div className={`flex items-center gap-1.5 text-xs font-medium py-1 px-2.5 rounded-full inline-flex ${statusColors[bill.status].bg} ${statusColors[bill.status].text}`}>
                                    {statusColors[bill.status].icon}
                                    <span>{bill.status}</span>
                                  </div>
                                </TableCell>
                                <TableCell className="py-4 px-6">
                                  <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                      <Eye className="h-4 w-4 text-gray-500" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                      <Printer className="h-4 w-4 text-gray-500" />
                                    </Button>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                          <MoreHorizontal className="h-4 w-4 text-gray-500" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem>Edit Invoice</DropdownMenuItem>
                                        <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                                        <DropdownMenuItem>Mark as Paid</DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                      <div className="flex items-center justify-between p-4 border-t border-gray-100">
                        <div className="text-sm text-gray-500">
                          Showing <span className="font-medium">5</span> of <span className="font-medium">24</span> invoices
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="border-gray-200 text-gray-700 hover:bg-gray-100">
                            Previous
                          </Button>
                          <Button variant="outline" size="sm" className="border-gray-200 text-gray-700 hover:bg-gray-100">
                            Next
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="InsuranceClaims" className="mt-0">
                  <Card className="bg-white shadow-sm rounded-xl border-0">
                    <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 pb-4">
                      <div className="flex items-center gap-2">
                        <UserCheck className="h-5 w-5 text-indigo-600" />
                        <div>
                          <CardTitle className="text-xl text-gray-900">Insurance Claims</CardTitle>
                          <CardDescription className="text-gray-500 text-sm mt-1">Track and manage insurance claim submissions</CardDescription>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input className="pl-9 w-64 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" placeholder="Search claims..." />
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-100">
                              <Filter className="h-4 w-4 mr-2" />
                              Filter
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>All Claims</DropdownMenuItem>
                            <DropdownMenuItem>Approved</DropdownMenuItem>
                            <DropdownMenuItem>Pending</DropdownMenuItem>
                            <DropdownMenuItem>Denied</DropdownMenuItem>
                            <DropdownMenuItem>Processing</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                          <Plus className="h-4 w-4 mr-2" />
                          New Claim
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-gray-50">
                              <TableHead className="py-3 px-6 text-xs text-gray-600 font-medium">Claim ID</TableHead>
                              <TableHead className="py-3 px-6 text-xs text-gray-600 font-medium">Patient</TableHead>
                              <TableHead className="py-3 px-6 text-xs text-gray-600 font-medium">Service Date</TableHead>
                              <TableHead className="py-3 px-6 text-xs text-gray-600 font-medium">Submit Date</TableHead>
                              <TableHead className="py-3 px-6 text-xs text-gray-600 font-medium">Amount</TableHead>
                              <TableHead className="py-3 px-6 text-xs text-gray-600 font-medium">Insurance</TableHead>
                              <TableHead className="py-3 px-6 text-xs text-gray-600 font-medium">Status</TableHead>
                              <TableHead className="py-3 px-6 text-xs text-gray-600 font-medium">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {claimsData.map((claim) => (
                              <TableRow
                                key={claim.id}
                                onClick={() => handleSelectBilling(claim.id)}
                                className={`hover:bg-gray-50 transition-colors cursor-pointer ${selectedBilling === claim.id ? 'bg-indigo-50' : ''}`}
                              >
                                <TableCell className="py-4 px-6 text-sm text-gray-700 font-medium">{claim.id}</TableCell>
                                <TableCell className="py-4 px-6">
                                  <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                      <AvatarFallback className="bg-indigo-100 text-indigo-700">{claim.patient.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <p className="text-sm font-medium text-gray-900">{claim.patient}</p>
                                      <p className="text-xs text-gray-500">{claim.patientId}</p>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell className="py-4 px-6 text-sm text-gray-700">{claim.date}</TableCell>
                                <TableCell className="py-4 px-6 text-sm text-gray-700">{claim.submitDate}</TableCell>
                                <TableCell className="py-4 px-6 text-sm font-medium text-gray-900">{claim.amount}</TableCell>
                                <TableCell className="py-4 px-6 text-sm text-gray-700">{claim.insurance}</TableCell>
                                <TableCell className="py-4 px-6">
                                  <div className={`flex items-center gap-1.5 text-xs font-medium py-1 px-2.5 rounded-full inline-flex ${statusColors[claim.status].bg} ${statusColors[claim.status].text}`}>
                                    {statusColors[claim.status].icon}
                                    <span>{claim.status}</span>
                                  </div>
                                </TableCell>
                                <TableCell className="py-4 px-6">
                                  <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                      <Eye className="h-4 w-4 text-gray-500" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                      <FileDown className="h-4 w-4 text-gray-500" />
                                    </Button>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                          <MoreHorizontal className="h-4 w-4 text-gray-500" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem>View Details</DropdownMenuItem>
                                        <DropdownMenuItem>Check Status</DropdownMenuItem>
                                        <DropdownMenuItem>Resubmit Claim</DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-600">Cancel Claim</DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                      <div className="flex items-center justify-between p-4 border-t border-gray-100">
                        <div className="text-sm text-gray-500">
                          Showing <span className="font-medium">5</span> of <span className="font-medium">18</span> claims
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="border-gray-200 text-gray-700 hover:bg-gray-100">
                            Previous
                          </Button>
                          <Button variant="outline" size="sm" className="border-gray-200 text-gray-700 hover:bg-gray-100">
                            Next
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="PaymentAnalytics" className="mt-0">
                  <Card className="bg-white shadow-sm rounded-xl border-0">
                    <CardHeader className="border-b border-gray-100 pb-4">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-indigo-600" />
                        <div>
                          <CardTitle className="text-xl text-gray-900">Payment Analytics</CardTitle>
                          <CardDescription className="text-gray-500 text-sm mt-1">Track and analyze payment trends</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="text-center py-12 text-gray-500">
                        Payment analytics visualization would be displayed here
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="col-span-12 lg:col-span-3 space-y-6">
              <Card className="bg-white shadow-sm rounded-xl border-0">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-gray-900">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6 pt-0">
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3">
                        <div className="bg-gray-100 rounded-full p-2 mt-0.5">
                          {activity.icon}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                          <p className="text-xs text-gray-500">{activity.details}</p>
                          <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="ghost" className="w-full justify-center text-indigo-600 hover:bg-indigo-50 mt-4">
                    View All Activity
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm rounded-xl border-0">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-gray-900">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6 pt-0">
                  <div className="space-y-3">
                    <Button className="w-full justify-start bg-indigo-600 hover:bg-indigo-700 text-white">
                      <FileText className="h-4 w-4 mr-2" />
                      Create New Invoice
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-gray-200 text-gray-700 hover:bg-gray-100">
                      <UserCheck className="h-4 w-4 mr-2" />
                      Submit Insurance Claim
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-gray-200 text-gray-700 hover:bg-gray-100">
                      <Download className="h-4 w-4 mr-2" />
                      Download Payment Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-gray-200 text-gray-700 hover:bg-gray-100">
                      <Printer className="h-4 w-4 mr-2" />
                      Print Invoice
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}