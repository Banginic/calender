import { SignUp } from "@clerk/nextjs"
import Image from "next/image"


function Register() {
  return (
    <main className='flex flex-col items-center p-4 gap-8 animate-fade-in'>
      <Image 
      src={'/assets/logo.svg'}
      width={100}
      height={100}
      alt="logo"
      />
      <div className="mt-4">
        <SignUp />
      </div>
    </main>
  )
}

export default Register
