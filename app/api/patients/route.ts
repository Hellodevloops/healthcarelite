// app/api/patients/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      number,
      age,
      gender,
      address,
      visitDate,
      consultationFees,
      otherFees,
      notes,
      prescription,
      paymentMode,
      status = "New", // Default to "New"
    } = body;

    if (!name || !number) {
      return NextResponse.json(
        { error: "Name and number are required" },
        { status: 400 }
      );
    }

    const patient = await prisma.patient.create({
      data: {
        name,
        number,
        age: age !== null ? Number(age) : null,
        gender: gender || null,
        address: address || null,
        visitDate: visitDate ? new Date(visitDate) : null,
        consultationFees: consultationFees !== null ? Number(consultationFees) : null,
        otherFees: otherFees !== null ? Number(otherFees) : null,
        notes: notes || null,
        prescription: prescription || null,
        paymentMode: paymentMode || null,
        status,
      },
    });

    return NextResponse.json(
      { message: "Patient created successfully", patient },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating patient:", error);
    return NextResponse.json(
      // { error: "Failed to create patient", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const patients = await prisma.patient.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(patients, { status: 200 });
  } catch (error) {
    console.error("Error fetching patients:", error);
    return NextResponse.json(
      { error: "Failed to fetch patients" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, status, ...data } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Patient ID is required" },
        { status: 400 }
      );
    }

    const updatedPatient = await prisma.patient.update({
      where: { id: Number(id) },
      data: {
        name: data.name,
        number: data.number,
        age: data.age !== null ? Number(data.age) : null,
        gender: data.gender || null,
        address: data.address || null,
        visitDate: data.visitDate ? new Date(data.visitDate) : null,
        consultationFees: data.consultationFees !== null ? Number(data.consultationFees) : null,
        otherFees: data.otherFees !== null ? Number(data.otherFees) : null,
        notes: data.notes || null,
        prescription: data.prescription || null,
        paymentMode: data.paymentMode || null,
        status: status || "New",
      },
    });

    return NextResponse.json(
      { message: "Patient updated successfully", patient: updatedPatient },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating patient:", error);
    return NextResponse.json(
      // { error: "Failed to update patient", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Patient ID is required" },
        { status: 400 }
      );
    }

    await prisma.patient.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(
      { message: "Patient deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting patient:", error);
    return NextResponse.json(
      // { error: "Failed to delete patient", details: error.message },
      { status: 500 }
    );
  }
}