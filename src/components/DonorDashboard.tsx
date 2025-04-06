import { useState, useEffect, useCallback } from "react";
import { useUser } from "@/components/UserContext";
import {
  getDonationsByDonor,
  createDonation,
  updateDonationStatus,
  subscribeToDonorDonations,
} from "@/services/firebase";
import { Donation } from "@/types";
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
  Plus,
  X,
  Thermometer,
  AlertTriangle,
  Info,
  Camera,
  User,
  Phone,
  Mail,
  MessageSquare,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/ui/DashboardLayout";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const COMMON_ALLERGENS = [
  "Milk",
  "Eggs",
  "Fish",
  "Shellfish",
  "Tree Nuts",
  "Peanuts",
  "Wheat",
  "Soybeans",
];

const STORAGE_TYPES = [
  { value: "refrigerated", label: "Refrigerated" },
  { value: "frozen", label: "Frozen" },
  { value: "ambient", label: "Ambient (Room Temperature)" },
];

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
        <h4 className="font-medium text-gray-900">Location Details</h4>
        <div className="flex items-start text-sm">
          <MapPin className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
          <div>
            <p className="font-medium">Pickup Address:</p>
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

      {/* Recipient & Volunteer Information */}
      {(donation.recipientName || donation.volunteerName) && (
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">Delivery Information</h4>
          {donation.recipientName && (
            <div className="flex items-center text-sm">
              <User className="h-4 w-4 mr-2 text-gray-500" />
              <span className="font-medium">Recipient:</span>
              <span className="ml-2">{donation.recipientName}</span>
            </div>
          )}
          {donation.volunteerName && (
            <div className="flex items-center text-sm">
              <Truck className="h-4 w-4 mr-2 text-gray-500" />
              <span className="font-medium">Volunteer:</span>
              <span className="ml-2">{donation.volunteerName}</span>
            </div>
          )}
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

export default function DonorDashboard() {
  const { user, loading: userLoading } = useUser();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [formData, setFormData] = useState({
    foodType: "",
    quantity: "",
    unit: "kg",
    description: "",
    expiryDate: "",
    // Enhanced food details
    storageType: "ambient",
    temperatureRange: "",
    allergens: [] as string[],
    additionalAllergens: "",
    nutritionalInfo: "",
    packagingDetails: "",
    // Enhanced pickup details
    pickupInstructions: "",
    pickupTimeWindowStart: "",
    pickupTimeWindowEnd: "",
    contactPersonName: "",
    contactPersonPhone: "",
    alternativeContactName: "",
    alternativeContactPhone: "",
    preferredCommunicationMethod: "phone",
    // Special instructions
    specialInstructions: "",
    // Location fields (replacing Google Maps)
    pickupAddress: "",
    pickupCity: "",
    pickupState: "",
    pickupZipCode: "",
    pickupLat: 0,
    pickupLng: 0,
  });
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);

  // Replace the fetchData function with a real-time subscription
  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeToDonorDonations(
      user.uid,
      (updatedDonations) => {
        setDonations(updatedDonations);
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [user]);

  // Filter donations based on active tab
  const filteredDonations = donations.filter((donation) => {
    if (activeTab === "all") return true;
    if (activeTab === "pending") return donation.status === "pending";
    if (activeTab === "accepted") return donation.status === "accepted";
    if (activeTab === "in-transit") return donation.status === "in_transit";
    if (activeTab === "delivered") return donation.status === "delivered";
    return true;
  });

  // Memoize the handleSubmit function
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!user) return;

      try {
        setSubmitting(true);
        setError(null);

        // Validate form data
        if (!formData.foodType || !formData.quantity || !formData.expiryDate) {
          setError("Please fill in all required fields");
          return;
        }

        // Create donation object
        const newDonation: Omit<Donation, "id" | "status" | "createdAt"> = {
          donorId: user.uid,
          donorName: user.organizationName || user.name || "Anonymous Donor",
          foodType: formData.foodType,
          quantity: parseFloat(formData.quantity),
          unit: formData.unit,
          description: formData.description || "",
          expiryDate: formData.expiryDate,
          // Enhanced food details
          storageType: formData.storageType as
            | "refrigerated"
            | "frozen"
            | "ambient",
          temperatureRange: formData.temperatureRange || "",
          allergens: formData.allergens,
          additionalAllergens: formData.additionalAllergens || "",
          nutritionalInfo: formData.nutritionalInfo || "",
          packagingDetails: formData.packagingDetails || "",
          // Enhanced pickup details
          pickupInstructions: formData.pickupInstructions || "",
          pickupTimeWindowStart: formData.pickupTimeWindowStart || "",
          pickupTimeWindowEnd: formData.pickupTimeWindowEnd || "",
          contactPersonName: formData.contactPersonName,
          contactPersonPhone: formData.contactPersonPhone,
          alternativeContactName: formData.alternativeContactName || "",
          alternativeContactPhone: formData.alternativeContactPhone || "",
          preferredCommunicationMethod:
            formData.preferredCommunicationMethod as "phone" | "email" | "text",
          // Special instructions
          specialInstructions: formData.specialInstructions || "",
          // Location
          location: `${formData.pickupAddress}, ${formData.pickupCity}, ${formData.pickupState} ${formData.pickupZipCode}`,
          pickupAddress: formData.pickupAddress,
          pickupCity: formData.pickupCity,
          pickupState: formData.pickupState,
          pickupZipCode: formData.pickupZipCode,
          pickupLat: formData.pickupLat,
          pickupLng: formData.pickupLng,
          // Photos
          photoUrls: photoUrls,
        };

        // Create donation in Firebase
        await createDonation(newDonation);

        // Reset form and refresh data
        setFormData({
          foodType: "",
          quantity: "",
          unit: "kg",
          description: "",
          expiryDate: "",
          storageType: "ambient",
          temperatureRange: "",
          allergens: [],
          additionalAllergens: "",
          nutritionalInfo: "",
          packagingDetails: "",
          pickupInstructions: "",
          pickupTimeWindowStart: "",
          pickupTimeWindowEnd: "",
          contactPersonName: "",
          contactPersonPhone: "",
          alternativeContactName: "",
          alternativeContactPhone: "",
          preferredCommunicationMethod: "phone",
          specialInstructions: "",
          pickupAddress: "",
          pickupCity: "",
          pickupState: "",
          pickupZipCode: "",
          pickupLat: 0,
          pickupLng: 0,
        });
        setPhotoFiles([]);
        setPhotoUrls([]);
        setShowDonationForm(false);
      } catch (err) {
        console.error("Error creating donation:", err);
        setError(
          err instanceof Error ? err.message : "Failed to create donation"
        );
      } finally {
        setSubmitting(false);
      }
    },
    [user, formData, photoUrls]
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAllergenChange = (allergen: string, checked: boolean) => {
    setFormData((prev) => {
      if (checked) {
        return {
          ...prev,
          allergens: [...prev.allergens, allergen],
        };
      } else {
        return {
          ...prev,
          allergens: prev.allergens.filter((a) => a !== allergen),
        };
      }
    });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setPhotoFiles((prev) => [...prev, ...files]);

      // Create URLs for preview
      const urls = files.map((file) => URL.createObjectURL(file));
      setPhotoUrls((prev) => [...prev, ...urls]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotoFiles((prev) => prev.filter((_, i) => i !== index));
    setPhotoUrls((prev) => prev.filter((_, i) => i !== index));
  };

  // If user is not logged in, redirect to login
  if (!user) {
    return null;
  }

  // Dashboard stats
  const dashboardStats = [
    {
      label: "Total Donations",
      value: donations.length,
      icon: <Package className="h-4 w-4 text-brand-green" />,
    },
    {
      label: "Accepted",
      value: donations.filter((d) => d.status === "accepted").length,
      icon: <CheckCircle className="h-4 w-4 text-brand-green" />,
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <DashboardLayout
        title="Donor Dashboard"
        description="Share your excess food with those in need"
        error={error}
        loading={userLoading || (loading && donations.length === 0)}
        stats={dashboardStats}
      >
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-brand-dark">My Donations</h2>
            <Button
              onClick={() => setShowDonationForm(!showDonationForm)}
              className="bg-brand-green hover:bg-brand-green/90"
            >
              {showDonationForm ? (
                <X className="h-4 w-4 mr-2" />
              ) : (
                <Plus className="h-4 w-4 mr-2" />
              )}
              {showDonationForm ? "Cancel" : "New Donation"}
            </Button>
          </div>

          {showDonationForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Create New Donation</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="foodType">Food Type *</Label>
                        <Input
                          id="foodType"
                          name="foodType"
                          value={formData.foodType}
                          onChange={handleInputChange}
                          placeholder="e.g., Rice, Vegetables, Bread"
                          required
                          className="border-gray-300 focus:border-brand-green focus:ring-brand-green"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="quantity">Quantity *</Label>
                        <Input
                          id="quantity"
                          name="quantity"
                          type="number"
                          min="0.1"
                          step="0.1"
                          value={formData.quantity}
                          onChange={handleInputChange}
                          placeholder="e.g., 5"
                          required
                          className="border-gray-300 focus:border-brand-green focus:ring-brand-green"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="unit">Unit</Label>
                        <Select
                          value={formData.unit}
                          onValueChange={(value) =>
                            handleSelectChange("unit", value)
                          }
                        >
                          <SelectTrigger className="border-gray-300 focus:border-brand-green focus:ring-brand-green">
                            <SelectValue placeholder="Select unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kg">Kilograms (kg)</SelectItem>
                            <SelectItem value="g">Grams (g)</SelectItem>
                            <SelectItem value="l">Liters (L)</SelectItem>
                            <SelectItem value="ml">Milliliters (ml)</SelectItem>
                            <SelectItem value="pcs">Pieces</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Storage Information */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="storageType">Storage Type *</Label>
                        <Select
                          value={formData.storageType}
                          onValueChange={(value) =>
                            handleSelectChange("storageType", value)
                          }
                        >
                          <SelectTrigger className="border-gray-300 focus:border-brand-green focus:ring-brand-green">
                            <SelectValue placeholder="Select storage type" />
                          </SelectTrigger>
                          <SelectContent>
                            {STORAGE_TYPES.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {formData.storageType !== "ambient" && (
                        <div className="space-y-2">
                          <Label htmlFor="temperatureRange">
                            Temperature Range
                          </Label>
                          <Input
                            id="temperatureRange"
                            name="temperatureRange"
                            value={formData.temperatureRange}
                            onChange={handleInputChange}
                            placeholder="e.g., 2-4°C for refrigerated"
                            className="border-gray-300 focus:border-brand-green focus:ring-brand-green"
                          />
                        </div>
                      )}
                    </div>

                    {/* Allergen Information */}
                    <div className="space-y-2">
                      <Label>Allergens</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {COMMON_ALLERGENS.map((allergen) => (
                          <div
                            key={allergen}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`allergen-${allergen}`}
                              checked={formData.allergens.includes(allergen)}
                              onCheckedChange={(checked) =>
                                handleAllergenChange(
                                  allergen,
                                  checked as boolean
                                )
                              }
                            />
                            <Label
                              htmlFor={`allergen-${allergen}`}
                              className="text-sm"
                            >
                              {allergen}
                            </Label>
                          </div>
                        ))}
                      </div>
                      <Input
                        name="additionalAllergens"
                        value={formData.additionalAllergens}
                        onChange={handleInputChange}
                        placeholder="Other allergens (comma separated)"
                        className="mt-2 border-gray-300 focus:border-brand-green focus:ring-brand-green"
                      />
                    </div>

                    {/* Expiry Date */}
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry Date *</Label>
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        type="date"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        min={format(new Date(), "yyyy-MM-dd")}
                        required
                        className="border-gray-300 focus:border-brand-green focus:ring-brand-green"
                      />
                    </div>

                    {/* Replace Location Picker with Address Fields */}
                    <div className="space-y-4">
                      <Label>Pickup Location *</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="pickupAddress">
                            Street Address *
                          </Label>
                          <Input
                            id="pickupAddress"
                            name="pickupAddress"
                            value={formData.pickupAddress}
                            onChange={handleInputChange}
                            placeholder="Street address"
                            required
                            className="border-gray-300 focus:border-brand-green focus:ring-brand-green"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pickupCity">City *</Label>
                          <Input
                            id="pickupCity"
                            name="pickupCity"
                            value={formData.pickupCity}
                            onChange={handleInputChange}
                            placeholder="City"
                            required
                            className="border-gray-300 focus:border-brand-green focus:ring-brand-green"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pickupState">State *</Label>
                          <Input
                            id="pickupState"
                            name="pickupState"
                            value={formData.pickupState}
                            onChange={handleInputChange}
                            placeholder="State"
                            required
                            className="border-gray-300 focus:border-brand-green focus:ring-brand-green"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pickupZipCode">Zip Code *</Label>
                          <Input
                            id="pickupZipCode"
                            name="pickupZipCode"
                            value={formData.pickupZipCode}
                            onChange={handleInputChange}
                            placeholder="Zip code"
                            required
                            className="border-gray-300 focus:border-brand-green focus:ring-brand-green"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contactPersonName">
                          Contact Person Name *
                        </Label>
                        <Input
                          id="contactPersonName"
                          name="contactPersonName"
                          value={formData.contactPersonName}
                          onChange={handleInputChange}
                          placeholder="Name of person to contact for pickup"
                          required
                          className="border-gray-300 focus:border-brand-green focus:ring-brand-green"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactPersonPhone">
                          Contact Person Phone *
                        </Label>
                        <Input
                          id="contactPersonPhone"
                          name="contactPersonPhone"
                          value={formData.contactPersonPhone}
                          onChange={handleInputChange}
                          placeholder="Phone number for pickup contact"
                          required
                          className="border-gray-300 focus:border-brand-green focus:ring-brand-green"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="preferredCommunicationMethod">
                          Preferred Communication Method
                        </Label>
                        <Select
                          value={formData.preferredCommunicationMethod}
                          onValueChange={(value) =>
                            handleSelectChange(
                              "preferredCommunicationMethod",
                              value
                            )
                          }
                        >
                          <SelectTrigger className="border-gray-300 focus:border-brand-green focus:ring-brand-green">
                            <SelectValue placeholder="Select method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="phone">Phone</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="text">Text</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Alternative Contact */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="alternativeContactName">
                          Alternative Contact Name
                        </Label>
                        <Input
                          id="alternativeContactName"
                          name="alternativeContactName"
                          value={formData.alternativeContactName}
                          onChange={handleInputChange}
                          placeholder="Alternative contact name"
                          className="border-gray-300 focus:border-brand-green focus:ring-brand-green"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="alternativeContactPhone">
                          Alternative Contact Phone
                        </Label>
                        <Input
                          id="alternativeContactPhone"
                          name="alternativeContactPhone"
                          value={formData.alternativeContactPhone}
                          onChange={handleInputChange}
                          placeholder="Alternative contact phone"
                          className="border-gray-300 focus:border-brand-green focus:ring-brand-green"
                        />
                      </div>
                    </div>

                    {/* Pickup Time Window */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="pickupTimeWindowStart">
                          Pickup Time Window Start
                        </Label>
                        <Input
                          id="pickupTimeWindowStart"
                          name="pickupTimeWindowStart"
                          type="datetime-local"
                          value={formData.pickupTimeWindowStart}
                          onChange={handleInputChange}
                          className="border-gray-300 focus:border-brand-green focus:ring-brand-green"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pickupTimeWindowEnd">
                          Pickup Time Window End
                        </Label>
                        <Input
                          id="pickupTimeWindowEnd"
                          name="pickupTimeWindowEnd"
                          type="datetime-local"
                          value={formData.pickupTimeWindowEnd}
                          onChange={handleInputChange}
                          className="border-gray-300 focus:border-brand-green focus:ring-brand-green"
                        />
                      </div>
                    </div>

                    {/* Pickup Instructions */}
                    <div className="space-y-2">
                      <Label htmlFor="pickupInstructions">
                        Pickup Instructions
                      </Label>
                      <Textarea
                        id="pickupInstructions"
                        name="pickupInstructions"
                        value={formData.pickupInstructions}
                        onChange={handleInputChange}
                        placeholder="Special instructions for pickup (e.g., gate code, parking information)"
                        className="border-gray-300 focus:border-brand-green focus:ring-brand-green"
                      />
                    </div>

                    {/* Additional Information */}
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Additional details about the donation"
                        className="border-gray-300 focus:border-brand-green focus:ring-brand-green"
                      />
                    </div>

                    {/* Nutritional Information */}
                    <div className="space-y-2">
                      <Label htmlFor="nutritionalInfo">
                        Nutritional Information
                      </Label>
                      <Textarea
                        id="nutritionalInfo"
                        name="nutritionalInfo"
                        value={formData.nutritionalInfo}
                        onChange={handleInputChange}
                        placeholder="Nutritional information (optional)"
                        className="border-gray-300 focus:border-brand-green focus:ring-brand-green"
                      />
                    </div>

                    {/* Packaging Details */}
                    <div className="space-y-2">
                      <Label htmlFor="packagingDetails">
                        Packaging Details
                      </Label>
                      <Textarea
                        id="packagingDetails"
                        name="packagingDetails"
                        value={formData.packagingDetails}
                        onChange={handleInputChange}
                        placeholder="Details about packaging (e.g., containers, sizes)"
                        className="border-gray-300 focus:border-brand-green focus:ring-brand-green"
                      />
                    </div>

                    {/* Special Instructions */}
                    <div className="space-y-2">
                      <Label htmlFor="specialInstructions">
                        Special Instructions
                      </Label>
                      <Textarea
                        id="specialInstructions"
                        name="specialInstructions"
                        value={formData.specialInstructions}
                        onChange={handleInputChange}
                        placeholder="Any special instructions for handling or delivery"
                        className="border-gray-300 focus:border-brand-green focus:ring-brand-green"
                      />
                    </div>

                    {/* Photo Upload */}
                    <div className="space-y-2">
                      <Label>Photos</Label>
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="photo-upload"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Camera className="w-8 h-8 mb-2 text-gray-500" />
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">
                              PNG, JPG or JPEG (MAX. 5MB)
                            </p>
                          </div>
                          <input
                            id="photo-upload"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handlePhotoChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                      {photoUrls.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                          {photoUrls.map((url, index) => (
                            <div key={index} className="relative">
                              <img
                                src={url}
                                alt={`Donation photo ${index + 1}`}
                                className="w-full h-24 object-cover rounded-md"
                              />
                              <button
                                type="button"
                                onClick={() => removePhoto(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        className="bg-brand-green hover:bg-brand-green/90"
                        disabled={submitting}
                      >
                        {submitting ? (
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
                          "Create Donation"
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}

          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="flex w-full mb-6">
              <TabsTrigger value="all" className="flex-1">
                All
              </TabsTrigger>
              <TabsTrigger value="pending" className="flex-1">
                Pending
              </TabsTrigger>
              <TabsTrigger value="accepted" className="flex-1">
                Accepted
              </TabsTrigger>
              <TabsTrigger value="in-transit" className="flex-1">
                In Transit
              </TabsTrigger>
              <TabsTrigger value="delivered" className="flex-1">
                Delivered
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="min-h-[400px]">
              {renderDonations(filteredDonations)}
            </TabsContent>

            <TabsContent value="pending" className="min-h-[400px]">
              {renderDonations(filteredDonations)}
            </TabsContent>

            <TabsContent value="accepted" className="min-h-[400px]">
              {renderDonations(filteredDonations)}
            </TabsContent>

            <TabsContent value="in-transit" className="min-h-[400px]">
              {renderDonations(filteredDonations)}
            </TabsContent>

            <TabsContent value="delivered" className="min-h-[400px]">
              {renderDonations(filteredDonations)}
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </div>
  );

  function renderDonations(donationsToRender: Donation[]) {
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
            {activeTab === "all"
              ? "Start by creating your first food donation"
              : `No ${activeTab} donations found`}
          </p>
          {activeTab !== "all" && (
            <Button
              onClick={() => setActiveTab("all")}
              className="bg-brand-green hover:bg-brand-green/90"
            >
              View All Donations
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

                      {/* Add Recipient and Volunteer Information */}
                      {(donation.recipientName || donation.volunteerName) && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          {donation.recipientName && (
                            <div className="flex items-center text-sm text-gray-600 mb-2">
                              <User className="h-4 w-4 mr-2 text-brand-green" />
                              <span className="font-medium">Recipient:</span>
                              <span className="ml-2">
                                {donation.recipientName}
                              </span>
                            </div>
                          )}
                          {donation.volunteerName && (
                            <div className="flex items-center text-sm text-gray-600">
                              <Truck className="h-4 w-4 mr-2 text-brand-green" />
                              <span className="font-medium">Volunteer:</span>
                              <span className="ml-2">
                                {donation.volunteerName}
                              </span>
                            </div>
                          )}
                          {donation.pickupAt && (
                            <div className="flex items-center text-sm text-gray-600 mt-2">
                              <Clock className="h-4 w-4 mr-2 text-brand-green" />
                              <span className="font-medium">Picked up:</span>
                              <span className="ml-2">
                                {format(new Date(donation.pickupAt), "PPp")}
                              </span>
                            </div>
                          )}
                          {donation.deliveredAt && (
                            <div className="flex items-center text-sm text-gray-600 mt-2">
                              <CheckCircle className="h-4 w-4 mr-2 text-brand-green" />
                              <span className="font-medium">Delivered:</span>
                              <span className="ml-2">
                                {format(new Date(donation.deliveredAt), "PPp")}
                              </span>
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
  }
}
