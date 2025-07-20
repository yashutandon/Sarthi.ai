"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";



export default function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start bg-background text-white px-3 sm:px-6 overflow-hidden">
         <div className="w-full max-w-md h-[350px] flex items-center justify-center">
         <Image src="/robot.svg" alt="robo" width={400} height={400}  priority={true} />

       
      </div>
      {/* 🔮 Background Glow */}
      <div
        className="absolute top-[-30%] left-[-20%] w-[120vw] h-[120vh] bg-gradient-to-r from-purple-600 to-blue-600 blur-3xl opacity-30  pointer-events-none"
        aria-hidden="true"
      />
   

      {/* 🔤 Hero Text Content */}
      <section className="z-10 text-center max-w-3xl sm:max-w-4xl lg:max-w-5xl mt-4 px-2">
        <h1 className="text-2xl sm:text-xl md:text-6xl font-bold mb-6 leading-tight tracking-tight text-center whitespace-nowrap overflow-hidden">
          <span className="inline-block">
            Welcome to{" "}
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 dark:from-blue-300 dark:via-purple-300 dark:to-pink-300">
              <Typewriter
                words={[
                  "Generate AI Agents",
                  "Smart Meetings",
                  "Automate Teamwork",
                ]}
                loop={true}
                cursor
                cursorStyle="_"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </span>
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-black dark:text-white mb-8">
          Build your own AI agents and start a smarter, collaborative experience.
        </p>

        <Link href="/agents">
          <Button className="px-6 py-3 sm:py-5 text-base sm:text-lg font-medium rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:scale-105 transition-transform duration-300">
            🚀 Create Your Agent
          </Button>
        </Link>
      </section>
    </main>
  );
}