import { currentUser } from "@clerk/nextjs/server";
import { PublicNavbar, PrivateNavbar } from "@/components/index";
import React from "react";

async function MainLayout({ children }: { children: React.ReactNode }) {
    const user = await currentUser()
  return (
    <section className="relative">
        <PublicNavbar />
        {/* {
            user ? <PrivateNavbar /> : <PublicNavbar />
        } */}
      <main className="pt-36">{children}</main>
    </section>
  );
}

export default MainLayout;
