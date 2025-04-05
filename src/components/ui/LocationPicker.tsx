import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";
import GoogleMapComponent from "./GoogleMap";

interface Location {
  lat: number;
  lng: number;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface LocationPickerProps {
  onLocationSelect: (location: Location, address: Address) => void;
  initialLocation?: Location;
  initialAddress?: Address;
  label?: string;
  placeholder?: string;
}

const LocationPicker: React.FC<LocationPickerProps> = ({
  onLocationSelect,
  initialLocation,
  initialAddress,
  label = "Location",
  placeholder = "Enter address...",
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState<Location>(
    initialLocation || { lat: 37.7749, lng: -122.4194 }
  );
  const [address, setAddress] = useState<Address>(
    initialAddress || {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "USA",
    }
  );
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (initialLocation) {
      setLocation(initialLocation);
    }
    if (initialAddress) {
      setAddress(initialAddress);
      setSearchQuery(
        `${initialAddress.street}, ${initialAddress.city}, ${initialAddress.state} ${initialAddress.zipCode}`
      );
    }
  }, [initialLocation, initialAddress]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      if (typeof google === "undefined" || !google.maps) {
        console.error("Google Maps API is not loaded");
        setIsSearching(false);
        return;
      }

      const geocoder = new google.maps.Geocoder();
      const result = await geocoder.geocode({ address: searchQuery });

      if (result.results.length > 0) {
        const newLocation = {
          lat: result.results[0].geometry.location.lat(),
          lng: result.results[0].geometry.location.lng(),
        };
        setLocation(newLocation);

        // Extract address components
        const addressComponents = result.results[0].address_components;
        const newAddress: Address = {
          street: "",
          city: "",
          state: "",
          zipCode: "",
          country: "USA",
        };

        addressComponents.forEach((component) => {
          const types = component.types;
          if (types.includes("street_number") || types.includes("route")) {
            newAddress.street += component.long_name + " ";
          } else if (types.includes("locality")) {
            newAddress.city = component.long_name;
          } else if (types.includes("administrative_area_level_1")) {
            newAddress.state = component.short_name;
          } else if (types.includes("postal_code")) {
            newAddress.zipCode = component.long_name;
          } else if (types.includes("country")) {
            newAddress.country = component.long_name;
          }
        });

        setAddress(newAddress);
        onLocationSelect(newLocation, newAddress);
      }
    } catch (error) {
      console.error("Error geocoding address:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleMapClick = (newLocation: Location) => {
    setLocation(newLocation);

    // Reverse geocode to get address
    if (typeof google === "undefined" || !google.maps) {
      console.error("Google Maps API is not loaded");
      return;
    }

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: newLocation }, (results, status) => {
      if (status === "OK" && results && results.length > 0) {
        const addressComponents = results[0].address_components;
        const newAddress: Address = {
          street: "",
          city: "",
          state: "",
          zipCode: "",
          country: "USA",
        };

        addressComponents.forEach((component) => {
          const types = component.types;
          if (types.includes("street_number") || types.includes("route")) {
            newAddress.street += component.long_name + " ";
          } else if (types.includes("locality")) {
            newAddress.city = component.long_name;
          } else if (types.includes("administrative_area_level_1")) {
            newAddress.state = component.short_name;
          } else if (types.includes("postal_code")) {
            newAddress.zipCode = component.long_name;
          } else if (types.includes("country")) {
            newAddress.country = component.long_name;
          }
        });

        setAddress(newAddress);
        setSearchQuery(
          `${newAddress.street}, ${newAddress.city}, ${newAddress.state} ${newAddress.zipCode}`
        );
        onLocationSelect(newLocation, newAddress);
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <div className="relative">
          <Input
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border-gray-300 focus:border-brand-green focus:ring-brand-green"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <Button
            onClick={handleSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-brand-green hover:bg-brand-green/90 text-white px-3 py-1 text-sm"
            disabled={isSearching}
          >
            {isSearching ? "Searching..." : "Search"}
          </Button>
        </div>
      </div>

      <div className="h-64 rounded-lg overflow-hidden border border-gray-200">
        <GoogleMapComponent
          center={location}
          zoom={15}
          height="100%"
          onMapClick={handleMapClick}
          isEditable={true}
          markers={[
            {
              position: location,
              title: "Selected Location",
              label: "📍",
            },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Street Address
          </label>
          <Input
            type="text"
            value={address.street}
            readOnly
            className="mt-1 bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            City
          </label>
          <Input
            type="text"
            value={address.city}
            readOnly
            className="mt-1 bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            State
          </label>
          <Input
            type="text"
            value={address.state}
            readOnly
            className="mt-1 bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Zip Code
          </label>
          <Input
            type="text"
            value={address.zipCode}
            readOnly
            className="mt-1 bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
};

export default LocationPicker;
