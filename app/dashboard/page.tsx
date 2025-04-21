// "use client"

// import type React from "react"

// import { useState } from "react"
// import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core"
// import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
// import { CSS } from "@dnd-kit/utilities"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Upload, ImageIcon, User, Wand2, ArrowLeft } from "lucide-react"
// import Link from "next/link"
// import Image from "next/image"

// type UploadedImage = {
//   id: string
//   type: "dress" | "user"
//   url: string
// }

// type DashboardWidget = {
//   id: string
//   type: "upload" | "result"
// }

// export default function Dashboard() {
//   const [widgets, setWidgets] = useState<DashboardWidget[]>([
//     { id: "upload-widget", type: "upload" },
//     { id: "result-widget", type: "result" },
//   ])

//   const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
//   const [isGenerating, setIsGenerating] = useState(false)
//   const [resultImage, setResultImage] = useState<string | null>(null)

//   const handleDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event

//     if (over && active.id !== over.id) {
//       setWidgets((items) => {
//         const oldIndex = items.findIndex((item) => item.id === active.id)
//         const newIndex = items.findIndex((item) => item.id === over.id)
//         return arrayMove(items, oldIndex, newIndex)
//       })
//     }
//   }

//   const handleImageUpload = (type: "dress" | "user", e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0]
//       const imageUrl = URL.createObjectURL(file)

//       // Remove any existing image of the same type
//       const filteredImages = uploadedImages.filter((img) => img.type !== type)

//       setUploadedImages([...filteredImages, { id: `${type}-${Date.now()}`, type, url: imageUrl }])
//     }
//   }

//   const handleGenerate = () => {
//     if (uploadedImages.length < 2) return

//     setIsGenerating(true)

//     // Simulate AI processing
//     setTimeout(() => {
//       setIsGenerating(false)
//       // Placeholder result - in a real app this would come from the backend
//       setResultImage("/placeholder.svg?height=600&width=400")
//     }, 2000)
//   }

//   const getDressImage = () => uploadedImages.find((img) => img.type === "dress")?.url
//   const getUserImage = () => uploadedImages.find((img) => img.type === "user")?.url

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
//       <header className="border-b border-gray-800 bg-black/80 backdrop-blur-md">
//         <div className="container mx-auto flex items-center justify-between p-4">
//           <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white">
//             <ArrowLeft className="h-5 w-5" />
//             <span>VYBE</span>
//           </Link>
//           <Button variant="outline" className="border-gray-700 bg-black/50 text-white hover:bg-gray-800">
//             <User className="mr-2 h-4 w-4" /> Account
//           </Button>
//         </div>
//       </header>

//       <main className="container mx-auto px-4 py-8">
//         <h1 className="mb-8 text-3xl font-bold">Virtual Try-On Studio</h1>

//         <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//           <SortableContext items={widgets} strategy={verticalListSortingStrategy}>
//             <div className="grid gap-8 md:grid-cols-2">
//               {widgets.map((widget) =>
//                 widget.type === "upload" ? (
//                   <SortableWidget key={widget.id} id={widget.id}>
//                     <Card className="border-gray-800 bg-black/50 backdrop-blur-md">
//                       <CardHeader>
//                         <CardTitle>Upload Your Images</CardTitle>
//                         <CardDescription className="text-gray-400">
//                           Upload a dress you like and a photo of yourself
//                         </CardDescription>
//                       </CardHeader>
//                       <CardContent className="grid gap-6 md:grid-cols-2">
//                         <UploadCard
//                           title="Dress Image"
//                           description="Upload a dress you'd like to try on"
//                           icon={<ImageIcon className="h-8 w-8 text-purple-400" />}
//                           image={getDressImage()}
//                           onUpload={(e) => handleImageUpload("dress", e)}
//                         />

