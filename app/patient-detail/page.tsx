"use client";

import React, { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, Calendar, Phone, Mail, MapPin, Clipboard, 
  Activity, PieChart, FileText, Pill, Clock,
  Edit, Printer, Download, Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PatientDetailPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <MainLayout activeView="PatientDetail">
      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Patient Header */}
        <header className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                <AvatarFallback className="text-2xl">JS</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-semibold text-gray-900">John Smith</h1>
                  <Badge className="bg-emerald-100 text-emerald-700">Active</Badge>
                </div>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-600">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Male, 42</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>DOB: Oct 15, 1982</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>(555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>j.smith@example.com</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>123 Main St, Apt 4B, New York, NY 10001</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 ml-auto">
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-gray-50">
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm text-gray-600">Patient ID</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                    <p className="font-semibold text-gray-900">#PAT-10042</p>
                    <p className="text-xs text-gray-500">Since Jun 2023</p>
                  </CardContent>
                </Card>
                <Card className="bg-gray-50">
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm text-gray-600">Next Visit</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                    <p className="font-semibold text-indigo-600">Mar 24, 2025</p>
                    <p className="text-xs text-gray-500">10:30 AM - Dr. Anderson</p>
                  </CardContent>
                </Card>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: Edit, text: "Edit" },
                  { icon: Printer, text: "Print" },
                  { icon: Download, text: "Export" },
                  { icon: Share2, text: "Share" },
                ].map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="flex-1 min-w-[80px]"
                  >
                    <action.icon className="h-4 w-4 mr-2" />
                    {action.text}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="bg-white p-1 rounded-lg shadow-sm flex-wrap justify-start gap-2">
            {["overview", "encounters", "medications", "test-results", "documents", "billing"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="capitalize py-2 px-4 rounded-md data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
              >
                {tab.replace("-", " ")}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <PatientOverview />
          </TabsContent>
          <TabsContent value="encounters" className="mt-0">
            <PatientEncounters />
          </TabsContent>
          <TabsContent value="medications" className="mt-0">
            <PatientMedications />
          </TabsContent>
          <TabsContent value="test-results" className="mt-0">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900">Test Results</h2>
                <p className="text-gray-600 mt-2">No test results available yet.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="documents" className="mt-0">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900">Documents</h2>
                <p className="text-gray-600 mt-2">No documents uploaded yet.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="billing" className="mt-0">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900">Billing</h2>
                <p className="text-gray-600 mt-2">Billing information coming soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}

function PatientOverview() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="space-y-6 lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-indigo-600" />
              Vital Signs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Blood Pressure", value: "128/84", unit: "mmHg", color: "blue", status: "Slightly High" },
                { label: "Heart Rate", value: "72", unit: "bpm", color: "green", status: "Normal" },
                { label: "Temperature", value: "98.6", unit: "°F", color: "purple", status: "Normal" },
                { label: "Oxygen", value: "98", unit: "%", color: "teal", status: "Normal" },
              ].map((vital, index) => (
                <div key={index} className={`bg-${vital.color}-50 p-3 rounded-lg`}>
                  <p className={`text-${vital.color}-700 text-sm font-medium`}>{vital.label}</p>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className={`text-${vital.color}-900 text-xl font-semibold`}>{vital.value}</span>
                    <span className={`text-${vital.color}-700 text-xs`}>{vital.unit}</span>
                  </div>
                  <p className={`text-${vital.color}-600 text-xs mt-1`}>{vital.status}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clipboard className="h-5 w-5 text-indigo-600" />
              Recent Encounters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { date: "Mar 10, 2025", type: "Annual Physical", provider: "Dr. Anderson" },
                { date: "Jan 15, 2025", type: "Follow-up", provider: "Dr. Anderson" },
                { date: "Dec 05, 2024", type: "Urgent Care", provider: "Dr. Chen" },
              ].map((encounter, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge
                      className={`${
                        encounter.type === "Annual Physical" ? "bg-green-100 text-green-700" :
                        encounter.type === "Follow-up" ? "bg-blue-100 text-blue-700" :
                        "bg-red-100 text-red-700"
                      }`}
                    >
                      {encounter.type}
                    </Badge>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{encounter.provider}</p>
                      <p className="text-xs text-gray-600">{encounter.date}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Details</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-indigo-600" />
              Conditions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Hypertension", date: "Jan 2022", color: "red" },
                { name: "Type 2 Diabetes", date: "Mar 2020", color: "blue" },
                { name: "Hyperlipidemia", date: "Nov 2021", color: "yellow" },
              ].map((condition, index) => (
                <div key={index} className={`border-l-4 border-${condition.color}-400 pl-3`}>
                  <p className="font-medium text-gray-900">{condition.name}</p>
                  <p className="text-xs text-gray-600">Since {condition.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-red-600" />
              Allergies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { name: "Penicillin", severity: "Severe", color: "red" },
                { name: "Sulfa Drugs", severity: "Moderate", color: "red" },
                { name: "Peanuts", severity: "Mild", color: "amber" },
              ].map((allergy, index) => (
                <div key={index} className={`bg-${allergy.color}-50 p-2 rounded-lg`}>
                  <span className={`text-${allergy.color}-800 font-medium`}>{allergy.name}</span>
                  <span className={`text-${allergy.color}-600 text-xs ml-2`}>({allergy.severity})</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function PatientEncounters() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle className="flex items-center gap-2">
            <Clipboard className="h-5 w-5 text-indigo-600" />
            Encounters
          </CardTitle>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="physical">Physical</SelectItem>
                <SelectItem value="follow-up">Follow-up</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="2025">
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              New Encounter
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            { date: "Mar 10, 2025", type: "Annual Physical", provider: "Dr. Anderson", notes: "Routine checkup..." },
            { date: "Jan 15, 2025", type: "Follow-up", provider: "Dr. Anderson", notes: "Hypertension management..." },
          ].map((encounter, index) => (
            <div key={index} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <Badge
                      className={
                        encounter.type === "Annual Physical"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }
                    >
                      {encounter.type}
                    </Badge>
                    <span className="text-sm text-gray-600">{encounter.date}</span>
                  </div>
                  <p className="mt-2 text-sm font-medium text-gray-900">{encounter.provider}</p>
                  <p className="mt-1 text-sm text-gray-600">{encounter.notes}</p>
                </div>
                <Button variant="outline">View Details</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function PatientMedications() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle className="flex items-center gap-2">
            <Pill className="h-5 w-5 text-indigo-600" />
            Medications
          </CardTitle>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Select defaultValue="active">
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="discontinued">Discontinued</SelectItem>
                <SelectItem value="all">All</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              Add Medication
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 text-left text-xs font-medium text-gray-600">Medication</th>
                <th className="p-3 text-left text-xs font-medium text-gray-600">Dosage</th>
                <th className="p-3 text-left text-xs font-medium text-gray-600">Frequency</th>
                <th className="p-3 text-left text-xs font-medium text-gray-600">Status</th>
                <th className="p-3 text-left text-xs font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Lisinopril", dosage: "20mg", frequency: "Daily", status: "Active" },
                { name: "Metformin", dosage: "1000mg", frequency: "Twice Daily", status: "Active" },
              ].map((med, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">{med.name}</td>
                  <td className="p-3">{med.dosage}</td>
                  <td className="p-3">{med.frequency}</td>
                  <td className="p-3">
                    <Badge className="bg-green-100 text-green-700">{med.status}</Badge>
                  </td>
                  <td className="p-3">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}