import { useState } from "react";
import { StudentDashboardHome } from "../components/StudentDashboardHome";
import { StudentComplaintsPage } from "./StudentComplaintsPage";
import { StudentLeavePage } from "./StudentLeavePage";
import { StudentFeesPage } from "./StudentFeesPage";
import { Sidebar } from "../components/Sidebar";
import { MenuIcon } from "../assets/MenuIcon";

export const StudentDashboard = ({ user, onLogout }) => {
  const [currentPage, setCurrentPage] = useState('dashboard'); // 'dashboard', 'complaints', 'leave', 'fees'
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <StudentDashboardHome user={user} onNavigate={handleNavigate} />;
      case 'complaints':
        return <StudentComplaintsPage />;
      case 'leave':
        return <StudentLeavePage />;
      case 'fees':
        return <StudentFeesPage />;
      default:
        return <StudentDashboardHome user={user} onNavigate={handleNavigate} />;
    }
  };
  
  const handleNavigate = (page) => {
    setCurrentPage(page);
    setIsSidebarOpen(false); // Close sidebar on mobile after navigation
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* --- Mobile Sidebar Backdrop --- */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* --- Mobile Sidebar --- */}
      <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                       transition-transform duration-300 ease-in-out z-30 lg:hidden`}>
        <Sidebar 
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onLogout={onLogout}
        />
      </div>

      {/* --- Desktop Sidebar --- */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <Sidebar 
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onLogout={onLogout}
        />
      </div>

      {/* --- Main Content Area --- */}
      <div className="flex-1 flex flex-col w-0">
        {/* --- Top Bar (for mobile) --- */}
        <div className="lg:hidden flex justify-between items-center bg-white p-4 shadow-md">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <MenuIcon className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800 capitalize">{currentPage}</h1>
          <div></div>
        </div>
        
        {/* --- Page Content --- */}
        <main className="flex-1 p-6 lg:p-10 overflow-auto">
          
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  );
};