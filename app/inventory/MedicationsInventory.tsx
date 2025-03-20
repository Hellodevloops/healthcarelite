

import {  Search, Filter,  } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";





export default function MedicationsInventory() {
    return (
      <div className="flex flex-col h-full">
        {/* Filters & Search */}
        <div className="p-6 border-b border-gray-200 bg-white">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                className="pl-9 bg-white border-gray-200 rounded-lg h-10 w-full" 
                placeholder="Search medications..." 
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
                  <SelectItem value="analgesics">Analgesics</SelectItem>
                  <SelectItem value="antibiotics">Antibiotics</SelectItem>
                  <SelectItem value="antihypertensives">Antihypertensives</SelectItem>
                  <SelectItem value="vaccines">Vaccines</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="instock">
                <SelectTrigger className="h-10 bg-white border-gray-200 rounded-lg min-w-[140px]">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <SelectValue placeholder="Status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instock">In Stock</SelectItem>
                  <SelectItem value="lowstock">Low Stock</SelectItem>
                  <SelectItem value="outofstock">Out of Stock</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
  
        {/* Medications List */}
        <div className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Medications Inventory</h2>
            <span className="text-sm text-gray-500">128 items</span>
          </div>
  
          <div className="overflow-hidden border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { name: "Ibuprofen 200mg", category: "Analgesics", stock: 520, expiry: "Sep 2025", status: "In Stock" },
                  { name: "Amoxicillin 500mg", category: "Antibiotics", stock: 124, expiry: "Jun 2025", status: "In Stock" },
                  { name: "Lisinopril 10mg", category: "Antihypertensives", stock: 45, expiry: "Jul 2025", status: "Low Stock" },
                  { name: "Metformin 500mg", category: "Antidiabetics", stock: 320, expiry: "Dec 2025", status: "In Stock" },
                  { name: "Influenza Vaccine", category: "Vaccines", stock: 18, expiry: "Apr 2025", status: "Low Stock" },
                  { name: "Simvastatin 20mg", category: "Statins", stock: 0, expiry: "N/A", status: "Out of Stock" },
                  { name: "Albuterol Inhaler", category: "Bronchodilators", stock: 35, expiry: "Nov 2025", status: "In Stock" },
                  { name: "Prednisone 10mg", category: "Corticosteroids", stock: 87, expiry: "May 2025", status: "In Stock" },
                ].map((medication, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{medication.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{medication.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{medication.stock} units</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{medication.expiry}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        medication.status === 'In Stock' ? 'bg-green-100 text-green-800' : 
                        medication.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {medication.status}
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