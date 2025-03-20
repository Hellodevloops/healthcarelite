import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Trash2 } from "lucide-react";

export default function ProfileSettings() {
  return (
    <div className="p-6">
      <div className="space-y-8">
        {/* Profile Photo Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Profile Photo</h3>
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {/* Placeholder for profile image */}
                <span className="text-4xl text-gray-400">DR</span>
              </div>
              <button className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1.5 rounded-full shadow-sm hover:bg-indigo-700">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Upload a photo of at least 400x400 pixels</p>
              <div className="flex gap-2">
                <Button variant="outline" className="text-sm flex items-center gap-1">
                  <Camera className="h-4 w-4" />
                  Upload
                </Button>
                <Button variant="outline" className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1">
                  <Trash2 className="h-4 w-4" />
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue="Dr. John" className="w-full" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue="Smith" className="w-full" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="drsmith@clinic.com" className="w-full" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" className="w-full" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Select defaultValue="cardiology">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select specialization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="dermatology">Dermatology</SelectItem>
                  <SelectItem value="neurology">Neurology</SelectItem>
                  <SelectItem value="orthopedics">Orthopedics</SelectItem>
                  <SelectItem value="pediatrics">Pediatrics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="bio">Professional Bio</Label>
              <Textarea 
                id="bio" 
                className="min-h-32 w-full" 
                placeholder="Brief description about your professional background and expertise"
                defaultValue="Board-certified cardiologist with over 15 years of experience specializing in preventive cardiology and heart disease management."
              />
            </div>
          </div>
        </div>

        {/* Availability Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Availability</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h4 className="text-sm font-medium text-gray-900">Online Appointments</h4>
                <p className="text-sm text-gray-500">Allow patients to book virtual consultations</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h4 className="text-sm font-medium text-gray-900">In-Person Appointments</h4>
                <p className="text-sm text-gray-500">Allow patients to book in-clinic visits</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h4 className="text-sm font-medium text-gray-900">Emergency Consultations</h4>
                <p className="text-sm text-gray-500">Make yourself available for urgent care requests</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <div className="flex gap-2">
            <Button variant="outline" className="text-sm">Cancel</Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm">Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
}