'use client'
import { SignIn } from "@clerk/nextjs"
import { neobrutalism } from "@clerk/themes"
import Image from "next/image"

function LandingPage() {
  return (
    <main className=' flex items-center p-8 gap-24 animate-fade-in max-md:flex-col'>
      <section className="flex flex-col items-center">
        <Image 
        width={300}
        height={300}
        alt="Logo"
        src={'/assets/logo.svg'}/>
      <h1 className="text-2xl font-black lg:text-3xl"> Your time, Perfectly planned</h1>
      <p className="font-extralight">
        Join millions of proffessional who easily book meetings with the #1 scheduling tool
      </p>
      <Image 
      src={'/assets/planning.svg'}
      width={500}
      height={500}
      alt="Logo"
      />
      </section>

      {/* Clerk signin components with custom theme */}
      <SignIn 
      routing="hash"
      //Keeps sign-in UI on the same page using hash-based routing
      appearance={{
        baseTheme: neobrutalism
      }}
      />
    </main>
  )
}

export default LandingPage
