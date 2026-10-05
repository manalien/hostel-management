export const WardenDashboard = ({ user, onLogout }) => (
  <div className="min-h-screen bg-gray-100 p-8">
    <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Warden Dashboard</h1>
        <button
          onClick={onLogout}
          className="py-2 cursor-pointer px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Logout
        </button>
      </div>
      <p className="text-lg text-gray-700">
        Welcome, Warden <span className="font-medium">{user.id}</span>!
      </p>
      <p className="mt-4 text-gray-600">
        This is the warden dashboard. From here you can manage students, view complaints, approve leave, and oversee maintenance.
      </p>
    </div>
  </div>
);