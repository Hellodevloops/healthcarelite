"use client";

import React from "react";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Activity, Users, Calendar, Pill, FileText, DollarSign, 
  TrendingUp, Clock, HeartPulse
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function DashboardPage() {
  return (
    <MainLayout activeView="Dashboard">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Healthcare Dashboard</h1>
            <p className="text-gray-600 mt-1">Overview of key metrics and patient data</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Export Report
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </header>

        {/* Key Metrics Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Total Patients", value: "1,234", icon: Users, color: "indigo", trend: "+5%", change: "up" },
            { title: "Appointments Today", value: "28", icon: Calendar, color: "green", trend: "-2%", change: "down" },
            { title: "Active Medications", value: "892", icon: Pill, color: "blue", trend: "+3%", change: "up" },
            { title: "Revenue (Month)", value: "$45,678", icon: DollarSign, color: "purple", trend: "+8%", change: "up" },
          ].map((metric, index) => (
            <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{metric.title}</CardTitle>
                <metric.icon className={`h-5 w-5 text-${metric.color}-600`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                <div className="flex items-center gap-2 mt-2">
                  <TrendingUp className={`h-4 w-4 ${metric.change === "up" ? "text-green-600" : "text-red-600"}`} />
                  <span className={`text-xs ${metric.change === "up" ? "text-green-600" : "text-red-600"}`}>
                    {metric.trend}
                  </span>
                  <span className="text-xs text-gray-500">vs last period</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-2">
            {/* Recent Appointments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-indigo-600" />
                  Recent Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { patient: "John Smith", date: "Mar 13, 2025", type: "Follow-up", provider: "Dr. Anderson", status: "Completed" },
                      { patient: "Sarah Lee", date: "Mar 13, 2025", type: "Physical", provider: "Dr. Chen", status: "Scheduled" },
                      { patient: "Mike Brown", date: "Mar 12, 2025", type: "Urgent", provider: "Dr. Patel", status: "Completed" },
                    ].map((appt, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{appt.patient[0]}</AvatarFallback>
                            </Avatar>
                            {appt.patient}
                          </div>
                        </TableCell>
                        <TableCell>{appt.date}</TableCell>
                        <TableCell>{appt.type}</TableCell>
                        <TableCell>{appt.provider}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              appt.status === "Completed"
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"
                            }
                          >
                            {appt.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4 text-right">
                  <Button variant="link" className="text-indigo-600">
                    View All Appointments
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Patient Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-indigo-600" />
                  Patient Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600">Appointment Completion Rate</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-2xl font-bold text-gray-900">92%</span>
                      <span className="text-xs text-green-600">+3% this month</span>
                    </div>
                    <Progress value={92} className="mt-2" indicatorClassName="bg-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Average Wait Time</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-2xl font-bold text-gray-900">12 min</span>
                      <span className="text-xs text-red-600">+2 min this month</span>
                    </div>
                    <Progress value={60} className="mt-2" indicatorClassName="bg-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HeartPulse className="h-5 w-5 text-red-600" />
                  Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { message: "John Smith - BP elevated (140/90)", time: "2h ago", priority: "high" },
                    { message: "Sarah Lee - Missed medication", time: "4h ago", priority: "medium" },
                  ].map((alert, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg ${
                        alert.priority === "high" ? "bg-red-50" : "bg-amber-50"
                      }`}
                    >
                      <p
                        className={`text-sm font-medium ${
                          alert.priority === "high" ? "text-red-800" : "text-amber-800"
                        }`}
                      >
                        {alert.message}
                      </p>
                      <p
                        className={`text-xs ${
                          alert.priority === "high" ? "text-red-600" : "text-amber-600"
                        }`}
                      >
                        {alert.time}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-right">
                  <Button variant="link" className="text-indigo-600">
                    View All Alerts
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-indigo-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { label: "Schedule Appointment", icon: Calendar },
                    { label: "Add Patient", icon: Users },
                    { label: "Prescribe Medication", icon: Pill },
                  ].map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start gap-2"
                    >
                      <action.icon className="h-4 w-4" />
                      {action.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Medication Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pill className="h-5 w-5 text-indigo-600" />
              Medication Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medication</TableHead>
                  <TableHead>Patients</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Refills</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { name: "Lisinopril", patients: 245, status: "Active", refills: 128 },
                  { name: "Metformin", patients: 189, status: "Active", refills: 94 },
                  { name: "Atorvastatin", patients: 156, status: "Active", refills: 82 },
                ].map((med, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{med.name}</TableCell>
                    <TableCell>{med.patients}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-700">{med.status}</Badge>
                    </TableCell>
                    <TableCell>{med.refills}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 text-right">
              <Button variant="link" className="text-indigo-600">
                View All Medications
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}