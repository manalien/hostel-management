import { useState } from "react";
import { StudentSidebar } from "../components/StudentSidebar";
import { MenuIcon } from "../assets/MenuIcon";

export const StudentLayout = ({ children, user, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-30 lg:hidden`}>
        <StudentSidebar onLogout={onLogout} user={user} />
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <StudentSidebar onLogout={onLogout} user={user} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-0">
        <div className="lg:hidden flex justify-between items-center bg-white p-4 shadow-md">
          <button onClick={() => setIsSidebarOpen(true)} className="text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer">
            <MenuIcon className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800 capitalize">SUKHVAAS</h1>
          <div></div>
        </div>
        <main className="flex-1 p-6 lg:p-10 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};