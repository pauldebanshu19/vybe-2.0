// "use client"

// import { useState } from "react"
// import { motion } from "motion/react"

// export const LayeredTextEffect = ({
//   text,
//   className,
// }: {
//   text: string
//   className?: string
// }) => {
//   const [isHovered, setIsHovered] = useState(false)

//   return (
//     <div
//       className={`relative w-full h-full flex items-center justify-center ${className}`}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Background outlined text (bottom) */}
//       <motion.div
//         className="absolute text-transparent text-[8rem] md:text-[12rem] lg:text-[16rem] font-black tracking-tighter"
//         style={{
//           WebkitTextStroke: "1px rgba(255, 255, 255, 0.3)",
//           transform: "translateY(20px)",
//         }}
//         animate={isHovered ? { y: 25 } : { y: 20 }}
//         transition={{ duration: 0.5 }}
//       >
//         {text}
//       </motion.div>

//       {/* Background outlined text (top) */}
//       <motion.div
//         className="absolute text-transparent text-[8rem] md:text-[12rem] lg:text-[16rem] font-black tracking-tighter"
//         style={{
//           WebkitTextStroke: "1px rgba(255, 255, 255, 0.3)",
//           transform: "translateY(-20px)",
//         }}
//         animate={isHovered ? { y: -25 } : { y: -20 }}
//         transition={{ duration: 0.5 }}
//       >
//         {text}
//       </motion.div>

//       {/* Main filled text */}
//       <motion.div
//         className="relative text-white text-[8rem] md:text-[12rem] lg:text-[16rem] font-black tracking-tighter"
//         animate={
//           isHovered
//             ? {
//                 textShadow: "0 0 15px rgba(255, 255, 255, 0.5)",
//               }
//             : {
//                 textShadow: "0 0 0px rgba(255, 255, 255, 0)",
//               }
//         }
//         transition={{ duration: 0.3 }}
//       >
//         {text}
//       </motion.div>
//     </div>
//   )
// }


"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export const LayeredTextEffect = ({
  text,
  className,
}: {
  text: string
  className?: string
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background outlined text (bottom) */}
      <motion.div
        className="absolute text-transparent text-[8rem] md:text-[12rem] lg:text-[16rem] font-black tracking-wider"
        style={{
          WebkitTextStroke: "1px rgba(255, 255, 255, 0.3)",
          transform: "translateY(20px)",
        }}
        animate={isHovered ? { y: 25 } : { y: 20 }}
        transition={{ duration: 0.5 }}
      >
        {text}
      </motion.div>

      {/* Background outlined text (top) */}
      <motion.div
        className="absolute text-transparent text-[8rem] md:text-[12rem] lg:text-[16rem] font-black tracking-wider"
        style={{
          WebkitTextStroke: "1px rgba(255, 255, 255, 0.3)",
          transform: "translateY(-20px)",
        }}
        animate={isHovered ? { y: -25 } : { y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {text}
      </motion.div>

      {/* Main filled text */}
      <motion.div
        className="relative text-white text-[8rem] md:text-[12rem] lg:text-[16rem] font-black tracking-wider"
        animate={
          isHovered
            ? {
                textShadow: "0 0 15px rgba(255, 255, 255, 0.5)",
              }
            : {
                textShadow: "0 0 0px rgba(255, 255, 255, 0)",
              }
        }
        transition={{ duration: 0.3 }}
      >
        {text}
      </motion.div>
    </div>
  )
}