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
  Edit,
  LogOut,
  ArrowLeft,
  RefreshCcw,
  Heart,
  Users,
  Building,
  Mail,
  Phone,
  MapPin as MapPinIcon,
  Clock as ClockIcon,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Donation, Pickup } from "@/types";
import { db } from "@/integrations/firebase/client";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  updateDoc,
  doc,
} from "firebase/firestore";
import { format, parseISO } from "date-fns";
import { motion } from "framer-motion";
import {
  getDonationsByDonor,
  getPickupsByVolunteer,
  getUserProfile,
  updateRecipientProfile,
  getRecipientActivityHistory,
} from "@/services/firebase";

export default function UserProfile() {
  const { user, userRole, logout } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: user?.name || "",
    organizationName: user?.organizationName || "",
    phone: user?.phone || "",
    location: user?.location || "",
    address: user?.address || "",
  });
  const [donations, setDonations] = useState<Donation[]>([]);
  const [pickups, setPickups] = useState<Pickup[]>([]);
  const [acceptedDonations, setAcceptedDonations] = useState<Donation[]>([]);
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalAccepted: 0,
    totalDelivered: 0,
    totalPickups: 0,
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/auth?mode=login");
    }
  }, [user, navigate]);

  // Fetch user data and history based on role
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      try {
        setLoading(true);
        setError(null);

        // Fetch user profile
        const userProfile = await getUserProfile(user.uid);
        if (userProfile) {
          setEditedProfile({
            name: userProfile.name || "",
            organizationName: userProfile.organizationName || "",
            phone: userProfile.phone || "",
            location: userProfile.location || "",
            address: userProfile.address || "",
          });
        }

        // Fetch role-specific data
        if (userRole === "donor") {
          const donorDonations = await getDonationsByDonor(user.uid);
          setDonations(donorDonations);
          setStats({
            totalDonations: donorDonations.length,
            totalAccepted: donorDonations.filter(
              (d) =>
                d.status === "accepted" ||
                d.status === "in_transit" ||
                d.status === "delivered"
            ).length,
            totalDelivered: donorDonations.filter(
              (d) => d.status === "delivered"
            ).length,
            totalPickups: 0,
          });
        } else if (userRole === "recipient") {
          // Use the new function to fetch recipient activity history
          const recipientDonations = await getRecipientActivityHistory(
            user.uid
          );
          setAcceptedDonations(recipientDonations);
          setStats({
            totalDonations: 0,
            totalAccepted: recipientDonations.length,
            totalDelivered: recipientDonations.filter(
              (d) => d.status === "delivered"
            ).length,
            totalPickups: 0,
          });
        } else if (userRole === "volunteer") {
          const volunteerPickups = await getPickupsByVolunteer(user.uid);
          setPickups(volunteerPickups);
          setStats({
            totalDonations: 0,
            totalAccepted: 0,
            totalDelivered: volunteerPickups.filter(
              (p) => p.status === "delivered"
            ).length,
            totalPickups: volunteerPickups.length,
          });
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch user data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, userRole, navigate]);

  const handleSaveProfile = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      // Update user profile in Firestore
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, editedProfile);

      // If user is a recipient, also update recipient profile
      if (userRole === "recipient") {
        await updateRecipientProfile(user.uid, editedProfile);
      }

      setSuccess("Profile updated successfully");
      setIsEditMode(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Helper function to get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 pt-24">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Button
            variant="ghost"
            size="sm"
            className="mr-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-brand-dark">My Profile</h1>
        </div>
        <p className="text-gray-600">
          View and manage your profile information and activity history
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-medium">Profile</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditMode(!isEditMode)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {isEditMode ? "Cancel" : "Edit"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-6">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarFallback className="text-xl">
                    {getInitials(user?.name || "User")}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold">
                  {user?.name || "Anonymous User"}
                </h2>
                <Badge
                  variant="outline"
                  className={`mt-2 capitalize ${
                    userRole === "donor"
                      ? "bg-green-100 text-green-800 border-green-200"
                      : userRole === "recipient"
                      ? "bg-blue-100 text-blue-800 border-blue-200"
                      : userRole === "volunteer"
                      ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                      : ""
                  }`}
                >
                  {userRole}
                </Badge>
              </div>

              {isEditMode ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <Input
                      value={editedProfile.name}
                      onChange={(e) =>
                        setEditedProfile({
                          ...editedProfile,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  {userRole === "recipient" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Organization Name
                      </label>
                      <Input
                        value={editedProfile.organizationName}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            organizationName: e.target.value,
                          })
                        }
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <Textarea
                      value={editedProfile.address}
                      onChange={(e) =>
                        setEditedProfile({
                          ...editedProfile,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>
                  <Button
                    onClick={handleSaveProfile}
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="h-4 w-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-gray-600">{user?.email}</p>
                    </div>
                  </div>
                  {userRole === "recipient" && user?.organizationName && (
                    <div className="flex items-start">
                      <Building className="h-4 w-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Organization</p>
                        <p className="text-sm text-gray-600">
                          {user.organizationName}
                        </p>
                      </div>
                    </div>
                  )}
                  {user?.phone && (
                    <div className="flex items-start">
                      <Phone className="h-4 w-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Phone</p>
                        <p className="text-sm text-gray-600">{user.phone}</p>
                      </div>
                    </div>
                  )}
                  {user?.location && (
                    <div className="flex items-start">
                      <MapPinIcon className="h-4 w-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Location</p>
                        <p className="text-sm text-gray-600">{user.location}</p>
                      </div>
                    </div>
                  )}
                  {user?.address && (
                    <div className="flex items-start">
                      <MapPinIcon className="h-4 w-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Address</p>
                        <p className="text-sm text-gray-600">{user.address}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start">
                    <ClockIcon className="h-4 w-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Member Since</p>
                      <p className="text-sm text-gray-600">
                        {user?.createdAt
                          ? format(parseISO(user.createdAt), "MMMM d, yyyy")
                          : "Unknown"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Stats and History */}
        <div className="lg:col-span-2">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {userRole === "donor" && (
              <>
                <Card className="bg-white shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">
                      Total Donations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <Package className="h-8 w-8 text-brand-blue mr-3" />
                      <div>
                        <p className="text-2xl font-bold">
                          {stats.totalDonations}
                        </p>
                        <p className="text-sm text-gray-500">
                          Food items donated
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">
                      Accepted Donations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <Heart className="h-8 w-8 text-brand-green mr-3" />
                      <div>
                        <p className="text-2xl font-bold">
                          {stats.totalAccepted}
                        </p>
                        <p className="text-sm text-gray-500">
                          Donations accepted
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">
                      Delivered Donations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <CheckCircle className="h-8 w-8 text-brand-yellow mr-3" />
                      <div>
                        <p className="text-2xl font-bold">
                          {stats.totalDelivered}
                        </p>
                        <p className="text-sm text-gray-500">
                          Successfully delivered
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {userRole === "recipient" && (
              <>
                <Card className="bg-white shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">
                      Accepted Donations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <Package className="h-8 w-8 text-brand-blue mr-3" />
                      <div>
                        <p className="text-2xl font-bold">
                          {stats.totalAccepted}
                        </p>
                        <p className="text-sm text-gray-500">
                          Donations accepted
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">
                      Delivered Donations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <CheckCircle className="h-8 w-8 text-brand-green mr-3" />
                      <div>
                        <p className="text-2xl font-bold">
                          {stats.totalDelivered}
                        </p>
                        <p className="text-sm text-gray-500">
                          Successfully received
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {userRole === "volunteer" && (
              <>
                <Card className="bg-white shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">
                      Total Pickups
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <Truck className="h-8 w-8 text-brand-blue mr-3" />
                      <div>
                        <p className="text-2xl font-bold">
                          {stats.totalPickups}
                        </p>
                        <p className="text-sm text-gray-500">
                          Deliveries assigned
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">
                      Completed Deliveries
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <CheckCircle className="h-8 w-8 text-brand-green mr-3" />
                      <div>
                        <p className="text-2xl font-bold">
                          {stats.totalDelivered}
                        </p>
                        <p className="text-sm text-gray-500">
                          Successfully delivered
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* History Tabs */}
          <Card>
            <CardHeader>
              <CardTitle>Activity History</CardTitle>
              <CardDescription>
                View your past activities and contributions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                defaultValue={
                  userRole === "donor"
                    ? "donations"
                    : userRole === "recipient"
                    ? "accepted"
                    : "pickups"
                }
              >
                <TabsList className="mb-4">
                  {userRole === "donor" && (
                    <TabsTrigger value="donations">My Donations</TabsTrigger>
                  )}
                  {userRole === "recipient" && (
                    <TabsTrigger value="accepted">
                      Accepted Donations
                    </TabsTrigger>
                  )}
                  {userRole === "volunteer" && (
                    <TabsTrigger value="pickups">My Deliveries</TabsTrigger>
                  )}
                </TabsList>

                {userRole === "donor" && (
                  <TabsContent value="donations">
                    {donations.length === 0 ? (
                      <div className="text-center py-12">
                        <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">
                          You haven't made any donations yet.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {donations.map((donation) => (
                          <Card key={donation.id} className="overflow-hidden">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <CardTitle className="text-lg">
                                  {donation.foodType}
                                </CardTitle>
                                <Badge
                                  variant="outline"
                                  className={`${
                                    donation.status === "accepted"
                                      ? "bg-blue-100 text-blue-800 border-blue-200"
                                      : donation.status === "in_transit"
                                      ? "bg-purple-100 text-purple-800 border-purple-200"
                                      : "bg-green-100 text-green-800 border-green-200"
                                  }`}
                                >
                                  {donation.status.replace("_", " ")}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                <div className="flex items-center text-sm">
                                  <Package className="h-4 w-4 mr-2 text-gray-500" />
                                  <span className="font-medium">Quantity:</span>
                                  <span className="ml-2">
                                    {donation.quantity} kg
                                  </span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                                  <span className="font-medium">Location:</span>
                                  <span className="ml-2">
                                    {donation.location}
                                  </span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                                  <span className="font-medium">
                                    Expiry Date:
                                  </span>
                                  <span className="ml-2">
                                    {new Date(
                                      donation.expiryDate
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                                {donation.description && (
                                  <div className="text-sm pl-6 text-gray-600">
                                    <span className="font-medium">
                                      Description:
                                    </span>{" "}
                                    {donation.description}
                                  </div>
                                )}
                                {donation.recipientName && (
                                  <div className="flex items-center text-sm">
                                    <Users className="h-4 w-4 mr-2 text-gray-500" />
                                    <span className="font-medium">
                                      Recipient:
                                    </span>
                                    <span className="ml-2">
                                      {donation.recipientName}
                                    </span>
                                  </div>
                                )}
                                {donation.volunteerName && (
                                  <div className="flex items-center text-sm">
                                    <Truck className="h-4 w-4 mr-2 text-gray-500" />
                                    <span className="font-medium">
                                      Volunteer:
                                    </span>
                                    <span className="ml-2">
                                      {donation.volunteerName}
                                    </span>
                                  </div>
                                )}
                                <div className="flex items-center text-sm">
                                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                                  <span className="font-medium">Created:</span>
                                  <span className="ml-2">
                                    {new Date(
                                      donation.createdAt
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                )}

                {userRole === "recipient" && (
                  <TabsContent value="accepted">
                    {acceptedDonations.length === 0 ? (
                      <div className="text-center py-12">
                        <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">
                          You haven't accepted any donations yet.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {acceptedDonations.map((donation) => (
                          <Card key={donation.id} className="overflow-hidden">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <CardTitle className="text-lg">
                                  {donation.foodType}
                                </CardTitle>
                                <Badge
                                  variant="outline"
                                  className={`${
                                    donation.status === "accepted"
                                      ? "bg-blue-100 text-blue-800 border-blue-200"
                                      : donation.status === "in_transit"
                                      ? "bg-purple-100 text-purple-800 border-purple-200"
                                      : "bg-green-100 text-green-800 border-green-200"
                                  }`}
                                >
                                  {donation.status.replace("_", " ")}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                <div className="flex items-center text-sm">
                                  <Package className="h-4 w-4 mr-2 text-gray-500" />
                                  <span className="font-medium">Quantity:</span>
                                  <span className="ml-2">
                                    {donation.quantity} kg
                                  </span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                                  <span className="font-medium">
                                    Pickup Location:
                                  </span>
                                  <span className="ml-2">
                                    {donation.location}
                                  </span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                                  <span className="font-medium">
                                    Expiry Date:
                                  </span>
                                  <span className="ml-2">
                                    {new Date(
                                      donation.expiryDate
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                                {donation.description && (
                                  <div className="text-sm pl-6 text-gray-600">
                                    <span className="font-medium">
                                      Description:
                                    </span>{" "}
                                    {donation.description}
                                  </div>
                                )}
                                <div className="flex items-center text-sm">
                                  <Users className="h-4 w-4 mr-2 text-gray-500" />
                                  <span className="font-medium">Donor:</span>
                                  <span className="ml-2">
                                    {donation.donorName}
                                  </span>
                                </div>
                                {donation.volunteerName && (
                                  <div className="flex items-center text-sm">
                                    <Truck className="h-4 w-4 mr-2 text-gray-500" />
                                    <span className="font-medium">
                                      Volunteer:
                                    </span>
                                    <span className="ml-2">
                                      {donation.volunteerName}
                                    </span>
                                  </div>
                                )}
                                <div className="flex items-center text-sm">
                                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                                  <span className="font-medium">Accepted:</span>
                                  <span className="ml-2">
                                    {donation.updatedAt
                                      ? new Date(
                                          donation.updatedAt
                                        ).toLocaleDateString()
                                      : "Unknown"}
                                  </span>
                                </div>
                                {donation.deliveredAt && (
                                  <div className="flex items-center text-sm">
                                    <CheckCircle className="h-4 w-4 mr-2 text-gray-500" />
                                    <span className="font-medium">
                                      Delivered:
                                    </span>
                                    <span className="ml-2">
                                      {new Date(
                                        donation.deliveredAt
                                      ).toLocaleDateString()}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                )}

                {userRole === "volunteer" && (
                  <TabsContent value="pickups">
                    {pickups.length === 0 ? (
                      <div className="text-center py-12">
                        <Truck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">
                          You haven't made any deliveries yet.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {pickups.map((pickup) => (
                          <Card key={pickup.id} className="overflow-hidden">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <CardTitle className="text-lg">
                                  Delivery #{pickup.id?.slice(0, 8)}
                                </CardTitle>
                                <Badge
                                  variant="outline"
                                  className={`${
                                    pickup.status === "pending"
                                      ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                      : pickup.status === "in_transit"
                                      ? "bg-blue-100 text-blue-800 border-blue-200"
                                      : "bg-green-100 text-green-800 border-green-200"
                                  }`}
                                >
                                  {pickup.status.replace("_", " ")}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                <div className="flex items-center text-sm">
                                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                                  <span className="font-medium">
                                    Pickup Location:
                                  </span>
                                  <span className="ml-2">
                                    {pickup.pickupLocation}
                                  </span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                                  <span className="font-medium">
                                    Dropoff Location:
                                  </span>
                                  <span className="ml-2">
                                    {pickup.dropoffLocation}
                                  </span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <Users className="h-4 w-4 mr-2 text-gray-500" />
                                  <span className="font-medium">Donor:</span>
                                  <span className="ml-2">
                                    {pickup.donorName || "Unknown Donor"}
                                  </span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <Users className="h-4 w-4 mr-2 text-gray-500" />
                                  <span className="font-medium">
                                    Recipient:
                                  </span>
                                  <span className="ml-2">
                                    {pickup.recipientName ||
                                      "Unknown Recipient"}
                                  </span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                                  <span className="font-medium">Created:</span>
                                  <span className="ml-2">
                                    {new Date(
                                      pickup.createdAt
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                )}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
