export interface Pickup {
  id: string;
  donationId: string;
  volunteerId: string;
  status:
    | "in_transit"
    | "delivered"
    | "assigned"
    | "started_for_pickup"
    | "at_pickup_location"
    | "pickup_complete"
    | "at_delivery_location"
    | "cancelled";
  createdAt: string;
  updatedAt: string;
  pickupAddress: string;
  pickupCity: string;
  pickupState: string;
  pickupZipCode: string;
  pickupLat: number;
  pickupLng: number;
  deliveryAddress: string;
  deliveryCity: string;
  deliveryState: string;
  deliveryZipCode: string;
  deliveryLat: number;
  deliveryLng: number;
  notes?: string;
  donorName: string;
  recipientName: string;
}
