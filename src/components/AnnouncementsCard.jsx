export const AnnouncementsCard = ({ announcements }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6">
    <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Announcements</h3>
    <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
      {announcements.map((item) => (
        <div key={item.id} className="border-b border-gray-100 pb-3 last:border-b-0">
          <h4 className="font-semibold text-gray-800">{item.title}</h4>
          <p className="text-sm text-gray-600 mt-1">{item.content}</p>
          <span className="text-xs text-gray-400 mt-2 block">{item.date}</span>
        </div>
      ))}
    </div>
  </div>
);