import React from "react";
import { Search, Filter, Calendar, Download, Stethoscope, Users, Clock, DollarSign, BarChart2, PieChart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartPieChart, Pie, Cell, LineChart, Line } from "recharts";

export default function DailyConsultations() {
  // Sample data for charts
  const consultationsByHour = [
    { hour: "8AM", count: 3 },
    { hour: "9AM", count: 5 },
    { hour: "10AM", count: 7 },
    { hour: "11AM", count: 4 },
    { hour: "12PM", count: 2 },
    { hour: "1PM", count: 6 },
    { hour: "2PM", count: 8 },
    { hour: "3PM", count: 5 },
    { hour: "4PM", count: 2 },
  ];

  const consultationsByType = [
    { name: "Follow-up", value: 18 },
    { name: "New Patient", value: 8 },
    { name: "Emergency", value: 4 },
    { name: "Procedure", value: 12 },
  ];

  const consultationsByDoctor = [
    { name: "Dr. Smith", count: 15 },
    { name: "Dr. Johnson", count: 12 },
    { name: "Dr. Patel", count: 15 },
  ];

  const weeklyTrend = [
    { day: "Mon", consultations: 35, revenue: 2800 },
    { day: "Tue", consultations: 38, revenue: 3050 },
    { day: "Wed", consultations: 40, revenue: 3200 },
    { day: "Thu", consultations: 42, revenue: 3250 },
    { day: "Fri", consultations: 45, revenue: 3600 },
    { day: "Sat", consultations: 30, revenue: 2400 },
    { day: "Sun", consultations: 20, revenue: 1600 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const STATUS_COLORS = {
    'Completed': '#10B981',
    'In Progress': '#3B82F6',
    'Waiting': '#F59E0B',
    'Confirmed': '#6366F1',
    'Rescheduled': '#EF4444',
  };

  const consultationsByStatus = [
    { name: "Completed", value: 15 },
    { name: "In Progress", value: 8 },
    { name: "Waiting", value: 6 },
    { name: "Confirmed", value: 10 },
    { name: "Rescheduled", value: 3 },
  ];

  const consultations = [
    { patient: "Sarah Johnson", doctor: "Dr. Smith", time: "9:00 AM", status: "Completed", type: "Follow-up" },
    { patient: "Michael Davis", doctor: "Dr. Patel", time: "9:30 AM", status: "Completed", type: "New Patient" },
    { patient: "Emma Wilson", doctor: "Dr. Johnson", time: "10:00 AM", status: "In Progress", type: "Follow-up" },
    { patient: "James Brown", doctor: "Dr. Smith", time: "10:30 AM", status: "Waiting", type: "Emergency" },
    { patient: "Lisa Garcia", doctor: "Dr. Patel", time: "11:00 AM", status: "Confirmed", type: "Follow-up" },
    { patient: "Robert Miller", doctor: "Dr. Johnson", time: "11:30 AM", status: "Confirmed", type: "New Patient" },
    { patient: "Jennifer Lee", doctor: "Dr. Smith", time: "1:00 PM", status: "Confirmed", type: "Follow-up" },
    { patient: "William Jones", doctor: "Dr. Patel", time: "1:30 PM", status: "Rescheduled", type: "Follow-up" },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Filters & Search */}
      <div className="p-6 border-b border-gray-200 bg-white">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Daily Consultation Report</h1>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 h-10">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">March 20, 2025</span>
            </div>
            <Button variant="outline" className="h-10 gap-2 text-gray-600">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              className="pl-9 bg-white border-gray-200 rounded-lg h-10 w-full" 
              placeholder="Search by patient name or doctor..." 
            />
          </div>
          <div className="flex gap-3">
            <Select defaultValue="all-doctors">
              <SelectTrigger className="h-10 bg-white border-gray-200 rounded-lg min-w-[140px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <SelectValue placeholder="Doctor" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-doctors">All Doctors</SelectItem>
                <SelectItem value="dr-smith">Dr. Smith</SelectItem>
                <SelectItem value="dr-johnson">Dr. Johnson</SelectItem>
                <SelectItem value="dr-patel">Dr. Patel</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-types">
              <SelectTrigger className="h-10 bg-white border-gray-200 rounded-lg min-w-[140px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <SelectValue placeholder="Type" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-types">All Types</SelectItem>
                <SelectItem value="follow-up">Follow-up</SelectItem>
                <SelectItem value="new-patient">New Patient</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
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
                <p className="text-sm font-medium text-gray-500">Total Consultations</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">42</h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Stethoscope className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-green-600 mt-2">+12% from yesterday</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">New Patients</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">8</h3>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-green-600 mt-2">+5% from yesterday</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Average Wait Time</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">18 min</h3>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
            <p className="text-xs text-red-600 mt-2">+3 min from yesterday</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Revenue</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">$3,250</h3>
              </div>
              <div className="p-2 bg-indigo-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-indigo-600" />
              </div>
            </div>
            <p className="text-xs text-green-600 mt-2">+8% from yesterday</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="p-6 pt-0 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Consultations by Hour */}
        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-gray-900">Consultations by Hour</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={consultationsByHour}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Consultations by Type */}
        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-gray-900">Consultations by Type</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RechartPieChart>
                  <Pie
                    data={consultationsByType}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {consultationsByType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </RechartPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Trend */}
        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-gray-900">Weekly Trend</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="consultations" stroke="#3B82F6" activeDot={{ r: 8 }} />
                  <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#10B981" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Consultations by Status */}
        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-gray-900">Consultations by Status</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={consultationsByStatus}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {consultationsByStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Doctor Performance */}
      <div className="p-6 pt-0">
        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-gray-900">Doctor Performance</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={consultationsByDoctor} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#6366F1" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Consultations List */}
      <div className="p-6 pt-0">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Today's Consultations</h2>
          <Button variant="outline" className="h-9 gap-2 text-gray-600">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>

        <div className="overflow-hidden border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {consultations.map((consultation, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{consultation.patient}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{consultation.doctor}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{consultation.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      consultation.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                      consultation.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                      consultation.status === 'Waiting' ? 'bg-yellow-100 text-yellow-800' : 
                      consultation.status === 'Confirmed' ? 'bg-indigo-100 text-indigo-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {consultation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{consultation.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="h-8 px-3 text-xs">
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 px-3 text-xs">
                        Notes
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