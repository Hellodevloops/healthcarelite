"use client";

import React, { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, FlaskConical, FileText, Search, Filter, Plus, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Import components for each tab (these would be created separately)
import OrderTests from "./OrderTests";
import TestResults from "./TestResults";

export default function DiagnosticsPage() {
  const [activeTab, setActiveTab] = useState("order");
  
  // Map to determine which view to show to MainLayout
  const tabToViewMap = {
    order: "OrderTests",
    results: "TestResults",
  };

  return (
    <MainLayout activeView={tabToViewMap[activeTab]}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Diagnostics</h1>
            <p className="text-gray-500 mt-1">Order and view test results</p>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg flex items-center gap-2 self-start">
            <Plus className="h-4 w-4" />
            New Test Order
          </Button>
        </div>

        <Card className="border border-gray-200 shadow-sm rounded-xl overflow-hidden">
          <Tabs 
            defaultValue="order" 
            className="w-full"
            onValueChange={(value) => setActiveTab(value)}
          >
            <div className="bg-white border-b border-gray-200">
              <div className="px-6 pt-4">
                <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-lg">
                  <TabsTrigger 
                    value="order" 
                    className="flex items-center gap-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm"
                  >
                    <FlaskConical className="h-4 w-4" />
                    <span className="hidden sm:inline font-medium">Order Tests</span>
                    <span className="sm:hidden font-medium">Order</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="results" 
                    className="flex items-center gap-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm"
                  >
                    <FileText className="h-4 w-4" />
                    <span className="hidden sm:inline font-medium">Test Results</span>
                    <span className="sm:hidden font-medium">Results</span>
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            <CardContent className="p-0">
              <TabsContent value="order" className="m-0 focus-visible:outline-none focus-visible:ring-0">
                <div className="p-6">
                  <OrderTests />
                </div>
              </TabsContent>
              
              <TabsContent value="results" className="m-0 focus-visible:outline-none focus-visible:ring-0">
                <TestResults />
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </MainLayout>
  );
}

// Test Results View component
// function TestResultsView() {
//   return (
//     <div className="flex flex-col h-full">
//       {/* Filters & Search */}
//       <div className="p-6 border-b border-gray-200 bg-white">
//         <div className="flex flex-col sm:flex-row gap-4">
//           <div className="relative flex-grow">
//             <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//             <Input 
//               className="pl-9 bg-white border-gray-200 rounded-lg h-10 w-full" 
//               placeholder="Search tests or patients..." 
//             />
//           </div>
//           <div className="flex gap-3">
//             <Select defaultValue="all">
//               <SelectTrigger className="h-10 bg-white border-gray-200 rounded-lg min-w-[140px]">
//                 <div className="flex items-center gap-2">
//                   <Filter className="h-4 w-4 text-gray-500" />
//                   <SelectValue placeholder="Status" />
//                 </div>
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Results</SelectItem>
//                 <SelectItem value="pending">Pending</SelectItem>
//                 <SelectItem value="completed">Completed</SelectItem>
//                 <SelectItem value="abnormal">Abnormal</SelectItem>
//               </SelectContent>
//             </Select>
            
//             <Select defaultValue="recent">
//               <SelectTrigger className="h-10 bg-white border-gray-200 rounded-lg min-w-[140px]">
//                 <div className="flex items-center gap-2">
//                   <ChevronDown className="h-4 w-4 text-gray-500" />
//                   <SelectValue placeholder="Sort By" />
//                 </div>
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="recent">Most Recent</SelectItem>
//                 <SelectItem value="patient">Patient Name</SelectItem>
//                 <SelectItem value="test-type">Test Type</SelectItem>
//                 <SelectItem value="urgency">Urgency</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//       </div>

//       {/* Test Results List */}
//       <div className="p-6 bg-gray-50 flex-grow">
//         <div className="mb-4 flex items-center justify-between">
//           <h2 className="text-lg font-semibold text-gray-900">Test Results</h2>
//           <span className="text-sm text-gray-500">24 results</span>
//         </div>

//         {/* Sample Test Results */}
//         <div className="space-y-4">
//           {[1, 2, 3, 4, 5].map((i) => (
//             <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//               <div className="flex items-center gap-4">
//                 <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
//                   i % 3 === 0 ? 'bg-green-100 text-green-600' : 
//                   i % 3 === 1 ? 'bg-blue-100 text-blue-600' : 
//                   'bg-orange-100 text-orange-600'
//                 }`}>
//                   {i % 3 === 0 ? 'CBC' : i % 3 === 1 ? 'XR' : 'CT'}
//                 </div>
//                 <div>
//                   <h3 className="font-medium text-gray-900">
//                     {i % 3 === 0 ? 'Complete Blood Count' : i % 3 === 1 ? 'Chest X-Ray' : 'CT Scan - Abdomen'}
//                   </h3>
//                   <div className="flex gap-4 text-sm text-gray-500 mt-1">
//                     <span>Patient: {
//                       i % 3 === 0 ? 'John Smith' : i % 3 === 1 ? 'Maria Rodriguez' : 'Kevin Thompson'
//                     }</span>
//                     <span>ID: #{1000 + i}</span>
//                     <span>
//                       {i % 3 === 0 ? 'Hematology' : i % 3 === 1 ? 'Radiology' : 'Imaging'}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex flex-wrap items-center gap-4 text-sm">
//                 <div className="flex items-center gap-1">
//                   <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                     i % 4 === 0 ? 'bg-green-100 text-green-800' : 
//                     i % 4 === 1 ? 'bg-blue-100 text-blue-800' : 
//                     i % 4 === 2 ? 'bg-yellow-100 text-yellow-800' :
//                     'bg-red-100 text-red-800'
//                   }`}>
//                     {i % 4 === 0 ? 'Normal' : 
//                      i % 4 === 1 ? 'Pending' : 
//                      i % 4 === 2 ? 'Requires Review' :
//                      'Abnormal'}
//                   </span>
//                 </div>
//                 <span className="text-gray-600">Ordered: {
//                   i % 5 === 0 ? 'Today' :
//                   i % 5 === 1 ? 'Yesterday' :
//                   i % 5 === 2 ? '3 days ago' :
//                   i % 5 === 3 ? '1 week ago' : '2 weeks ago'
//                 }</span>
//                 <div className="flex gap-2">
//                   <Button variant="outline" size="sm" className="border-gray-200 text-gray-700 hover:bg-gray-50">
//                     View
//                   </Button>
//                   <Button variant="outline" size="sm" className="border-gray-200 text-indigo-700 hover:bg-indigo-50">
//                     Print
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Pagination */}
//         <div className="mt-6 flex items-center justify-between">
//           <Button variant="outline" size="sm" className="border-gray-200">
//             Previous
//           </Button>
//           <div className="flex items-center gap-1">
//             <Button variant="outline" size="sm" className="border-gray-200 bg-white w-8 h-8 p-0">1</Button>
//             <Button variant="outline" size="sm" className="border-gray-200 bg-indigo-50 text-indigo-700 w-8 h-8 p-0">2</Button>
//             <Button variant="outline" size="sm" className="border-gray-200 bg-white w-8 h-8 p-0">3</Button>
//             <span className="text-gray-500 mx-1">...</span>
//             <Button variant="outline" size="sm" className="border-gray-200 bg-white w-8 h-8 p-0">8</Button>
//           </div>
//           <Button variant="outline" size="sm" className="border-gray-200">
//             Next
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// Order Tests View component
// function OrderTestsView() {
//   return (
//     <div className="flex flex-col h-full">
//       {/* Patient Selection */}
//       <div className="p-6 border-b border-gray-200 bg-white">
//         <div className="space-y-4">
//           <h2 className="text-lg font-semibold text-gray-900">Order New Diagnostic Test</h2>
          
