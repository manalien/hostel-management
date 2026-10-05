import { useState, useEffect } from "react";
import { FileTextIcon } from "../assets/FileTextIcon";
import { ClockIcon } from "../assets/ClockIcon";
import { CheckCircleIcon } from "../assets/CheckCircleIcon";
import { NewComplaintForm } from "../components/NewComplaintForm";
import { ComplaintList } from "../components/ComplaintsList";

export const StudentComplaintsPage = ({ user }) => {

  const [pendingComplaints, setPendingComplaints] = useState([]);
  const [resolvedComplaints, setResolvedComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch complaints from backend
  const fetchComplaints = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/complaints/${user.roll_no}`
      );
      const data = await res.json();

      const pending = data.filter(
        (c) => c.status === "Pending" || c.status === "In progress"
      );

      const resolved = data.filter((c) => c.status === "Resolved");

      setPendingComplaints(pending);
      setResolvedComplaints(resolved);
    } catch (err) {
      console.error("Error fetching complaints:", err);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, [user]);

  // Generate Complaint ID 
  const generateComplaintId = () => {
    return Math.floor(100000 + Math.random() * 900000); // 6-digit INT
  };

  // Submit a new complaint
  const handleSubmitComplaint = async (description) => {
    setIsLoading(true);
    setError(null);

    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const newId = generateComplaintId();

    const body = {
      complaint_id: newId,
      roll_no: user.roll_no,
      room_no: user.room_no,
      description,
      date_of_complaint: today,
    };

    try {
      const res = await fetch("http://localhost:3000/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to submit complaint");

      // Add instantly to UI
      const newComplaint = {
        id: newId,
        description,
        status: "Pending",
        room_no: user.room_no,
        date: today,
      };

      setPendingComplaints((prev) => [newComplaint, ...prev]);
    } catch (err) {
      console.error(err);
      setError("Could not submit complaint");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
        <FileTextIcon className="w-8 h-8 mr-3 text-gray-500" />
        My Complaints
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: File New Complaint */}
        <div className="lg:col-span-1">
          <NewComplaintForm
            onSubmit={handleSubmitComplaint}
            isLoading={isLoading}
            error={error}
            roomNo={user.room_no}
          />
        </div>

        {/* Column 2: Pending & In Progress */}
        <div className="lg:col-span-1">
          <ComplaintList
            title="Pending & In Progress"
            icon={<ClockIcon className="w-6 h-6 text-yellow-600" />}
            complaints={pendingComplaints}
          />
        </div>

        {/* Column 3: Resolved */}
        <div className="lg:col-span-1">
          <ComplaintList
            title="Resolved"
            icon={<CheckCircleIcon className="w-6 h-6 text-[#638889]" />}
            complaints={resolvedComplaints}
          />
        </div>
      </div>
    </div>
  );
};
