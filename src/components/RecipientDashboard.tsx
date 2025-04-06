import { useState, useEffect } from "react";
import { useUser } from "@/components/UserContext";
import { Donation } from "@/types";
import {
  getDonationsByRecipient,
  getAvailableDonations,
  claimDonation,
} from "@/services/firebase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  Package,
  Calendar,
  MapPin,
  CheckCircle,
  Truck,
  AlertCircle,
  Thermometer,
  AlertTriangle,
  Info,
  Camera,
  User,
  Phone,
  Mail,
  MessageSquare,
  Search,
  X,
  RefreshCw,
} from "lucide-react";
import { DashboardLayout } from "@/components/ui/DashboardLayout";
import { motion } from "framer-motion";
import LocationDisplay from "@/components/ui/LocationDisplay";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function RecipientDashboard() {
  const { user, loading: userLoading } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [availableDonations, setAvailableDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingAvailable, setLoadingAvailable] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("accepted");
  const [location, setLocation] = useState("");
  const [showAvailable, setShowAvailable] = useState(false);

  useEffect(() => {
    const fetchDonations = async () => {
      if (!user) return;

      try {
        setLoading(true);
        setError(null);
        const recipientDonations = await getDonationsByRecipient(user.uid);
        setDonations(recipientDonations);
      } catch (err) {
        console.error("Error fetching donations:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch donations"
        );
      } finally {
        setLoading(false);
      }
    };

    if (!userLoading) {
      fetchDonations();
    }
  }, [user, userLoading]);

  const handleFindDonations = async () => {
    if (!user) return;

    try {
      setLoadingAvailable(true);
      setError(null);
      const available = await getAvailableDonations(location || undefined);
      setAvailableDonations(available);
      setShowAvailable(true);
    } catch (err) {
      console.error("Error fetching available donations:", err);
      toast({
        title: "Error",
        description:
          err instanceof Error
            ? err.message
            : "Failed to fetch available donations",
        variant: "destructive",
      });
    } finally {
      setLoadingAvailable(false);
    }
  };

  const handleClaimDonation = async (donationId: string) => {
    if (!user) return;

    try {
      setLoading(true);

      // Make sure we have the required user info
      if (!user.name && !user.organizationName) {
        throw new Error("Name or organization name is required");
      }
      if (!user.address) {
        throw new Error("Address is required to claim donations");
      }

      const recipientName = user.organizationName || user.name || user.email;

      await claimDonation(donationId, user.uid, recipientName, user.address);

      // Refresh both the claimed donations and available donations
      const [recipientDonations, availableDonationsData] = await Promise.all([
        getDonationsByRecipient(user.uid),
        getAvailableDonations(location || undefined),
      ]);

      setDonations(recipientDonations);
      setAvailableDonations(availableDonationsData);

      toast({
        title: "Success",
        description: "Donation has been claimed successfully",
        variant: "default",
      });
    } catch (err) {
      console.error("Error claiming donation:", err);
      toast({
        title: "Error",
        description:
          err instanceof Error ? err.message : "Failed to claim donation",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // If user is not logged in, redirect to login
  if (!user) {
    navigate("/login");
    return null;
  }

  const stats = [
    {
      label: "Total Accepted",
      value: donations.length,
      icon: <Package className="h-4 w-4 text-brand-green" />,
    },
    {
      label: "In Transit",
      value: donations.filter((d) => d.status === "in_transit").length,
      icon: <Truck className="h-4 w-4 text-brand-green" />,
    },
    {
      label: "Delivered",
      value: donations.filter((d) => d.status === "delivered").length,
      icon: <CheckCircle className="h-4 w-4 text-brand-green" />,
    },
  ];

  return (
    <DashboardLayout
      title="Recipient Dashboard"
      description="Browse and claim food donations"
      error={error}
      loading={userLoading || (loading && donations.length === 0)}
      stats={stats}
    >
      <Tabs
        defaultValue="accepted"
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="mb-6">
          <TabsTrigger value="accepted">My Donations</TabsTrigger>
          <TabsTrigger value="find">Find Donations</TabsTrigger>
        </TabsList>

        <TabsContent value="accepted">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-brand-dark">
              My Accepted Donations
            </h2>
          </div>

          {donations.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300"
            >
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No accepted donations yet
              </h3>
              <p className="text-gray-500 mb-4">
                Browse available donations and claim them to see them here
              </p>
              <Button
                onClick={() => setActiveTab("find")}
                className="bg-brand-green hover:bg-brand-green/90"
              >
                Find Donations
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {donations.map((donation, index) => (
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
                        <Badge
                          className={
                            donation.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : donation.status === "accepted"
                              ? "bg-blue-100 text-blue-800"
                              : donation.status === "in_transit"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-green-100 text-green-800"
                          }
                        >
                          {donation.status.replace("_", " ")}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <Package className="h-4 w-4 mr-2 text-brand-green" />
                          <span>
                            {donation.quantity} {donation.unit}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 text-brand-green" />
                          <span>{donation.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2 text-brand-green" />
                          <span>
                            Expires:{" "}
                            {new Date(donation.expiryDate).toLocaleDateString()}
                          </span>
                        </div>
                        {donation.description && (
                          <p className="text-sm text-gray-600 mt-2">
                            {donation.description}
                          </p>
                        )}
                        {donation.storageType && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Thermometer className="h-4 w-4 mr-2 text-brand-green" />
                            <span className="capitalize">
                              {donation.storageType}
                            </span>
                            {donation.temperatureRange && (
                              <span className="ml-1">
                                ({donation.temperatureRange})
                              </span>
                            )}
                          </div>
                        )}
                        {donation.allergens &&
                          donation.allergens.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {donation.allergens.map((allergen, i) => (
                                <Badge
                                  key={i}
                                  className="bg-red-100 text-red-800 text-xs"
                                >
                                  {allergen}
                                </Badge>
                              ))}
                            </div>
                          )}
                        {donation.photoUrls &&
                          donation.photoUrls.length > 0 && (
                            <div className="grid grid-cols-2 gap-1 mt-2">
                              {donation.photoUrls.slice(0, 2).map((url, i) => (
                                <img
                                  key={i}
                                  src={url}
                                  alt={`Donation photo ${i + 1}`}
                                  className="w-full h-20 object-cover rounded-md"
                                />
                              ))}
                              {donation.photoUrls.length > 2 && (
                                <div className="relative">
                                  <img
                                    src={donation.photoUrls[2]}
                                    alt="Donation photo 3"
                                    className="w-full h-20 object-cover rounded-md opacity-50"
                                  />
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="bg-black bg-opacity-50 text-white rounded-full px-2 py-1 text-xs">
                                      +{donation.photoUrls.length - 2}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <div className="text-xs text-gray-500">
                        Created:{" "}
                        {new Date(donation.createdAt).toLocaleDateString()}
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="find">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-brand-dark mb-4">
              Find Available Donations
            </h2>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Filter by location (city name)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button
                onClick={handleFindDonations}
                className="bg-brand-green hover:bg-brand-green/90 flex items-center gap-2"
                disabled={loadingAvailable}
              >
                {loadingAvailable ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    <span>Find Donations</span>
                  </>
                )}
              </Button>
            </div>

            {showAvailable && (
              <>
                {availableDonations.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300"
                  >
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No available donations found
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Try a different location or check back later
                    </p>
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {availableDonations.map((donation, index) => (
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
                                Available
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center text-sm text-gray-600">
                                <Package className="h-4 w-4 mr-2 text-brand-green" />
                                <span>
                                  {donation.quantity} {donation.unit}
                                </span>
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
                              {donation.storageType && (
                                <div className="flex items-center text-sm text-gray-600">
                                  <Thermometer className="h-4 w-4 mr-2 text-brand-green" />
                                  <span className="capitalize">
                                    {donation.storageType}
                                  </span>
                                  {donation.temperatureRange && (
                                    <span className="ml-1">
                                      ({donation.temperatureRange})
                                    </span>
                                  )}
                                </div>
                              )}
                              {donation.allergens &&
                                donation.allergens.length > 0 && (
                                  <div className="flex flex-wrap gap-1">
                                    {donation.allergens.map((allergen, i) => (
                                      <Badge
                                        key={i}
                                        className="bg-red-100 text-red-800 text-xs"
                                      >
                                        {allergen}
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                            </div>

                            <Button
                              onClick={() => handleClaimDonation(donation.id!)}
                              disabled={loading}
                              className="w-full mt-4 bg-brand-green hover:bg-brand-green/90"
                            >
                              {loading ? "Processing..." : "Claim Donation"}
                            </Button>
                          </CardContent>
                          <CardFooter className="pt-0">
                            <div className="text-xs text-gray-500">
                              From: {donation.donorName}
                            </div>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
