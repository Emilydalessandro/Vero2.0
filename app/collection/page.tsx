"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Shield, 
  Search, 
  Tag, 
  Filter, 
  Smartphone, 
  Trophy, 
  Grid3X3,
  List,
  Plus,
  Check,
  Clock,
  FileText,
  ArrowRight,
  Settings,
  PenLine,
  Share2,
  MoreHorizontal,
  Eye,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { useCollection } from "@/components/app-providers";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export default function CollectionPage() {
  const { collection, isLoading, refreshCollection } = useCollection();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Handle search and filtering
  useEffect(() => {
    let results = collection;
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.team.toLowerCase().includes(query) ||
        item.event.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (activeFilter !== "all") {
      results = results.filter(item => {
        if (activeFilter === "jerseys") return item.type.toLowerCase().includes("jersey");
        if (activeFilter === "balls") return item.type.toLowerCase().includes("ball");
        if (activeFilter === "equipment") return (
          item.type.toLowerCase().includes("equipment") || 
          item.type.toLowerCase().includes("cleats") ||
          item.type.toLowerCase().includes("racket")
        );
        return true;
      });
    }
    
    setFilteredItems(results);
  }, [searchQuery, collection, activeFilter]);
  
  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      await refreshCollection();
    } catch (error) {
      console.error("Refresh failed:", error);
    } finally {
      setIsRefreshing(false);
    }
  };
  
  const handleVerifyItem = (itemId) => {
    toast({
      title: "Verification in progress",
      description: "Please scan the NFC tag on the item to verify authenticity.",
    });
    // In a real app, this would navigate to scan screen or open NFC dialog
  };
  
  const calculateCollectionValue = () => {
    return collection.reduce((total, item) => total + item.price, 0);
  };

  // Render collection items in grid view
  const renderGridView = () => {
    if (filteredItems.length === 0 && !isLoading) {
      return (
        <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Trophy className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium mb-2">No items found</h3>
          <p className="text-gray-500 mb-6 max-w-md">
            {searchQuery 
              ? "Try adjusting your search or filters to find what you're looking for."
              : "Start building your collection by authenticating items or browsing the marketplace."}
          </p>
          <div className="flex gap-4">
            <Button asChild>
              <Link href="/scan">Scan an Item</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/marketplace">Browse Marketplace</Link>
            </Button>
          </div>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading ? (
          // Loading skeletons
          Array(4).fill(0).map((_, index) => (
            <Card key={`skeleton-${index}`} className="overflow-hidden">
              <div className="h-48 bg-gray-200 animate-pulse" />
              <CardContent className="pt-6">
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mb-4" />
                <div className="flex justify-between">
                  <div className="h-5 bg-gray-200 rounded animate-pulse w-1/3" />
                  <div className="h-5 bg-gray-200 rounded animate-pulse w-1/4" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          filteredItems.map((item) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden h-full flex flex-col">
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-green-500 hover:bg-green-600">
                      <Shield className="w-3 h-3 mr-1" />
                      Authenticated
                    </Badge>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <Badge variant="outline" className="bg-white/90">
                      {item.type}
                    </Badge>
                  </div>
                </div>
                <CardContent className="pt-4 flex-grow">
                  <h3 className="font-bold truncate">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{item.team} • {item.event}</p>
                  
                  <div className="flex justify-between text-sm text-gray-600 mt-4">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>Acquired {item.acquired}</span>
                    </div>
                    <span className="font-medium">${item.price.toLocaleString()}</span>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-3 pb-3">
                  <div className="flex justify-between items-center w-full">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/collection/${item.id}`}>
                        View Details
                      </Link>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleVerifyItem(item.id)}>
                          <Smartphone className="w-4 h-4 mr-2" />
                          Verify with NFC
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="w-4 h-4 mr-2" />
                          Share Item
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <PenLine className="w-4 h-4 mr-2" />
                          Add Notes
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <ArrowRight className="w-4 h-4 mr-2" />
                          List for Sale
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    );
  };

  // Render collection items in list view
  const renderListView = () => {
    if (filteredItems.length === 0 && !isLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Trophy className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium mb-2">No items found</h3>
          <p className="text-gray-500 mb-6 max-w-md">
            {searchQuery 
              ? "Try adjusting your search or filters to find what you're looking for."
              : "Start building your collection by authenticating items or browsing the marketplace."}
          </p>
          <div className="flex gap-4">
            <Button asChild>
              <Link href="/scan">Scan an Item</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/marketplace">Browse Marketplace</Link>
            </Button>
          </div>
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        {isLoading ? (
          // Loading skeletons
          Array(4).fill(0).map((_, index) => (
            <Card key={`skeleton-${index}`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded animate-pulse" />
                  <div className="flex-1">
                    <div className="h-5 bg-gray-200 rounded animate-pulse mb-2 w-3/4" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2 mb-1" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
                  </div>
                  <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          filteredItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover rounded"
                      />
                      {item.verified && (
                        <div className="absolute -top-2 -right-2">
                          <div className="bg-green-100 text-green-600 rounded-full p-0.5">
                            <Check className="w-3 h-3" />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{item.name}</h3>
                      <p className="text-sm text-gray-500 truncate">{item.team} • {item.event}</p>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>Last verified: {item.lastScanned}</span>
                      </div>
                    </div>
                    
                    <div className="text-right flex-shrink-0">
                      <div className="text-gray-900 font-medium mb-1">${item.price.toLocaleString()}</div>
                      <Badge variant="outline" className="text-xs">
                        {item.type}
                      </Badge>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/collection/${item.id}`}>
                          <Eye className="w-4 h-4" />
                        </Link>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleVerifyItem(item.id)}>
                            <Smartphone className="w-4 h-4 mr-2" />
                            Verify with NFC
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="w-4 h-4 mr-2" />
                            Share Item
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ArrowRight className="w-4 h-4 mr-2" />
                            List for Sale
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Collection</h1>
            <p className="text-gray-600">
              {collection.length} authenticated items
              {collection.length > 0 && (
                <span> · Total value: ${calculateCollectionValue().toLocaleString()}</span>
              )}
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/scan">
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              {isRefreshing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Settings className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
        
        {/* Filters and Search */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text" 
                placeholder="Search your collection..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button 
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Categories and Filters */}
        <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveFilter}>
          <TabsList>
            <TabsTrigger value="all">All Items</TabsTrigger>
            <TabsTrigger value="jerseys">Jerseys</TabsTrigger>
            <TabsTrigger value="balls">Game Balls</TabsTrigger>
            <TabsTrigger value="equipment">Equipment</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {/* Collection Items */}
        {viewMode === "grid" ? renderGridView() : renderListView()}
      </div>
    </main>
  );
}