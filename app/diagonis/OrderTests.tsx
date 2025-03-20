import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity, FileText, Search, Filter, Plus, ChevronDown, Download, Printer, 
  Calendar, Clock, User, AlertCircle, CheckCircle, Eye, FileSpreadsheet, X 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export default function TestResultsView() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [isNewTestModalOpen, setIsNewTestModalOpen] = useState(false);

  // Sample test results data
  const testResults = [
    {
      id: 1,
      testName: "Complete Blood Count",
      shortName: "CBC",
      patientName: "John Smith",
      patientId: "#1001",
      department: "Hematology",
      status: "Normal",
      statusColor: "green",
      orderedDate: "Mar 15, 2025",
      completedDate: "Mar 16, 2025",
      orderedBy: "Dr. Emily Johnson",
      urgency: "Routine",
      abnormalFlags: 0,
      resultSummary: "All parameters within normal range",
      icon: "CBC"
    },
    {
      id: 2,
      testName: "Chest X-Ray",
      shortName: "XR",
      patientName: "Maria Rodriguez",
      patientId: "#1002",
      department: "Radiology",
      status: "Abnormal",
      statusColor: "red",
      orderedDate: "Mar 14, 2025",
      completedDate: "Mar 14, 2025",
      orderedBy: "Dr. Robert Chen",
      urgency: "Urgent",
      abnormalFlags: 2,
      resultSummary: "Bilateral infiltrates detected in lower zones",
      icon: "XR"
    },
    {
      id: 3,
      testName: "CT Scan - Abdomen",
      shortName: "CT",
      patientName: "Kevin Thompson",
      patientId: "#1003",
      department: "Imaging",
      status: "Requires Review",
      statusColor: "yellow",
      orderedDate: "Mar 12, 2025",
      completedDate: "Mar 13, 2025",
      orderedBy: "Dr. Sarah Williams",
      urgency: "High Priority",
      abnormalFlags: 1,
      resultSummary: "Potential abnormality detected - pending specialist review",
      icon: "CT"
    },
    {
      id: 4,
      testName: "Metabolic Panel",
      shortName: "MP",
      patientName: "Lisa Johnson",
      patientId: "#1004",
      department: "Chemistry",
      status: "Pending",
      statusColor: "blue",
      orderedDate: "Mar 18, 2025",
      completedDate: null,
      orderedBy: "Dr. Michael Patel",
      urgency: "Routine",
      abnormalFlags: 0,
      resultSummary: "Processing in lab",
      icon: "MP"
    },
    {
      id: 5,
      testName: "Echocardiogram",
      shortName: "EC",
      patientName: "Daniel Garcia",
      patientId: "#1005",
      department: "Cardiology",
      status: "Normal",
      statusColor: "green",
      orderedDate: "Mar 10, 2025",
      completedDate: "Mar 11, 2025",
      orderedBy: "Dr. Jennifer Lee",
      urgency: "Follow-up",
      abnormalFlags: 0,
      resultSummary: "Normal cardiac function observed",
      icon: "EC"
    }
  ];

  const handleViewResult = (result) => {
    setSelectedResult(result);
    setIsModalOpen(true);
  };

  const handleNewTest = () => {
    setIsNewTestModalOpen(true);
  };

  // Status badge renderer
  const renderStatusBadge = (status, color) => {
    const colorClasses = {
      green: "bg-green-100 text-green-800",
      red: "bg-red-100 text-red-800",
      yellow: "bg-yellow-100 text-yellow-800",
      blue: "bg-blue-100 text-blue-800"
    };
    
    return (
      <Badge className={`${colorClasses[color]} font-medium`}>
        {status === "Normal" && <CheckCircle className="h-3 w-3 mr-1" />}
        {status === "Abnormal" && <AlertCircle className="h-3 w-3 mr-1" />}
        {status === "Requires Review" && <Eye className="h-3 w-3 mr-1" />}
        {status === "Pending" && <Clock className="h-3 w-3 mr-1" />}
        {status}
      </Badge>
    );
  };

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
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="abnormal">Abnormal</SelectItem>
                <SelectItem value="review">Requires Review</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="recent">
              <SelectTrigger className="h-10 bg-white border-gray-200 rounded-lg min-w-[140px]">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <SelectValue placeholder="Date Range" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Last 7 Days</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Test Results List */}
      <div className="p-6 bg-gray-50 flex-grow">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Test Results</h2>
            <p className="text-sm text-gray-500 mt-1">Showing 5 of 24 results</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-gray-200 text-gray-700 hover:bg-gray-50 gap-1">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Dialog open={isNewTestModalOpen} onOpenChange={setIsNewTestModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">New Test</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle className="text-xl">Order New Diagnostic Test</DialogTitle>
                  <DialogDescription>
                    Create a new diagnostic test request for a patient
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="patient">Patient</Label>
                    <Select>
                      <SelectTrigger id="patient" className="bg-white">
                        <SelectValue placeholder="Select patient" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john">John Smith (#1001)</SelectItem>
                        <SelectItem value="maria">Maria Rodriguez (#1002)</SelectItem>
                        <SelectItem value="kevin">Kevin Thompson (#1003)</SelectItem>
                        <SelectItem value="lisa">Lisa Johnson (#1004)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="test">Test Type</Label>
                    <Select>
                      <SelectTrigger id="test" className="bg-white">
                        <SelectValue placeholder="Select test type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cbc">Complete Blood Count</SelectItem>
                        <SelectItem value="xray">Chest X-Ray</SelectItem>
                        <SelectItem value="ct">CT Scan</SelectItem>
                        <SelectItem value="mp">Metabolic Panel</SelectItem>
                        <SelectItem value="echo">Echocardiogram</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="urgency">Urgency</Label>
                    <Select defaultValue="routine">
                      <SelectTrigger id="urgency" className="bg-white">
                        <SelectValue placeholder="Select urgency level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="routine">Routine</SelectItem>
                        <SelectItem value="priority">Priority</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                        <SelectItem value="stat">STAT (Immediate)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="notes">Clinical Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Enter relevant clinical information"
                      className="bg-white resize-none"
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsNewTestModalOpen(false)}>Cancel</Button>
                  <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">Order Test</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Results Cards */}
        <div className="space-y-4">
          {testResults.map((result) => (
            <div key={result.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                    result.statusColor === "green" ? 'bg-green-100 text-green-600' : 
                    result.statusColor === "red" ? 'bg-red-100 text-red-600' : 
                    result.statusColor === "yellow" ? 'bg-yellow-100 text-yellow-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {result.shortName}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{result.testName}</h3>
                    <div className="flex flex-wrap gap-x-4 text-sm text-gray-500 mt-1">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {result.patientName}
                      </span>
                      <span>{result.patientId}</span>
                      <span>{result.department}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  {renderStatusBadge(result.status, result.statusColor)}
                  
                  <span className="flex items-center gap-1 text-gray-600">
                    <Calendar className="h-3 w-3" />
                    {result.completedDate || "Pending"}
                  </span>
                  
                  {result.abnormalFlags > 0 && (
                    <span className="flex items-center gap-1 text-red-700 font-medium">
                      <AlertCircle className="h-3 w-3" />
                      {result.abnormalFlags} {result.abnormalFlags === 1 ? 'flag' : 'flags'}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col sm:flex-row justify-between">
                <p className="text-sm text-gray-600">{result.resultSummary}</p>
                <div className="flex gap-2 mt-3 sm:mt-0">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-gray-200 text-gray-700 hover:bg-gray-50"
                    onClick={() => handleViewResult(result)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-200 text-indigo-700 hover:bg-indigo-50">
                    <Printer className="h-4 w-4 mr-1" />
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
            <Button variant="outline" size="sm" className="border-gray-200 bg-indigo-50 text-indigo-700 w-8 h-8 p-0">1</Button>
            <Button variant="outline" size="sm" className="border-gray-200 bg-white w-8 h-8 p-0">2</Button>
            <Button variant="outline" size="sm" className="border-gray-200 bg-white w-8 h-8 p-0">3</Button>
            <span className="text-gray-500 mx-1">...</span>
            <Button variant="outline" size="sm" className="border-gray-200 bg-white w-8 h-8 p-0">5</Button>
          </div>
          <Button variant="outline" size="sm" className="border-gray-200">
            Next
          </Button>
        </div>
      </div>

      {/* View Result Modal */}
      {selectedResult && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  selectedResult.statusColor === "green" ? 'bg-green-100 text-green-600' : 
                  selectedResult.statusColor === "red" ? 'bg-red-100 text-red-600' : 
                  selectedResult.statusColor === "yellow" ? 'bg-yellow-100 text-yellow-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {selectedResult.shortName}
                </div>
                <div>
                  <DialogTitle className="text-xl">{selectedResult.testName}</DialogTitle>
                  <DialogDescription>
                    {selectedResult.patientName} • {selectedResult.patientId}
                  </DialogDescription>
                </div>
              </div>
              {renderStatusBadge(selectedResult.status, selectedResult.statusColor)}
            </DialogHeader>
            
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 py-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Ordered Date</h4>
                <p className="text-gray-900">{selectedResult.orderedDate}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Completed Date</h4>
                <p className="text-gray-900">{selectedResult.completedDate || "Pending"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Ordered By</h4>
                <p className="text-gray-900">{selectedResult.orderedBy}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Urgency</h4>
                <p className="text-gray-900">{selectedResult.urgency}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Department</h4>
                <p className="text-gray-900">{selectedResult.department}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Abnormal Flags</h4>
                <p className={`${selectedResult.abnormalFlags > 0 ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
                  {selectedResult.abnormalFlags > 0 ? 
                    `${selectedResult.abnormalFlags} ${selectedResult.abnormalFlags === 1 ? 'flag' : 'flags'}` : 
                    'None'}
                </p>
              </div>
            </div>

            <div className="border-t border-b border-gray-200 py-4">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Result Summary</h4>
              <p className="text-gray-900">{selectedResult.resultSummary}</p>
              
              {selectedResult.status !== "Pending" && (
                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Detailed Analysis</h4>
                  <p className="text-sm text-gray-600">
                    This is a detailed analysis of the test results, including all measured parameters, 
                    reference ranges, and clinical interpretations as provided by the laboratory or 
                    imaging department.
                  </p>
                </div>
              )}
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <div className="flex gap-2 w-full sm:w-auto">
                <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50 gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50 gap-2">
                  <Printer className="h-4 w-4" />
                  Print
                </Button>
              </div>
              <Button 
                className="bg-indigo-600 hover:bg-indigo-700"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}