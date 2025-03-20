import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, FlaskConical, FileText, Search, Filter, Plus, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// Test Results View component
export default function TestResultsView() {
  return (
    <div className="flex flex-col h-full">
      {/* Filters & Search */}
      <div className="p-6 border-b border-gray-200 bg-white">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              className="pl-9 bg-white border-gray-200 rounded-lg h-10 w-full" 
              placeholder="Search tests or patients..." 
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
                <SelectItem value="all">All Results</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="abnormal">Abnormal</SelectItem>
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
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="patient">Patient Name</SelectItem>
                <SelectItem value="test-type">Test Type</SelectItem>
                <SelectItem value="urgency">Urgency</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Test Results List */}
      <div className="p-6 bg-gray-50 flex-grow">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Test Results</h2>
          <span className="text-sm text-gray-500">24 results</span>
        </div>

        {/* Sample Test Results */}
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                  i % 3 === 0 ? 'bg-green-100 text-green-600' : 
                  i % 3 === 1 ? 'bg-blue-100 text-blue-600' : 
                  'bg-orange-100 text-orange-600'
                }`}>
                  {i % 3 === 0 ? 'CBC' : i % 3 === 1 ? 'XR' : 'CT'}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    {i % 3 === 0 ? 'Complete Blood Count' : i % 3 === 1 ? 'Chest X-Ray' : 'CT Scan - Abdomen'}
                  </h3>
                  <div className="flex gap-4 text-sm text-gray-500 mt-1">
                    <span>Patient: {
                      i % 3 === 0 ? 'John Smith' : i % 3 === 1 ? 'Maria Rodriguez' : 'Kevin Thompson'
                    }</span>
                    <span>ID: #{1000 + i}</span>
                    <span>
                      {i % 3 === 0 ? 'Hematology' : i % 3 === 1 ? 'Radiology' : 'Imaging'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    i % 4 === 0 ? 'bg-green-100 text-green-800' : 
                    i % 4 === 1 ? 'bg-blue-100 text-blue-800' : 
                    i % 4 === 2 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {i % 4 === 0 ? 'Normal' : 
                     i % 4 === 1 ? 'Pending' : 
                     i % 4 === 2 ? 'Requires Review' :
                     'Abnormal'}
                  </span>
                </div>
                <span className="text-gray-600">Ordered: {
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
                    Print
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
            <Button variant="outline" size="sm" className="border-gray-200 bg-white w-8 h-8 p-0">8</Button>
          </div>
          <Button variant="outline" size="sm" className="border-gray-200">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}