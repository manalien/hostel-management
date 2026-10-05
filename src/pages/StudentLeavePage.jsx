import { useState, useEffect } from "react";
import { CalendarIcon } from "../assets/CalendarIcon";
import { ClockIcon } from "../assets/ClockIcon";
import { CheckCircleIcon } from "../assets/CheckCircleIcon";
import { NewLeaveForm } from "../components/NewLeaveForm";
import { LeaveList } from "../components/LeaveList";

export const StudentLeavePage = ({ user }) => {
  const [pendingLeave, setPendingLeave] = useState([]);
  const [pastLeave, setPastLeave] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch leave history
  const loadLeaves = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/leave/${user.roll_no}`);
      const data = await res.json();

      const pending = data.filter(l => l.status === "Pending" || l.status === "Approved");
      const past = data.filter(l => l.status === "Rejected");

      setPendingLeave(pending);
      setPastLeave(past);
    } catch (err) {
      console.error("Leave fetch error:", err);
    }
  };

  useEffect(() => {
    loadLeaves();
  }, [user.roll_no]);

  // Generate Leave ID
  const generateLeaveId = () => Math.floor(100000 + Math.random() * 900000);

  // Submit leave
  const handleSubmitLeave = async (formData) => {
    setIsLoading(true);
    setError(null);

    const body = {
      leave_id: generateLeaveId(),
      roll_no: user.roll_no,
      leave_from_date: formData.startDate,
      leave_to_date: formData.endDate,
      approval_status: "Pending",
      guardian_ph_no: formData.guardianContact,
      address_of_stay: formData.address,
    };

    try {
      const res = await fetch("http://localhost:3000/api/leave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to submit leave");

      // Refresh list
      loadLeaves();
    } catch (err) {
      console.error(err);
      setError("Error submitting leave request");
    }

    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
        <CalendarIcon className="w-8 h-8 mr-3 text-gray-500" />
        Leave Requests
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Apply for leave */}
        <div className="lg:col-span-1">
          <NewLeaveForm
            user={user}
            onSubmit={handleSubmitLeave}
            isLoading={isLoading}
            error={error}
          />
        </div>

        {/* Pending + Approved */}
        <div className="lg:col-span-1">
          <LeaveList
            title="Pending & Approved"
            icon={<ClockIcon className="w-6 h-6 text-yellow-600" />}
            leaveRequests={pendingLeave}
          />
        </div>

        {/* Rejected */}
        <div className="lg:col-span-1">
          <LeaveList
            title="Rejected & Past"
            icon={<CheckCircleIcon className="w-6 h-6 text-[#638889]" />}
            leaveRequests={pastLeave}
          />
        </div>
      </div>
    </div>
  );
};
