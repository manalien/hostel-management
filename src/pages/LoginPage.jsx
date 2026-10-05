import { useState } from "react";
import { LoginForm } from "../components/LoginForm";
import { TabButton } from "../components/TabButton"
import { AlertCircleIcon } from "../assets/AlertCircleIcon";

export const LoginPage = ({ onLogin, isLoading, error }) => {
  const [userType, setUserType] = useState('student'); // 'student' or 'warden'

  const handleFormSubmit = ({ id, password }) => {
    onLogin({ id, password, userType });
  };

  return (
    <div className="min-h-screen bg-[#F8F6E3] flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-5xl font-['Merriweather'] font-bold text-[#638889]">
            SUKHVAAS
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to your account
          </p>
        </div>

        {/* Form Card */}
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white rounded-lg shadow-lg">
            {/* --- Tab Navigation --- */}
            <nav className="flex border-b border-gray-200">
              <TabButton 
                type="student" 
                label="Student Login" 
                isActive={userType === 'student'} 
                onClick={setUserType} 
              />
              <TabButton 
                type="warden" 
                label="Warden Login" 
                isActive={userType === 'warden'} 
                onClick={setUserType} 
              />
            </nav>

            {/* --- Form Area --- */}
            <div className="relative">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 m-4 sm:m-8 mb-0 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircleIcon className="h-5 w-5 text-red-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <LoginForm
                userType={userType}
                onSubmit={handleFormSubmit}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
    </div>
  );
};