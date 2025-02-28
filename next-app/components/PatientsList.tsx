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
import { Badge } from "@/components/ui/badge";
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
  ArrowUpDown,
  User,
  Edit,
  Trash2,
  Search,
  CheckSquare,
  XSquare,
  Circle,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";

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
  createdAt: string;
};

type SortConfig = {
  key: keyof Patient;
  direction: "asc" | "desc";
};

export default function PatientsList() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const itemsPerPage = 10;

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
  }, []);

  const handleSort = (key: keyof Patient) => {
    setSortConfig((prev) => ({
      key,
      direction: prev?.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const filteredPatients = useMemo(() => {
    return patients.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.number.includes(searchQuery)
    );
  }, [patients, searchQuery]);

  const sortedPatients = useMemo(() => {
    if (!sortConfig) return filteredPatients;
    return [...filteredPatients].sort((a, b) => {
      const aValue = a[sortConfig.key] ?? "";
      const bValue = b[sortConfig.key] ?? "";
      if (sortConfig.direction === "asc") {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });
  }, [filteredPatients, sortConfig]);

  const paginatedPatients = sortedPatients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSelectPatient = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === paginatedPatients.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedPatients.map((p) => p.id));
    }
  };

  const handleEdit = (patient: Patient) => {
    setEditingPatient({ ...patient });
  };

  const handleSaveEdit = async () => {
    if (!editingPatient) return;
    try {
      const response = await fetch("/api/patients", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingPatient),
      });
      if (!response.ok) throw new Error("Failed to update patient");
      const updatedPatient = await response.json().then((res) => res.patient);
      setPatients((prev) =>
        prev.map((p) => (p.id === editingPatient.id ? updatedPatient : p))
      );
      setEditingPatient(null);
      if (selectedPatient?.id === editingPatient.id) {
        setSelectedPatient(updatedPatient);
      }
      alert("Patient updated successfully!");
    } catch (error) {
      console.error("Error updating patient:", error);
      alert("Failed to update patient");
    }
  };

  const handleDelete = (id: number) => {
    setSelectedIds([id]);
    setShowDeleteConfirm(true);
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await Promise.all(
        selectedIds.map((id) =>
          fetch(`/api/patients?id=${id}`, {
            method: "DELETE",
          }).then((res) => {
            if (!res.ok) throw new Error(`Failed to delete patient ${id}`);
          })
        )
      );
      setPatients((prev) => prev.filter((p) => !selectedIds.includes(p.id)));
      if (selectedPatient && selectedIds.includes(selectedPatient.id)) {
        setSelectedPatient(null);
      }
      setSelectedIds([]);
      setShowDeleteConfirm(false);
      alert(`Successfully deleted ${selectedIds.length} patient(s)!`);
    } catch (error) {
      console.error("Error deleting patients:", error);
      alert("Failed to delete one or more patients");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="text-gray-500 text-lg"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Table Section */}
        <div className="flex-1 flex flex-col overflow-hidden p-4">
          <div className="flex justify-between items-center mb-4 bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800">
              Patient Records
            </h2>
            <div className="flex gap-4 items-center">
              <div className="relative w-full max-w-xs">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-gray-200 focus:ring-2 focus:ring-blue-500 rounded-md"
                />
              </div>
              {selectedIds.length > 0 && (
                <Button
                  variant="destructive"
                  onClick={handleBulkDelete}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Selected ({selectedIds.length})
                </Button>
              )}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto bg-white rounded-lg shadow-sm">
            <Table>
              <TableHeader className="sticky top-0 bg-gray-100 z-10">
                <TableRow>
                  <TableHead className="w-12">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleSelectAll}
                      className="p-0"
                    >
                      {selectedIds.length === paginatedPatients.length &&
                      selectedIds.length > 0 ? (
                        <CheckSquare className="h-4 w-4 text-gray-700" />
                      ) : (
                        <XSquare className="h-4 w-4 text-gray-700" />
                      )}
                    </Button>
                  </TableHead>
                  <TableHead className="text-sm font-medium text-gray-700">
                    <button
                      className="flex items-center gap-1"
                      onClick={() => handleSort("name")}
                    >
                      Name <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </TableHead>
                  <TableHead className="text-sm font-medium text-gray-700">
                    <button
                      className="flex items-center gap-1"
                      onClick={() => handleSort("number")}
                    >
                      Phone <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </TableHead>
                  <TableHead className="text-sm font-medium text-gray-700">Age</TableHead>
                  <TableHead className="text-sm font-medium text-gray-700">Gender</TableHead>
                  <TableHead className="text-sm font-medium text-gray-700">Visit Date</TableHead>
                  <TableHead className="text-sm font-medium text-gray-700">Total Fees</TableHead>
                  <TableHead className="text-sm font-medium text-gray-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedPatients.map((patient) => (
                  <motion.tr
                    key={patient.id}
                    className={`cursor-pointer ${
                      selectedPatient?.id === patient.id ? "bg-blue-50" : ""
                    }`}
                    whileHover={{ backgroundColor: "#f9fafb" }}
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectPatient(patient.id);
                        }}
                        className="p-0"
                      >
                        {selectedIds.includes(patient.id) ? (
                          <CheckCircle className="h-4 w-4 text-blue-600" />
                        ) : (
                          <Circle className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium text-gray-900 text-sm">
                      {patient.name}
                    </TableCell>
                    <TableCell className="text-sm">{patient.number}</TableCell>
                    <TableCell className="text-sm">{patient.age ?? "N/A"}</TableCell>
                    <TableCell className="text-sm">
                      <Badge variant="outline">{patient.gender || "Unknown"}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {patient.visitDate
                        ? new Date(patient.visitDate).toLocaleDateString()
                        : "N/A"}
                    </TableCell>
                    <TableCell className="text-sm">
                      {((patient.consultationFees || 0) + (patient.otherFees || 0)).toLocaleString() || "N/A"}
                    </TableCell>
                    <TableCell className="text-sm">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(patient);
                          }}
                        >
                          <Edit className="h-4 w-4 text-blue-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(patient.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
            {paginatedPatients.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No patients found.
              </div>
            )}
          </div>
          {sortedPatients.length > itemsPerPage && (
            <div className="flex justify-between items-center p-4 bg-white rounded-b-lg shadow-sm">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Previous
              </Button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {Math.ceil(sortedPatients.length / itemsPerPage)}
              </span>
              <Button
                variant="outline"
                disabled={currentPage === Math.ceil(sortedPatients.length / itemsPerPage)}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </div>

        {/* Details Panel */}
        <motion.div
          className="w-full md:w-[400px] border-l bg-white flex flex-col overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {selectedPatient ? (
            <div className="flex-1 flex flex-col">
              <div className="p-4 border-b bg-gray-100 flex items-center gap-3">
                <User className="h-6 w-6 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-800">
                  {selectedPatient.name}
                </h3>
              </div>
              <motion.div
                className="p-4 flex-1 overflow-y-auto"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-4 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-medium text-gray-700">Phone:</span>
                    <span>{selectedPatient.number}</span>
                    <span className="font-medium text-gray-700">Age:</span>
                    <span>{selectedPatient.age ?? "N/A"}</span>
                    <span className="font-medium text-gray-700">Gender:</span>
                    <span>{selectedPatient.gender || "N/A"}</span>
                    <span className="font-medium text-gray-700">Visit Date:</span>
                    <span>
                      {selectedPatient.visitDate
                        ? new Date(selectedPatient.visitDate).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Address:</span>
                    <p className="mt-1 text-gray-600">
                      {selectedPatient.address || "N/A"}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-medium text-gray-700">Consultation Fees:</span>
                    <span>{selectedPatient.consultationFees?.toLocaleString() ?? "N/A"}</span>
                    <span className="font-medium text-gray-700">Other Fees:</span>
                    <span>{selectedPatient.otherFees?.toLocaleString() ?? "N/A"}</span>
                    <span className="font-medium text-gray-700">Payment Mode:</span>
                    <span>{selectedPatient.paymentMode || "N/A"}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Notes:</span>
                    <p className="mt-1 text-gray-600">
                      {selectedPatient.notes || "No notes available"}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Prescription:</span>
                    <p className="mt-1 text-gray-600">
                      {selectedPatient.prescription || "No prescription"}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-medium text-gray-700">Created:</span>
                    <span>{new Date(selectedPatient.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a patient to view details
            </div>
          )}
        </motion.div>
      </div>

      {/* Edit Modal */}
      <Dialog open={!!editingPatient} onOpenChange={() => setEditingPatient(null)}>
        <DialogContent className="max-w-full sm:max-w-[500px] max-h-[90vh] overflow-y-auto p-4">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-800">
              Edit Patient - {editingPatient?.name}
            </DialogTitle>
          </DialogHeader>
          {editingPatient && (
            <div className="grid grid-cols-1 gap-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-medium text-gray-700">Name</label>
                  <Input
                    value={editingPatient.name}
                    onChange={(e) =>
                      setEditingPatient({ ...editingPatient, name: e.target.value })
                    }
                    className="mt-1 h-9 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="font-medium text-gray-700">Phone</label>
                  <Input
                    value={editingPatient.number}
                    onChange={(e) =>
                      setEditingPatient({ ...editingPatient, number: e.target.value })
                    }
                    className="mt-1 h-9 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-medium text-gray-700">Age</label>
                  <Input
                    type="number"
                    value={editingPatient.age ?? ""}
                    onChange={(e) =>
                      setEditingPatient({
                        ...editingPatient,
                        age: e.target.value ? Number(e.target.value) : null,
                      })
                    }
                    className="mt-1 h-9 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="font-medium text-gray-700">Gender</label>
                  <Input
                    value={editingPatient.gender ?? ""}
                    onChange={(e) =>
                      setEditingPatient({
                        ...editingPatient,
                        gender: e.target.value || null,
                      })
                    }
                    className="mt-1 h-9 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="font-medium text-gray-700">Address</label>
                <Textarea
                  value={editingPatient.address ?? ""}
                  onChange={(e) =>
                    setEditingPatient({
                      ...editingPatient,
                      address: e.target.value || null,
                    })
                  }
                  className="mt-1 h-16 focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-medium text-gray-700">Visit Date</label>
                  <Input
                    type="date"
                    value={editingPatient.visitDate?.split("T")[0] ?? ""}
                    onChange={(e) =>
                      setEditingPatient({
                        ...editingPatient,
                        visitDate: e.target.value || null,
                      })
                    }
                    className="mt-1 h-9 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="font-medium text-gray-700">Consultation Fees</label>
                  <Input
                    type="number"
                    value={editingPatient.consultationFees ?? ""}
                    onChange={(e) =>
                      setEditingPatient({
                        ...editingPatient,
                        consultationFees: e.target.value ? Number(e.target.value) : null,
                      })
                    }
                    className="mt-1 h-9 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-medium text-gray-700">Other Fees</label>
                  <Input
                    type="number"
                    value={editingPatient.otherFees ?? ""}
                    onChange={(e) =>
                      setEditingPatient({
                        ...editingPatient,
                        otherFees: e.target.value ? Number(e.target.value) : null,
                      })
                    }
                    className="mt-1 h-9 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="font-medium text-gray-700">Payment Mode</label>
                  <Input
                    value={editingPatient.paymentMode ?? ""}
                    onChange={(e) =>
                      setEditingPatient({
                        ...editingPatient,
                        paymentMode: e.target.value || null,
                      })
                    }
                    className="mt-1 h-9 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="font-medium text-gray-700">Notes</label>
                <Textarea
                  value={editingPatient.notes ?? ""}
                  onChange={(e) =>
                    setEditingPatient({
                      ...editingPatient,
                      notes: e.target.value || null,
                    })
                  }
                  className="mt-1 h-16 focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <div>
                <label className="font-medium text-gray-700">Prescription</label>
                <Textarea
                  value={editingPatient.prescription ?? ""}
                  onChange={(e) =>
                    setEditingPatient({
                      ...editingPatient,
                      prescription: e.target.value || null,
                    })
                  }
                  className="mt-1 h-16 focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>
          )}
          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => setEditingPatient(null)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveEdit}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600">
            Are you sure you want to delete{" "}
            {selectedIds.length === 1
              ? "this patient"
              : `${selectedIds.length} patients`}
            ? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}