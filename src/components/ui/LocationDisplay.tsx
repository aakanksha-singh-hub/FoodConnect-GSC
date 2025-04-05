import React from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Navigation } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Location {
  lat: number;
  lng: number;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country?: string;
}

interface LocationDisplayProps {
  location?: Location;
  address?: Address;
  contactName?: string;
  contactPhone?: string;
  instructions?: string;
  title?: string;
  showMap?: boolean;
  mapHeight?: string;
}

const LocationDisplay: React.FC<LocationDisplayProps> = ({
  location,
  address,
  contactName,
  contactPhone,
  instructions,
  title = "Location",
  showMap = false,
  mapHeight = "200px",
}) => {
  // Format the address for display
  const formattedAddress = address
    ? `${address.street}, ${address.city}, ${address.state} ${address.zipCode}${
        address.country ? `, ${address.country}` : ""
      }`
    : "";

  // Function to open Google Maps for navigation
  const openGoogleMaps = () => {
    if (location) {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`,
        "_blank"
      );
    } else if (address) {
      const addressString = `${address.street}, ${address.city}, ${address.state} ${address.zipCode}`;
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          addressString
        )}`,
        "_blank"
      );
    }
  };

  // Function to call the contact phone number
  const callContact = () => {
    if (contactPhone) {
      window.open(`tel:${contactPhone}`, "_blank");
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex items-center mb-2">
          <MapPin className="h-4 w-4 mr-2 text-brand-green" />
          <h3 className="font-medium">{title}</h3>
        </div>

        {address ? (
          <div className="space-y-2">
            <p className="text-sm">{formattedAddress}</p>

            {contactName && (
              <div className="flex items-center text-sm">
                <span className="font-medium mr-1">Contact:</span>
                <span>{contactName}</span>
              </div>
            )}

            {contactPhone && (
              <div className="flex items-center text-sm">
                <span className="font-medium mr-1">Phone:</span>
                <span>{contactPhone}</span>
              </div>
            )}

            {instructions && (
              <div className="mt-2 text-sm">
                <span className="font-medium">Instructions:</span>
                <p className="mt-1">{instructions}</p>
              </div>
            )}

            <div className="flex flex-wrap gap-2 mt-3">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center"
                onClick={openGoogleMaps}
              >
                <Navigation className="h-4 w-4 mr-1" />
                Navigate
              </Button>

              {contactPhone && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                  onClick={callContact}
                >
                  <Phone className="h-4 w-4 mr-1" />
                  Call
                </Button>
              )}
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            No address information available
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default LocationDisplay;
