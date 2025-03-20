"use client";

import React from "react";
import { Search, Filter, Calendar, Download, User,Users ,Activity ,ThumbsUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PatientSummary() {
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
            <Select defaultValue="all-time">
              <SelectTrigger className="h-10 bg-white border-gray-200 rounded-lg min-w-[140px]">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <SelectValue placeholder="Time Period" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-time">All Time</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="this-year">This Year</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="all-patients">
              <SelectTrigger className="h-10 bg-white border-gray-200 rounded-lg min-w-[140px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <SelectValue placeholder="Patient Type" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-patients">All Patients</SelectItem>
                <SelectItem value="new-patients">New Patients</SelectItem>
                <SelectItem value="returning">Returning Patients</SelectItem>
                <SelectItem value="chronic">Chronic Conditions</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6">
        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Patients</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">3,248</h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-green-600 mt-2">+124 this month</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">New Patients</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">218</h3>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <User className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-green-600 mt-2">+28% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Avg. Visits per Patient</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">3.4</h3>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Activity className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
            <p className="text-xs text-green-600 mt-2">+0.2 from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Patient Satisfaction</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">94%</h3>
              </div>
              <div className="p-2 bg-indigo-100 rounded-lg">
                <ThumbsUp className="h-5 w-5 text-indigo-600" />
              </div>
            </div>
            <p className="text-xs text-green-600 mt-2">+2% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Patient Demographics */}
      <div className="p-6 pt-0">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Patient Demographics</h2>
          <Button variant="outline" className="h-9 gap-2 text-gray-600">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Age Distribution</h3>
              <div className="space-y-3">
                {[
                  { age: "0-18", count: 546, percentage: 17 },
                  { age: "19-35", count: 924, percentage: 28 },
                  { age: "36-50", count: 829, percentage: 26 },
                  { age: "51-65", count: 632, percentage: 19 },
                  { age: "65+", count: 317, percentage: 10 },
                ].map((item, i) => (
                  <div key={i} className="flex items-center">
                    <span className="text-sm font-medium text-gray-700 w-16">{item.age}</span>
                    <div className="flex-grow mx-3">
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div 
                          className="h-2 bg-indigo-500 rounded-full" 
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500 w-16">{item.count} ({item.percentage}%)</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Top Medical Conditions</h3>
              <div className="space-y-3">
                {[
                  { condition: "Hypertension", count: 428, percentage: 13 },
                  { condition: "Diabetes", count: 312, percentage: 10 },
                  { condition: "Asthma", count: 283, percentage: 9 },
                  { condition: "Arthritis", count: 256, percentage: 8 },
                  { condition: "Depression", count: 214, percentage: 7 },
                ].map((item, i) => (
                  <div key={i} className="flex items-center">
                    <span className="text-sm font-medium text-gray-700 w-28 truncate">{item.condition}</span>
                    <div className="flex-grow mx-3">
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div 
                          className="h-2 bg-blue-500 rounded-full" 
                          style={{ width: `${item.percentage * 5}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500 w-24">{item.count} ({item.percentage}%)</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Patients */}
      <div className="p-6 pt-0">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Patients</h2>
        <div className="overflow-hidden border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { name: "Sarah Johnson", age: 42, gender: "Female", lastVisit: "Mar 18, 2025", condition: "Hypertension" },
                { name: "Michael Davis", age: 28, gender: "Male", lastVisit: "Mar 17, 2025", condition: "Asthma" },
                { name: "Emma Wilson", age: 35, gender: "Female", lastVisit: "Mar 16, 2025", condition: "Diabetes" },
                { name: "James Brown", age: 56, gender: "Male", lastVisit: "Mar 15, 2025", condition: "Arthritis" },
                { name: "Lisa Garcia", age: 31, gender: "Female", lastVisit: "Mar 14, 2025", condition: "Anxiety" },
              ].map((patient, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{patient.name}</div>
                    <div className="text-xs text-gray-500">ID: P-{10000 + i}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.age}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.gender}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.lastVisit}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.condition}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="h-8 px-3 text-xs">
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 px-3 text-xs">
                        History
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