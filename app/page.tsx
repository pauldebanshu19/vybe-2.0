// import Link from "next/link"
// import { TextHoverEffect } from "@/components/ui/text-hover-effect"
// import { Button } from "@/components/ui/button"
// import { ArrowRight } from "lucide-react"

// export default function Home() {
//   return (
//     <div className="flex min-h-screen flex-col bg-black text-white">
//       <main className="flex flex-1 flex-col items-center justify-center px-4 py-16 md:py-24">
//         <div className="relative w-full max-w-5xl">
//           {/* Glow effect */}
//           <div className="absolute -top-[150px] left-1/2 h-[300px] w-[300px] -translate-x-1/2 transform rounded-full bg-purple-500/20 blur-[100px]" />

//           {/* Animated heading */}
//           <div className="mb-8 h-32 w-full sm:h-40 md:h-52">
//             <TextHoverEffect text="VYBE" />
//           </div>

//           <div className="mx-auto max-w-2xl text-center">
//             <h2 className="mb-6 text-xl font-light text-gray-400 md:text-2xl">
//               Turn fashion inspiration into your personal style with AI
//             </h2>

//             <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
//               <Link href="/dashboard">
//                 <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
//                   <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
//                   <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl">
//                     Try It Now <ArrowRight className="ml-2 h-4 w-4" />
//                   </span>
//                 </button>
//               </Link>

//               <Button
//                 variant="outline"
//                 className="border-gray-800 bg-transparent text-gray-300 hover:bg-gray-900 hover:text-white"
//               >
//                 Learn More
//               </Button>
//             </div>
//           </div>

//           {/* Features section */}
//           <div className="mt-24 grid grid-cols-1 gap-8 md:grid-cols-3">
//             <FeatureCard
//               title="Upload Inspiration"
//               description="Share photos of dresses you love from anywhere - social media, runways, or the street."
//               icon="✨"
//             />
//             <FeatureCard
//               title="AI Visualization"
//               description="Our AI instantly shows how those styles would look on your body."
//               icon="🧠"
//             />
//             <FeatureCard
//               title="Customize & Shop"
//               description="Adjust details and purchase your perfect custom outfit."
//               icon="🛍️"
//             />
//           </div>
//         </div>
//       </main>

//       <footer className="border-t border-gray-800 py-6 text-center text-sm text-gray-500">
//         <p>© 2025 VYBE. All rights reserved.</p>
//       </footer>
//     </div>
//   )
// }

// function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
//   return (
//     <div className="group rounded-xl border border-gray-800 bg-black/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/50 hover:bg-black/80">
//       <div className="mb-4 text-3xl">{icon}</div>
//       <h3 className="mb-2 text-lg font-medium text-white">{title}</h3>
//       <p className="text-sm text-gray-400">{description}</p>
//     </div>
//   )
// }



import Link from "next/link"
// import { TextHoverEffect } from "@/components/ui/text-hover-effect"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { LayeredTextEffect } from "@/components/ui/layered-text-effect"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white overflow-hidden scrollbar-hidden">
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-16 md:py-24">
        <div className="relative w-full max-w-5xl">
          {/* Glow effect */}
          <div className="absolute -top-[150px] left-1/2 h-[300px] w-[300px] -translate-x-1/2 transform rounded-full bg-purple-500/20 blur-[100px]" />

          {/* Animated heading */}
          <div className="mb-8 h-32 w-full sm:h-40 md:h-52">
            <LayeredTextEffect text="VYBE" />
          </div>

          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-6 text-xl font-light text-gray-400 md:text-2xl">
              Turn fashion inspiration into your personal style with AI
            </h2>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/dashboard">
                <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                    Try It Now <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </button>
              </Link>

              <Button
                variant="outline"
                className="border-gray-800 bg-transparent text-gray-300 hover:bg-gray-900 hover:text-white"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Features section */}
          <div className="mt-24 grid grid-cols-1 gap-8 md:grid-cols-3">
            <FeatureCard
              title="Upload Inspiration"
              description="Share photos of dresses you love from anywhere - social media, runways, or the street."
              icon="✨"
            />
            <FeatureCard
              title="AI Visualization"
              description="Our AI instantly shows how those styles would look on your body."
              icon="🧠"
            />
            <FeatureCard
              title="Customize & Shop"
              description="Adjust details and purchase your perfect custom outfit."
              icon="🛍️"
            />
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-800 py-6 text-center text-sm text-gray-500">
        <p>© 2025 VYBE. All rights reserved.</p>
      </footer>
    </div>
  )
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="group rounded-xl border border-gray-800 bg-black/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/50 hover:bg-black/80">
      <div className="mb-4 text-3xl">{icon}</div>
      <h3 className="mb-2 text-lg font-medium text-white">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  )
}
