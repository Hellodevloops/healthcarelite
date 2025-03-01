"use client";

import React from "react";
import MainLayout from "@/components/MainLayout";
import ConsultationForm from "@/components/ConsultationForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ConsultationPage() {
  return (
    <MainLayout activeView="Consultation">
      <Card>
        <CardHeader>
          <CardTitle>New Consultation</CardTitle>
        </CardHeader>
        <CardContent>
          <ConsultationForm />
        </CardContent>
      </Card>
    </MainLayout>
  );
}