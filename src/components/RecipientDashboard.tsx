import { useState, useEffect } from "react";
import { useUser } from "@/components/UserContext";
import { Donation } from "@/types";
import { getDonationsByRecipient } from "@/services/firebase";
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
} from "lucide-react";
import { DashboardLayout } from "@/components/ui/DashboardLayout";
import { motion } from "framer-motion";
import LocationDisplay from "@/components/ui/LocationDisplay";

export default function RecipientDashboard() {
  const { user, loading: userLoading } = useUser();
  const navigate = useNavigate();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      description="Browse and accept food donations"
      error={error}
      loading={userLoading || (loading && donations.length === 0)}
      stats={stats}
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-brand-dark">
          Accepted Donations
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
            Browse available donations and accept them to see them here
          </p>
          <Button
            onClick={() => (window.location.href = "/browse")}
            className="bg-brand-green hover:bg-brand-green/90"
          >
            Browse Donations
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
                    {donation.photoUrls && donation.photoUrls.length > 0 && (
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
                    Created: {new Date(donation.createdAt).toLocaleDateString()}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
