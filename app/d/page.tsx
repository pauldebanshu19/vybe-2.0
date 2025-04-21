"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { GoogleGenAI, Modality } from "@google/genai";

export default function Dashboard() {
  const [dressImage, setDressImage] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resultText, setResultText] = useState<string | null>(null);

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

  // Function to convert data URL to base64
  const dataURLToBase64 = (dataURL: string) => {
    return dataURL.split(',')[1];
  };

  // Function to get image MIME type from data URL
  const getMimeType = (dataURL: string) => {
    return dataURL.split(';')[0].split(':')[1];
  };

  const generateImage = async () => {
    if (!dressImage || !userImage) {
      alert("Please upload both a dress image and a user image");
      return;
    }

    try {
      setLoading(true);
      
      // Initialize the Gemini API client
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || "" });

      // Prepare the content parts including both images
      const contents = [
        { text: "Please create an image showing how this dress would look on this person." },
        {
          inlineData: {
            mimeType: getMimeType(dressImage),
            data: dataURLToBase64(dressImage),
          },
        },
        {
          inlineData: {
            mimeType: getMimeType(userImage),
            data: dataURLToBase64(userImage),
          },
        },
      ];

      // Request both text and image response
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-exp-image-generation",
        contents: contents,
        config: {
          responseModalities: [Modality.TEXT, Modality.IMAGE],
        },
      });

      // Process the response parts
      if (response.candidates && response.candidates[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.text) {
            setResultText(part.text);
          } else if (part.inlineData) {
            const imageData = part.inlineData.data;
            // Convert base64 back to data URL format for display
            setResultImage(`data:${part.inlineData.mimeType};base64,${imageData}`);
          }
        }
      }
    } catch (error) {
      console.error("Error generating image:", error);
      setResultText("Error generating image. Please try again.");
    } finally {
      setLoading(false);
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
                  <Image 
                    src={dressImage} 
                    alt="Uploaded Dress Image" 
                    width={400}
                    height={400}
                    className="max-w-full h-auto rounded-md"
                  />
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
                  <Image 
                    src={userImage} 
                    alt="Uploaded User Image" 
                    width={400}
                    height={400}
                    className="max-w-full h-auto rounded-md"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center my-4">
          <Button 
            onClick={generateImage} 
            disabled={!dressImage || !userImage || loading}
            className="px-8 py-2"
          >
            {loading ? "Processing..." : "Generate Virtual Try-On"}
          </Button>
        </div>

        <Card className="glow-border">
          <CardHeader>
            <CardTitle>AI Generated Result</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="w-full h-64 bg-secondary rounded-md flex items-center justify-center">
                Processing your images...
              </div>
            ) : resultImage ? (
              <div className="flex flex-col items-center">
                <Image 
                  src={resultImage} 
                  alt="AI Generated Result" 
                  width={600}
                  height={600}
                  className="max-w-full h-auto rounded-md"
                />
                {resultText && (
                  <div className="mt-4 text-center">
                    {resultText}
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-64 bg-secondary rounded-md flex items-center justify-center">
                Upload both images and click Generate to see the result
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}