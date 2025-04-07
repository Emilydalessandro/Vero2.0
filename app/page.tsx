"use client";

import { ArrowRight, Shield, QrCode, Trophy } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1577224682124-d500ae4cd859?auto=format&fit=crop&q=80"
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Authentic Sports History
              <br />
              <span className="text-blue-400">Verified Forever</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Track your sports memorabilia from factory to field to fan with 
              cutting-edge RFID and NFC technology on an immutable ledger.
            </p>
            <Link 
              href="/marketplace"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold bg-blue-500 hover:bg-blue-600 rounded-full transition-colors"
            >
              Explore Marketplace
              <ArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">How Vero Works</h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Authentication at Origin</h3>
              <p className="text-gray-600">
                Every item is tagged with RFID/NFC technology at the factory, 
                creating its unique digital identity.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                <QrCode className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Track Journey</h3>
              <p className="text-gray-600">
                Follow your item's complete journey from manufacturing through 
                game-day moments to your collection.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                <Trophy className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Secure Marketplace</h3>
              <p className="text-gray-600">
                Buy and sell authenticated memorabilia with confidence on our 
                secure blockchain-based marketplace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80"
                alt="Stadium"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Trust in Every Transaction
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Our advanced tracking system ensures the authenticity of every piece 
                of memorabilia. From the moment it's created to its final home in 
                your collection, every step is recorded and verified.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <Shield className="w-4 h-4 text-blue-600" />
                  </div>
                  <span>RFID/NFC Authentication</span>
                </li>
                <li className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <Shield className="w-4 h-4 text-blue-600" />
                  </div>
                  <span>Blockchain Verification</span>
                </li>
                <li className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <Shield className="w-4 h-4 text-blue-600" />
                  </div>
                  <span>Secure Marketplace</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Own Authentic Sports History?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join Vero today and discover authenticated sports memorabilia with 
            verified histories and secure ownership.
          </p>
          <Link 
            href="/signup"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold bg-white text-blue-900 rounded-full hover:bg-blue-50 transition-colors"
          >
            Get Started
            <ArrowRight className="ml-2" />
          </Link>
        </div>
      </section>
    </main>
  );
}