//                         <UploadCard
//                           title="Your Photo"
//                           description="Upload a photo of yourself"
//                           icon={<User className="h-8 w-8 text-blue-400" />}
//                           image={getUserImage()}
//                           onUpload={(e) => handleImageUpload("user", e)}
//                         />
//                       </CardContent>
//                       <CardFooter>
//                         <Button
//                           className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
//                           disabled={uploadedImages.length < 2 || isGenerating}
//                           onClick={handleGenerate}
//                         >
//                           {isGenerating ? (
//                             <>
//                               Generating<span className="ml-2 animate-pulse">...</span>
//                             </>
//                           ) : (
//                             <>
//                               <Wand2 className="mr-2 h-4 w-4" /> Generate Try-On
//                             </>
//                           )}
//                         </Button>
//                       </CardFooter>
//                     </Card>
//                   </SortableWidget>
//                 ) : (
//                   <SortableWidget key={widget.id} id={widget.id}>
//                     <Card className="border-gray-800 bg-black/50 backdrop-blur-md">
//                       <CardHeader>
//                         <CardTitle>AI Generated Result</CardTitle>
//                         <CardDescription className="text-gray-400">See how the dress looks on you</CardDescription>
//                       </CardHeader>
//                       <CardContent className="flex min-h-[300px] items-center justify-center">
//                         {resultImage ? (
//                           <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
//                             <Image
//                               src={resultImage || "/placeholder.svg"}
//                               alt="AI Generated Try-On"
//                               fill
//                               className="object-contain"
//                             />
//                           </div>
//                         ) : (
//                           <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-700 p-12 text-center">
//                             <Wand2 className="mb-4 h-12 w-12 text-gray-500" />
//                             <p className="text-gray-400">
//                               {uploadedImages.length < 2
//                                 ? "Upload both images to generate a result"
//                                 : "Click 'Generate Try-On' to see the result"}
//                             </p>
//                           </div>
//                         )}
//                       </CardContent>
//                       <CardFooter className="flex justify-end gap-2">
//                         {resultImage && (
//                           <>
//                             <Button
//                               variant="outline"
//                               className="border-gray-700 bg-black/50 text-white hover:bg-gray-800"
//                             >
//                               Save
//                             </Button>
//                             <Button className="bg-purple-600 text-white hover:bg-purple-700">Customize</Button>
//                           </>
//                         )}
//                       </CardFooter>
//                     </Card>
//                   </SortableWidget>
//                 ),
//               )}
//             </div>
//           </SortableContext>
//         </DndContext>
//       </main>
//     </div>
//   )
// }

// function SortableWidget({ id, children }: { id: string; children: React.ReactNode }) {
//   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   }

//   return (
//     <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="cursor-move">
//       {children}
//     </div>
//   )
// }

// function UploadCard({
//   title,
//   description,
//   icon,
//   image,
//   onUpload,
// }: {
//   title: string
//   description: string
//   icon: React.ReactNode
//   image?: string
//   onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
// }) {
//   return (
//     <div className="group relative overflow-hidden rounded-xl border border-gray-800 bg-black/30 transition-all duration-300 hover:border-purple-500/50">
//       {image ? (
//         <div className="relative aspect-[3/4] w-full">
//           <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
//           <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
//             <label className="cursor-pointer rounded-lg bg-black/70 px-3 py-2 text-sm text-white backdrop-blur-sm">
//               Replace
//               <input type="file" className="hidden" onChange={onUpload} accept="image/*" />
//             </label>
//           </div>
//         </div>
//       ) : (
//         <label className="flex aspect-[3/4] w-full cursor-pointer flex-col items-center justify-center gap-4 p-6 text-center">
//           {icon}
//           <div>
//             <h3 className="mb-1 font-medium">{title}</h3>
//             <p className="text-xs text-gray-400">{description}</p>
//           </div>
//           <Button variant="outline" className="mt-2 border-gray-700 bg-black/50 text-white hover:bg-gray-800">
//             <Upload className="mr-2 h-4 w-4" /> Upload
//           </Button>
//           <input type="file" className="hidden" onChange={onUpload} accept="image/*" />
//         </label>
//       )}
//     </div>
//   )
// }


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
        { text: "You are given two images.One is the image of user and other is the image of the dress.Combine these images perfectly and realistically without any distortions.Imagine and generate how the user will look like upon wearing the dress.Combine the image of the user with the image of the dress to realistically visualize how the user would look wearing the dress. Ensure the final output is seamless, accurately aligned to the user body, and free from distortions or mismatches in lighting, proportions, or perspective.Make it hyper realistic and extremely detailed and 4K ." },
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