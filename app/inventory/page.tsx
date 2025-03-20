"use client";

import React, { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pill, PlusSquare, Stethoscope, Plus, } from "lucide-react";

import { Button } from "@/components/ui/button";


import MedicationsInventory from "./MedicationsInventory"
import SuppliesInventory from "./SuppliesInventory";
import EquipmentInventory from "./EquipmentInventory";




export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState("medications");
  
  // Map to determine which view to show to MainLayout
  const tabToViewMap = {
    medications: "Medications",
    supplies: "Supplies",
    equipment: "Equipment"
  };

  return (
    <MainLayout activeView={tabToViewMap[activeTab]}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
            <p className="text-gray-500 mt-1">Manage medications, supplies, and equipment</p>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg flex items-center gap-2 self-start">
            <Plus className="h-4 w-4" />
            Add New Item
          </Button>
        </div>

        <Card className="border border-gray-200 shadow-sm rounded-xl overflow-hidden">
          <Tabs 
            defaultValue="medications" 
            className="w-full"
            onValueChange={(value) => setActiveTab(value)}
          >
            <div className="bg-white border-b border-gray-200">
              <div className="px-6 pt-4">
                <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-lg">
                  <TabsTrigger 
                    value="medications" 
                    className="flex items-center gap-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm"
                  >
                    <Pill className="h-4 w-4" />
                    <span className="hidden sm:inline font-medium">Medications</span>
                    <span className="sm:hidden font-medium">Meds</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="supplies" 
                    className="flex items-center gap-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm"
                  >
                    <PlusSquare className="h-4 w-4" />
                    <span className="hidden sm:inline font-medium">Supplies</span>
                    <span className="sm:hidden font-medium">Supplies</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="equipment" 
                    className="flex items-center gap-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm"
                  >
                    <Stethoscope className="h-4 w-4" />
                    <span className="hidden sm:inline font-medium">Equipment</span>
                    <span className="sm:hidden font-medium">Equip</span>
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            <CardContent className="p-0">
              <TabsContent value="medications" className="m-0 focus-visible:outline-none focus-visible:ring-0">
                <MedicationsInventory />
              </TabsContent>
              
              <TabsContent value="supplies" className="m-0 focus-visible:outline-none focus-visible:ring-0">
                <SuppliesInventory />
              </TabsContent>
              
              <TabsContent value="equipment" className="m-0 focus-visible:outline-none focus-visible:ring-0">
                <EquipmentInventory />
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </MainLayout>
  );
}

// Medications Inventory component
// function MedicationsInventory() {
//   return (
//     <div className="flex flex-col h-full">
//       {/* Filters & Search */}
//       <div className="p-6 border-b border-gray-200 bg-white">
//         <div className="flex flex-col sm:flex-row gap-4">
//           <div className="relative flex-grow">
//             <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//             <Input 
//               className="pl-9 bg-white border-gray-200 rounded-lg h-10 w-full" 
//               placeholder="Search medications..." 
//             />
//           </div>
//           <div className="flex gap-3">
//             <Select defaultValue="all">
//               <SelectTrigger className="h-10 bg-white border-gray-200 rounded-lg min-w-[140px]">
//                 <div className="flex items-center gap-2">
//                   <Filter className="h-4 w-4 text-gray-500" />
//                   <SelectValue placeholder="Category" />
//                 </div>
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Categories</SelectItem>
//                 <SelectItem value="analgesics">Analgesics</SelectItem>
//                 <SelectItem value="antibiotics">Antibiotics</SelectItem>
//                 <SelectItem value="antihypertensives">Antihypertensives</SelectItem>
//                 <SelectItem value="vaccines">Vaccines</SelectItem>
//               </SelectContent>
//             </Select>
            
//             <Select defaultValue="instock">
//               <SelectTrigger className="h-10 bg-white border-gray-200 rounded-lg min-w-[140px]">
//                 <div className="flex items-center gap-2">
//                   <Filter className="h-4 w-4 text-gray-500" />
//                   <SelectValue placeholder="Status" />
//                 </div>
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="instock">In Stock</SelectItem>
//                 <SelectItem value="lowstock">Low Stock</SelectItem>
//                 <SelectItem value="outofstock">Out of Stock</SelectItem>
//                 <SelectItem value="expired">Expired</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//       </div>

//       {/* Medications List */}
//       <div className="p-6">
//         <div className="mb-4 flex items-center justify-between">
//           <h2 className="text-lg font-semibold text-gray-900">Medications Inventory</h2>
//           <span className="text-sm text-gray-500">128 items</span>
//         </div>

