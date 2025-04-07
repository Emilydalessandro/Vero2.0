"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, 
  Smartphone, 
  CheckCircle, 
  XCircle,
  Clock,
  History,
  Trophy,
  Calendar,
  User,
  Info,
  ChevronDown,
  Loader2,
  ExternalLink
} from "lucide-react";
import { useRouter } from "next/navigation";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Simulate the NFC reading API that would be available in a real mobile app
const mockNfcApi = {
  isSupported: () => {
    // In a real app, this would check if the device supports NFC
    return true;
  },
  
  requestPermission: () => {
    return new Promise((resolve) => {
      // Simulate permission request delay
      setTimeout(() => {
        resolve(true);
      }, 500);
    });
  },
  
  scanTag: () => {
    return new Promise((resolve, reject) => {
      // Simulate NFC scanning process
      setTimeout(() => {
        // 90% success rate to simulate occasional failures
        if (Math.random() > 0.1) {
          resolve({
            tagId: "NFC-" + Math.floor(Math.random() * 10000000),
            tokenId: "0x" + [...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
            readCount: Math.floor(Math.random() * 30)
          });
        } else {
          reject(new Error("Failed to read NFC tag. Please try again."));
        }
      }, 2000);
    });
  }
};

// Simulated API call to fetch item data
// Define the type for nfcData
interface NFCData {
  tagId: string;
  tokenId: string;
  readCount: number;
  signalStrength?: number;
  lastScanTime?: string;
  tagVersion?: string;
  tagHealth?: string;
  encryptionStatus?: string;
  tamperEvidence?: boolean;
}

// Update the function signature with the type
const fetchItemData = (nfcData: NFCData) => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      resolve({
        id: "VER-" + Math.floor(Math.random() * 10000000),
        name: "Patrick Mahomes Game-Worn Jersey",
        team: "Kansas City Chiefs",
        event: "Super Bowl LVIII",
        date: "February 11, 2024",
        type: "Game-Worn Jersey",
        serialNumber: "KC-PM15-SB58-001",
        authentications: [
          { authority: "NFL", verified: true, date: "2024-02-12" },
          { authority: "Kansas City Chiefs", verified: true, date: "2024-02-12" },
          { authority: "Vero", verified: true, date: "2024-02-13" }
        ],
        nfcTag: {
          id: nfcData.tagId,
          lastScanned: new Date().toISOString().replace('T', ' ').substring(0, 19),
          scans: nfcData.readCount,
          status: "active"
        },
        ownership: [
          { owner: "Kansas City Chiefs", from: "2023-08-01", to: "2024-02-11", type: "Team" },
          { owner: "NFL Auctions", from: "2024-02-12", to: "2024-03-01", type: "Auction House" },
          { owner: "Current Owner", from: "2024-03-01", to: "present", type: "Collector" }
        ],
        blockchainData: {
          tokenId: nfcData.tokenId,
          chain: "Polygon",
          mintDate: "2024-02-15",
          lastTransfer: "2024-03-01"
        },
        image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&q=80"
      });
    }, 1500);
  });
};

