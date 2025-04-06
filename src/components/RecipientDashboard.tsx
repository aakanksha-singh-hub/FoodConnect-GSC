import { useState, useEffect } from "react";
import { useUser } from "@/components/UserContext";
import { Donation } from "@/types";
import {
  getDonationsByRecipient,
  getAvailableDonations,
  claimDonation,
  subscribeToRecipientDonationsSorted,
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
  Clock,
} from "lucide-react";
import { DashboardLayout } from "@/components/ui/DashboardLayout";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { format } from "date-fns";

const DonationDetails = ({ donation }: { donation: Donation }) => {
  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
      {/* Food Details */}
      <div className="space-y-2">
        <h4 className="font-medium text-gray-900">Food Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center text-sm">
            <Package className="h-4 w-4 mr-2 text-gray-500" />
            <span className="font-medium">Quantity:</span>
            <span className="ml-2">
              {donation.quantity} {donation.unit}
            </span>
          </div>
          <div className="flex items-center text-sm">
            <Thermometer className="h-4 w-4 mr-2 text-gray-500" />
            <span className="font-medium">Storage:</span>
            <span className="ml-2 capitalize">{donation.storageType}</span>
            {donation.temperatureRange && (
              <span className="ml-1">({donation.temperatureRange})</span>
            )}
          </div>
        </div>
        {donation.allergens.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {donation.allergens.map((allergen) => (
              <Badge key={allergen} variant="secondary">
                {allergen}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Location Details */}
      <div className="space-y-2">
        <h4 className="font-medium text-gray-900">Pickup Location</h4>
        <div className="flex items-start text-sm">
          <MapPin className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
          <div>
            <p className="font-medium">Address:</p>
            <p className="text-gray-600">{donation.pickupAddress}</p>
            <p className="text-gray-600">
              {donation.pickupCity}, {donation.pickupState}{" "}
              {donation.pickupZipCode}
            </p>
          </div>
        </div>
        {donation.pickupInstructions && (
          <div className="text-sm text-gray-600 mt-2">
            <span className="font-medium">Pickup Instructions:</span>{" "}
            {donation.pickupInstructions}
          </div>
        )}
      </div>

      {/* Contact Information */}
      <div className="space-y-2">
        <h4 className="font-medium text-gray-900">Contact Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center text-sm">
            <User className="h-4 w-4 mr-2 text-gray-500" />
            <span className="font-medium">Contact Person:</span>
            <span className="ml-2">{donation.contactPersonName}</span>
          </div>
          <div className="flex items-center text-sm">
            <Phone className="h-4 w-4 mr-2 text-gray-500" />
            <span className="font-medium">Phone:</span>
            <span className="ml-2">{donation.contactPersonPhone}</span>
          </div>
        </div>
      </div>

      {/* Donor Information */}
      <div className="space-y-2">
        <h4 className="font-medium text-gray-900">Donor Information</h4>
        <div className="flex items-center text-sm">
          <User className="h-4 w-4 mr-2 text-gray-500" />
          <span className="font-medium">Donor:</span>
          <span className="ml-2">{donation.donorName}</span>
        </div>
      </div>

      {/* Delivery Information */}
      {donation.volunteerName && (
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">Delivery Information</h4>
          <div className="flex items-center text-sm">
            <Truck className="h-4 w-4 mr-2 text-gray-500" />
            <span className="font-medium">Volunteer:</span>
            <span className="ml-2">{donation.volunteerName}</span>
          </div>
          {donation.pickupAt && (
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2 text-gray-500" />
              <span className="font-medium">Picked up:</span>
              <span className="ml-2">
                {format(new Date(donation.pickupAt), "PPp")}
              </span>
            </div>
          )}
          {donation.deliveredAt && (
            <div className="flex items-center text-sm">
              <CheckCircle className="h-4 w-4 mr-2 text-gray-500" />
              <span className="font-medium">Delivered:</span>
              <span className="ml-2">
                {format(new Date(donation.deliveredAt), "PPp")}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Additional Information */}
      {(donation.description ||
        donation.nutritionalInfo ||
        donation.packagingDetails ||
        donation.specialInstructions) && (
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">Additional Information</h4>
          {donation.description && (
            <div className="text-sm">
              <span className="font-medium">Description:</span>{" "}
              {donation.description}
            </div>
          )}
          {donation.nutritionalInfo && (
            <div className="text-sm">
              <span className="font-medium">Nutritional Info:</span>{" "}
              {donation.nutritionalInfo}
            </div>
          )}
          {donation.packagingDetails && (
            <div className="text-sm">
              <span className="font-medium">Packaging:</span>{" "}
              {donation.packagingDetails}
            </div>
          )}
          {donation.specialInstructions && (
            <div className="text-sm">
              <span className="font-medium">Special Instructions:</span>{" "}
              {donation.specialInstructions}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

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

  // Replace the fetchData function with a real-time subscription
  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeToRecipientDonationsSorted(
      user.uid,
      (updatedDonations) => {
        setDonations(updatedDonations);
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [user]);

  // Add a new effect to automatically fetch available donations when the "find" tab is selected
  useEffect(() => {
    if (activeTab === "find") {
      handleFindDonations();
    }
  }, [activeTab]);

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

      // Refresh available donations
      const availableDonationsData = await getAvailableDonations(
        location || undefined
      );
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

  const renderDonations = (donationsToRender: Donation[]) => {
    if (donationsToRender.length === 0) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300"
        >
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No donations found
          </h3>
          <p className="text-gray-500 mb-4">
            {activeTab === "accepted"
              ? "Browse available donations and claim them to see them here"
              : "No available donations found in this location"}
          </p>
          {activeTab === "accepted" && (
            <Button
              onClick={() => setActiveTab("find")}
              className="bg-brand-green hover:bg-brand-green/90"
            >
              Find Donations
            </Button>
          )}
        </motion.div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {donationsToRender.map((donation, index) => (
          <motion.div
            key={donation.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="h-full overflow-hidden hover:shadow-md transition-shadow duration-300">
              <Accordion type="single" collapsible>
                <AccordionItem value="details" className="border-none">
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
                      {donation.allergens && donation.allergens.length > 0 && (
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

                      {/* Add Donor Information */}
                      <div className="flex items-center text-sm text-gray-600 mt-2">
                        <User className="h-4 w-4 mr-2 text-brand-green" />
                        <span className="font-medium">Donor:</span>
                        <span className="ml-2">{donation.donorName}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <div className="text-xs text-gray-500">
                      Created:{" "}
                      {new Date(donation.createdAt).toLocaleDateString()}
                    </div>
                  </CardFooter>
                  <AccordionTrigger className="px-6 py-2 hover:no-underline">
                    <span className="text-sm font-medium text-brand-green">
                      View Details
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <DonationDetails donation={donation} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <DashboardLayout
        title="Recipient Dashboard"
        description="Browse and claim food donations"
        error={error}
        loading={userLoading || (loading && donations.length === 0)}
        stats={stats}
      >
        <Tabs
          defaultValue="accepted"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="flex w-full mb-6">
            <TabsTrigger value="accepted" className="flex-1">
              My Donations
            </TabsTrigger>
            <TabsTrigger value="find" className="flex-1">
              Find Donations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="accepted" className="min-h-[400px]">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-brand-dark">
                My Accepted Donations
              </h2>
            </div>
            {renderDonations(donations)}
          </TabsContent>

          <TabsContent value="find" className="min-h-[400px]">
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
                      <span>Search</span>
                    </>
                  )}
                </Button>
              </div>

              {showAvailable && renderDonations(availableDonations)}
            </div>
          </TabsContent>
        </Tabs>
      </DashboardLayout>
    </div>
  );
}
