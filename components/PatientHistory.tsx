// Patient History View component

import { User, UserPlus, Clipboard, Search, Filter, Plus, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PatientHistory() {
  return (
    <div className="flex flex-col h-full">
      {/* Search Patient */}
      <div className="p-6 border-b border-gray-200 bg-white">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              className="pl-9 bg-white border-gray-200 rounded-lg h-10 w-full" 
              placeholder="Search patient by name or ID..." 
            />
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white h-10">
            Search
          </Button>
        </div>
      </div>

      {/* Selected Patient History */}
      <div className="p-6">
        <div className="mb-6 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-medium text-lg">
              JS
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">John Smith</h2>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-1">
                <span>ID: #1001</span>
                <span>DOB: 12/15/1985 (40y)</span>
                <span>Phone: (555) 123-4567</span>
                <span>Email: john.smith@example.com</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="ml-auto">
              View Full Profile
            </Button>
          </div>
        </div>

        {/* History Timeline */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Medical History</h3>
            <Select defaultValue="all">
              <SelectTrigger className="h-8 bg-white border-gray-200 rounded-md w-40">
                <div className="flex items-center gap-1">
                  <span className="text-sm">Filter By</span>
                  <ChevronDown className="h-3 w-3" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Records</SelectItem>
                <SelectItem value="visits">Visits Only</SelectItem>
                <SelectItem value="tests">Test Results</SelectItem>
                <SelectItem value="meds">Medications</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <div className="border-l-2 border-indigo-200 ml-4 pt-2 pb-2">
              {/* Timeline events */}
              {[
                { date: "Mar 10, 2025", type: "Visit", title: "Annual Checkup", desc: "General health assessment with Dr. Anderson", status: "Completed" },
                { date: "Feb 25, 2025", type: "Lab Result", title: "Blood Work", desc: "Complete blood count and cholesterol screening", status: "Normal" },
                { date: "Jan 15, 2025", type: "Medication", title: "Lisinopril Renewal", desc: "20mg once daily", status: "Active" },
                { date: "Dec 05, 2024", type: "Visit", title: "Follow-up", desc: "Blood pressure monitoring with Dr. Anderson", status: "Completed" },
                { date: "Nov 20, 2024", type: "Imaging", title: "Chest X-Ray", desc: "Preventive screening", status: "Normal" }
              ].map((item, index) => (
                <div key={index} className="ml-8 mb-8 relative">
                  <div className="absolute -left-10 mt-1.5 w-4 h-4 rounded-full bg-indigo-500 border-4 border-indigo-50"></div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-sm text-gray-500">{item.date}</span>
                        <h4 className="text-lg font-medium text-gray-900 mt-1">{item.title}</h4>
                        <p className="text-gray-600 mt-1">{item.desc}</p>
                      </div>
                      <div className="flex flex-col sm:items-end gap-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.type === 'Visit' ? 'bg-blue-100 text-blue-800' : 
                          item.type === 'Lab Result' ? 'bg-green-100 text-green-800' : 
                          item.type === 'Medication' ? 'bg-purple-100 text-purple-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.type}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.status === 'Completed' ? 'bg-gray-100 text-gray-800' : 
                          item.status === 'Normal' ? 'bg-green-100 text-green-800' : 
                          item.status === 'Active' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.status}
                        </span>
                        <Button variant="outline" size="sm" className="mt-2 text-xs">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Load More */}
          <div className="flex justify-center">
            <Button variant="outline">Load More History</Button>
          </div>
        </div>
      </div>
    </div>
  );
}