// components/PatientConsultView.tsx
"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Search,
  Stethoscope,
  User,
  Phone,
  Calendar,
  DollarSign,
  FileText,
  CreditCard,
  Save,
  X,
  Clock,
} from "lucide-react";

type Patient = {
  id: number;
  name: string;
  number: string;
  age: number | null;
  gender: string | null;
  address: string | null;
  visitDate: string | null;
  consultationFees: number | null;
  otherFees: number | null;
  notes: string | null;
  prescription: string | null;
  paymentMode: string | null;
  status: "New" | "Consulted";
  createdAt: string;
};

export default function PatientConsultView() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [consultingPatient, setConsultingPatient] = useState<Patient | null>(null);

  // Fetch patients periodically every 30 seconds
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/patients");
        if (!response.ok) throw new Error("Failed to fetch patients");
        const data = await response.json();
        setPatients(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
    const interval = setInterval(fetchPatients, 30000); // Fetch every 30 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Filter patients to show only "New" status
  const filteredPatients = useMemo(() => {
    return patients
      .filter((p) => p.status === "New")
      .filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.number.includes(searchQuery)
      );
  }, [patients, searchQuery]);

  const handleConsult = (patient: Patient) => {
    setConsultingPatient({ ...patient });
  };

  const handleSaveAndNext = async () => {
    if (!consultingPatient) return;

    try {
      const updatedPatient = { ...consultingPatient, status: "Consulted" };
      const response = await fetch("/api/patients", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPatient),
      });
      if (!response.ok) throw new Error("Failed to update patient");

      const result = await response.json();
      setPatients((prev) =>
        prev.map((p) => (p.id === result.patient.id ? result.patient : p))
      );

      // Move to the next "New" patient
      const nextNewPatient = filteredPatients.find(
        (p) => p.id !== consultingPatient.id
      );
      setConsultingPatient(nextNewPatient || null);
    } catch (error) {
      console.error("Error saving consultation:", error);
      alert("Failed to save consultation");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-gray-600 text-lg font-medium flex items-center gap-2">
          <Clock className="h-6 w-6 text-blue-600" />
          Loading Patients...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-red-500 text-lg font-medium flex items-center gap-2">
          <X className="h-6 w-6" />
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-100 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Stethoscope className="h-6 w-6 text-blue-600" />
          Consultation Queue
        </h2>
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
          <Input
            placeholder="Search by name or phone"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 bg-white border-gray-300 focus:ring-1 focus:ring-blue-500 rounded-md text-gray-700"
          />
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto bg-white rounded-lg shadow-sm border border-gray-200">
        <Table>
          <TableHeader className="bg-blue-50 text-gray-700">
            <TableRow>
              <TableHead className="py-4 px-6 font-semibold">
                <User className="inline mr-2 h-5 w-5 text-blue-600" />
                Name
              </TableHead>
              <TableHead className="py-4 px-6 font-semibold">
                <Phone className="inline mr-2 h-5 w-5 text-blue-600" />
                Phone
              </TableHead>
              <TableHead className="py-4 px-6 font-semibold">Age</TableHead>
              <TableHead className="py-4 px-6 font-semibold">Gender</TableHead>
              <TableHead className="py-4 px-6 font-semibold">
                <Calendar className="inline mr-2 h-5 w-5 text-blue-600" />
                Visit Date
              </TableHead>
              <TableHead className="py-4 px-6 font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow key={patient.id} className="border-b border-gray-200 hover:bg-gray-50">
                <TableCell className="py-4 px-6 font-medium text-gray-900">
                  {patient.name}
                </TableCell>
                <TableCell className="py-4 px-6 text-gray-700">{patient.number}</TableCell>
                <TableCell className="py-4 px-6 text-gray-700">{patient.age ?? "N/A"}</TableCell>
                <TableCell className="py-4 px-6 text-gray-700">{patient.gender || "Unknown"}</TableCell>
                <TableCell className="py-4 px-6 text-gray-700">
                  {patient.visitDate
                    ? new Date(patient.visitDate).toLocaleDateString()
                    : "N/A"}
                </TableCell>
                <TableCell className="py-4 px-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleConsult(patient)}
                    className="flex items-center gap-2 border-blue-500 text-blue-600 hover:bg-blue-50"
                  >
                    <Stethoscope className="h-4 w-4" />
                    Consult
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredPatients.length === 0 && (
          <div className="text-center py-12 text-gray-500 font-medium flex items-center justify-center gap-2">
            <Stethoscope className="h-6 w-6 text-gray-500" />
            No new patients in queue
          </div>
        )}
      </div>

      {/* Consultation Modal */}
      <Dialog open={!!consultingPatient} onOpenChange={() => setConsultingPatient(null)}>
        <DialogContent className="max-w-full sm:max-w-md p-6 bg-white rounded-lg shadow-md border border-gray-200">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Stethoscope className="h-6 w-6 text-blue-600" />
              Consult - {consultingPatient?.name}
            </DialogTitle>
          </DialogHeader>
          {consultingPatient && (
            <div className="grid grid-cols-1 gap-6 text-sm">
              <div>
                <label className="font-medium text-gray-700 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Notes
                </label>
                <Textarea
                  value={consultingPatient.notes ?? ""}
                  onChange={(e) =>
                    setConsultingPatient({
                      ...consultingPatient,
                      notes: e.target.value || null,
                    })
                  }
                  className="mt-2 h-24 bg-white border-gray-300 focus:ring-1 focus:ring-blue-500 rounded-md text-gray-700"
                  placeholder="Enter consultation notes"
                />
              </div>
              <div>
                <label className="font-medium text-gray-700 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Prescription
                </label>
                <Textarea
                  value={consultingPatient.prescription ?? ""}
                  onChange={(e) =>
                    setConsultingPatient({
                      ...consultingPatient,
                      prescription: e.target.value || null,
                    })
                  }
                  className="mt-2 h-24 bg-white border-gray-300 focus:ring-1 focus:ring-blue-500 rounded-md text-gray-700"
                  placeholder="Enter prescription details"
                />
              </div>
              <div>
                <label className="font-medium text-gray-700 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                  Consultation Fees
                </label>
                <Input
                  type="number"
                  value={consultingPatient.consultationFees ?? ""}
                  onChange={(e) =>
                    setConsultingPatient({
                      ...consultingPatient,
                      consultationFees: e.target.value ? Number(e.target.value) : null,
                    })
                  }
                  className="mt-2 h-10 bg-white border-gray-300 focus:ring-1 focus:ring-blue-500 rounded-md text-gray-700"
                  placeholder="Enter fees"
                />
              </div>
              <div>
                <label className="font-medium text-gray-700 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  Payment Mode
                </label>
                <Input
                  value={consultingPatient.paymentMode ?? ""}
                  onChange={(e) =>
                    setConsultingPatient({
                      ...consultingPatient,
                      paymentMode: e.target.value || null,
                    })
                  }
                  className="mt-2 h-10 bg-white border-gray-300 focus:ring-1 focus:ring-blue-500 rounded-md text-gray-700"
                  placeholder="e.g., Cash, Card"
                />
              </div>
            </div>
          )}
          <DialogFooter className="mt-6 flex justify-between">
            <Button
              variant="outline"
              onClick={() => setConsultingPatient(null)}
              className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>
            <Button
              onClick={handleSaveAndNext}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Save className="h-4 w-4" />
              Save and Next
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}