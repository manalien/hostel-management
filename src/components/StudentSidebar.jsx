import { NavItem } from "./NavItem";
import { HomeIcon } from "../assets/HomeIcon";
import { FileTextIcon } from "../assets/FileTextIcon";
import { CalendarIcon } from "../assets/CalendarIcon";
import { CreditCardIcon } from "../assets/CreditCardIcon";
import { LogOutIcon } from "../assets/LogOutIcon";
import { UserIcon } from "../assets/UserIcon";
import { useNavigate, useLocation } from "react-router-dom";

export const StudentSidebar = ({ onLogout, user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex flex-col w-64 h-full bg-[#12372A] text-white shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-center h-20 border-b border-[#527071]">
        <h2 className="text-2xl font-['Merriweather'] font-bold">SUKHVAAS</h2>
      </div>
      
      {/* Profile Info */}
      <div className="flex flex-col items-center p-4 border-b border-[#527071]">
        <div className="w-16 h-16 rounded-full bg-[#527071] flex items-center justify-center mb-2">
          <UserIcon className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-semibold text-lg">{user?.name || 'Student'}</h3>
        <span className="text-sm text-[#F8F6E3]">Student</span>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <NavItem 
          icon={<HomeIcon className="w-5 h-5" />} 
          label="Dashboard" 
          isActive={isActive('/student')} 
          onClick={() => navigate('/student')} 
        />
        <NavItem 
          icon={<FileTextIcon className="w-5 h-5" />} 
          label="Complaints" 
          isActive={isActive('/student/complaints')} 
          onClick={() => navigate('/student/complaints')} 
        />
        <NavItem 
          icon={<CalendarIcon className="w-5 h-5" />} 
          label="Leave Requests" 
          isActive={isActive('/student/leave')} 
          onClick={() => navigate('/student/leave')} 
        />
        <NavItem 
          icon={<CreditCardIcon className="w-5 h-5" />} 
          label="Fees Portal" 
          isActive={isActive('/student/fees')} 
          onClick={() => navigate('/student/fees')} 
        />
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-[#527071]">
        <NavItem 
          icon={<LogOutIcon className="w-5 h-5" />} 
          label="Logout" 
          isActive={false} 
          onClick={onLogout} 
        />
      </div>
    </div>
  );
};
