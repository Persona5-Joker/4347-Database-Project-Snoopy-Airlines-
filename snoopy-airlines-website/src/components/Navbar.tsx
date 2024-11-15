"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-center items-center">
        {/* Logo / Title */}
        <Link href="/" className="text-2xl font-bold tracking-wide">
          Snoopy Airlines ✈️
        </Link>

        {/* Mobile Menu */}
        <div className="md:hidden ml-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button className="p-2 rounded-md hover:bg-blue-700">
                <span className="sr-only">Open main menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="bg-white text-black space-y-2 rounded-md shadow-lg p-4">
              <Link href="/" className="block hover:text-blue-600">Home</Link>
            </PopoverContent>
          </Popover>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex ml-6">
          <Link href="/" className="hover:underline">Home</Link>
        </div>
      </div>
    </nav>
  );
}
