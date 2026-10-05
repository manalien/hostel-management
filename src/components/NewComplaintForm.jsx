import { useState } from "react";
import { PlusIcon } from "../assets/PlusIcon";
import { HomeIcon } from "../assets/HomeIcon";

export const NewComplaintForm = ({ onSubmit, isLoading, error, roomNo }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) {
      // In a real app, you'd show a UI error
      console.error("Description cannot be empty");
      return;
    }
    onSubmit(description);
    setDescription(''); // Clear form on submit
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 h-full">
      <div className="flex items-center">
        <PlusIcon className="w-6 h-6 text-[#638889]" />
        <h3 className="text-xl font-semibold text-gray-900 ml-3">File a New Complaint</h3>
      </div>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        {/* --- Room No. Field (Read-only) --- */}
        <div>
          <label htmlFor="room-no" className="block text-sm font-medium text-gray-700">
            Room No.
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <HomeIcon className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="room-no"
              id="room-no"
              value={roomNo}
              readOnly
              disabled
              className="focus:ring-[#638889] focus:border-[#638889] block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 bg-gray-100 cursor-not-allowed"
            />
          </div>
        </div>

        {/* --- Complaint Description Field --- */}
        <div>
          <label htmlFor="complaint-description" className="block text-sm font-medium text-gray-700">
            Complaint Description
          </label>
          <textarea
            id="complaint-description"
            name="description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#638889] focus:ring-[#638889] sm:text-sm"
            placeholder="e.g., The Wi-Fi in B-Block is very slow."
            required
          ></textarea>
        </div>
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
        <div>
          <button
            type="submit"
            disabled={isLoading || !description.trim()}
            className="w-full flex cursor-pointer justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#638889] hover:bg-[#527071] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#638889] disabled:bg-[#9DBC98] disabled:cursor-not-allowed"
          >
            {isLoading ? 'Submitting...' : 'Submit Complaint'}
          </button>
        </div>
      </form>
    </div>
  );
};