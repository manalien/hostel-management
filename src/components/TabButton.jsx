export const TabButton = ({ type, label, isActive, onClick }) => (
  <button
    onClick={() => onClick(type)}
    className={`w-1/2 py-3 px-1 text-center font-medium text-sm rounded-t-md focus:outline-none cursor-pointer ${
      isActive
        ? 'bg-white border-b-2 border-[#638889] text-[#638889]'
        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
    }`}
  >
    {label}
  </button>
);