"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

// Create Authentication context
const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: () => {},
  connectWallet: async () => {},
});

// Create Collection context
const CollectionContext = createContext({
  collection: [],
  isLoading: true,
  addToCollection: async () => {},
  removeFromCollection: async () => {},
  refreshCollection: async () => {},
});

// Create Marketplace context
const MarketplaceContext = createContext({
  listings: [],
  isLoading: true,
  fetchListings: async () => {},
  fetchItemDetails: async () => {},
  purchaseItem: async () => {},
  listItemForSale: async () => {},
});

// Custom hooks to use contexts
export const useAuth = () => useContext(AuthContext);
export const useCollection = () => useContext(CollectionContext);
export const useMarketplace = () => useContext(MarketplaceContext);

// Auth Provider
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate checking for existing session/auth
    const checkAuth = async () => {
      try {
        // In a real app, this would check for a valid token/session
        const hasSession = localStorage.getItem("vero_session");
        
        if (hasSession) {
          // Simulate retrieving user data
          setUser({
            id: "user123",
            name: "John Smith",
            email: "john@example.com",
            walletConnected: false,
          });
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  const login = async (email, password) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would validate credentials with an API
      if (email && password) {
        const userData = {
          id: "user123",
          name: "John Smith",
          email: email,
          walletConnected: false,
        };
        
        setUser(userData);
        localStorage.setItem("vero_session", "active");
        
        toast({
          title: "Logged in successfully",
          description: `Welcome back, ${userData.name}!`,
        });
        
        return true;
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid email or password.",
        });
        return false;
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An error occurred during login. Please try again.",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem("vero_session");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };
  
  const connectWallet = async () => {
    try {
      // In a real app, this would connect to a blockchain wallet (MetaMask, etc.)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (user) {
        setUser({
          ...user,
          walletConnected: true,
          walletAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
        });
        
        toast({
          title: "Wallet connected",
          description: "Your wallet has been connected successfully.",
        });
        
        return true;
      }
      return false;
    } catch (error) {
      console.error("Wallet connection failed:", error);
      toast({
        variant: "destructive",
        title: "Connection failed",
        description: "Failed to connect your wallet. Please try again.",
      });
      return false;
    }
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        connectWallet,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Collection Provider
export function CollectionProvider({ children }) {
  const [collection, setCollection] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  
  // Mock collection data
  const mockItems = [
    {
      id: "VER-1234567",
      name: "Patrick Mahomes Game-Worn Jersey",
      team: "Kansas City Chiefs",
      event: "Super Bowl LVIII",
      date: "February 11, 2024",
      type: "Game-Worn Jersey",
      acquired: "March 1, 2024",
      price: 25000,
      image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&q=80",
      verified: true,
      lastScanned: "2024-04-06"
    },
    {
      id: "VER-2345678",
      name: "LeBron James Signed Basketball",
      team: "Los Angeles Lakers",
      event: "NBA Finals 2023",
      date: "June 15, 2023",
      type: "Signed Ball",
      acquired: "November 10, 2023",
      price: 8500,
      image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&q=80",
      verified: true,
      lastScanned: "2024-03-22"
    },
    {
      id: "VER-3456789",
      name: "Lionel Messi Match-Worn Cleats",
      team: "Inter Miami CF",
      event: "MLS Cup Playoffs",
      date: "October 28, 2023",
      type: "Game-Worn Cleats",
      acquired: "December 15, 2023",
      price: 12000,
      image: "https://images.unsplash.com/photo-1511886929837-354984b71424?auto=format&fit=crop&q=80",
      verified: true,
      lastScanned: "2024-02-18"
    },
    {
      id: "VER-4567890",
      name: "Serena Williams Signed Tennis Racket",
      team: "Individual",
      event: "US Open 2022",
      date: "September 3, 2022",
      type: "Signed Equipment",
      acquired: "January 5, 2023",
      price: 9500,
      image: "https://images.unsplash.com/photo-1622279457486-28f993f814e4?auto=format&fit=crop&q=80",
      verified: true,
      lastScanned: "2024-01-30"
    }
  ];
  
  useEffect(() => {
    const loadCollection = async () => {
      try {
        // In a real app, this would fetch from an API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Only load collection if user is authenticated
        if (isAuthenticated) {
          setCollection(mockItems);
        } else {
          setCollection([]);
        }
      } catch (error) {
        console.error("Failed to load collection:", error);
        toast({
          variant: "destructive",
          title: "Loading failed",
          description: "Failed to load your collection. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCollection();
  }, [isAuthenticated, toast]);
  
  const addToCollection = async (item) => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if item already exists in collection
      const exists = collection.some(existingItem => existingItem.id === item.id);
      
      if (exists) {
        toast({
          title: "Already in collection",
          description: "This item is already in your collection.",
        });
        return false;
      }
      
      // Add acquired date
      const itemWithAcquiredDate = {
        ...item,
        acquired: new Date().toISOString().split('T')[0],
      };
      
      setCollection(prev => [...prev, itemWithAcquiredDate]);
      
      toast({
        title: "Item added",
        description: "The item has been added to your collection.",
      });
      
      return true;
    } catch (error) {
      console.error("Failed to add item:", error);
      toast({
        variant: "destructive",
        title: "Failed to add item",
        description: "An error occurred. Please try again.",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const removeFromCollection = async (itemId) => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setCollection(prev => prev.filter(item => item.id !== itemId));
      
      toast({
        title: "Item removed",
        description: "The item has been removed from your collection.",
      });
      
      return true;
    } catch (error) {
      console.error("Failed to remove item:", error);
      toast({
        variant: "destructive",
        title: "Failed to remove item",
        description: "An error occurred. Please try again.",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const refreshCollection = async () => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // In a real app, this would re-fetch the latest data
      
      toast({
        title: "Collection refreshed",
        description: "Your collection has been updated with the latest data.",
      });
      
      return true;
    } catch (error) {
      console.error("Failed to refresh collection:", error);
      toast({
        variant: "destructive",
        title: "Refresh failed",
        description: "Failed to refresh your collection. Please try again.",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <CollectionContext.Provider
      value={{
        collection,
        isLoading,
        addToCollection,
        removeFromCollection,
        refreshCollection,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
}

// Marketplace Provider
export function MarketplaceProvider({ children }) {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Mock marketplace listings
  const mockListings = [
    {
      id: "LIST-123456",
      itemId: "VER-5678901",
      name: "Tom Brady Game-Worn Jersey",
      team: "Tampa Bay Buccaneers",
      event: "Super Bowl LV",
      date: "February 7, 2021",
      type: "Game-Worn Jersey",
      price: 35000,
      seller: "NFL Auctions",
      listedDate: "2024-03-15",
      image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&q=80",
      verified: true,
      description: "Authentic game-worn jersey from Super Bowl LV. Includes certificate of authenticity.",
    },
    {
      id: "LIST-234567",
      itemId: "VER-6789012",
      name: "Stephen Curry Game-Used Basketball",
      team: "Golden State Warriors",
      event: "NBA Finals 2022",
      date: "June 16, 2022",
      type: "Game-Used Ball",
      price: 12500,
      seller: "NBA Memorabilia",
      listedDate: "2024-02-28",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80",
      verified: true,
      description: "Basketball used during Game 6 of the 2022 NBA Finals.",
    },
    {
      id: "LIST-345678",
      itemId: "VER-7890123",
      name: "Aaron Judge Game-Used Bat",
      team: "New York Yankees",
      event: "2022 Season - 62nd Home Run",
      date: "October 4, 2022",
      type: "Game-Used Equipment",
      price: 50000,
      seller: "MLB Authentics",
      listedDate: "2024-01-10",
      image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80",
      verified: true,
      description: "The bat used by Aaron Judge to hit his record-breaking 62nd home run of the 2022 season.",
    },
  ];
  
  useEffect(() => {
    const loadListings = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        setListings(mockListings);
      } catch (error) {
        console.error("Failed to load marketplace listings:", error);
        toast({
          variant: "destructive",
          title: "Loading failed",
          description: "Failed to load marketplace listings. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadListings();
  }, [toast]);
  
  const fetchListings = async (filters = {}) => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would apply filters from the API
      let filteredListings = [...mockListings];
      
      if (filters.type) {
        filteredListings = filteredListings.filter(item => 
          item.type.toLowerCase().includes(filters.type.toLowerCase())
        );
      }
      
      if (filters.team) {
        filteredListings = filteredListings.filter(item => 
          item.team.toLowerCase().includes(filters.team.toLowerCase())
        );
      }
      
      if (filters.minPrice) {
        filteredListings = filteredListings.filter(item => 
          item.price >= filters.minPrice
        );
      }
      
      if (filters.maxPrice) {
        filteredListings = filteredListings.filter(item => 
          item.price <= filters.maxPrice
        );
      }
      
      setListings(filteredListings);
      return filteredListings;
    } catch (error) {
      console.error("Failed to fetch listings:", error);
      toast({
        variant: "destructive",
        title: "Failed to load listings",
        description: "An error occurred. Please try again.",
      });
      return [];
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchItemDetails = async (listingId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const listing = mockListings.find(item => item.id === listingId);
      
      if (!listing) {
        throw new Error("Listing not found");
      }
      
      // In a real app, this would fetch additional details from the API
      const detailedListing = {
        ...listing,
        authentications: [
          { authority: "NFL", verified: true, date: "2021-02-08" },
          { authority: "Buccaneers", verified: true, date: "2021-02-08" },
          { authority: "Vero", verified: true, date: "2021-02-10" }
        ],
        nfcTag: {
          id: "NFC-" + Math.floor(Math.random() * 10000000),
          lastScanned: "2024-03-15 14:22:36",
          scans: 23,
          status: "active"
        },
        blockchainData: {
          tokenId: "0x" + [...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
          chain: "Polygon",
          mintDate: "2021-02-15",
          lastTransfer: "2024-03-01"
        },
      };
      
      return detailedListing;
    } catch (error) {
      console.error("Failed to fetch item details:", error);
      toast({
        variant: "destructive",
        title: "Failed to load details",
        description: "An error occurred. Please try again.",
      });
      return null;
    }
  };
  
  const purchaseItem = async (listingId) => {
    try {
      if (!user) {
        toast({
          variant: "destructive",
          title: "Authentication required",
          description: "Please log in to purchase items.",
        });
        return false;
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would process the purchase via blockchain/payment
      
      toast({
        title: "Purchase successful",
        description: "The item has been added to your collection.",
      });
      
      // Remove from listings
      setListings(prev => prev.filter(item => item.id !== listingId));
      
      return true;
    } catch (error) {
      console.error("Purchase failed:", error);
      toast({
        variant: "destructive",
        title: "Purchase failed",
        description: "An error occurred during purchase. Please try again.",
      });
      return false;
    }
  };
  
  const listItemForSale = async (item, price, description) => {
    try {
      if (!user) {
        toast({
          variant: "destructive",
          title: "Authentication required",
          description: "Please log in to list items for sale.",
        });
        return false;
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // In a real app, this would create a new listing via API/blockchain
      const newListing = {
        id: "LIST-" + Math.floor(Math.random() * 1000000),
        itemId: item.id,
        name: item.name,
        team: item.team,
        event: item.event,
        date: item.date,
        type: item.type,
        price: price,
        seller: user.name,
        listedDate: new Date().toISOString().split('T')[0],
        image: item.image,
        verified: true,
        description: description,
      };
      
      setListings(prev => [...prev, newListing]);
      
      toast({
        title: "Item listed",
        description: "Your item has been listed for sale in the marketplace.",
      });
      
      return true;
    } catch (error) {
      console.error("Failed to list item:", error);
      toast({
        variant: "destructive",
        title: "Listing failed",
        description: "An error occurred. Please try again.",
      });
      return false;
    }
  };
  
  return (
    <MarketplaceContext.Provider
      value={{
        listings,
        isLoading,
        fetchListings,
        fetchItemDetails,
        purchaseItem,
        listItemForSale,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
}

// Combined provider for the entire app
export default function AppProviders({ children }) {
  return (
    <AuthProvider>
      <CollectionProvider>
        <MarketplaceProvider>
          {children}
          <Toaster />
        </MarketplaceProvider>
      </CollectionProvider>
    </AuthProvider>
  );
}