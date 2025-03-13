"use client";

import React, { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, UserPlus, Clipboard, Search, Filter, Plus, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Import components for each tab (these would be created separately)
import CreatePatient from "@/components/PatientForm";
import AllPatients from "@/components/PatientsList";
// import PatientHistory from "@/components/PatientHistory";

export default function PatientPage() {
  const [activeTab, setActiveTab] = useState("create");
  
  // Map to determine which view to show to MainLayout
  const tabToViewMap = {
    create: "CreatePatient",
    all: "AllPatients",
    // history: "PatientHistory"
  };

  return (
    <MainLayout activeView={tabToViewMap[activeTab]}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Patient Management</h1>
            <p className="text-gray-500 mt-1">Create and manage patient records</p>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg flex items-center gap-2 self-start">
            <Plus className="h-4 w-4" />
            New Patient
          </Button>
        </div>

        <Card className="border border-gray-200 shadow-sm rounded-xl overflow-hidden">
          <Tabs 
            defaultValue="create" 
            className="w-full"
            onValueChange={(value) => setActiveTab(value)}
          >
            <div className="bg-white border-b border-gray-200">
              <div className="px-6 pt-4">
                <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-lg">
                  <TabsTrigger 
                    value="create" 
                    className="flex items-center gap-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span className="hidden sm:inline font-medium">Create Patient</span>
                    <span className="sm:hidden font-medium">Create</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="all" 
                    className="flex items-center gap-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm"
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline font-medium">All Patients</span>
                    <span className="sm:hidden font-medium">All</span>
                  </TabsTrigger>
                 
                </TabsList>
              </div>
            </div>

            <CardContent className="p-0">
              <TabsContent value="create" className="m-0 focus-visible:outline-none focus-visible:ring-0">
                <div className="p-6">
                  <CreatePatient />
                </div>
              </TabsContent>
              
              <TabsContent value="all" className="m-0 focus-visible:outline-none focus-visible:ring-0">
                <AllPatients />
              </TabsContent>
              
             
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </MainLayout>
  );
}

// Patient List View component
function PatientListView() {
  return (
    <div className="flex flex-col h-full">
      {/* Filters & Search */}
      <div className="p-6 border-b border-gray-200 bg-white">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              className="pl-9 bg-white border-gray-200 rounded-lg h-10 w-full" 
              placeholder="Search patients..." 
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
                <SelectItem value="all">All Patients</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="recent">
              <SelectTrigger className="h-10 bg-white border-gray-200 rounded-lg min-w-[140px]">
                <div className="flex items-center gap-2">
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                  <SelectValue placeholder="Sort By" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Recently Added</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="id">Patient ID</SelectItem>
                <SelectItem value="last-visit">Last Visit</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Patient List */}
      <div className="p-6 bg-gray-50 flex-grow">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">All Patients</h2>
          <span className="text-sm text-gray-500">150 patients</span>
        </div>

        {/* Sample Patients */}
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
                  <div className="flex gap-4 text-sm text-gray-500 mt-1">
                    <span>ID: #{1000 + i}</span>
                    <span>Age: {25 + i * 5}</span>
                    <span>
                      {i % 3 === 0 ? 'General Medicine' : i % 3 === 1 ? 'Cardiology' : 'Orthopedics'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    i % 3 === 0 ? 'bg-green-100 text-green-800' : 
                    i % 3 === 1 ? 'bg-blue-100 text-blue-800' : 
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {i % 3 === 0 ? 'Active' : 
                     i % 3 === 1 ? 'New Patient' : 
                     'Recurring'}
                  </span>
                </div>
                <span className="text-gray-600">Last Visit: {
                  i % 5 === 0 ? 'Today' :
                  i % 5 === 1 ? 'Yesterday' :
                  i % 5 === 2 ? '3 days ago' :
                  i % 5 === 3 ? '1 week ago' : '2 weeks ago'
                }</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-gray-200 text-gray-700 hover:bg-gray-50">
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-200 text-indigo-700 hover:bg-indigo-50">
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <Button variant="outline" size="sm" className="border-gray-200">
            Previous
          </Button>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" className="border-gray-200 bg-white w-8 h-8 p-0">1</Button>
            <Button variant="outline" size="sm" className="border-gray-200 bg-indigo-50 text-indigo-700 w-8 h-8 p-0">2</Button>
            <Button variant="outline" size="sm" className="border-gray-200 bg-white w-8 h-8 p-0">3</Button>
            <span className="text-gray-500 mx-1">...</span>
            <Button variant="outline" size="sm" className="border-gray-200 bg-white w-8 h-8 p-0">15</Button>
          </div>
          <Button variant="outline" size="sm" className="border-gray-200">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

