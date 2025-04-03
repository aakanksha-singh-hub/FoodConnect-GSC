export default function About() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          About Food Redistribution Hub
        </h2>
        <p className="mt-4 text-xl text-gray-500">
          Connecting food donors with those in need, reducing waste and helping communities.
        </p>
      </div>

      <div className="mt-20">
        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
          <div className="relative">
            <dt>
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                🎁
              </div>
              <p className="ml-16 text-lg leading-6 font-medium text-gray-900">For Donors</p>
            </dt>
            <dd className="mt-2 ml-16 text-base text-gray-500">
              Easily donate surplus food items. Your contributions help reduce food waste and support those in need.
            </dd>
          </div>

          <div className="relative">
            <dt>
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                🏢
              </div>
              <p className="ml-16 text-lg leading-6 font-medium text-gray-900">For Recipients</p>
            </dt>
            <dd className="mt-2 ml-16 text-base text-gray-500">
              Organizations can receive food donations to support their communities and those they serve.
            </dd>
          </div>

          <div className="relative">
            <dt>
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                🚗
              </div>
              <p className="ml-16 text-lg leading-6 font-medium text-gray-900">For Volunteers</p>
            </dt>
            <dd className="mt-2 ml-16 text-base text-gray-500">
              Help bridge the gap by picking up and delivering food donations to recipient organizations.
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-20">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
          How It Works
        </h3>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="text-4xl mb-4">1️⃣</div>
            <h4 className="text-lg font-medium text-gray-900">Donors List Food</h4>
            <p className="mt-2 text-base text-gray-500">
              Restaurants and businesses list their surplus food items for donation.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">2️⃣</div>
            <h4 className="text-lg font-medium text-gray-900">Recipients Accept</h4>
            <p className="mt-2 text-base text-gray-500">
              Organizations accept available donations that match their needs.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">3️⃣</div>
            <h4 className="text-lg font-medium text-gray-900">Volunteers Deliver</h4>
            <p className="mt-2 text-base text-gray-500">
              Volunteers pick up and deliver the food to recipient organizations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 