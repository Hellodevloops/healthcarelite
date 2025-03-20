
"use client";

import React, { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, FileText, ClipboardList, Clock, Filter, Search, Plus, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Import components for each tab
import ScheduleAppointment from "@/components/ScheduleAppoiment";

export default function AppointmentPage() {
  const [activeTab, setActiveTab] = useState("schedule");
  
  // Map to determine which view to show to MainLayout
  const tabToViewMap = {
    schedule: "ScheduleAppointment",
    view: "ViewAppointments",
    waiting: "WaitingList"
  };

  return (
    <MainLayout activeView={tabToViewMap[activeTab]}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Appointment Management</h1>
            <p className="text-gray-500 mt-1">Schedule and manage patient appointments</p>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg flex items-center gap-2 self-start">
            <Plus className="h-4 w-4" />
            New Appointment
          </Button>
        </div>

        <Card className="border border-gray-200 shadow-sm rounded-xl overflow-hidden">
          <Tabs 
            defaultValue="schedule" 
            className="w-full"
            onValueChange={(value) => setActiveTab(value)}
          >
            <div className="bg-white border-b border-gray-200">
              <div className="px-6 pt-4">
                <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-lg">
                  <TabsTrigger 
                    value="schedule" 
                    className="flex items-center gap-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm"
                  >
                    <Calendar className="h-4 w-4" />
                    <span className="hidden sm:inline font-medium">Schedule Appointment</span>
                    <span className="sm:hidden font-medium">Schedule</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="view" 
                    className="flex items-center gap-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm"
                  >
                    <FileText className="h-4 w-4" />
                    <span className="hidden sm:inline font-medium">View Appointments</span>
                    <span className="sm:hidden font-medium">View</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="waiting" 
                    className="flex items-center gap-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm"
                  >
                    <ClipboardList className="h-4 w-4" />
                    <span className="hidden sm:inline font-medium">Waiting List</span>
                    <span className="sm:hidden font-medium">Waiting</span>
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            <CardContent className="p-0">
              <TabsContent value="schedule" className="m-0 focus-visible:outline-none focus-visible:ring-0">
                <div className="p-6">
                  <ScheduleAppointment />
                </div>
              </TabsContent>
              
              <TabsContent value="view" className="m-0 focus-visible:outline-none focus-visible:ring-0">
                <ViewAppointmentsProfessional />
              </TabsContent>
              
              <TabsContent value="waiting" className="m-0 focus-visible:outline-none focus-visible:ring-0">
                <WaitingListProfessional />
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </MainLayout>
  );
}

// Professional View Appointments component
function ViewAppointmentsProfessional() {
  return (
    <div className="flex flex-col h-full">
      {/* Filters & Search */}
      <div className="p-6 border-b border-gray-200 bg-white">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              className="pl-9 bg-white border-gray-200 rounded-lg h-10 w-full" 
              placeholder="Search appointments..." 
            />
          </div>
          <div className="flex gap-3">
            <Select defaultValue="all">
              <SelectTrigger className="h-10 bg-white border-gray-200 rounded-lg min-w-[140px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <SelectValue placeholder="Status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="today">
              <SelectTrigger className="h-10 bg-white border-gray-200 rounded-lg min-w-[140px]">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <SelectValue placeholder="Date Range" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="tomorrow">Tomorrow</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Appointment List */}
      <div className="p-6 bg-gray-50 flex-grow">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Today's Appointments</h2>
          <span className="text-sm text-gray-500">5 appointments</span>
        </div>

        {/* Sample Appointments */}
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                  i % 3 === 0 ? 'bg-green-100 text-green-600' : 
                  i % 3 === 1 ? 'bg-blue-100 text-blue-600' : 
                  'bg-purple-100 text-purple-600'
                }`}>
                  {i % 3 === 0 ? 'JS' : i % 3 === 1 ? 'MR' : 'KT'}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    {i % 3 === 0 ? 'John Smith' : i % 3 === 1 ? 'Maria Rodriguez' : 'Kevin Thompson'}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {i % 3 === 0 ? 'General Checkup' : i % 3 === 1 ? 'Follow-up Consultation' : 'Medication Review'}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{
                    i % 5 === 0 ? '9:00 AM' :
                    i % 5 === 1 ? '10:30 AM' :
                    i % 5 === 2 ? '1:15 PM' :
                    i % 5 === 3 ? '2:45 PM' : '4:30 PM'
                  }</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    i % 4 === 0 ? 'bg-green-100 text-green-800' : 
                    i % 4 === 1 ? 'bg-blue-100 text-blue-800' : 
                    i % 4 === 2 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {i % 4 === 0 ? 'Confirmed' : 
                     i % 4 === 1 ? 'In Progress' : 
                     i % 4 === 2 ? 'Waiting' : 'Completed'}
                  </span>
                </div>
                <Button variant="outline" size="sm" className="border-gray-200 text-gray-700 hover:bg-gray-50">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Professional Waiting List component
function WaitingListProfessional() {
  return (
    <div className="flex flex-col h-full">
      {/* Header with stats */}
      <div className="p-6 border-b border-gray-200 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-indigo-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-700">Current Waiting</p>
                <h4 className="text-2xl font-bold text-indigo-900 mt-1">8</h4>
              </div>
              <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <ClipboardList className="h-5 w-5 text-indigo-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Average Wait Time</p>
                <h4 className="text-2xl font-bold text-green-900 mt-1">12 min</h4>
              </div>
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Today</p>
                <h4 className="text-2xl font-bold text-blue-900 mt-1">24</h4>
              </div>
              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Waiting List Table */}
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Current Waiting List</h2>
          <div className="flex items-center">
            <Button size="sm" variant="outline" className="text-sm h-8 border-gray-200">
              <Filter className="h-3 w-3 mr-1" /> Filter
            </Button>
            <div className="ml-2">
              <Select defaultValue="all">
                <SelectTrigger className="h-8 text-sm border-gray-200 bg-white rounded-md">
                  <div className="flex items-center gap-1">
                    <span>Sort By</span>
                    <ChevronDown className="h-3 w-3" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="waiting-time">Waiting Time</SelectItem>
                  <SelectItem value="name">Patient Name</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="overflow-hidden border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waiting Time</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointment</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { name: "Emma Wilson", time: "32 min", type: "Routine Checkup", status: "Waiting", priority: "Normal" },
                { name: "James Brown", time: "25 min", type: "Follow-up", status: "Waiting", priority: "Urgent" },
                { name: "Sophia Davis", time: "18 min", type: "Lab Results", status: "In Progress", priority: "Normal" },
                { name: "William Taylor", time: "15 min", type: "Vaccination", status: "Waiting", priority: "Normal" },
                { name: "Olivia Martinez", time: "10 min", type: "Consultation", status: "Waiting", priority: "Priority" },
                { name: "Benjamin Harris", time: "5 min", type: "Prescription", status: "Just Arrived", priority: "Normal" },
                { name: "Charlotte Lee", time: "3 min", type: "X-Ray Results", status: "Just Arrived", priority: "Normal" },
                { name: "Daniel Clark", time: "1 min", type: "Blood Test", status: "Just Arrived", priority: "Normal" },
              ].map((patient, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-medium">
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{patient.name}</div>
                        <div className="text-xs text-gray-500">#{(1000 + i).toString()}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      patient.status === 'Waiting' ? 'bg-yellow-100 text-yellow-800' : 
                      patient.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {patient.status}
                    </span>
                    {patient.priority !== 'Normal' && (
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        patient.priority === 'Urgent' ? 'bg-red-100 text-red-800' : 
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {patient.priority}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="h-8 px-3 text-xs">
                        Check In
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 px-3 text-xs">
                        View
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}