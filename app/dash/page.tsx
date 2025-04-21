"use client";

import React, {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import Image from 'next/image';

export default function Dashboard() {
  const [dressImage, setDressImage] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);

  const handleDressImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDressImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUserImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDressPaste = async (e: React.ClipboardEvent<HTMLDivElement>) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const blob = items[i].getAsFile();
        if (blob) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setDressImage(reader.result as string);
          };
          reader.readAsDataURL(blob);
        }
        break;
      }
    }
  };

  const handleUserPaste = async (e: React.ClipboardEvent<HTMLDivElement>) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const blob = items[i].getAsFile();
        if (blob) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setUserImage(reader.result as string);
          };
          reader.readAsDataURL(blob);
        }
        break;
      }
    }
  };


  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-4">
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="mb-4 glow-border">
            <CardHeader>
              <CardTitle>Upload Dress Image</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Input
                type="file"
                accept="image/*"
                onChange={handleDressImageUpload}
                className="mb-4"
              />
              <div
                onPaste={handleDressPaste}
                className="border-2 border-dashed rounded-md p-4 w-full text-center cursor-pointer"
              >
                Paste dress image here
              </div>
              {dressImage && (
                <div className="mt-4">
                  <Image src={dressImage} alt="Uploaded Dress Image" className="max-w-md rounded-md"/>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mb-4 glow-border">
            <CardHeader>
              <CardTitle>Upload User Image</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Input
                type="file"
                accept="image/*"
                onChange={handleUserImageUpload}
                className="mb-4"
              />
              <div
                onPaste={handleUserPaste}
                className="border-2 border-dashed rounded-md p-4 w-full text-center cursor-pointer"
              >
                Paste user image here
              </div>
              {userImage && (
                <div className="mt-4">
                  <Image src={userImage} alt="Uploaded User Image" className="max-w-md rounded-md"/>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="glow-border">
          <CardHeader>
            <CardTitle>AI Generated Result</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-64 bg-secondary rounded-md flex items-center justify-center">
              Placeholder for AI generated image
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