//         <div className="overflow-hidden border border-gray-200 rounded-lg">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry</th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {[
//                 { name: "Ibuprofen 200mg", category: "Analgesics", stock: 520, expiry: "Sep 2025", status: "In Stock" },
//                 { name: "Amoxicillin 500mg", category: "Antibiotics", stock: 124, expiry: "Jun 2025", status: "In Stock" },
//                 { name: "Lisinopril 10mg", category: "Antihypertensives", stock: 45, expiry: "Jul 2025", status: "Low Stock" },
//                 { name: "Metformin 500mg", category: "Antidiabetics", stock: 320, expiry: "Dec 2025", status: "In Stock" },
//                 { name: "Influenza Vaccine", category: "Vaccines", stock: 18, expiry: "Apr 2025", status: "Low Stock" },
//                 { name: "Simvastatin 20mg", category: "Statins", stock: 0, expiry: "N/A", status: "Out of Stock" },
//                 { name: "Albuterol Inhaler", category: "Bronchodilators", stock: 35, expiry: "Nov 2025", status: "In Stock" },
//                 { name: "Prednisone 10mg", category: "Corticosteroids", stock: 87, expiry: "May 2025", status: "In Stock" },
//               ].map((medication, i) => (
//                 <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="font-medium text-gray-900">{medication.name}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">{medication.category}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">{medication.stock} units</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">{medication.expiry}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                       medication.status === 'In Stock' ? 'bg-green-100 text-green-800' : 
//                       medication.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' : 
//                       'bg-red-100 text-red-800'
//                     }`}>
//                       {medication.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     <div className="flex space-x-2">
//                       <Button size="sm" variant="outline" className="h-8 px-3 text-xs">
//                         Update
//                       </Button>
//                       <Button size="sm" variant="outline" className="h-8 px-3 text-xs">
//                         View
//                       </Button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// Supplies Inventory component
// function SuppliesInventory() {
//   return (
//     <div className="flex flex-col h-full">
//       {/* Filters & Search */}
//       <div className="p-6 border-b border-gray-200 bg-white">
//         <div className="flex flex-col sm:flex-row gap-4">
//           <div className="relative flex-grow">
//             <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//             <Input 
//               className="pl-9 bg-white border-gray-200 rounded-lg h-10 w-full" 
//               placeholder="Search supplies..." 
//             />
//           </div>
//           <div className="flex gap-3">
//             <Select defaultValue="all">
//               <SelectTrigger className="h-10 bg-white border-gray-200 rounded-lg min-w-[140px]">
//                 <div className="flex items-center gap-2">
//                   <Filter className="h-4 w-4 text-gray-500" />
//                   <SelectValue placeholder="Category" />
//                 </div>
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Categories</SelectItem>
//                 <SelectItem value="bandages">Bandages</SelectItem>
//                 <SelectItem value="syringes">Syringes</SelectItem>
//                 <SelectItem value="gloves">Gloves</SelectItem>
//                 <SelectItem value="masks">Masks</SelectItem>
//               </SelectContent>
//             </Select>
            
//             <Select defaultValue="instock">
//               <SelectTrigger className="h-10 bg-white border-gray-200 rounded-lg min-w-[140px]">
//                 <div className="flex items-center gap-2">
//                   <Filter className="h-4 w-4 text-gray-500" />
//                   <SelectValue placeholder="Status" />
//                 </div>
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="instock">In Stock</SelectItem>
//                 <SelectItem value="lowstock">Low Stock</SelectItem>
//                 <SelectItem value="outofstock">Out of Stock</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//       </div>

//       {/* Supplies List */}
//       <div className="p-6">
//         <div className="mb-4 flex items-center justify-between">
//           <h2 className="text-lg font-semibold text-gray-900">Medical Supplies Inventory</h2>
//           <span className="text-sm text-gray-500">95 items</span>
//         </div>

