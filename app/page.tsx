import { currentUser } from "@clerk/nextjs/server"
import { LandingPage } from "../components"
import { redirect } from "next/navigation"

async function Home() {
  const user = await currentUser()

  if(!user) return <LandingPage />
  return redirect('/events')
}

export default Home
