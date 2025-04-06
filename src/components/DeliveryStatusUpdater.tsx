import { useState, useEffect } from "react";
import { Pickup } from "@/types";
import {
  updatePickupWithStatus,
  recordPickupStatusChange,
  PickupStatusType,
} from "@/services/firebase";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  MapPin,
  Package,
  Truck,
  CheckCircle,
  AlertCircle,
  Home,
} from "lucide-react";
import GoogleMapComponent from "@/components/ui/GoogleMap";

const statusSteps = [
  {
    status: "assigned",
    label: "Assigned",
    icon: <Package className="h-5 w-5" />,
  },
  {
    status: "started_for_pickup",
    label: "Started for Pickup",
    icon: <Truck className="h-5 w-5" />,
  },
  {
    status: "at_pickup_location",
    label: "At Pickup Location",
    icon: <MapPin className="h-5 w-5" />,
  },
  {
    status: "pickup_complete",
    label: "Pickup Complete",
    icon: <CheckCircle className="h-5 w-5" />,
  },
  {
    status: "in_transit",
    label: "In Transit",
    icon: <Truck className="h-5 w-5" />,
  },
  {
    status: "at_delivery_location",
    label: "At Delivery Location",
    icon: <MapPin className="h-5 w-5" />,
  },
  {
    status: "delivered",
    label: "Delivered",
    icon: <Home className="h-5 w-5" />,
  },
];

interface DeliveryStatusUpdaterProps {
  pickup: Pickup;
  onStatusUpdate: () => void;
}

export function DeliveryStatusUpdater({
  pickup,
  onStatusUpdate,
}: DeliveryStatusUpdaterProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Find the current step index based on the pickup status
  useEffect(() => {
    const index = statusSteps.findIndex(
      (step) => step.status === pickup.status
    );
    setCurrentStepIndex(index !== -1 ? index : 0);
  }, [pickup.status]);

  const handleUpdateStatus = async (newStatus: PickupStatusType) => {
    setLoading(true);
    setError(null);

    try {
      if (!pickup.id) {
        throw new Error("Pickup ID not found");
      }

      // Get current position for location tracking
      let locationData = {};
      if (navigator.geolocation) {
        try {
          const position = await new Promise<GeolocationPosition>(
            (resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
              });
            }
          );

          locationData = {
            currentLat: position.coords.latitude,
            currentLng: position.coords.longitude,
            lastLocationUpdateAt: new Date().toISOString(),
          };
        } catch (locationError) {
          console.warn("Could not get current location:", locationError);
        }
      }

      // Update pickup status
      await updatePickupWithStatus(pickup.id, newStatus, locationData);

      // Record status change in history
      await recordPickupStatusChange(pickup.id, newStatus);

      toast({
        title: "Status updated",
        description: `Delivery status updated to: ${newStatus.replace(
          /_/g,
          " "
        )}`,
        variant: "default",
      });

      // Call the callback to refresh data
      onStatusUpdate();
    } catch (err) {
      console.error("Error updating delivery status:", err);
      setError(err instanceof Error ? err.message : "Failed to update status");

      toast({
        title: "Error",
        description: "Failed to update delivery status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getNextStatus = (): PickupStatusType | null => {
    if (currentStepIndex < statusSteps.length - 1) {
      return statusSteps[currentStepIndex + 1].status as PickupStatusType;
    }
    return null;
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-medium">Delivery Status</h3>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md flex items-center">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Status Progress Indicators */}
      <div className="relative">
        <div className="absolute left-0 top-1/2 right-0 h-0.5 bg-gray-200 transform -translate-y-1/2" />

        <div className="relative flex justify-between">
          {statusSteps.map((step, index) => {
            const isCompleted = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;

            return (
              <div key={step.status} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                    isCompleted
                      ? "bg-brand-green text-white"
                      : "bg-gray-100 text-gray-400 border border-gray-300"
                  } ${
                    isCurrent ? "ring-2 ring-brand-green ring-offset-2" : ""
                  }`}
                >
                  {step.icon}
                </div>
                <span
                  className={`text-xs mt-2 text-center ${
                    isCompleted
                      ? "text-brand-green font-medium"
                      : "text-gray-500"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Map Display */}
      <div className="h-48 rounded-lg overflow-hidden border border-gray-200 my-4">
        <GoogleMapComponent
          center={{
            lat: pickup.currentLat || pickup.pickupLat,
            lng: pickup.currentLng || pickup.pickupLng,
          }}
          zoom={13}
          height="100%"
          markers={[
            // Donor location marker
            {
              position: { lat: pickup.pickupLat, lng: pickup.pickupLng },
              title: "Pickup Location",
              label: "P",
            },
            // Recipient location marker
            {
              position: { lat: pickup.dropoffLat, lng: pickup.dropoffLng },
              title: "Dropoff Location",
              label: "D",
            },
            // Current location marker (if available)
            ...(pickup.currentLat && pickup.currentLng
              ? [
                  {
                    position: {
                      lat: pickup.currentLat,
                      lng: pickup.currentLng,
                    },
                    title: "Current Location",
                    label: "C",
                  },
                ]
              : []),
          ]}
        />
      </div>

      {/* Action Button */}
      <div className="flex justify-end">
        {getNextStatus() ? (
          <Button
            onClick={() => handleUpdateStatus(getNextStatus()!)}
            disabled={loading}
            className="flex items-center space-x-2"
          >
            <span>Update to {getNextStatus()?.replace(/_/g, " ")}</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button disabled className="bg-gray-200 text-gray-500">
            Delivery Completed
          </Button>
        )}
      </div>

      {/* Delivery Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
        <div>
          <h4 className="font-medium mb-2">Pickup Address</h4>
          <p>{pickup.pickupAddress}</p>
          <p>
            {pickup.pickupCity}, {pickup.pickupState} {pickup.pickupZipCode}
          </p>
          <p className="mt-2">Contact: {pickup.contactPersonName}</p>
          <p>Phone: {pickup.contactPersonPhone}</p>
        </div>

        <div>
          <h4 className="font-medium mb-2">Dropoff Address</h4>
          <p>{pickup.dropoffAddress}</p>
          <p>
            {pickup.dropoffCity}, {pickup.dropoffState} {pickup.dropoffZipCode}
          </p>
          {pickup.dropoffContactName && (
            <>
              <p className="mt-2">Contact: {pickup.dropoffContactName}</p>
              <p>Phone: {pickup.dropoffContactPhone}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
