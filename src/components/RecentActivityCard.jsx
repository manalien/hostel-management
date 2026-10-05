import { FileTextIcon } from "../assets/FileTextIcon";
import { CalendarIcon } from "../assets/CalendarIcon";

export const RecentActivityCard = ({ activities, onNavigate }) => {
  const getStatusChip = (status) => {
    switch (status) {
      case 'Pending':
        return <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">{status}</span>;
      case 'In Progress':
        return <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">{status}</span>;
      case 'Approved':
      case 'Resolved':
        return <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">{status}</span>;
      case 'Rejected':
        return <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-700">{status}</span>;
      default:
        return <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  const getIcon = (type) => {
    switch(type) {
      case 'Complaint':
        return <FileTextIcon className="w-4 h-4 text-gray-500" />;
      case 'Leave':
        return <CalendarIcon className="w-4 h-4 text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
        {activities.map((item) => (
          <div key={item.id} className="border-b border-gray-100 pb-3 last:border-b-0">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center text-sm font-medium text-gray-600">
                {getIcon(item.type)}
                <span className="ml-1.5">{item.type}</span>
              </div>
              {getStatusChip(item.status)}
            </div>
            <p 
              className="text-gray-800 text-sm font-medium truncate hover:text-[#638889] cursor-pointer"
              onClick={() => onNavigate(item.type.toLowerCase() === 'complaint' ? 'complaints' : 'leave')}
            >
              {item.title}
            </p>
            <span className="text-xs text-gray-400 mt-1 block">{item.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
