import { useState } from "react";
import { UserIcon } from "../assets/UserIcon";
import { LockIcon } from "../assets/LockIcon";
import { SpinnerIcon } from "../assets/SpinnerIcon";

export const LoginForm = ({ userType, onSubmit, isLoading }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id, password });
  };

  const isStudent = userType === 'student';

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
      <div>
        <label htmlFor="id" className="block text-sm font-medium text-gray-700">
          {isStudent ? 'Roll No.' : 'Warden ID'}
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <UserIcon className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            name="id"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="focus:ring-[#638889] focus:border-[#638889] block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
            placeholder={isStudent ? 'e.g., 21BCE1234' : 'e.g., WDN-101'}
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LockIcon className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="focus:ring-[#638889] focus:border-[#638889] block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
            placeholder="••••••••"
            required
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#638889] hover:bg-[#527071] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#638889] cursor-pointer disabled:bg-[#9DBC98] disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center">
              <SpinnerIcon className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
              Logging in...
            </span>
          ) : (
            'Log in'
          )}
        </button>
      </div>
    </form>
  );
};