//           <div className="flex flex-col sm:flex-row gap-4">
//             <div className="relative flex-grow">
//               <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <Input 
//                 className="pl-9 bg-white border-gray-200 rounded-lg h-10 w-full" 
//                 placeholder="Search for patient..." 
//               />
//             </div>
//             <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg">
//               Select Patient
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Test Categories */}
//       <div className="p-6 bg-gray-50 flex-grow">
//         <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Test Categories</h2>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {[
//             { name: "Laboratory", icon: "LB", color: "blue", tests: ["Complete Blood Count", "Metabolic Panel", "Lipid Profile"] },
//             { name: "Imaging", icon: "IM", color: "purple", tests: ["X-Ray", "CT Scan", "MRI", "Ultrasound"] },
//             { name: "Cardiology", icon: "CR", color: "red", tests: ["ECG", "Echocardiogram", "Stress Test"] },
//             { name: "Neurology", icon: "NR", color: "green", tests: ["EEG", "EMG", "Nerve Conduction"] },
//             { name: "Pathology", icon: "PT", color: "orange", tests: ["Biopsy", "Cytology", "Histopathology"] },
//             { name: "Specialized", icon: "SP", color: "teal", tests: ["Genetic Testing", "Immunology", "Microbiology"] },
//           ].map((category, i) => (
//             <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
//               <div className="flex items-center gap-3 mb-3">
//                 <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
//                   category.color === "blue" ? "bg-blue-100 text-blue-600" : 
//                   category.color === "purple" ? "bg-purple-100 text-purple-600" : 
//                   category.color === "red" ? "bg-red-100 text-red-600" : 
//                   category.color === "green" ? "bg-green-100 text-green-600" : 
//                   category.color === "orange" ? "bg-orange-100 text-orange-600" : 
//                   "bg-teal-100 text-teal-600"
//                 }`}>
//                   {category.icon}
//                 </div>
//                 <h3 className="font-medium text-gray-900">{category.name}</h3>
//               </div>
//               <ul className="text-sm text-gray-600 space-y-1 mb-4">
//                 {category.tests.map((test, j) => (
//                   <li key={j} className="flex items-center">
//                     <span className="mr-2">•</span>
//                     {test}
//                   </li>
//                 ))}
//               </ul>
//               <Button variant="outline" size="sm" className="w-full border-gray-200 text-indigo-700 hover:bg-indigo-50">
//                 Browse Tests
//               </Button>
//             </div>
//           ))}
//         </div>
        
//         {/* Quick Order Section */}
//         <div className="mt-8">
//           <h3 className="text-md font-semibold text-gray-900 mb-3">Quick Order Common Tests</h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//             {["Complete Blood Count", "Metabolic Panel", "Urinalysis", "Chest X-Ray", "CT Scan - Head", "MRI - Lumbar", "ECG", "Ultrasound"].map((test, i) => (
//               <Button key={i} variant="outline" className="justify-start border-gray-200 text-gray-700 hover:bg-gray-50">
//                 {test}
//               </Button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }