import { useState, useEffect } from "react";
import { useUser } from "@/components/UserContext";
import { useNavigate } from "react-router-dom";
import {
  User,
  Package,
  Truck,
  MapPin,
  Calendar,
  Clock,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  AlertCircle,
  BarChart4,
  Heart,
  Leaf,
  Users,
  Edit,
  LogOut,
  ArrowRight,
  ArrowLeft,
  RefreshCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Donation, Pickup } from "@/types";
import { db } from "@/integrations/firebase/client";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  updateDoc,
  doc,
} from "firebase/firestore";
import { format, parseISO } from "date-fns";
import { motion } from "framer-motion";

export default function VolunteerDashboard() {
  const { user, userRole, logout } = useUser();
  const navigate = useNavigate();
  const [availableDeliveries, setAvailableDeliveries] = useState<Donation[]>(
    []
  );
  const [pastDeliveries, setPastDeliveries] = useState<Pickup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    location: user?.location || "",
    address: user?.address || "",
  });

  // Redirect if not logged in or not a volunteer
  useEffect(() => {
    if (!user) {
      navigate("/auth?mode=login");
    } else if (userRole !== "volunteer") {
      navigate("/");
    }
  }, [user, userRole, navigate]);

  // Fetch available deliveries and past deliveries
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      setLoading(true);
      setError(null);

      try {
        // Fetch available deliveries
        const donationsQuery = query(
          collection(db, "donations"),
          where("status", "==", "available"),
          orderBy("createdAt", "desc")
        );

        const donationsSnapshot = await getDocs(donationsQuery);
        const donations = donationsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Donation[];

        setAvailableDeliveries(donations);

        // Fetch past deliveries for this volunteer
        const pickupsQuery = query(
          collection(db, "pickups"),
          where("volunteerId", "==", user.uid),
          orderBy("createdAt", "desc")
        );

        const pickupsSnapshot = await getDocs(pickupsQuery);
        const pickups = pickupsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Pickup[];

        setPastDeliveries(pickups);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // Handle accepting a delivery
  const handleAcceptDelivery = async (donationId: string) => {
    if (!user) return;

    try {
      // In a real app, you would update the donation status and create a pickup record
      // For now, we'll just simulate this by updating the UI

      // Remove from available deliveries
      setAvailableDeliveries((prev) =>
        prev.filter((donation) => donation.id !== donationId)
      );

      // Add to past deliveries
      const donation = availableDeliveries.find((d) => d.id === donationId);
      if (donation) {
        const newPickup: Pickup = {
          id: `pickup-${Date.now()}`,
          donationId: donationId,
          volunteerId: user.uid,
          donorId: donation.donorId,
          recipientId: donation.recipientId || "",
          status: "pending",
          createdAt: new Date().toISOString(),
          pickupLocation: donation.location,
          dropoffLocation: donation.recipientAddress || "",
        };

        setPastDeliveries((prev) => [newPickup, ...prev]);
      }

      // Show success message
      alert("Delivery accepted successfully!");
    } catch (err) {
      console.error("Error accepting delivery:", err);
      alert("Failed to accept delivery. Please try again.");
    }
  };

  // Handle updating profile
  const handleUpdateProfile = async () => {
    if (!user) return;

    try {
      // In a real app, you would update the user document in Firestore
      // For now, we'll just simulate this

      // Update local state
      setEditedProfile({
        name: editedProfile.name,
        phone: editedProfile.phone,
        location: editedProfile.location,
        address: editedProfile.address,
      });

      setIsEditProfile(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile. Please try again.");
    }
  };

  // Filter available deliveries
  const filteredAvailableDeliveries = availableDeliveries.filter((donation) => {
    // Apply search filter
    const matchesSearch =
      donation.foodType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (donation.donorName || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    // Apply status filter (all available deliveries have status "available")
    const matchesStatus =
      statusFilter === "all" || statusFilter === "available";

    // Apply date filter
    let matchesDate = true;
    if (dateFilter !== "all") {
      const donationDate = parseISO(donation.createdAt);
      const today = new Date();

      if (dateFilter === "today") {
        matchesDate =
          format(donationDate, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");
      } else if (dateFilter === "week") {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(today.getDate() - 7);
        matchesDate = donationDate >= oneWeekAgo;
      } else if (dateFilter === "month") {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(today.getMonth() - 1);
        matchesDate = donationDate >= oneMonthAgo;
      }
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Filter past deliveries
  const filteredPastDeliveries = pastDeliveries.filter((pickup) => {
    // Apply search filter
    const matchesSearch =
      pickup.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pickup.dropoffLocation.toLowerCase().includes(searchTerm.toLowerCase());

    // Apply status filter
    const matchesStatus =
      statusFilter === "all" || statusFilter === pickup.status;

    // Apply date filter
    let matchesDate = true;
    if (dateFilter !== "all") {
      const pickupDate = parseISO(pickup.createdAt);
      const today = new Date();

      if (dateFilter === "today") {
        matchesDate =
          format(pickupDate, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");
      } else if (dateFilter === "week") {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(today.getDate() - 7);
        matchesDate = pickupDate >= oneWeekAgo;
      } else if (dateFilter === "month") {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(today.getMonth() - 1);
        matchesDate = pickupDate >= oneMonthAgo;
      }
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Calculate impact metrics
  const impactMetrics = {
    totalDeliveries: pastDeliveries.length,
    completedDeliveries: pastDeliveries.filter((p) => p.status === "completed")
      .length,
    pendingDeliveries: pastDeliveries.filter((p) => p.status === "pending")
      .length,
    inProgressDeliveries: pastDeliveries.filter(
      (p) => p.status === "in_progress"
    ).length,
    mealsProvided:
      pastDeliveries.filter((p) => p.status === "completed").length * 10, // Assuming each delivery provides 10 meals
    co2Reduced:
      pastDeliveries.filter((p) => p.status === "completed").length * 2.5, // Assuming each delivery reduces 2.5kg of CO2
    waterSaved:
      pastDeliveries.filter((p) => p.status === "completed").length * 1000, // Assuming each delivery saves 1000L of water
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200"
          >
            Pending
          </Badge>
        );
      case "in_progress":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            In Progress
          </Badge>
        );
      case "completed":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Completed
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Get initials for avatar
  const getInitials = (name: string) => {
    if (!name) return "VC";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-green"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-6 rounded-lg max-w-md text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-red-700 mb-2">
            Error Loading Dashboard
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-brand-green flex items-center justify-center text-white font-bold mr-3">
                FC
              </div>
              <h1 className="text-xl font-bold text-gray-900">
                Volunteer Dashboard
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="flex items-center">
                <RefreshCcw className="h-4 w-4 mr-2" />
                Refresh
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center"
                  >
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarFallback>
                        {getInitials(user?.name || "Volunteer")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline">
                      {user?.name || "Volunteer"}
                    </span>
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setIsProfileOpen(true)}>
                    <User className="h-4 w-4 mr-2" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.name || "Volunteer"}!
              </h2>
              <p className="text-gray-600">
                Thank you for your dedication to reducing food waste and helping
                those in need.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button className="bg-brand-green hover:bg-brand-green/90 text-white">
                <Package className="h-4 w-4 mr-2" />
                View Available Deliveries
              </Button>
            </div>
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Deliveries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="rounded-full bg-blue-100 p-3 mr-4">
                  <Truck className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {impactMetrics.totalDeliveries}
                  </div>
                  <p className="text-xs text-gray-500">Lifetime</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Meals Provided
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="rounded-full bg-green-100 p-3 mr-4">
                  <Heart className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {impactMetrics.mealsProvided}
                  </div>
                  <p className="text-xs text-gray-500">
                    Through your deliveries
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                CO₂ Reduced
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="rounded-full bg-purple-100 p-3 mr-4">
                  <Leaf className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {impactMetrics.co2Reduced} kg
                  </div>
                  <p className="text-xs text-gray-500">Environmental impact</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Water Saved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="rounded-full bg-cyan-100 p-3 mr-4">
                  <BarChart4 className="h-6 w-6 text-cyan-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {impactMetrics.waterSaved} L
                  </div>
                  <p className="text-xs text-gray-500">Resource conservation</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Available and Past Deliveries */}
        <Tabs defaultValue="available" className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <TabsList className="mb-4 md:mb-0">
              <TabsTrigger value="available" className="flex items-center">
                <Package className="h-4 w-4 mr-2" />
                Available Deliveries
                {availableDeliveries.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {availableDeliveries.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="past" className="flex items-center">
                <Truck className="h-4 w-4 mr-2" />
                Past Deliveries
                {pastDeliveries.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {pastDeliveries.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search..."
                  className="pl-10 w-full md:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Button
                variant="outline"
                size="sm"
                className="flex items-center"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {showFilters ? (
                  <ChevronUp className="h-4 w-4 ml-1" />
                ) : (
                  <ChevronDown className="h-4 w-4 ml-1" />
                )}
              </Button>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Status
                  </label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Date
                  </label>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select date range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">Last 7 Days</SelectItem>
                      <SelectItem value="month">Last 30 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setStatusFilter("all");
                      setDateFilter("all");
                      setSearchTerm("");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Available Deliveries Tab */}
          <TabsContent value="available" className="mt-0">
            {filteredAvailableDeliveries.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAvailableDeliveries.map((donation) => (
                  <Card key={donation.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">
                          {donation.foodType}
                        </CardTitle>
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          Available
                        </Badge>
                      </div>
                      <CardDescription>
                        {donation.quantity} • Expires{" "}
                        {format(parseISO(donation.expiryDate), "MMM d, yyyy")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium">
                              Pickup Location
                            </p>
                            <p className="text-sm text-gray-600">
                              {donation.location}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <Users className="h-4 w-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium">Donor</p>
                            <p className="text-sm text-gray-600">
                              {donation.donorName || "Anonymous"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <Calendar className="h-4 w-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium">Listed</p>
                            <p className="text-sm text-gray-600">
                              {format(
                                parseISO(donation.createdAt),
                                "MMM d, yyyy"
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full bg-brand-green hover:bg-brand-green/90 text-white"
                        onClick={() => handleAcceptDelivery(donation.id || "")}
                      >
                        Accept Delivery
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Alert className="bg-yellow-50 border-yellow-200">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <AlertTitle className="text-yellow-800">
                  No Deliveries Available
                </AlertTitle>
                <AlertDescription className="text-yellow-700">
                  There are currently no deliveries available that match your
                  filters. Please check back later or try adjusting your
                  filters.
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>

          {/* Past Deliveries Tab */}
          <TabsContent value="past" className="mt-0">
            {filteredPastDeliveries.length > 0 ? (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Delivery ID</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Pickup Location</TableHead>
                      <TableHead>Dropoff Location</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPastDeliveries.map((pickup) => (
                      <TableRow key={pickup.id}>
                        <TableCell className="font-medium">
                          {pickup.id?.substring(0, 8)}...
                        </TableCell>
                        <TableCell>{getStatusBadge(pickup.status)}</TableCell>
                        <TableCell>{pickup.pickupLocation}</TableCell>
                        <TableCell>{pickup.dropoffLocation}</TableCell>
                        <TableCell>
                          {format(parseISO(pickup.createdAt), "MMM d, yyyy")}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <Alert className="bg-yellow-50 border-yellow-200">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <AlertTitle className="text-yellow-800">
                  No Past Deliveries
                </AlertTitle>
                <AlertDescription className="text-yellow-700">
                  You haven't completed any deliveries yet. Accept an available
                  delivery to get started!
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>
        </Tabs>

        {/* Impact Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Your Impact Over Time
          </h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">
              Impact chart visualization would appear here
            </p>
          </div>
        </div>
      </main>

      {/* Profile Dialog */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Your Profile</DialogTitle>
            <DialogDescription>
              View and edit your volunteer profile information.
            </DialogDescription>
          </DialogHeader>

          {isEditProfile ? (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={editedProfile.name}
                  onChange={(e) =>
                    setEditedProfile({ ...editedProfile, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input value={user?.email || ""} disabled />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Phone</label>
                <Input
                  value={editedProfile.phone}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      phone: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input
                  value={editedProfile.location}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      location: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Address</label>
                <Input
                  value={editedProfile.address}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      address: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Role</label>
                <Input value="Volunteer" disabled />
              </div>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg">
                    {getInitials(user?.name || "Volunteer")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-medium">
                    {user?.name || "Volunteer"}
                  </h3>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p className="text-sm">{user?.phone || "Not provided"}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Location</p>
                  <p className="text-sm">{user?.location || "Not provided"}</p>
                </div>

                <div className="col-span-2">
                  <p className="text-sm font-medium text-gray-500">Address</p>
                  <p className="text-sm">{user?.address || "Not provided"}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Role</p>
                  <p className="text-sm">Volunteer</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Member Since
                  </p>
                  <p className="text-sm">
                    {user?.createdAt
                      ? format(parseISO(user.createdAt), "MMM d, yyyy")
                      : "Unknown"}
                  </p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            {isEditProfile ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => setIsEditProfile(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleUpdateProfile}>Save Changes</Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => setIsProfileOpen(false)}
                >
                  Close
                </Button>
                <Button onClick={() => setIsEditProfile(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
