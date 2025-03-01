"use client";

import React from "react";
import MainLayout from "@/components/MainLayout";
import PatientForm from "@/components/PatientForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function CreatePatientPage() {
  return (
    <MainLayout activeView="CreatePatient">
      <Card>
        <CardHeader>
          <CardTitle>Create New Patient</CardTitle>
        </CardHeader>
        <CardContent>
          <PatientForm />
        </CardContent>
      </Card>
    </MainLayout>
  );
}