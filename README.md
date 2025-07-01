# 🍽️ FoodConnect - Connecting Food Donors with Recipients


https://github.com/user-attachments/assets/d318bcd0-c848-4145-966b-945851e2c7dc


## 📽️ Pitch Video

[![Watch the demo](https://img.youtube.com/vi/3KvzGEDK1ik/0.jpg)](https://youtu.be/3KvzGEDK1ik)


## 🌟 Overview

FoodConnect is a comprehensive food donation platform that connects food donors (restaurants, grocery stores, individuals) with recipients (food banks, shelters, individuals in need) through a network of volunteers. Built with modern web technologies and powered by Google Cloud services, FoodConnect streamlines the food donation process, reduces food waste, and helps feed those in need.

## 🚀 Key Features

### For Donors

- **Easy Donation Creation**: Create food donations with detailed information including food type, quantity, storage requirements, and pickup instructions
- **Real-time Tracking**: Monitor the status of your donations from creation to delivery
- **Donation History**: View your past donations and their impact
- **Location-based Matching**: Connect with recipients in your area

### For Recipients

- **Browse Available Donations**: View and claim available food donations in your area
- **Real-time Updates**: Receive notifications when donations are claimed and delivered
- **Delivery Tracking**: Track the status of your claimed donations
- **Impact Dashboard**: See your contribution to reducing food waste and feeding those in need

### For Volunteers

- **Available Deliveries**: Browse and accept available delivery opportunities
- **Real-time Status Updates**: Update delivery status at each step of the process
- **Detailed Information**: Access comprehensive details about pickups and dropoffs
- **Delivery History**: Track your completed deliveries and impact

## 🔄 User Flow

### Donor Flow

1. **Registration**: Sign up as a donor with organization details
2. **Create Donation**: Add food details, quantity, storage requirements, and pickup information
3. **Monitor Status**: Track when your donation is claimed and delivered
4. **View Impact**: See how your donation helped reduce food waste and feed those in need

### Recipient Flow

1. **Registration**: Sign up as a recipient with organization details
2. **Browse Donations**: View available food donations in your area
3. **Claim Donation**: Select and claim a donation that meets your needs
4. **Track Delivery**: Monitor the status of your claimed donation
5. **Receive Food**: Get notified when the food is delivered

### Volunteer Flow

1. **Registration**: Sign up as a volunteer with contact information
2. **Browse Deliveries**: View available delivery opportunities
3. **Accept Delivery**: Select and accept a delivery
4. **Update Status**: Update the delivery status at each step (pickup, in transit, delivered)
5. **Complete Delivery**: Mark the delivery as complete when food is delivered

## 🛠️ Technology Stack

### Frontend

- **React**: Modern UI library for building interactive user interfaces
- **TypeScript**: Type-safe JavaScript for robust code
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Framer Motion**: Animation library for smooth transitions and interactions
- **React Router**: Client-side routing for seamless navigation

### Backend & Infrastructure

- **Firebase Authentication**: Secure user authentication and authorization
- **Cloud Firestore**: NoSQL database for real-time data synchronization
- **Firebase Storage**: Secure storage for images and files
- **Firebase Hosting**: Fast and secure web hosting
- **Firebase Security Rules**: Granular security controls for data access

### Google Technologies Integration

- **Google Maps API**: Location services for pickup and delivery points
- **Firebase Realtime Database**: Real-time updates for delivery status
- **Firebase Cloud Functions**: Serverless backend for complex operations
- **Firebase Analytics**: User behavior tracking and insights
- **Firebase Performance Monitoring**: Performance optimization

## 💻 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/foodconnect.git
   cd foodconnect
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with your Firebase configuration:

   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. Start the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## 🌐 Deployment

FoodConnect is deployed on Firebase Hosting. To deploy your own instance:

1. Build the project

   ```bash
   npm run build
   # or
   yarn build
   ```

2. Deploy to Firebase
   ```bash
   firebase deploy
   ```

## 📱 Mobile Responsiveness

FoodConnect is fully responsive and works seamlessly on desktop, tablet, and mobile devices. The UI adapts to different screen sizes, ensuring a consistent user experience across all devices.

## 🔒 Security

FoodConnect implements robust security measures:

- **Authentication**: Secure user authentication with Firebase Auth
- **Authorization**: Role-based access control for donors, recipients, and volunteers
- **Data Validation**: Input validation to prevent malicious data
- **Secure Storage**: Encrypted storage for sensitive information
- **Firebase Security Rules**: Granular access control for database operations

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Google Cloud Platform for providing the infrastructure
- Firebase for the real-time database and authentication
- All contributors who have helped shape FoodConnect

---

Built with ❤️ for the Google Solutions Challenge
