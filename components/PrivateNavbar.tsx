'use client'
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PrivateLinks } from '../constants/index'
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SignedIn, UserButton } from "@clerk/nextjs";


function PrivateNavbar() {
  const pathname = usePathname()
  return (
    <nav className="flex justify-between items-center fixed z-50 w-full h-28 mb-28 bg-gray-200 px-10 gap-4 shadow-2xl">
      <Link
        href="/events"
        className="flex items-center gap-1 hover:scale-115 duration-500"
      >
        <Image
          src={"./assets/logo.svg"}
          width={60}
          height={60}
          alt="calendra logo"
        />
      </Link>
      <section className="stick top-0 flex justify-between text-black">
        <div className="flex flex-1 max-sm:gap-0 sm:gap-6">
          {PrivateLinks.map((link) => {
            const isActive =
              pathname === link.route ||
              pathname.startsWith(`${link.route}/`);
            return (
              <Link
                key={link.label}
                className={cn(
                  "flex gap-4 items-center py-2 px-4 rounded-lg justify-start hover:scale:115 duration-300 ",
                  isActive && "bg-blue-200 rounded-3xl"
                )}
                href={link.route}
              >
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  width={30}
                  height={30}
                />
              <p 
              className={ cn('text-lg font-semibold max-lg:hidden')}
              >{link.label}</p>
              </Link>
            );
          })}
        </div>
      </section>
      <div className="hover:scale-125 duration-500">
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}

export default PrivateNavbar;
