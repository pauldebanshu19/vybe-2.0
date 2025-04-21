"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from 'next/image';
import { GoogleGenAI, Modality } from "@google/genai";
import { ImageIcon, MessageSquare, Lightbulb } from "lucide-react";

// Add these styles to your global CSS or as a styled component
const promptInputStyles = {
  promptBox: "bg-[#2c2d32] rounded-lg p-4 min-h-[120px] w-full text-white resize-none border-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500",
  generateBtn: "w-full bg-[#3a3b3f] hover:bg-[#4a4b4f] text-white py-3 rounded-lg transition-colors font-medium text-center mt-4"
};

export default function Dashboard() {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [apiKey, setApiKey] = useState<string>("");
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resultText, setResultText] = useState<string | null>(null);
  const [displayedPrompt, setDisplayedPrompt] = useState<string>("");
  const [showExample, setShowExample] = useState(true);

  // Example data
  const examplePrompt = "Transform this casual dress into an elegant evening gown with a deep blue color and sparkly details";
  const useExample = () => {
    setPrompt(examplePrompt);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setShowExample(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePaste = async (e: React.ClipboardEvent<HTMLDivElement>) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const blob = items[i].getAsFile();
        if (blob) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImage(reader.result as string);
            setShowExample(false);
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
    if (!image) {
      alert("Please upload an image first!");
      return;
    }

    if (!prompt) {
      alert("Please enter a prompt!");
      return;
    }

    setDisplayedPrompt(prompt);
    setShowExample(false);

    try {
      setLoading(true);
      
      // Initialize the Gemini API client
      const ai = new GoogleGenAI({ 
        apiKey: apiKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY || "" 
      });

      // Prepare the content parts including the image
      const contents = [
        { text: prompt },
        {
          inlineData: {
            mimeType: getMimeType(image),
            data: dataURLToBase64(image),
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
    <div className="min-h-screen bg-[#1a1b1e] text-white">
      <main className="container mx-auto p-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Example Section */}
          {showExample && (
            <div className="bg-[#2c2d32] rounded-lg p-4 border border-gray-700">
              <div className="flex items-start space-x-3 mb-4">
                <Lightbulb className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-300 mb-1">Example</div>
                  <p className="text-gray-200 text-sm">Try this example or upload your own image</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative aspect-[3/4] bg-[#25262b] rounded-lg overflow-hidden">
                  <Image
                    src="/example-dress.jpg"
                    alt="Example Dress"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div className="bg-[#25262b] p-3 rounded-lg mb-3">
                    <p className="text-sm text-gray-300">{examplePrompt}</p>
                  </div>
                  <Button
                    onClick={useExample}
                    className="bg-[#25262b] hover:bg-[#2c2d32] text-gray-300"
                  >
                    Use This Example
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Image Upload Section */}
          <Card className="bg-[#25262b] border-0">
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label 
                  htmlFor="image-upload"
                  className="w-full h-48 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-500 transition-colors"
                >
                  {image ? (
                    <Image 
                      src={image} 
                      alt="Uploaded Image" 
                      width={400}
                      height={400}
                      className="max-h-full w-auto object-contain rounded-lg"
                    />
                  ) : (
                    <div className="text-center">
                      <ImageIcon className="w-12 h-12 mx-auto mb-2 text-gray-500" />
                      <p className="text-gray-400">Click to upload or drag and drop</p>
                    </div>
                  )}
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Prompt Display Section */}
          {displayedPrompt && (
            <div className="bg-[#2c2d32] rounded-lg p-4 border-l-4 border-blue-500">
              <div className="flex items-start space-x-3">
                <MessageSquare className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-300 mb-1">Current Prompt</div>
                  <p className="text-gray-200">{displayedPrompt}</p>
                </div>
              </div>
            </div>
          )}

          {/* Updated Prompt Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-300">Edit Prompt</span>
              <Input
                type="password"
                placeholder="API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-48 bg-[#2c2d32] border-0 text-sm"
              />
            </div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="✨ Describe the magical changes you want to make..."
              rows={2}
              className={promptInputStyles.promptBox}
            />
            <button
              onClick={generateImage}
              disabled={!image || !prompt || loading}
              className={`${promptInputStyles.generateBtn} ${(!image || !prompt || loading) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <>
                  Generating<span className="ml-2 animate-pulse">...</span>
                </>
              ) : (
                ' Generate Image '
              )}
            </button>
          </div>

          {/* Result Section */}
          {(loading || resultImage) && (
            <Card className="bg-[#25262b] border-0">
              <CardContent className="p-6">
                {loading ? (
                  <div className="h-48 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  </div>
                ) : resultImage && (
                  <div className="flex flex-col items-center">
                    <Image 
                      src={resultImage} 
                      alt="Generated Result" 
                      width={600}
                      height={600}
                      className="max-w-full rounded-lg"
                    />
                    {resultText && (
                      <p className="mt-4 text-gray-400 text-center">{resultText}</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
} 