"use client";

import React, { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCog, Shield, Bell, Palette, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import settings components (these would be created separately)
import ProfileSettings from "./ProfileSettings";
// import SecuritySettings from "./SecuritySettings";
// import NotificationSettings from "./NotificationSettings";
// import AppearanceSettings from "./AppearanceSettings";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  
  // Map to determine which view to show to MainLayout
  const tabToViewMap = {
    "profile": "Profile Settings",
    "security": "Security & Privacy",
    "notifications": "Notifications",
    "appearance": "Appearance"
  };

  return (
    <MainLayout activeView="Settings">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-500 mt-1">Manage your account preferences and application settings</p>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg flex items-center gap-2 self-start">
            <Plus className="h-4 w-4" />
            Save Changes
          </Button>
        </div>

        <Card className="border border-gray-200 shadow-sm rounded-xl overflow-hidden">
          <Tabs 
            defaultValue="profile" 
            className="w-full"
            onValueChange={(value) => setActiveTab(value)}
          >
            <div className="bg-white border-b border-gray-200">
              <div className="px-6 pt-4">
                <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 rounded-lg">
                  <TabsTrigger 
                    value="profile" 
                    className="flex items-center gap-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm"
                  >
                    <UserCog className="h-4 w-4" />
                    <span className="hidden sm:inline font-medium">Profile</span>
                    <span className="sm:hidden font-medium">Profile</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="security" 
                    className="flex items-center gap-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm"
                  >
                    <Shield className="h-4 w-4" />
                    <span className="hidden sm:inline font-medium">Security & Privacy</span>
                    <span className="sm:hidden font-medium">Security</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="notifications" 
                    className="flex items-center gap-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm"
                  >
                    <Bell className="h-4 w-4" />
                    <span className="hidden sm:inline font-medium">Notifications</span>
                    <span className="sm:hidden font-medium">Alerts</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="appearance" 
                    className="flex items-center gap-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm"
                  >
                    <Palette className="h-4 w-4" />
                    <span className="hidden sm:inline font-medium">Appearance</span>
                    <span className="sm:hidden font-medium">Theme</span>
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            <CardContent className="p-0">
              <TabsContent value="profile" className="m-0 focus-visible:outline-none focus-visible:ring-0">
                <ProfileSettings />
              </TabsContent>
              
              <TabsContent value="security" className="m-0 focus-visible:outline-none focus-visible:ring-0">
                {/* <SecuritySettings /> */}
              </TabsContent>
              
              <TabsContent value="notifications" className="m-0 focus-visible:outline-none focus-visible:ring-0">
                {/* <NotificationSettings /> */}
              </TabsContent>
              
              <TabsContent value="appearance" className="m-0 focus-visible:outline-none focus-visible:ring-0">
                {/* <AppearanceSettings /> */}
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </MainLayout>
  );
}