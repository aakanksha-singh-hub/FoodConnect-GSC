# Food Connect - Redistributing Surplus Food

A platform connecting food donors with recipients to reduce food waste and fight hunger in India.

## 🌟 Features

- **User Roles**
  - Food Donors (restaurants, cafes, events)
  - Food Recipients (NGOs, shelters, community organizations)

- **Core Functionality**
  - Real-time donation listings
  - Easy donation acceptance system
  - Location-based matching
  - Impact tracking and statistics

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)
- Firebase account

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd [project-directory]
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm run dev
```

## 💻 Tech Stack

- **Frontend**
  - React with TypeScript
  - Vite for build tooling
  - Tailwind CSS for styling
  - shadcn/ui for UI components

- **Backend**
  - Firebase Authentication
  - Cloud Firestore
  - Firebase Security Rules

## 📱 Key Features

### For Donors
- Easy donation listing creation
- Real-time status updates
- Impact tracking dashboard
- Donation history

### For Recipients
- Browse available donations
- Accept donations with one click
- View donor information
- Track accepted donations

## 🔒 Security

- Firebase Authentication for secure user management
- Role-based access control
- Firestore security rules for data protection

## 📊 Impact Tracking

The platform tracks:
- Total meals provided
- Food waste reduced (in kg)
- Number of organizations reached
- Money saved (in ₹)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- All the food donors and recipients making a difference
- The open-source community
- Firebase team for the backend infrastructure
- shadcn/ui for the beautiful components

Made with ❤️ to reduce food waste and fight hunger in India
