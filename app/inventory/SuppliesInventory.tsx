import React from "react";
import {  Search, Filter, } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";



export default function SuppliesInventory() {
    return (
      <div className="flex flex-col h-full">
        {/* Filters & Search */}
        <div className="p-6 border-b border-gray-200 bg-white">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                className="pl-9 bg-white border-gray-200 rounded-lg h-10 w-full" 
                placeholder="Search supplies..." 
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
                  <SelectItem value="bandages">Bandages</SelectItem>
                  <SelectItem value="syringes">Syringes</SelectItem>
                  <SelectItem value="gloves">Gloves</SelectItem>
                  <SelectItem value="masks">Masks</SelectItem>
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
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
  
        {/* Supplies List */}
        <div className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Medical Supplies Inventory</h2>
            <span className="text-sm text-gray-500">95 items</span>
          </div>
  
          <div className="overflow-hidden border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { name: "Sterile Gauze Pads", category: "Bandages", quantity: 430, unit: "packs", status: "In Stock" },
                  { name: "Nitrile Gloves (S)", category: "Gloves", quantity: 1200, unit: "pieces", status: "In Stock" },
                  { name: "Nitrile Gloves (M)", category: "Gloves", quantity: 620, unit: "pieces", status: "In Stock" },
                  { name: "Nitrile Gloves (L)", category: "Gloves", quantity: 350, unit: "pieces", status: "In Stock" },
                  { name: "Disposable Syringes 5ml", category: "Syringes", quantity: 210, unit: "pieces", status: "In Stock" },
                  { name: "Adhesive Bandages", category: "Bandages", quantity: 25, unit: "boxes", status: "Low Stock" },
                  { name: "Surgical Masks", category: "Masks", quantity: 380, unit: "pieces", status: "In Stock" },
                  { name: "N95 Respirators", category: "Masks", quantity: 0, unit: "pieces", status: "Out of Stock" },
                ].map((supply, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{supply.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{supply.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{supply.quantity}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{supply.unit}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        supply.status === 'In Stock' ? 'bg-green-100 text-green-800' : 
                        supply.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {supply.status}
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