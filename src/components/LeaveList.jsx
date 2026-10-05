export const LeaveList = ({ title, icon, leaveRequests }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusChip = (status) => {
    const base = "text-xs font-medium px-2 py-0.5 rounded-full";
    switch (status) {
      case "Pending":
        return <span className={`${base} bg-yellow-100 text-yellow-700`}>{status}</span>;
      case "Approved":
        return <span className={`${base} bg-green-100 text-green-700`}>{status}</span>;
      case "Rejected":
        return <span className={`${base} bg-red-100 text-red-700`}>{status}</span>;
      case "Past":
        return <span className={`${base} bg-gray-100 text-gray-700`}>{status}</span>;
      default:
        return <span className={`${base} bg-gray-100 text-gray-700`}>{status}</span>;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 h-full">
      <div className="flex items-center">
        {icon}
        <h3 className="text-xl font-semibold text-gray-900 ml-3">{title}</h3>
      </div>

      <div className="mt-4 space-y-3 max-h-[500px] overflow-y-auto pr-2">
        {leaveRequests.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-4">
            No leave requests to show.
          </p>
        ) : (
          leaveRequests.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-md p-4 bg-white hover:bg-gray-50 transition-colors duration-150"
            >
              <div className="flex justify-between items-center mb-2">
                <p
                  className="text-gray-800 font-medium truncate"
                  title={item.address}
                >
                  {item.address}
                </p>
                {getStatusChip(item.status)}
              </div>

              <p className="text-sm text-gray-500">
                {formatDate(item.start_date)} → {formatDate(item.end_date)}
              </p>

              {item.status === "Rejected" && item.rejection_reason && (
                <p className="text-xs text-red-600 mt-1">
                  Reason: {item.rejection_reason}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
