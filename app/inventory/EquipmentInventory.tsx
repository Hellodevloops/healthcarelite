
import React from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";



export default function EquipmentInventory() {
    return (
      <div className="flex flex-col h-full">
        {/* Filters & Search */}
        <div className="p-6 border-b border-gray-200 bg-white">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                className="pl-9 bg-white border-gray-200 rounded-lg h-10 w-full" 
                placeholder="Search equipment..." 
              />
            </div>
            <div className="flex gap-3">
              <Select defaultValue="all">
                <SelectTrigger className="h-10 bg-white border-gray-200 rounded-lg min-w-[140px]">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <SelectValue placeholder="Category" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="diagnostic">Diagnostic</SelectItem>
                  <SelectItem value="monitoring">Monitoring</SelectItem>
                  <SelectItem value="surgical">Surgical</SelectItem>
                  <SelectItem value="laboratory">Laboratory</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="allavailable">
                <SelectTrigger className="h-10 bg-white border-gray-200 rounded-lg min-w-[140px]">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <SelectValue placeholder="Status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="allavailable">All Available</SelectItem>
                  <SelectItem value="inuse">In Use</SelectItem>
                  <SelectItem value="maintenance">Under Maintenance</SelectItem>
                  <SelectItem value="outofservice">Out of Service</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
  
        {/* Equipment List */}
        <div className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Medical Equipment Inventory</h2>
            <span className="text-sm text-gray-500">43 items</span>
          </div>
  
          <div className="overflow-hidden border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipment</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Maintenance</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { name: "Digital Blood Pressure Monitor", category: "Diagnostic", location: "Room 101", maintenance: "Jan 15, 2025", status: "Available" },
                  { name: "ECG Machine", category: "Monitoring", location: "Room 205", maintenance: "Feb 10, 2025", status: "In Use" },
                  { name: "Surgical Microscope", category: "Surgical", location: "OR 3", maintenance: "Mar 05, 2025", status: "Available" },
                  { name: "Centrifuge", category: "Laboratory", location: "Lab 2", maintenance: "Dec 20, 2024", status: "Available" },
                  { name: "Ultrasound Machine", category: "Diagnostic", location: "Room 110", maintenance: "Jan 25, 2025", status: "Under Maintenance" },
                  { name: "Patient Monitor", category: "Monitoring", location: "ICU", maintenance: "Feb 28, 2025", status: "In Use" },
                  { name: "Defibrillator", category: "Emergency", location: "ER", maintenance: "Jan 05, 2025", status: "Available" },
                  { name: "X-Ray Machine", category: "Diagnostic", location: "Radiology", maintenance: "Mar 10, 2025", status: "Out of Service" },
                ].map((equipment, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{equipment.name}</div>
                      <div className="text-xs text-gray-500">ID: EQ-{1000 + i}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{equipment.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{equipment.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{equipment.maintenance}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        equipment.status === 'Available' ? 'bg-green-100 text-green-800' : 
                        equipment.status === 'In Use' ? 'bg-blue-100 text-blue-800' : 
                        equipment.status === 'Under Maintenance' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {equipment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="h-8 px-3 text-xs">
                          Update
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