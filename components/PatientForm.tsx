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
import { patientService } from "@/components/services/patientService";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  number: z.string().min(10, { message: "Phone must be at least 10 digits" }),
  age: z.number().min(0).optional().nullable(),
  gender: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  visitDate: z.string().optional().nullable(),
  consultationFees: z.number().min(0).optional().nullable(),
  otherFees: z.number().min(0).optional().nullable(),
  notes: z.string().optional().nullable(),
  prescription: z.string().optional().nullable(),
  paymentMode: z.string().optional().nullable(),
});

type FormValues = z.infer<typeof formSchema>;

export default function PatientForm() {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      number: "",
      age: null,
      gender: null,
      address: null,
      visitDate: null,
      consultationFees: null,
      otherFees: null,
      notes: null,
      prescription: null,
      paymentMode: null,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setError(null);
      setIsSubmitting(true);
      await patientService.createPatient(data);
      alert("Patient data saved successfully!");
      form.reset();
    } catch (error: any) {
      setError(error.message || "Failed to save patient data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-200">
              {error}
            </div>
          )}

          {/* Header */}
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
            Patient Information
          </h2>

          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Patient Name</FormLabel>
                  <FormControl>
                    <Input 
                      className="h-10 border-gray-200 focus:ring-2 focus:ring-blue-500 rounded-md" 
                      placeholder="Enter patient name" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="number"
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
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Age</FormLabel>
                  <FormControl>
                    <Input
                      className="h-10 border-gray-200 focus:ring-2 focus:ring-blue-500 rounded-md"
                      type="number"
                      placeholder="Enter age"
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Gender</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value || ""}>
                    <FormControl>
                      <SelectTrigger className="h-10 border-gray-200 focus:ring-2 focus:ring-blue-500 rounded-md">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs text-red-600" />
                </FormItem>
              )}
            />
          </div>

          {/* Address and Visit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Address</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-20 border-gray-200 focus:ring-2 focus:ring-blue-500 rounded-md resize-none"
                      placeholder="Enter patient address"
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value || null)}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="visitDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Visit Date</FormLabel>
                  <FormControl>
                    <Input
                      className="h-10 border-gray-200 focus:ring-2 focus:ring-blue-500 rounded-md"
                      type="date"
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value || null)}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-600" />
                </FormItem>
              )}
            />
          </div>

          {/* Financial Section */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Financial Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="consultationFees"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Consultation Fees</FormLabel>
                    <FormControl>
                      <Input
                        className="h-10 border-gray-200 focus:ring-2 focus:ring-blue-500 rounded-md"
                        type="number"
                        placeholder="Enter fees"
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="otherFees"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Other Fees</FormLabel>
                    <FormControl>
                      <Input
                        className="h-10 border-gray-200 focus:ring-2 focus:ring-blue-500 rounded-md"
                        type="number"
                        placeholder="Enter fees"
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="paymentMode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Payment Mode</FormLabel>
                    <FormControl>
                      <Input
                        className="h-10 border-gray-200 focus:ring-2 focus:ring-blue-500 rounded-md"
                        placeholder="Enter payment mode"
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

          {/* Notes and Prescription */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-24 border-gray-200 focus:ring-2 focus:ring-blue-500 rounded-md resize-none"
                      placeholder="Enter notes"
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value || null)}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="prescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Prescription</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-24 border-gray-200 focus:ring-2 focus:ring-blue-500 rounded-md resize-none"
                      placeholder="Enter prescription"
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
              {isSubmitting ? "Saving..." : "Save & Next"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}