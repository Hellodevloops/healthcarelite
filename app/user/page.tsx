"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Camera, Edit2, Save, X, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { motion } from "framer-motion";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  avatarUrl?: string;
}

export default function UserProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinDate: "March 13, 2022",
    avatarUrl: "/avatar.jpg",
  });

  const handleSave = () => {
    setIsEditing(false);
    // Add API call to save profile changes here
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-foreground">User Profile</h1>
          <Button
            variant={isEditing ? "outline" : "default"}
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2"
          >
            {isEditing ? (
              <>
                <X className="h-4 w-4" /> Cancel
              </>
            ) : (
              <>
                <Edit2 className="h-4 w-4" /> Edit Profile
              </>
            )}
          </Button>
        </div>

        {/* Profile Card */}
        <Card className="shadow-lg">
          <CardHeader className="relative bg-gradient-to-r from-primary/10 to-transparent">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-background">
                  <AvatarImage src={profile.avatarUrl} alt={profile.name} />
                  <AvatarFallback>{profile.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div>
                <CardTitle className="text-2xl">{profile.name}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Mail className="h-4 w-4" /> {profile.email}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="info">Personal Info</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Personal Info Tab */}
              <TabsContent value="info" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        name="name"
                        value={profile.name}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="text-muted-foreground">{profile.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profile.email}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="text-muted-foreground flex items-center gap-2">
                        <Mail className="h-4 w-4" /> {profile.email}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        name="phone"
                        value={profile.phone}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="text-muted-foreground flex items-center gap-2">
                        <Phone className="h-4 w-4" /> {profile.phone}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    {isEditing ? (
                      <Input
                        id="location"
                        name="location"
                        value={profile.location}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="text-muted-foreground flex items-center gap-2">
                        <MapPin className="h-4 w-4" /> {profile.location}
                      </p>
                    )}
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Joined</Label>
                  <p className="text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> {profile.joinDate}
                  </p>
                </div>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive email notifications</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Enhance account security</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          {isEditing && (
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="h-4 w-4" /> Save Changes
              </Button>
            </CardFooter>
          )}
        </Card>
      </motion.div>
    </MainLayout>
  );
}