export const UPIQRCodeModal = ({ amount, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">

        <h2 className="text-xl font-semibold mb-3 text-center">
          UPI Payment
        </h2>

        <p className="text-center text-gray-600 mb-4">
          Scan this QR using any UPI app
        </p>

        <div className="flex justify-center mb-4">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=upi://pay?pa=hostel@sbi&pn=Sukhvaas+Hostel&am=${amount}&cu=INR`}
            alt="UPI QR Code"
            className="border p-2 rounded-md"
          />
        </div>

        <p className="text-sm text-center text-gray-500">
          UPI ID: <span className="font-medium">hostel@sbi</span>
        </p>

        <button
          onClick={onClose}
          className="cursor-pointer mt-6 w-full py-2 bg-[#638889] text-white rounded-md hover:bg-[#527071]"
        >
          Close
        </button>
      </div>
    </div>
  );
};


