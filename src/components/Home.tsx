import { useUser } from '@/components/UserContext';
import { Link } from 'react-router-dom';

export default function Home() {
  const { user, userRole } = useUser();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to Redistributr
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Connecting food donors with recipients and volunteers to reduce food waste and help those in need.
          </p>
        </div>

        {!user ? (
          <div className="mt-10 flex justify-center space-x-4">
            <Link
              to="/auth"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Get Started
            </Link>
          </div>
        ) : (
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {userRole === 'donor' && (
                <Link
                  to="/donor/dashboard"
                  className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <div className="flex-1 min-w-0">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900">Donor Dashboard</p>
                    <p className="text-sm text-gray-500">Manage your donations</p>
                  </div>
                </Link>
              )}

              {userRole === 'recipient' && (
                <Link
                  to="/recipient/dashboard"
                  className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <div className="flex-1 min-w-0">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900">Recipient Dashboard</p>
                    <p className="text-sm text-gray-500">View available donations</p>
                  </div>
                </Link>
              )}

              {userRole === 'volunteer' && (
                <Link
                  to="/volunteer/dashboard"
                  className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <div className="flex-1 min-w-0">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900">Volunteer Dashboard</p>
                    <p className="text-sm text-gray-500">Manage pickups</p>
                  </div>
                </Link>
              )}
            </div>
          </div>
        )}

        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">For Donors</h3>
              <p className="text-gray-500">
                Easily list surplus food items, specify quantities and locations, and connect with recipients and volunteers.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">For Recipients</h3>
              <p className="text-gray-500">
                Browse available donations in your area, request items you need, and coordinate pickups with volunteers.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">For Volunteers</h3>
              <p className="text-gray-500">
                Help transport food from donors to recipients, track your pickups, and make a difference in your community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 