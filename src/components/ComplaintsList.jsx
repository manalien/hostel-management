export const ComplaintList = ({ title, icon, complaints }) => {
  const getStatusChip = (status) => {
    switch (status) {
      case 'Pending':
        return <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">{status}</span>;
      case 'In Progress':
        return <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">{status}</span>;
      case 'Resolved':
        return <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">{status}</span>;
      case 'Rejected':
        return <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-700">{status}</span>;
      default:
        return <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 h-full">
      <div className="flex items-center">
        {icon}
        <h3 className="text-xl font-semibold text-gray-900 ml-3">{title}</h3>
      </div>
      <div className="mt-4 space-y-3 max-h-[500px] overflow-y-auto pr-2">
        {complaints.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-4">No complaints to show.</p>
        ) : (
          complaints.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-md p-4 bg-white hover:bg-gray-50 transition-colors duration-150">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-500">
                  ID: {item.id}
                </span>
                {getStatusChip(item.status)}
              </div>
              <p className="text-gray-800 font-medium mb-1">{item.description}</p>
              <p className="text-xs text-gray-400">
                Filed on: {item.date}
              </p>
              {item.date_resolved && (
                <p className="text-xs text-green-600 mt-1">
                  Resolved on: {item.date_resolved}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};