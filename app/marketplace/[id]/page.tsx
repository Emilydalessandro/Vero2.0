"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowLeft, 
  Shield, 
  Smartphone, 
  CheckCircle,
  Share2,
  Heart,
  Download,
  Wallet,
  Clock,
  Calendar,
  User,
  Trophy,
  DollarSign,
  ExternalLink
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";

export default function ItemDetailPage() {
  const [isLiked, setIsLiked] = useState(false);
  const [showNfcDialog, setShowNfcDialog] = useState(false);
  
  // Sample item data - would come from API in real app
  const item = {
    id: "VER-1234567",
    name: "Patrick Mahomes Game-Worn Jersey",
    team: "Kansas City Chiefs",
    event: "Super Bowl LVIII",
    date: "February 11, 2024",
    type: "Game-Worn Jersey",
    description: "This authentic game-worn jersey was worn by Patrick Mahomes during Super Bowl LVIII against the San Francisco 49ers. Mahomes led the Chiefs to victory with 333 passing yards and 2 touchdowns, earning his third Super Bowl MVP award.",
    price: 25000,
    serialNumber: "KC-PM15-SB58-001",
    authentications: [
      { authority: "NFL", verified: true, date: "2024-02-12" },
      { authority: "Kansas City Chiefs", verified: true, date: "2024-02-12" },
      { authority: "Vero", verified: true, date: "2024-02-13" }
    ],
    nfcTag: {
      id: "NFC-9876543",
      lastScanned: "2024-04-06 08:42:12",
      scans: 17,
      status: "active"
    },
    ownership: [
      { owner: "Kansas City Chiefs", from: "2023-08-01", to: "2024-02-11", type: "Team" },
      { owner: "NFL Auctions", from: "2024-02-12", to: "2024-03-01", type: "Auction House" },
      { owner: "Current Owner", from: "2024-03-01", to: "present", type: "Collector" }
    ],
    blockchainData: {
      tokenId: "0x8f7a9c2e4b7b0e5d3c1f2a6b8e9d2c5f1e0a3b7c",
      chain: "Polygon",
      mintDate: "2024-02-15",
      lastTransfer: "2024-03-01"
    },
    gameStats: {
      date: "February 11, 2024",
      opponent: "San Francisco 49ers",
      result: "Win (25-22)",
      passingYards: 333,
      passingTDs: 2,
      rushingYards: 66
    },
    images: [
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&q=80"
    ],
    certificate: {
      url: "#",
      issueDate: "2024-02-15"
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/marketplace"
              className="flex items-center text-gray-800 hover:text-blue-600"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Marketplace
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => setIsLiked(!isLiked)}>
                <Heart className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative bg-white rounded-lg shadow-sm overflow-hidden">
              <img 
                src={item.images[0]} 
                alt={item.name} 
                className="w-full h-auto object-cover aspect-square"
              />
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Badge className="bg-green-500 hover:bg-green-600">
                  <Shield className="w-3 h-3 mr-1" />
                  Authenticated
                </Badge>
                <Badge className="bg-blue-500 hover:bg-blue-600">
                  <Smartphone className="w-3 h-3 mr-1" />
                  NFC Enabled
                </Badge>
              </div>
            </div>
            
            {/* Thumbnail Images */}
            <div className="flex gap-2">
              {item.images.map((image, index) => (
                <div 
                  key={index} 
                  className={`w-24 h-24 rounded-md overflow-hidden border-2 ${index === 0 ? 'border-blue-500' : 'border-transparent'}`}
                >
                  <img 
                    src={image} 
                    alt={`${item.name} thumbnail ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            
            {/* Authentication Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Authentication & Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.authentications.map((auth, index) => (
                    <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      <Shield className="w-3 h-3 mr-1" />
                      {auth.authority}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-sm">Authenticated {item.authentications[0].date}</span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setShowNfcDialog(true)}
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  Verify With NFC Tag
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download Certificate
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Right Column - Details & Actions */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{item.name}</h1>
              <div className="flex items-center text-gray-600 mb-4">
                <Trophy className="w-4 h-4 mr-1" />
                {item.team} • {item.event}
              </div>
              
              <div className="flex items-center mb-6">
                <div className="text-3xl font-bold">${item.price.toLocaleString()}</div>
                <Badge variant="outline" className="ml-3">
                  <Shield className="w-3 h-3 mr-1" />
                  Secure Purchase
                </Badge>
              </div>
              
              <p className="text-gray-700 mb-6">
                {item.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button className="flex-1" size="lg">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Buy Now
                </Button>
                <Button variant="outline" className="flex-1" size="lg">
                  <Wallet className="w-5 h-5 mr-2" />
                  Make Offer
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="game">Game Info</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="certificate">Certificate</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Item Type</h4>
                    <p>{item.type}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Serial Number</h4>
                    <p className="font-mono">{item.serialNumber}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Event</h4>
                    <p>{item.event}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Date</h4>
                    <p>{item.date}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">NFC Tag Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Tag ID</span>
                      <span className="font-mono text-sm">{item.nfcTag.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Last Scanned</span>
                      <span className="text-sm">{item.nfcTag.lastScanned}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Total Scans</span>
                      <span className="text-sm">{item.nfcTag.scans}</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="game" className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-medium">{item.gameStats.opponent}</h3>
                      <p className="text-sm text-gray-500">{item.gameStats.date}</p>
                    </div>
                    <Badge>{item.gameStats.result}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{item.gameStats.passingYards}</div>
                      <div className="text-sm text-gray-500">Passing Yards</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{item.gameStats.passingTDs}</div>
                      <div className="text-sm text-gray-500">Touchdowns</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{item.gameStats.rushingYards}</div>
                      <div className="text-sm text-gray-500">Rushing Yards</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="history" className="space-y-4">
                <div className="relative pl-8 space-y-6 before:absolute before:left-4 before:top-2 before:h-full before:w-[1px] before:bg-gray-200">
                  {item.ownership.map((period, index) => (
                    <div key={index} className="relative">
                      <div className="absolute -left-8 top-0 w-5 h-5 rounded-full bg-blue-100 border-2 border-blue-500 z-10"></div>
                      <div>
                        <h4 className="font-medium">{period.owner}</h4>
                        <p className="text-sm text-gray-500">
                          {period.from} — {period.to}
                        </p>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {period.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="certificate" className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Digital Certificate Details</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Token ID</span>
                      <span className="font-mono text-sm truncate max-w-[200px]">
                        {item.blockchainData.tokenId}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Blockchain</span>
                      <span className="text-sm">{item.blockchainData.chain}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Minted On</span>
                      <span className="text-sm">{item.blockchainData.mintDate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Last Transfer</span>
                      <span className="text-sm">{item.blockchainData.lastTransfer}</span>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Blockchain Explorer
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* NFC Verification Dialog */}
      <Dialog open={showNfcDialog} onOpenChange={setShowNfcDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify NFC Tag</DialogTitle>
            <DialogDescription>
              Hold your phone near the NFC tag on the item to verify its authenticity.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center py-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Smartphone className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-center text-sm text-gray-600">
              Make sure NFC is enabled on your device and hold it close to the tag.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNfcDialog(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}