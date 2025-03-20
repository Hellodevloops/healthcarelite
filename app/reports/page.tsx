"use client";

import React, { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {Stethoscope, Users, DollarSign, Activity, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import DailyConsultations from "./DailyConsultations";
import PatientSummary from "./PatientSummary";
import FinancialReports from "./FinancialReports";


export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("daily-consultations");
  
  // Map to determine which view to show to MainLayout
  const tabToViewMap = {
    "daily-consultations": "Daily Consultations",
    "patient-summary": "Patient Summary",
    "financial": "Financial Reports",
    "analytics": "Performance Analytics"
  };

  return (
    <MainLayout activeView={tabToViewMap[activeTab]}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
            <p className="text-gray-500 mt-1">View and analyze clinical and financial data</p>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg flex items-center gap-2 self-start">
            <Plus className="h-4 w-4" />
            Generate Report
          </Button>
        </div>

        <Card className="border border-gray-200 shadow-sm rounded-xl overflow-hidden">
          <Tabs 
            defaultValue="daily-consultations" 
            className="w-full"
            onValueChange={(value) => setActiveTab(value)}
          >
            <div className="bg-white border-b border-gray-200">
              <div className="px-6 pt-4">
                <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 rounded-lg">
                  <TabsTrigger 
                    value="daily-consultations" 
                    className="flex items-center gap-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm"
                  >
                    <Stethoscope className="h-4 w-4" />
                    <span className="hidden sm:inline font-medium">Daily Consultations</span>
                    <span className="sm:hidden font-medium">Daily</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="patient-summary" 
                    className="flex items-center gap-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm"
                  >
                    <Users className="h-4 w-4" />
                    <span className="hidden sm:inline font-medium">Patient Summary</span>
                    <span className="sm:hidden font-medium">Patients</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="financial" 
                    className="flex items-center gap-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm"
                  >
                    <DollarSign className="h-4 w-4" />
                    <span className="hidden sm:inline font-medium">Financial Reports</span>
                    <span className="sm:hidden font-medium">Financial</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="analytics" 
                    className="flex items-center gap-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm"
                  >
                    <Activity className="h-4 w-4" />
                    <span className="hidden sm:inline font-medium">Performance Analytics</span>
                    <span className="sm:hidden font-medium">Analytics</span>
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            <CardContent className="p-0">
              <TabsContent value="daily-consultations" className="m-0 focus-visible:outline-none focus-visible:ring-0">
                <DailyConsultations />
              </TabsContent>
              
              <TabsContent value="patient-summary" className="m-0 focus-visible:outline-none focus-visible:ring-0">
                <PatientSummary />
              </TabsContent>
              
              <TabsContent value="financial" className="m-0 focus-visible:outline-none focus-visible:ring-0">
                <FinancialReports />
              </TabsContent>
              
              <TabsContent value="analytics" className="m-0 focus-visible:outline-none focus-visible:ring-0">
                {/* <PerformanceAnalytics /> */}
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </MainLayout>
  );
}