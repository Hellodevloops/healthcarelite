"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  patientName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  phoneNumber: z.string().min(10, { message: "Phone must be at least 10 digits" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  appointmentDate: z.string({ required_error: "Please select a date" }),
  appointmentTime: z.string({ required_error: "Please select a time" }),
  doctorName: z.string({ required_error: "Please select a doctor" }),
  department: z.string().optional(),
  appointmentType: z.string({ required_error: "Please select appointment type" }),
  reason: z.string().min(5, { message: "Please provide a brief reason for your visit" }),
  insurance: z.string().optional().nullable(),
  additionalNotes: z.string().optional().nullable(),
});

type FormValues = z.infer<typeof formSchema>;

export default function AppointmentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientName: "",
      phoneNumber: "",
      email: "",
      appointmentDate: "",
      appointmentTime: "",
      doctorName: "",
      department: "",
      appointmentType: "",
      reason: "",
      insurance: null,
      additionalNotes: null,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", data);
      alert("Appointment scheduled successfully!");
      form.reset();
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Header */}
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
              Schedule an Appointment
            </h2>

          {/* Patient Information */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Patient Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="patientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Full Name</FormLabel>
                    <FormControl>
                      <Input 
                        className="h-10 border-gray-200 focus:ring-2 focus:ring-blue-500 rounded-md" 
                        placeholder="Enter your full name" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Phone Number</FormLabel>
                    <FormControl>
                      <Input 
                        className="h-10 border-gray-200 focus:ring-2 focus:ring-blue-500 rounded-md" 
                        placeholder="Enter phone number" 
                        type="tel" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Email</FormLabel>
                    <FormControl>
                      <Input 
                        className="h-10 border-gray-200 focus:ring-2 focus:ring-blue-500 rounded-md" 
                        placeholder="Enter your email" 
                        type="email" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="insurance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Insurance Provider (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        className="h-10 border-gray-200 focus:ring-2 focus:ring-blue-500 rounded-md" 
                        placeholder="Enter insurance provider" 
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value || null)}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-600" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Appointment Details */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Appointment Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="appointmentDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Preferred Date</FormLabel>
                    <FormControl>
                      <Input
                        className="h-10 border-gray-200 focus:ring-2 focus:ring-blue-500 rounded-md"
                        type="date"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="appointmentTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Preferred Time</FormLabel>
                    <FormControl>
                      <Input
                        className="h-10 border-gray-200 focus:ring-2 focus:ring-blue-500 rounded-md"
                        type="time"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Department</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || ""}>
                      <FormControl>
                        <SelectTrigger className="h-10 border-gray-200 focus:ring-2 focus:ring-blue-500 rounded-md">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="cardiology">Cardiology</SelectItem>
                        <SelectItem value="dermatology">Dermatology</SelectItem>
                        <SelectItem value="neurology">Neurology</SelectItem>
                        <SelectItem value="orthopedics">Orthopedics</SelectItem>
                        <SelectItem value="pediatrics">Pediatrics</SelectItem>
                        <SelectItem value="generalMedicine">General Medicine</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="doctorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Doctor</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || ""}>
                      <FormControl>
                        <SelectTrigger className="h-10 border-gray-200 focus:ring-2 focus:ring-blue-500 rounded-md">
                          <SelectValue placeholder="Select doctor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="dr.smith">Dr. Smith</SelectItem>
                        <SelectItem value="dr.johnson">Dr. Johnson</SelectItem>
                        <SelectItem value="dr.williams">Dr. Williams</SelectItem>
                        <SelectItem value="dr.brown">Dr. Brown</SelectItem>
                        <SelectItem value="dr.jones">Dr. Jones</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="appointmentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Appointment Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || ""}>
                      <FormControl>
                        <SelectTrigger className="h-10 border-gray-200 focus:ring-2 focus:ring-blue-500 rounded-md">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="newPatient">New Patient Consultation</SelectItem>
                        <SelectItem value="followUp">Follow-up Visit</SelectItem>
                        <SelectItem value="checkup">Routine Check-up</SelectItem>
                        <SelectItem value="emergency">Urgent Care</SelectItem>
                        <SelectItem value="telemedicine">Telemedicine</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs text-red-600" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Reason and Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Reason for Visit</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-24 border-gray-200 focus:ring-2 focus:ring-blue-500 rounded-md resize-none"
                      placeholder="Please describe your symptoms or reason for appointment"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="additionalNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Additional Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-24 border-gray-200 focus:ring-2 focus:ring-blue-500 rounded-md resize-none"
                      placeholder="Any additional information you'd like to share"
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value || null)}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-600" />
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200"
            >
              {isSubmitting ? "Scheduling..." : "Schedule Appointment"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}