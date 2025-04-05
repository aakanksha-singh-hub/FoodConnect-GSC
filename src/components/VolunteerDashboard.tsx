import { useState, useEffect, useCallback, useMemo } from "react";
import { useUser } from "@/components/UserContext";
import {
  getAcceptedDonations,
  updateDonationStatus,
  createPickup,
  getPickupsByVolunteer,
  updatePickupStatus,
} from "@/services/firebase";
import { Donation, Pickup } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

export default function VolunteerDashboard() {
  const { user, loading: userLoading } = useUser();
  const navigate = useNavigate();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locationFilter, setLocationFilter] = useState("");
  const [pickups, setPickups] = useState<Pickup[]>([]);
  const [activeTab, setActiveTab] = useState("active");
  const [stats, setStats] = useState({
    totalPickups: 0,
    completedDeliveries: 0,
    inTransitDeliveries: 0,
    pendingDeliveries: 0,
    totalFoodDelivered: 0,
    peopleHelped: 0,
    averageDeliveryTime: 0,
  });

  // Memoize the fetchData function to prevent unnecessary re-renders
  const fetchData = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      // Fetch accepted donations
      const acceptedDonations = await getAcceptedDonations(locationFilter);
      setDonations(acceptedDonations);

      // Fetch volunteer pickups
      const volunteerPickups = await getPickupsByVolunteer(user.uid);
      setPickups(volunteerPickups);

      // Calculate stats
      const completedPickups = volunteerPickups.filter(
        (p) => p.status === "completed"
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
        totalPickups: volunteerPickups.length,
        completedDeliveries: completedPickups.length,
        inTransitDeliveries: acceptedDonations.filter(
          (d) => d.status === "in_transit" && d.volunteerId === user.uid
        ).length,
        pendingDeliveries: acceptedDonations.filter(
          (d) => d.status === "accepted"
        ).length,
        totalFoodDelivered,
        peopleHelped,
        averageDeliveryTime,
      });
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, [user, locationFilter]);

  // Use useEffect with the memoized fetchData function
  useEffect(() => {
    if (!userLoading) {
      fetchData();
    }
  }, [fetchData, userLoading]);

  // Memoize the handleAcceptDelivery function
  const handleAcceptDelivery = useCallback(
    async (donation: Donation) => {
      if (!user) return;

      try {
        setLoading(true);
        setError(null);

        // Create a pickup record
        await createPickup({
          donationId: donation.id!,
          donorId: donation.donorId,
          recipientId: donation.recipientId!,
          volunteerId: user.uid,
          pickupLocation: donation.location,
          dropoffLocation:
            donation.recipientAddress || "Address will be provided",
          quantity: donation.quantity,
        });

        // Update donation status
        await updateDonationStatus(donation.id!, "in_transit", {
          volunteerId: user.uid,
          volunteerName: user.displayName || "Anonymous Volunteer",
          pickupAt: new Date().toISOString(),
        });

        // Refresh the data
        await fetchData();
      } catch (err) {
        console.error("Error accepting delivery:", err);
        setError(
          err instanceof Error ? err.message : "Failed to accept delivery"
        );
      } finally {
        setLoading(false);
      }
    },
    [user, fetchData]
  );

  // Memoize the handleCompleteDelivery function
  const handleCompleteDelivery = useCallback(
    async (donation: Donation) => {
      if (!user) return;

      try {
        setLoading(true);
        setError(null);

        // Update donation status to delivered
        await updateDonationStatus(donation.id!, "delivered", {
          deliveredAt: new Date().toISOString(),
        });

        // Update pickup status
        const pickup = pickups.find((p) => p.donationId === donation.id);
        if (pickup) {
          await updatePickupStatus(pickup.id!, "completed");
        }

        // Refresh the data
        await fetchData();
      } catch (err) {
        console.error("Error completing delivery:", err);
        setError(
          err instanceof Error ? err.message : "Failed to complete delivery"
        );
      } finally {
        setLoading(false);
      }
    },
    [user, pickups, fetchData]
  );

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
  const filteredPickups = pickups.filter((pickup) => {
    if (activeTab === "active") {
      return pickup.status === "in_progress";
    } else if (activeTab === "completed") {
      return pickup.status === "completed";
    } else if (activeTab === "cancelled") {
      return pickup.status === "cancelled";
    }
    return true;
  });

  const handleStatusUpdate = async (
    pickupId: string,
    newStatus: "completed" | "cancelled"
  ) => {
    if (!user) return;

    try {
      setError(null);
      await updatePickupStatus(pickupId, newStatus);

      // Refresh the pickups list
      const updatedPickups = await getPickupsByVolunteer(user.uid);
      setPickups(updatedPickups);
    } catch (err) {
      console.error("Error updating pickup status:", err);
      setError(
        err instanceof Error ? err.message : "Failed to update pickup status"
      );
    }
  };

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
                  onClick={fetchData}
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
                      <CardFooter>
                        <Button
                          onClick={() => handleAcceptDelivery(donation)}
                          className="w-full bg-brand-green hover:bg-brand-green/90"
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
                      <CardFooter>
                        <Button
                          onClick={() => handleCompleteDelivery(donation)}
                          className="w-full bg-brand-green hover:bg-brand-green/90"
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
                              <CheckCircle className="mr-2 h-4 w-4" /> Mark as
                              Delivered
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
                      <CardFooter className="pt-0">
                        <div className="text-xs text-gray-500">
                          Completed:{" "}
                          {new Date(
                            donation.deliveredAt || ""
                          ).toLocaleDateString()}
                        </div>
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
                        pickup.status === "in_progress"
                          ? "bg-blue-100 text-blue-800"
                          : pickup.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }
                    >
                      {pickup.status.replace("_", " ")}
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
                  {pickup.status === "in_progress" && (
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() =>
                          handleStatusUpdate(pickup.id!, "completed")
                        }
                      >
                        Complete
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 border-red-600 hover:bg-red-50"
                        onClick={() =>
                          handleStatusUpdate(pickup.id!, "cancelled")
                        }
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
