"use client";

import React from "react";
import MainLayout from "@/components/MainLayout";
import PatientsList from "@/components/PatientsList";

export default function PatientListPage() {
  return (
    <MainLayout activeView="AllPatients">
      <PatientsList />
    </MainLayout>
  );
}