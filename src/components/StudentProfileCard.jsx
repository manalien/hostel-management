export const StudentProfileCard = ({ profile }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6">
    <h3 className="text-xl font-semibold text-gray-900 mb-4">My Profile</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
      <div>
        <span className="text-gray-500 font-medium block">Roll No:</span>
        <span className="text-gray-800">{profile.rollNo}</span>
      </div>
      <div>
        <span className="text-gray-500 font-medium block">Full Name:</span>
        <span className="text-gray-800">{profile.name}</span>
      </div>
      <div>
        <span className="text-gray-500 font-medium block">Room No:</span>
        <span className="text-gray-800">{profile.roomNo}</span>
      </div>
      <div>
        <span className="text-gray-500 font-medium block">Course:</span>
        <span className="text-gray-800">{profile.course}</span>
      </div>
      <div className="md:col-span-2">
        <span className="text-gray-500 font-medium block">Email:</span>
        <span className="text-gray-800">{profile.email}</span>
      </div>
      <div className="md:col-span-2">
        <span className="text-gray-500 font-medium block">Phone:</span>
        <span className="text-gray-800">{profile.phone}</span>
      </div>
    </div>
  </div>
);