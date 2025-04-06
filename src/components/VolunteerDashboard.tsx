import { useState, useEffect, useCallback, useMemo } from "react";
import { useUser } from "@/components/UserContext";
import {
  getAcceptedDonations,
  updateDonationStatus,
  createPickup,
  getPickupsByVolunteer,
  updatePickupWithStatus,
  subscribeToVolunteerPickups,
  subscribeToAvailableDonations,
  PickupStatusType,
} from "@/services/firebase";
import { Donation, Pickup } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DeliveryStatusUpdater } from "@/components/DeliveryStatusUpdater";
import {
  AlertCircle,
  Package,
  MapPin,
  Calendar,
  Clock,
  Truck,
  CheckCircle,
  RefreshCcw,
  ArrowLeft,
  Users,
  Heart,
  Award,
  Search,
  Thermometer,
  AlertTriangle,
  Info,
  Camera,
  User,
  Phone,
  Mail,
  MessageSquare,
  Eye,
  X,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/ui/DashboardLayout";
import { motion } from "framer-motion";
import LocationDisplay from "@/components/ui/LocationDisplay";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function VolunteerDashboard() {
  const { user, loading: userLoading } = useUser();
  const navigate = useNavigate();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [pickups, setPickups] = useState<Pickup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locationFilter, setLocationFilter] = useState("");
  const [activeTab, setActiveTab] = useState("available");
  const [selectedDelivery, setSelectedDelivery] = useState<Donation | null>(
    null
  );
  const [selectedPickup, setSelectedPickup] = useState<Pickup | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [stats, setStats] = useState({
    totalPickups: 0,
    completedDeliveries: 0,
    inTransitDeliveries: 0,
    pendingDeliveries: 0,
    totalFoodDelivered: 0,
    peopleHelped: 0,
    averageDeliveryTime: 0,
  });

  // Set up real-time subscriptions
  useEffect(() => {
    if (!user) return;

    // Subscribe to available donations
    const unsubscribeDonations = subscribeToAvailableDonations(
      (updatedDonations) => {
        setDonations(updatedDonations);
        setLoading(false);
      }
    );

    // Subscribe to volunteer's pickups
    const unsubscribePickups = subscribeToVolunteerPickups(
      user.uid,
      (updatedPickups) => {
        setPickups(updatedPickups);

        // Update stats
        const completedPickups = updatedPickups.filter(
          (p) => p.status === "delivered"
        );
        const totalFoodDelivered = completedPickups.reduce(
          (sum, pickup) => sum + (pickup.quantity || 0),
          0
        );
        const peopleHelped = new Set(completedPickups.map((p) => p.recipientId))
          .size;

        // Calculate average delivery time
        const deliveryTimes = completedPickups
          .map((p) => {
            if (p.createdAt && p.deliveredAt) {
              return (
                new Date(p.deliveredAt).getTime() -
                new Date(p.createdAt).getTime()
              );
            }
            return 0;
          })
          .filter((time) => time > 0);

        const averageDeliveryTime =
          deliveryTimes.length > 0
            ? deliveryTimes.reduce((sum, time) => sum + time, 0) /
              deliveryTimes.length
            : 0;

        setStats({
          totalPickups: updatedPickups.length,
          completedDeliveries: completedPickups.length,
          inTransitDeliveries: updatedPickups.filter(
            (p) => p.status === "in_transit"
          ).length,
          pendingDeliveries: updatedPickups.filter(
            (p) => p.status === "pending"
          ).length,
          totalFoodDelivered,
          peopleHelped,
          averageDeliveryTime,
        });
      }
    );

    // Cleanup subscriptions on unmount
    return () => {
      unsubscribeDonations();
      unsubscribePickups();
    };
  }, [user]);

  // Handle accepting a delivery
  const handleAcceptDelivery = useCallback(
    async (donation: Donation) => {
      if (!user) return;

      try {
        setError(null);

        // Create a pickup record with the correct parameters
        await createPickup({
          donationId: donation.id!,
          donorId: donation.donorId,
          recipientId: donation.recipientId!,
          volunteerId: user.uid,
          pickupLocation: donation.location,
          dropoffLocation:
            donation.recipientAddress || "Address will be provided",
          quantity: donation.quantity,
          pickupAddress: donation.pickupAddress,
          pickupCity: donation.pickupCity,
          pickupState: donation.pickupState,
          pickupZipCode: donation.pickupZipCode,
          pickupLat: donation.pickupLat,
          pickupLng: donation.pickupLng,
          contactPersonName: donation.contactPersonName,
          contactPersonPhone: donation.contactPersonPhone,
          dropoffContactName: donation.recipientName || "",
        });

        // Update donation status
        await updateDonationStatus(donation.id!, "in_transit", {
          volunteerId: user.uid,
          volunteerName: user.displayName || "Anonymous Volunteer",
          pickupAt: new Date().toISOString(),
        });
      } catch (err) {
        console.error("Error accepting delivery:", err);
        setError(
          err instanceof Error ? err.message : "Failed to accept delivery"
        );
      }
    },
    [user]
  );

  // Handle updating pickup status
  const handleStatusUpdate = useCallback(
    async (pickupId: string, newStatus: PickupStatusType) => {
      if (!user) return;

      try {
        setError(null);
        await updatePickupWithStatus(pickupId, newStatus);

        // If completing delivery, update the donation status as well
        if (newStatus === "delivered") {
          const pickup = pickups.find((p) => p.id === pickupId);
          if (pickup) {
            await updateDonationStatus(pickup.donationId, "delivered", {
              deliveredAt: new Date().toISOString(),
            });
          }
        }
      } catch (err) {
        console.error("Error updating pickup status:", err);
        setError(
          err instanceof Error ? err.message : "Failed to update pickup status"
        );
      }
    },
    [user, pickups]
  );

  // Handle viewing delivery details
  const handleViewDetails = useCallback((delivery: Donation | Pickup) => {
    if ("donorId" in delivery) {
      setSelectedDelivery(delivery as Donation);
      setSelectedPickup(null);
    } else {
      setSelectedPickup(delivery as Pickup);
      setSelectedDelivery(null);
    }
    setShowDetailsDialog(true);
  }, []);

  // Filter donations based on active tab
  const filteredDonations = useMemo(() => {
    if (activeTab === "available") {
      return donations.filter((d) => d.status === "accepted");
    } else if (activeTab === "in-transit") {
      return donations.filter(
        (d) => d.status === "in_transit" && d.volunteerId === user?.uid
      );
    } else if (activeTab === "completed") {
      return donations.filter(
        (d) => d.status === "delivered" && d.volunteerId === user?.uid
      );
    }
    return [];
  }, [donations, activeTab, user?.uid]);

  // Filter pickups based on active tab
  const filteredPickups = useMemo(() => {
    if (activeTab === "active") {
      return pickups.filter(
        (p) =>
          p.status === "assigned" ||
          p.status === "started_for_pickup" ||
          p.status === "at_pickup_location" ||
          p.status === "pickup_complete" ||
          p.status === "in_transit" ||
          p.status === "at_delivery_location"
      );
    } else if (activeTab === "completed") {
      return pickups.filter((p) => p.status === "delivered");
    } else if (activeTab === "cancelled") {
      return pickups.filter((p) => p.status === "cancelled");
    }
    return pickups;
  }, [pickups, activeTab]);

  // If user is not logged in, redirect to login
  if (!user) {
    navigate("/login");
    return null;
  }

  // Dashboard stats
  const dashboardStats = [
    {
      label: "Total Pickups",
      value: stats.totalPickups,
      icon: <Truck className="h-4 w-4 text-brand-green" />,
    },
    {
      label: "Completed Deliveries",
      value: stats.completedDeliveries,
      icon: <CheckCircle className="h-4 w-4 text-brand-green" />,
    },
    {
      label: "In Transit",
      value: stats.inTransitDeliveries,
      icon: <Clock className="h-4 w-4 text-brand-green" />,
    },
    {
      label: "People Helped",
      value: stats.peopleHelped,
      icon: <Users className="h-4 w-4 text-brand-green" />,
    },
  ];

  return (
    <DashboardLayout
      title="Volunteer Dashboard"
      description="Track your food pickup and delivery tasks"
      error={error}
      loading={userLoading || (loading && pickups.length === 0)}
      stats={dashboardStats}
    >
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-brand-dark">
            Food Deliveries
          </h2>
          <div className="mt-4 md:mt-0 relative">
            <Input
              type="text"
              placeholder="Filter by location..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="pl-10 w-full md:w-64 border-gray-300 focus:border-brand-green focus:ring-brand-green"
            />
            <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>

        <Tabs
          defaultValue="available"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="available">Available</TabsTrigger>
            <TabsTrigger value="in-transit">In Transit</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="available">
            {filteredDonations.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300"
              >
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No available deliveries
                </h3>
                <p className="text-gray-500 mb-4">
                  Check back later for new delivery opportunities
                </p>
                <Button
                  onClick={() => setActiveTab("available")}
                  className="bg-brand-green hover:bg-brand-green/90"
                >
                  <RefreshCcw className="mr-2 h-4 w-4" /> Refresh
                </Button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDonations.map((donation, index) => (
                  <motion.div
                    key={donation.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className="h-full overflow-hidden hover:shadow-md transition-shadow duration-300">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg capitalize">
                            {donation.foodType}
                          </CardTitle>
                          <Badge className="bg-blue-100 text-blue-800">
                            Available
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center text-sm text-gray-600">
                            <Package className="h-4 w-4 mr-2 text-brand-green" />
                            <span>{donation.quantity} kg</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-2 text-brand-green" />
                            <span>{donation.location}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-2 text-brand-green" />
                            <span>
                              Expires:{" "}
                              {new Date(
                                donation.expiryDate
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          {donation.description && (
                            <p className="text-sm text-gray-600 mt-2">
                              {donation.description}
                            </p>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button
                          onClick={() => handleViewDetails(donation)}
                          variant="outline"
                          size="sm"
                          className="text-brand-green border-brand-green hover:bg-brand-green/10"
                        >
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </Button>
                        <Button
                          onClick={() => handleAcceptDelivery(donation)}
                          className="bg-brand-green hover:bg-brand-green/90"
                          disabled={loading}
                        >
                          {loading ? (
                            <span className="flex items-center">
                              <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Processing...
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <Truck className="mr-2 h-4 w-4" /> Accept Delivery
                            </span>
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="in-transit">
            {filteredDonations.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300"
              >
                <Truck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No deliveries in transit
                </h3>
                <p className="text-gray-500 mb-4">
                  You don't have any active deliveries right now
                </p>
                <Button
                  onClick={() => setActiveTab("available")}
                  className="bg-brand-green hover:bg-brand-green/90"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> View Available
                  Deliveries
                </Button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDonations.map((donation, index) => (
                  <motion.div
                    key={donation.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className="h-full overflow-hidden hover:shadow-md transition-shadow duration-300">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg capitalize">
                            {donation.foodType}
                          </CardTitle>
                          <Badge className="bg-yellow-100 text-yellow-800">
                            In Transit
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center text-sm text-gray-600">
                            <Package className="h-4 w-4 mr-2 text-brand-green" />
                            <span>{donation.quantity} kg</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-2 text-brand-green" />
                            <span>{donation.location}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-2 text-brand-green" />
                            <span>
                              Expires:{" "}
                              {new Date(
                                donation.expiryDate
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          {donation.description && (
                            <p className="text-sm text-gray-600 mt-2">
                              {donation.description}
                            </p>
                          )}
                          <div className="mt-3 p-2 bg-yellow-50 rounded-md text-sm text-yellow-700">
                            <p className="font-medium">
                              Pickup Time:{" "}
                              {new Date(
                                donation.pickupAt || ""
                              ).toLocaleString()}
                            </p>
                            <p className="text-xs mt-1">
                              Dropoff:{" "}
                              {donation.recipientAddress ||
                                "Address will be provided"}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button
                          onClick={() => handleViewDetails(donation)}
                          variant="outline"
                          size="sm"
                          className="text-brand-green border-brand-green hover:bg-brand-green/10"
                        >
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </Button>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() =>
                              handleStatusUpdate(
                                donation.id!,
                                "at_delivery_location"
                              )
                            }
                            className="bg-blue-600 hover:bg-blue-700"
                            disabled={loading}
                          >
                            {loading ? (
                              <span className="flex items-center">
                                <svg
                                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Processing...
                              </span>
                            ) : (
                              <>
                                <MapPin className="mr-2 h-4 w-4" /> Arrived at
                                Delivery
                              </>
                            )}
                          </Button>
                          <Button
                            onClick={() =>
                              handleStatusUpdate(donation.id!, "delivered")
                            }
                            className="bg-brand-green hover:bg-brand-green/90"
                            disabled={loading}
                          >
                            {loading ? (
                              <span className="flex items-center">
                                <svg
                                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Processing...
                              </span>
                            ) : (
                              <>
                                <CheckCircle className="mr-2 h-4 w-4" />{" "}
                                Complete Delivery
                              </>
                            )}
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed">
            {filteredDonations.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300"
              >
                <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No completed deliveries
                </h3>
                <p className="text-gray-500 mb-4">
                  You haven't completed any deliveries yet
                </p>
                <Button
                  onClick={() => setActiveTab("available")}
                  className="bg-brand-green hover:bg-brand-green/90"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> View Available
                  Deliveries
                </Button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDonations.map((donation, index) => (
                  <motion.div
                    key={donation.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className="h-full overflow-hidden hover:shadow-md transition-shadow duration-300">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg capitalize">
                            {donation.foodType}
                          </CardTitle>
                          <Badge className="bg-green-100 text-green-800">
                            Delivered
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center text-sm text-gray-600">
                            <Package className="h-4 w-4 mr-2 text-brand-green" />
                            <span>{donation.quantity} kg</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-2 text-brand-green" />
                            <span>{donation.location}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-2 text-brand-green" />
                            <span>
                              Expires:{" "}
                              {new Date(
                                donation.expiryDate
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          {donation.description && (
                            <p className="text-sm text-gray-600 mt-2">
                              {donation.description}
                            </p>
                          )}
                          <div className="mt-3 p-2 bg-green-50 rounded-md text-sm text-green-700">
                            <p className="font-medium">
                              Delivered:{" "}
                              {new Date(
                                donation.deliveredAt || ""
                              ).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <div className="text-xs text-gray-500">
                          Completed:{" "}
                          {new Date(
                            donation.deliveredAt || ""
                          ).toLocaleDateString()}
                        </div>
                        <Button
                          onClick={() => handleViewDetails(donation)}
                          variant="outline"
                          size="sm"
                          className="text-brand-green border-brand-green hover:bg-brand-green/10"
                        >
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {filteredPickups.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300"
        >
          <Truck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No pickup tasks yet
          </h3>
          <p className="text-gray-500 mb-4">
            Browse available pickup tasks and accept them to see them here
          </p>
          <Button
            onClick={() => (window.location.href = "/pickups")}
            className="bg-brand-green hover:bg-brand-green/90"
          >
            Browse Pickup Tasks
          </Button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPickups.map((pickup, index) => (
            <motion.div
              key={pickup.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="h-full overflow-hidden hover:shadow-md transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg capitalize">
                      Pickup #{pickup.id?.substring(0, 6) || "Unknown"}
                    </CardTitle>
                    <Badge
                      className={
                        pickup.status === "in_transit" ||
                        pickup.status === "at_pickup_location" ||
                        pickup.status === "at_delivery_location"
                          ? "bg-blue-100 text-blue-800"
                          : pickup.status === "delivered"
                          ? "bg-green-100 text-green-800"
                          : pickup.status === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      {pickup.status.replace(/_/g, " ")}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Package className="h-4 w-4 mr-2 text-brand-green" />
                      <span>Food Donation</span>
                    </div>

                    {/* Pickup Location */}
                    <div className="mt-2">
                      <LocationDisplay
                        address={{
                          street: pickup.pickupAddress,
                          city: pickup.pickupCity,
                          state: pickup.pickupState,
                          zipCode: pickup.pickupZipCode,
                        }}
                        contactName={pickup.contactPersonName}
                        contactPhone={pickup.contactPersonPhone}
                        instructions={pickup.pickupInstructions}
                        title="Pickup Location"
                      />
                    </div>

                    {/* Dropoff Location */}
                    <div className="mt-2">
                      <LocationDisplay
                        address={{
                          street: pickup.dropoffAddress,
                          city: pickup.dropoffCity,
                          state: pickup.dropoffState,
                          zipCode: pickup.dropoffZipCode,
                        }}
                        contactName={pickup.dropoffContactName}
                        contactPhone={pickup.dropoffContactPhone}
                        instructions={pickup.dropoffInstructions}
                        title="Dropoff Location"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 flex justify-between">
                  <div className="text-xs text-gray-500">
                    Created: {new Date(pickup.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleViewDetails(pickup)}
                      variant="outline"
                      size="sm"
                      className="text-brand-green border-brand-green hover:bg-brand-green/10"
                    >
                      <Eye className="mr-2 h-4 w-4" /> View Details
                    </Button>
                    {pickup.status === "in_transit" && (
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() =>
                          handleStatusUpdate(pickup.id!, "delivered")
                        }
                      >
                        Complete
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedDelivery
                ? `Delivery Details: ${selectedDelivery.foodType || ""}`
                : selectedPickup
                ? `Pickup Details: #${selectedPickup.id?.substring(0, 6) || ""}`
                : "Delivery Details"}
            </DialogTitle>
          </DialogHeader>
          {selectedPickup && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Pickup Information
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="font-medium">Status:</span>
                      <Badge
                        className={`ml-2 ${
                          selectedPickup.status === "delivered"
                            ? "bg-green-100 text-green-800"
                            : selectedPickup.status === "in_transit"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {selectedPickup.status?.replace(/_/g, " ") || ""}
                      </Badge>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-brand-green" />
                      <span className="font-medium">Created:</span>
                      <span className="ml-2">
                        {new Date(selectedPickup.createdAt).toLocaleString()}
                      </span>
                    </div>
                    {selectedPickup.startedForPickupAt && (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-brand-green" />
                        <span className="font-medium">Started for Pickup:</span>
                        <span className="ml-2">
                          {new Date(
                            selectedPickup.startedForPickupAt
                          ).toLocaleString()}
                        </span>
                      </div>
                    )}
                    {selectedPickup.arrivedAtPickupAt && (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-brand-green" />
                        <span className="font-medium">Arrived at Pickup:</span>
                        <span className="ml-2">
                          {new Date(
                            selectedPickup.arrivedAtPickupAt
                          ).toLocaleString()}
                        </span>
                      </div>
                    )}
                    {selectedPickup.pickupCompletedAt && (
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-brand-green" />
                        <span className="font-medium">Pickup Completed:</span>
                        <span className="ml-2">
                          {new Date(
                            selectedPickup.pickupCompletedAt
                          ).toLocaleString()}
                        </span>
                      </div>
                    )}
                    {selectedPickup.inTransitAt && (
                      <div className="flex items-center">
                        <Truck className="h-4 w-4 mr-2 text-brand-green" />
                        <span className="font-medium">In Transit:</span>
                        <span className="ml-2">
                          {new Date(
                            selectedPickup.inTransitAt
                          ).toLocaleString()}
                        </span>
                      </div>
                    )}
                    {selectedPickup.arrivedAtDropoffAt && (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-brand-green" />
                        <span className="font-medium">Arrived at Dropoff:</span>
                        <span className="ml-2">
                          {new Date(
                            selectedPickup.arrivedAtDropoffAt
                          ).toLocaleString()}
                        </span>
                      </div>
                    )}
                    {selectedPickup.deliveredAt && (
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-brand-green" />
                        <span className="font-medium">Delivered:</span>
                        <span className="ml-2">
                          {new Date(
                            selectedPickup.deliveredAt
                          ).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Contact Information
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Pickup Contact:</span>
                      <div className="flex items-center mt-1">
                        <User className="h-4 w-4 mr-2 text-brand-green" />
                        <span>{selectedPickup.contactPersonName || ""}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <Phone className="h-4 w-4 mr-2 text-brand-green" />
                        <span>{selectedPickup.contactPersonPhone || ""}</span>
                      </div>
                    </div>
                    {selectedPickup.dropoffContactName && (
                      <div>
                        <span className="font-medium">Dropoff Contact:</span>
                        <div className="flex items-center mt-1">
                          <User className="h-4 w-4 mr-2 text-brand-green" />
                          <span>{selectedPickup.dropoffContactName}</span>
                        </div>
                        {selectedPickup.dropoffContactPhone && (
                          <div className="flex items-center mt-1">
                            <Phone className="h-4 w-4 mr-2 text-brand-green" />
                            <span>{selectedPickup.dropoffContactPhone}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Pickup Location</h3>
                  <LocationDisplay
                    address={{
                      street: selectedPickup.pickupAddress,
                      city: selectedPickup.pickupCity,
                      state: selectedPickup.pickupState,
                      zipCode: selectedPickup.pickupZipCode,
                    }}
                    contactName={selectedPickup.contactPersonName}
                    contactPhone={selectedPickup.contactPersonPhone}
                    instructions={selectedPickup.pickupInstructions}
                    title="Pickup Location"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Dropoff Location</h3>
                  <LocationDisplay
                    address={{
                      street: selectedPickup.dropoffAddress,
                      city: selectedPickup.dropoffCity,
                      state: selectedPickup.dropoffState,
                      zipCode: selectedPickup.dropoffZipCode,
                    }}
                    contactName={selectedPickup.dropoffContactName}
                    contactPhone={selectedPickup.dropoffContactPhone}
                    instructions={selectedPickup.dropoffInstructions}
                    title="Dropoff Location"
                  />
                </div>
              </div>

              {selectedPickup.notes && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Notes</h3>
                  <p className="text-gray-700">{selectedPickup.notes}</p>
                </div>
              )}

              {/* Add DeliveryStatusUpdater */}
              {selectedPickup.status !== "delivered" &&
                selectedPickup.status !== "cancelled" && (
                  <div className="mt-6 border-t pt-6">
                    <DeliveryStatusUpdater
                      pickup={selectedPickup}
                      onStatusUpdate={() => {
                        // Refresh the data after status update
                        setShowDetailsDialog(false);
                        setTimeout(() => setShowDetailsDialog(true), 100);
                      }}
                    />
                  </div>
                )}
            </div>
          )}
          {selectedDelivery && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Food Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Package className="h-4 w-4 mr-2 text-brand-green" />
                      <span className="font-medium">Type:</span>
                      <span className="ml-2 capitalize">
                        {selectedDelivery.foodType || ""}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">Quantity:</span>
                      <span className="ml-2">
                        {selectedDelivery.quantity
                          ? `${selectedDelivery.quantity} kg`
                          : ""}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Thermometer className="h-4 w-4 mr-2 text-brand-green" />
                      <span className="font-medium">Storage:</span>
                      <span className="ml-2 capitalize">
                        {selectedDelivery.storageType || ""}
                      </span>
                    </div>
                    {selectedDelivery.temperatureRange && (
                      <div className="flex items-center">
                        <span className="font-medium">Temperature Range:</span>
                        <span className="ml-2">
                          {selectedDelivery.temperatureRange}
                        </span>
                      </div>
                    )}
                    {selectedDelivery.allergens &&
                      selectedDelivery.allergens.length > 0 && (
                        <div>
                          <span className="font-medium">Allergens:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedDelivery.allergens.map((allergen, i) => (
                              <Badge
                                key={i}
                                variant="outline"
                                className="bg-red-50 text-red-700 border-red-200"
                              >
                                {allergen}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    {selectedDelivery.expiryDate && (
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-brand-green" />
                        <span className="font-medium">Expires:</span>
                        <span className="ml-2">
                          {new Date(
                            selectedDelivery.expiryDate
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Delivery Status</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="font-medium">Status:</span>
                      <Badge
                        className={`ml-2 ${
                          selectedDelivery.status === "delivered"
                            ? "bg-green-100 text-green-800"
                            : selectedDelivery.status === "in_transit"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {selectedDelivery.status?.replace(/_/g, " ") || ""}
                      </Badge>
                    </div>
                    {selectedDelivery.pickupAt && (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-brand-green" />
                        <span className="font-medium">Pickup Time:</span>
                        <span className="ml-2">
                          {new Date(selectedDelivery.pickupAt).toLocaleString()}
                        </span>
                      </div>
                    )}
                    {selectedDelivery.deliveredAt && (
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-brand-green" />
                        <span className="font-medium">Delivered At:</span>
                        <span className="ml-2">
                          {new Date(
                            selectedDelivery.deliveredAt
                          ).toLocaleString()}
                        </span>
                      </div>
                    )}
                    {selectedDelivery.createdAt && (
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-brand-green" />
                        <span className="font-medium">Created:</span>
                        <span className="ml-2">
                          {new Date(
                            selectedDelivery.createdAt
                          ).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Pickup Location</h3>
                  <LocationDisplay
                    address={{
                      street: selectedDelivery.pickupAddress || "",
                      city: selectedDelivery.pickupCity || "",
                      state: selectedDelivery.pickupState || "",
                      zipCode: selectedDelivery.pickupZipCode || "",
                    }}
                    contactName={selectedDelivery.contactPersonName || ""}
                    contactPhone={selectedDelivery.contactPersonPhone || ""}
                    instructions={selectedDelivery.pickupInstructions || ""}
                    title="Pickup Location"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Delivery Location
                  </h3>
                  <LocationDisplay
                    address={{
                      street: selectedDelivery.recipientAddress || "",
                      city: "",
                      state: "",
                      zipCode: "",
                    }}
                    contactName={selectedDelivery.recipientName || ""}
                    contactPhone=""
                    instructions=""
                    title="Delivery Location"
                  />
                </div>
              </div>

              {selectedDelivery.description && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Description</h3>
                  <p className="text-gray-700">
                    {selectedDelivery.description}
                  </p>
                </div>
              )}

              {selectedDelivery.specialInstructions && (
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Special Instructions
                  </h3>
                  <p className="text-gray-700">
                    {selectedDelivery.specialInstructions}
                  </p>
                </div>
              )}

              {selectedDelivery.photoUrls &&
                selectedDelivery.photoUrls.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-2">Photos</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedDelivery.photoUrls.map((url, i) => (
                        <div
                          key={i}
                          className="relative aspect-square rounded-md overflow-hidden"
                        >
                          <img
                            src={url}
                            alt={`Food item ${i + 1}`}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
