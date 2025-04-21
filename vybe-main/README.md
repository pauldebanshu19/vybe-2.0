# ✨ VYBE – Instant Fashion, Powered by AI

**VYBE** is a tech-enabled fashion startup that empowers users to turn any style inspiration into custom outfits—instantly. This repository contains the frontend codebase built with **Next.js**, powering the virtual try-on, AI style remixing, and user experience layer.

## 👗 What is VYBE?

At VYBE, we believe inspiration should be wearable.

- Upload photos or screenshots of fashion you love—from social media, streetwear, or runways  
- Visualize outfits on 3D avatars that match your body type  
- Remix with AI: change colors, adjust fit, alter design details  
- Instantly send your creation to local tailors or micro-factories  
- Receive your made-to-order outfit in just a few hours

All while anonymously contributing to a real-time trend engine that helps brands understand what people *actually* want to wear.

## ⚙️ Getting Started (Local Development)

### 1. Clone the Repo
```bash
git clone https://github.com/pauldebanshu19/vybe-2.0.git
cd vybe
```

### 2. Add Your Environment Variables
Create a `.env.local` file in the root directory with the following:
```
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

🔐 Keep this file private. Do **not** commit it to GitHub.

### 3. Install Dependencies
Make sure you have Node.js installed (v18+ recommended), then run:
```bash
npm install
```

### 4. Start the Dev Server
```bash
npm run dev
```

Now visit http://localhost:3000 to explore VYBE locally.

## 🚀 Build for Production

To build the app for production:
```bash
npm run build
```

To start the production server:
```bash
npm start
```

## 🧪 Running Tests

```bash
npm run test
```

## 🧵 About the Stack

* **Next.js** – Framework for the frontend
* **AI Integration** – Uses Gemini API for fashion remix features
* **3D Avatars** – Powered by custom visualization tech
* **Micro-fulfillment** – Hyperlocal tailors & makers

## 🧠 VYBE's Mission

We're building the world's fastest, most personalized fashion discovery and fulfillment platform—powered by user inspiration and AI. From trend detection to tailored delivery, VYBE turns creativity into clothing.