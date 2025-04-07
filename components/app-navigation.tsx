"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  HomeIcon, 
  ScanIcon, 
  ShoppingBagIcon, 
  UserIcon, 
  MenuIcon, 
  X as CloseIcon,
  Shield,
  Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function AppNavigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Scan", href: "/scan", icon: ScanIcon },
    { name: "Marketplace", href: "/marketplace", icon: ShoppingBagIcon },
    { name: "My Collection", href: "/collection", icon: UserIcon },
  ];

  const isActive = (path) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Mobile bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-20 md:hidden">
        <div className="bg-white border-t shadow-lg">
          <div className="flex justify-around items-center h-16">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex flex-col items-center justify-center w-full h-full ${
                  isActive(item.href) 
                    ? "text-blue-600" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <item.icon className="w-5 h-5 mb-1" />
                <span className="text-xs">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop navigation */}
      <header className="sticky top-0 z-30 w-full bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold">Vero</span>
            </Link>

            {/* Desktop links - hidden on mobile */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-1 py-2 text-sm font-medium ${
                    isActive(item.href)
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-1" />
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* User actions */}
            <div className="flex items-center">
              <Button variant="outline" size="sm" className="mr-2 hidden md:flex">
                <Shield className="w-4 h-4 mr-1" />
                Connect Wallet
              </Button>
              
              {/* Mobile menu trigger */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="md:hidden">
                    <MenuIcon className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <Shield className="h-6 w-6 text-blue-600" />
                        <span className="ml-2 text-lg font-bold">Vero</span>
                      </div>
                    </div>
                    
                    <nav className="flex flex-col space-y-4">
                      {navItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`flex items-center px-2 py-2 rounded-md ${
                            isActive(item.href)
                              ? "bg-blue-50 text-blue-600"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <item.icon className="w-5 h-5 mr-3" />
                          {item.name}
                        </Link>
                      ))}
                    </nav>
                    
                    <div className="mt-auto pt-6">
                      <Button className="w-full mb-2">
                        <Shield className="w-4 h-4 mr-2" />
                        Connect Wallet
                      </Button>
                      <div className="text-center text-xs text-gray-500 mt-4">
                        <p>Vero v1.0</p>
                        <p>Authenticity from factory to field to fan</p>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}