import { useState } from "react";
import { CalendarIcon } from "../assets/CalendarIcon";
import { ClockIcon } from "../assets/ClockIcon";
import { NewLeaveForm } from "./NewLeaveForm";
import { LeaveList } from "./LeaveList";
import { CheckCircleIcon } from "../assets/CheckCircleIcon";

export const StudentLeavePage = () => {
  // API State
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmitLeave = (formData) => {
    setIsLoading(true);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
        <CalendarIcon className="w-8 h-8 mr-3 text-gray-500" />
        Leave Requests
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* --- Form Section --- */}
        <div className="lg:col-span-1">
          <NewLeaveForm 
            onSubmit={handleSubmitLeave}
            isLoading={isLoading}
            error={error}
          />
        </div>
        
        {/* --- Pending/Approved List --- */}
        <div className="lg:col-span-1">
          <LeaveList 
            title="Pending & Approved"
            icon={<ClockIcon className="w-6 h-6 text-yellow-600" />}
          />
        </div>
        
        {/* --- History List --- */}
        <div className="lg:col-span-1">
           <LeaveList 
            title="Rejected & Past"
            icon={<CheckCircleIcon className="w-6 h-6 text-[#638889]" />}
          />
        </div>
        
      </div>
    </div>
  );
};