//         <div className="overflow-hidden border border-gray-200 rounded-lg">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {[
//                 { name: "Sterile Gauze Pads", category: "Bandages", quantity: 430, unit: "packs", status: "In Stock" },
//                 { name: "Nitrile Gloves (S)", category: "Gloves", quantity: 1200, unit: "pieces", status: "In Stock" },
//                 { name: "Nitrile Gloves (M)", category: "Gloves", quantity: 620, unit: "pieces", status: "In Stock" },
//                 { name: "Nitrile Gloves (L)", category: "Gloves", quantity: 350, unit: "pieces", status: "In Stock" },
//                 { name: "Disposable Syringes 5ml", category: "Syringes", quantity: 210, unit: "pieces", status: "In Stock" },
//                 { name: "Adhesive Bandages", category: "Bandages", quantity: 25, unit: "boxes", status: "Low Stock" },
//                 { name: "Surgical Masks", category: "Masks", quantity: 380, unit: "pieces", status: "In Stock" },
//                 { name: "N95 Respirators", category: "Masks", quantity: 0, unit: "pieces", status: "Out of Stock" },
//               ].map((supply, i) => (
//                 <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="font-medium text-gray-900">{supply.name}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">{supply.category}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">{supply.quantity}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">{supply.unit}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                       supply.status === 'In Stock' ? 'bg-green-100 text-green-800' : 
//                       supply.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' : 
//                       'bg-red-100 text-red-800'
//                     }`}>
//                       {supply.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     <div className="flex space-x-2">
//                       <Button size="sm" variant="outline" className="h-8 px-3 text-xs">
//                         Update
//                       </Button>
//                       <Button size="sm" variant="outline" className="h-8 px-3 text-xs">
//                         View
//                       </Button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// Equipment Inventory component
// function EquipmentInventory() {
//   return (
//     <div className="flex flex-col h-full">
//       {/* Filters & Search */}
//       <div className="p-6 border-b border-gray-200 bg-white">
//         <div className="flex flex-col sm:flex-row gap-4">
//           <div className="relative flex-grow">
//             <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//             <Input 
//               className="pl-9 bg-white border-gray-200 rounded-lg h-10 w-full" 
//               placeholder="Search equipment..." 
//             />
//           </div>
//           <div className="flex gap-3">
//             <Select defaultValue="all">
//               <SelectTrigger className="h-10 bg-white border-gray-200 rounded-lg min-w-[140px]">
//                 <div className="flex items-center gap-2">
//                   <Filter className="h-4 w-4 text-gray-500" />
//                   <SelectValue placeholder="Category" />
//                 </div>
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Categories</SelectItem>
//                 <SelectItem value="diagnostic">Diagnostic</SelectItem>
//                 <SelectItem value="monitoring">Monitoring</SelectItem>
//                 <SelectItem value="surgical">Surgical</SelectItem>
//                 <SelectItem value="laboratory">Laboratory</SelectItem>
//               </SelectContent>
//             </Select>
            
//             <Select defaultValue="allavailable">
//               <SelectTrigger className="h-10 bg-white border-gray-200 rounded-lg min-w-[140px]">
//                 <div className="flex items-center gap-2">
//                   <Filter className="h-4 w-4 text-gray-500" />
//                   <SelectValue placeholder="Status" />
//                 </div>
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="allavailable">All Available</SelectItem>
//                 <SelectItem value="inuse">In Use</SelectItem>
//                 <SelectItem value="maintenance">Under Maintenance</SelectItem>
//                 <SelectItem value="outofservice">Out of Service</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//       </div>

//       {/* Equipment List */}
//       <div className="p-6">
//         <div className="mb-4 flex items-center justify-between">
//           <h2 className="text-lg font-semibold text-gray-900">Medical Equipment Inventory</h2>
//           <span className="text-sm text-gray-500">43 items</span>
//         </div>

//         <div className="overflow-hidden border border-gray-200 rounded-lg">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipment</th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Maintenance</th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {[
//                 { name: "Digital Blood Pressure Monitor", category: "Diagnostic", location: "Room 101", maintenance: "Jan 15, 2025", status: "Available" },
//                 { name: "ECG Machine", category: "Monitoring", location: "Room 205", maintenance: "Feb 10, 2025", status: "In Use" },
//                 { name: "Surgical Microscope", category: "Surgical", location: "OR 3", maintenance: "Mar 05, 2025", status: "Available" },
//                 { name: "Centrifuge", category: "Laboratory", location: "Lab 2", maintenance: "Dec 20, 2024", status: "Available" },
//                 { name: "Ultrasound Machine", category: "Diagnostic", location: "Room 110", maintenance: "Jan 25, 2025", status: "Under Maintenance" },
//                 { name: "Patient Monitor", category: "Monitoring", location: "ICU", maintenance: "Feb 28, 2025", status: "In Use" },
//                 { name: "Defibrillator", category: "Emergency", location: "ER", maintenance: "Jan 05, 2025", status: "Available" },
//                 { name: "X-Ray Machine", category: "Diagnostic", location: "Radiology", maintenance: "Mar 10, 2025", status: "Out of Service" },
//               ].map((equipment, i) => (
//                 <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="font-medium text-gray-900">{equipment.name}</div>
//                     <div className="text-xs text-gray-500">ID: EQ-{1000 + i}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">{equipment.category}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">{equipment.location}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">{equipment.maintenance}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                       equipment.status === 'Available' ? 'bg-green-100 text-green-800' : 
//                       equipment.status === 'In Use' ? 'bg-blue-100 text-blue-800' : 
//                       equipment.status === 'Under Maintenance' ? 'bg-yellow-100 text-yellow-800' : 
//                       'bg-red-100 text-red-800'
//                     }`}>
//                       {equipment.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     <div className="flex space-x-2">
//                       <Button size="sm" variant="outline" className="h-8 px-3 text-xs">
//                         Update
//                       </Button>
//                       <Button size="sm" variant="outline" className="h-8 px-3 text-xs">
//                         View
//                       </Button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }