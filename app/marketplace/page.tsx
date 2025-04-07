"use client";

import { useState } from "react";
import { ArrowLeft, Filter, Search, Tag, Shield, Smartphone, Info } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  // Placeholder data - in a real app, this would come from your database
  const items = [
    {
      id: 1,
      name: "Tom Brady Game-Worn Jersey",
      team: "Tampa Bay Buccaneers",
      game: "Super Bowl LV",
      price: 25000,
      image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&q=80",
      verifications: ["NFL", "Buccaneers", "PSA"],
      lastScanned: "2024-03-15",
      nfcEnabled: true,
    },
    {
      id: 2,
      name: "Patrick Mahomes Signed Football",
      team: "Kansas City Chiefs",
      game: "AFC Championship 2024",
      price: 3500,
      image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&q=80",
      verifications: ["NFL", "Chiefs", "Fanatics"],
      lastScanned: "2024-03-14",
      nfcEnabled: true,
    },
    {
      id: 3,
      name: "LeBron James Game-Worn Sneakers",
      team: "Los Angeles Lakers",
      game: "NBA Finals 2023",
      price: 15000,
      image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&q=80",
      verifications: ["NBA", "Lakers", "PSA"],
      lastScanned: "2024-03-13",
      nfcEnabled: true,
    },
  ];

  const handleNfcScan = async (itemId: number) => {
    setIsScanning(true);
    // Simulate NFC scanning
    setTimeout(() => {
      setIsScanning(false);
      // Show success feedback
      alert("Authentication successful! Item verified.");
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/"
              className="flex items-center text-gray-800 hover:text-blue-600"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-2xl font-bold">Verified Memorabilia Marketplace</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      {/* Trust Banner */}
      <div className="bg-blue-50 border-b border-blue-100">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-center space-x-8 text-sm text-blue-800">
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              <span>Authenticated Items</span>
            </div>
            <div className="flex items-center">
              <Smartphone className="w-4 h-4 mr-2" />
              <span>NFC Verified</span>
            </div>
            <div className="flex items-center">
              <Tag className="w-4 h-4 mr-2" />
              <span>Secure Marketplace</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search authenticated items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center justify-center px-4 py-2 bg-white border rounded-lg hover:bg-gray-50">
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </button>
        </div>

        {/* Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <div className="flex items-center bg-green-500 text-white px-2 py-1 rounded-full text-sm">
                    <Shield className="w-4 h-4 mr-1" />
                    Verified
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-2">{item.team}</p>
                <p className="text-sm text-gray-500 mb-4">{item.game}</p>
                
                {/* Verification Details */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {item.verifications.map((verification, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                      >
                        <Shield className="w-3 h-3 mr-1" />
                        {verification}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold">${item.price.toLocaleString()}</span>
                  <button
                    onClick={() => handleNfcScan(item.id)}
                    className="flex items-center px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm hover:bg-blue-100"
                  >
                    <Smartphone className="w-4 h-4 mr-1" />
                    Verify NFC
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>

              {/* Last Scanned Info */}
              <div className="px-4 py-2 bg-gray-50 border-t flex items-center justify-between text-sm text-gray-500">
                <span className="flex items-center">
                  <Info className="w-4 h-4 mr-1" />
                  Last verified: {item.lastScanned}
                </span>
                <button className="text-blue-600 hover:text-blue-700">
                  View History
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* NFC Scanning Modal */}
      {isScanning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Smartphone className="w-8 h-8 text-blue-600" />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2">Scanning NFC Tag</h3>
              <p className="text-gray-600 mb-4">
                Hold your phone near the item's NFC tag to verify authenticity
              </p>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-blue-600"
                  animate={{ width: ["0%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}