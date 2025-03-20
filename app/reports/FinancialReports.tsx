import React from "react";
import { DollarSign, TrendingUp, CreditCard, Users, Calendar, Clipboard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

export default function FinancialReports() {
  // Sample data for financial metrics
  const monthlyRevenue = [
    { month: "Jan", revenue: 42500, expenses: 28900, profit: 13600 },
    { month: "Feb", revenue: 45200, expenses: 30500, profit: 14700 },
    { month: "Mar", revenue: 48700, expenses: 32100, profit: 16600 },
    { month: "Apr", revenue: 52300, expenses: 33800, profit: 18500 },
    { month: "May", revenue: 49800, expenses: 33200, profit: 16600 },
    { month: "Jun", revenue: 53400, expenses: 34900, profit: 18500 },
  ];

  const revenueByService = [
    { name: "Consultations", value: 45000 },
    { name: "Procedures", value: 32000 },
    { name: "Lab Tests", value: 18000 },
    { name: "Prescriptions", value: 12000 },
    { name: "Medical Supplies", value: 8000 },
  ];

  const insuranceBreakdown = [
    { name: "Medicare", value: 35 },
    { name: "Blue Cross", value: 25 },
    { name: "Cigna", value: 20 },
    { name: "Aetna", value: 15 },
    { name: "Other", value: 5 },
  ];

  const costBreakdown = [
    { name: "Staff Salaries", value: 55 },
    { name: "Medical Supplies", value: 15 },
    { name: "Rent", value: 12 },
    { name: "Equipment", value: 8 },
    { name: "Administration", value: 10 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-white">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Financial Reports</h1>
          <div className="flex items-center gap-3">
            <Select defaultValue="6month">
              <SelectTrigger className="h-10 bg-white border-gray-200 rounded-lg min-w-[180px]">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <SelectValue placeholder="Time Period" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="6month">Last 6 Months</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="h-10 gap-2 text-gray-600">
              <Clipboard className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      {/* Key Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">$291,900</h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <p className="text-xs text-green-600">+8.2% from previous period</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Expenses</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">$193,400</h3>
              </div>
              <div className="p-2 bg-red-100 rounded-lg">
                <CreditCard className="h-5 w-5 text-red-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-4 w-4 text-red-600" />
              <p className="text-xs text-red-600">+6.8% from previous period</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Net Profit</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">$98,500</h3>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <p className="text-xs text-green-600">+10.7% from previous period</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Avg. Revenue per Patient</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">$178</h3>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <p className="text-xs text-green-600">+3.5% from previous period</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue, Expenses, and Profit Trend */}
      <div className="p-6 pt-0">
        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-gray-900">Revenue, Expenses & Profit Trend</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue By Service & Insurance Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 pt-0">
        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-gray-900">Revenue by Service</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueByService} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tickFormatter={(value) => `$${value.toLocaleString()}`} />
                  <YAxis dataKey="name" type="category" width={120} />
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Bar dataKey="value" fill="#3B82F6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-gray-900">Insurance Payer Mix</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-64 flex items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={insuranceBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {insuranceBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Expense Breakdown */}
      <div className="p-6 pt-0">
        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-gray-900">Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={costBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {costBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}