export default function ScanPage() {
  const router = useRouter();
  const [nfcSupported, setNfcSupported] = useState(true);
  const [scanStatus, setScanStatus] = useState("idle"); // idle, permission, scanning, verifying, success, error
  const [scanProgress, setScanProgress] = useState(0);
  const [itemData, setItemData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showInstructions, setShowInstructions] = useState(true);
  const [showPermissionDialog, setShowPermissionDialog] = useState(false);
  const [addedToCollection, setAddedToCollection] = useState(false);
  
  const progressInterval = useRef(null);
  
  // Check if device supports NFC on component mount
  useEffect(() => {
    const checkNfcSupport = async () => {
      const isSupported = mockNfcApi.isSupported();
      setNfcSupported(isSupported);
      
      if (!isSupported) {
        setErrorMessage("Your device doesn't support NFC scanning. Please try on a different device.");
      }
    };
    
    checkNfcSupport();
  }, []);
  
  // Clean up intervals on unmount
  useEffect(() => {
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);
  
  const startScan = async () => {
    try {
      setShowInstructions(false);
      setScanStatus("permission");
      setShowPermissionDialog(true);
      
      // Wait for permission
      const hasPermission = await mockNfcApi.requestPermission();
      setShowPermissionDialog(false);
      
      if (!hasPermission) {
        throw new Error("NFC permission denied. Please enable NFC in your settings and try again.");
      }
      
      // Start scan
      setScanStatus("scanning");
      setScanProgress(0);
      
      // Simulate progress
      progressInterval.current = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval.current);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      
      // Scan NFC tag
      const nfcData = await mockNfcApi.scanTag();
      
      // Clear progress timer
      clearInterval(progressInterval.current);
      setScanProgress(100);
      
      // Verify data with API
      setScanStatus("verifying");
      const itemData = await fetchItemData(nfcData);
      
      // Success
      setScanStatus("success");
      setItemData(itemData);
      
    } catch (error) {
      clearInterval(progressInterval.current);
      setScanStatus("error");
      setErrorMessage(error.message || "Failed to authenticate item. Please try again.");
    }
  };
  
  const resetScan = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
    setScanStatus("idle");
    setScanProgress(0);
    setItemData(null);
    setErrorMessage("");
    setShowInstructions(true);
    setAddedToCollection(false);
  };
  
  const addToCollection = () => {
    // In a real app, this would call an API to add the item to the user's collection
    setAddedToCollection(true);
    
    // Show success state for 1.5 seconds before navigating
    setTimeout(() => {
      router.push("/collection");
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Verify Authenticity</h1>
          <p className="text-gray-600">
            Scan the NFC tag on your memorabilia to verify its authenticity and provenance
          </p>
        </div>
        
        {!nfcSupported && (
          <Card className="mb-8 border-yellow-200 bg-yellow-50">
            <CardContent className="pt-6">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-yellow-800 mb-1">NFC Not Supported</h3>
                  <p className="text-yellow-700">
                    Your device doesn't support NFC scanning. Please try on a compatible mobile device with NFC capabilities.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {scanStatus === "idle" && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Smartphone className="w-5 h-5 mr-2 text-blue-600" />
                NFC Authentication
              </CardTitle>
              <CardDescription>
                Scan the NFC tag on your sports memorabilia to verify its authenticity and view its complete history.
              </CardDescription>
            </CardHeader>
            {showInstructions && (
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-800 mb-2">How to scan</h3>
                    <ol className="list-decimal pl-5 text-blue-700 space-y-2">
                      <li>Make sure NFC is enabled on your device</li>
                      <li>Hold your phone near the NFC tag on the item</li>
                      <li>Don't move your phone until scanning is complete</li>
                      <li>View the authentication results and history</li>
                    </ol>
                  </div>
                  
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                    <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                        <Smartphone className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="font-medium mb-1">Place Phone Near Tag</h3>
                      <p className="text-sm text-gray-500">Position your device close to the NFC tag embedded in the item</p>
                    </div>
                    
                    <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                        <Clock className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="font-medium mb-1">Hold Steady</h3>
                      <p className="text-sm text-gray-500">Keep your device still until the scanning process completes</p>
                    </div>
                    
                    <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                        <Shield className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="font-medium mb-1">View Results</h3>
                      <p className="text-sm text-gray-500">See authentication details and complete item history</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            )}
            <CardFooter>
              <Button 
                className="w-full" 
                size="lg" 
                onClick={startScan}
                disabled={!nfcSupported}
              >
                <Smartphone className="w-5 h-5 mr-2" />
                Start NFC Scan
              </Button>
            </CardFooter>
          </Card>
        )}

        {scanStatus === "scanning" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-12"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6"
            >
              <Smartphone className="w-12 h-12 text-blue-600" />
            </motion.div>
            
            <h2 className="text-2xl font-bold mb-3">Scanning NFC Tag</h2>
            <p className="text-gray-600 mb-6 text-center max-w-md">
              Hold your device steady near the NFC tag until scanning is complete
            </p>
            
            <div className="w-full max-w-md mb-8">
              <Progress value={scanProgress} className="h-2" />
              <p className="text-center text-sm text-gray-500 mt-2">
                {scanProgress}% complete
              </p>
            </div>
            
            <Button variant="outline" onClick={resetScan}>
              Cancel
            </Button>
          </motion.div>
        )}

        {scanStatus === "verifying" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-12"
          >
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            </div>
            
            <h2 className="text-2xl font-bold mb-3">Verifying Authenticity</h2>
            <p className="text-gray-600 mb-6 text-center max-w-md">
              Checking blockchain records and authentication data...
            </p>
            
            <Button variant="outline" onClick={resetScan}>
              Cancel
            </Button>
          </motion.div>
        )}
        
        {scanStatus === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-12"
          >
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <XCircle className="w-12 h-12 text-red-600" />
            </div>
            
            <h2 className="text-2xl font-bold mb-3">Authentication Failed</h2>
            <p className="text-gray-600 mb-6 text-center max-w-md">
              {errorMessage}
            </p>
            
            <Button onClick={resetScan}>
              Try Again
            </Button>
          </motion.div>
        )}
        
        {scanStatus === "success" && itemData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Success Banner */}
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-green-800">Authentication Successful</h3>
                    <p className="text-green-700">This item has been verified as authentic</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Item Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left Column - Image */}
              <div className="md:col-span-1">
                <Card>
                  <CardContent className="pt-6">
                    <div className="relative rounded-lg overflow-hidden mb-4">
                      <img 
                        src={itemData.image} 
                        alt={itemData.name} 
                        className="w-full h-auto object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-green-500 hover:bg-green-600">
                          Authentic
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Item ID</span>
                        <span className="font-mono text-sm">{itemData.id}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Serial Number</span>
                        <span className="font-mono text-sm">{itemData.serialNumber}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">NFC Tag</span>
                        <span className="font-mono text-sm">{itemData.nfcTag.id}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Last Scanned</span>
                        <span className="text-sm">{itemData.nfcTag.lastScanned}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Total Scans</span>
                        <span className="text-sm">{itemData.nfcTag.scans}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Info Tabs */}
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>{itemData.name}</CardTitle>
                    <CardDescription>{itemData.team} • {itemData.event}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="details">
                      <TabsList className="grid grid-cols-4 mb-4">
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="authenticity">Authenticity</TabsTrigger>
                        <TabsTrigger value="history">History</TabsTrigger>
                        <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="details" className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Item Type</h4>
                            <p>{itemData.type}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Team</h4>
                            <p>{itemData.team}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Event</h4>
                            <p>{itemData.event}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Date</h4>
                            <p>{itemData.date}</p>
                          </div>
                        </div>
                        
                        <div className="pt-2">
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Current Authentications</h4>
                          <div className="flex flex-wrap gap-2">
                            {itemData.authentications.map((auth, index) => (
                              <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                <Shield className="w-3 h-3 mr-1" />
                                {auth.authority}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="authenticity" className="space-y-4">
                        <div className="space-y-3">
                          {itemData.authentications.map((auth, index) => (
                            <div key={index} className="flex items-center p-3 border rounded-lg">
                              {auth.verified ? (
                                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                              ) : (
                                <XCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                              )}
                              <div className="flex-grow">
                                <h4 className="font-medium">{auth.authority}</h4>
                                <p className="text-sm text-gray-500">Verified on {auth.date}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg mt-4">
                          <div className="flex items-start">
                            <Info className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-gray-600">
                              Each authentication is performed by an official certifying authority. 
                              Vero maintains a trusted network of sports teams, leagues, and authentication experts.
                            </p>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="history" className="space-y-4">
                        <div className="relative pl-8 space-y-6 before:absolute before:left-4 before:top-2 before:h-full before:w-[1px] before:bg-gray-200">
                          {itemData.ownership.map((period, index) => (
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
                      
                      <TabsContent value="blockchain" className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Digital Certificate (NFT)</h4>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500">Token ID</span>
                              <span className="font-mono text-sm truncate max-w-[200px]">
                                {itemData.blockchainData.tokenId}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500">Blockchain</span>
                              <span className="text-sm">{itemData.blockchainData.chain}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500">Minted On</span>
                              <span className="text-sm">{itemData.blockchainData.mintDate}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500">Last Transfer</span>
                              <span className="text-sm">{itemData.blockchainData.lastTransfer}</span>
                            </div>
                          </div>
                        </div>
                        
                        <Button variant="outline" className="w-full">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View on Blockchain Explorer
                        </Button>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1" onClick={resetScan}>
                Scan Another Item
              </Button>
              <Button 
                variant={addedToCollection ? "outline" : "default"}
                className="flex-1"
                onClick={addToCollection}
                disabled={addedToCollection}
              >
                {addedToCollection ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Added to Collection
                  </>
                ) : (
                  "Add to My Collection"
                )}
              </Button>
            </div>
          </motion.div>
        )}
        
        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How does NFC authentication work?</AccordionTrigger>
              <AccordionContent>
                Each authentic item contains a tamper-proof NFC tag with a unique identifier linked to a digital certificate on the blockchain. When you scan the tag, our app verifies this connection and retrieves the complete provenance history.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>What if my item doesn't have an NFC tag?</AccordionTrigger>
              <AccordionContent>
                All authentic items verified by Vero come with NFC tags embedded during the authentication process. If your item doesn't have an NFC tag, it might not be authenticated through our platform. Contact our support team for assistance.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I scan items that aren't mine?</AccordionTrigger>
              <AccordionContent>
                Yes! You can scan any Vero-authenticated item to verify its authenticity, even if you don't own it. This is useful when considering a purchase or when authenticating items for others.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>What happens if the NFC tag is damaged?</AccordionTrigger>
              <AccordionContent>
                Our NFC tags are designed to be highly durable, but if a tag becomes damaged, the item's digital certificate remains safe on the blockchain. Contact our support team with your proof of ownership, and we can help with replacement options.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      
      {/* Permission Dialog */}
      <Dialog open={showPermissionDialog} onOpenChange={setShowPermissionDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Allow NFC Access</DialogTitle>
            <DialogDescription>
              Vero needs permission to use your device's NFC capabilities in order to scan authentication tags.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
          <DialogFooter className="sm:justify-start">
            <p className="text-sm text-gray-500">
              Please tap "Allow" when prompted by your device
            </p>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
