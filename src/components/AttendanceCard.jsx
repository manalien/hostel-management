import { AlertCircleIcon } from "../assets/AlertCircleIcon";
import { CheckCircleIcon } from "../assets/CheckCircleIcon";

export const AttendanceCard = ({ attendance, onMarkAttendance }) => {
  const { marked, timeMarked, loading, error, message } = attendance || {};

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 p-6 ${
        marked ? "border-l-4 border-[#638889]" : "border-l-4 border-red-500"
      }`}
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Today&apos;s Attendance
      </h3>

      {/* Status Section */}
      {loading ? (
        <p className="text-gray-600 text-sm">Checking attendance...</p>
      ) : marked ? (
        <div>
          <div className="flex items-center">
            <CheckCircleIcon className="w-8 h-8 text-[#638889]" />
            <span className="ml-3 text-lg font-medium text-[#638889]">
              Marked as Present
            </span>
          </div>
          <p className="text-gray-600 mt-2 text-sm">
            Marked at: {timeMarked || "—"}
          </p>
        </div>
      ) : (
        <div>
          <div className="flex items-center">
            <AlertCircleIcon className="w-8 h-8 text-red-500" />
            <span className="ml-3 text-lg font-medium text-red-700">
              Not Marked
            </span>
          </div>
          <p className="text-gray-600 mt-2 text-sm">
            Please mark your attendance before 10:00 PM.
          </p>

          {/* Mark Attendance Button */}
          <button
            className="mt-4 cursor-pointer w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#638889] hover:bg-[#527071] disabled:bg-gray-300 disabled:cursor-not-allowed"
            onClick={onMarkAttendance}
            disabled={loading || marked}
          >
            {loading ? "Marking..." : "Mark Attendance"}
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="mt-3 text-sm text-red-500">
          {error}
        </p>
      )}

      {/* Success Message */}
      {!error && message && (
        <p className="mt-3 text-sm text-green-600">
          {message}
        </p>
      )}
    </div>
  );
};
