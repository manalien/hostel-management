import { useState } from "react";
import { PlusIcon } from "../assets/PlusIcon";

export const NewLeaveForm = ({ onSubmit, isLoading, error, user }) => {
  const [address, setAddress] = useState('');
  const [guardianContact, setGuardianContact] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!address || !guardianContact || !startDate || !endDate) {
      alert("Please fill in all required fields.");
      return;
    }

    onSubmit({ address, guardianContact, startDate, endDate });

    setAddress('');
    setGuardianContact('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 h-full">
      <div className="flex items-center">
        <PlusIcon className="w-6 h-6 text-[#638889]" />
        <h3 className="text-xl font-semibold text-gray-900 ml-3">
          Apply for Leave
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">

        {/* --- Roll No & Room No (Auto-filled) --- */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Roll No.
            </label>
            <input
              type="text"
              value={user.roll_no}
              readOnly
              disabled
              className="mt-1 block w-full rounded-md border-gray-300 py-3 bg-gray-100 cursor-not-allowed sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Room No.
            </label>
            <input
              type="text"
              value={user.room_no}
              readOnly
              disabled
              className="mt-1 block w-full rounded-md border-gray-300 py-3 bg-gray-100 cursor-not-allowed sm:text-sm"
            />
          </div>
        </div>

        {/* Address of Stay */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address of Stay
          </label>
          <textarea
            rows="3"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#638889] focus:ring-[#638889] sm:text-sm"
            placeholder="e.g., 123, Main St, Delhi"
            required
          ></textarea>
        </div>

        {/* Guardian Contact Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Guardian Contact No.
          </label>
          <input
            type="tel"
            value={guardianContact}
            onChange={(e) => setGuardianContact(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#638889] focus:ring-[#638889] sm:text-sm"
            placeholder="+91 9876543210"
            required
          />
        </div>

        {/* Start & End Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#638889] focus:ring-[#638889] sm:text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#638889] focus:ring-[#638889] sm:text-sm"
              required
            />
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="text-sm text-red-600">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !address || !guardianContact || !startDate || !endDate}
          className="w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-[#638889] hover:bg-[#527071] disabled:bg-[#9DBC98] disabled:cursor-not-allowed"
        >
          {isLoading ? "Submitting..." : "Submit Leave Request"}
        </button>
      </form>
    </div>
  );
};
