import { CreditCardIcon } from "../assets/CreditCardIcon";
import { SpinnerIcon } from "../assets/SpinnerIcon";
import { useState, useEffect } from "react";
import { UPIQRCodeModal } from "../components/UPIQRCodeModal";


export const StudentFeesPage = ({ roll_no }) => {
  const [feeDetails, setFeeDetails] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);

  const [showUPIModal, setShowUPIModal] = useState(false);


  useEffect(() => {
    // Fetch Fee Summary
    fetch(`http://localhost:3000/api/fees/summary/${roll_no}`)
      .then(res => res.json())
      .then(data => setFeeDetails(data))
      .catch(err => console.error(err));

    // Fetch Payment History
    fetch(`http://localhost:3000/api/fees/history/${roll_no}`)
      .then(res => res.json())
      .then(data => setPaymentHistory(Array.isArray(data) ? data : []))
      .catch(err => console.error(err));
  }, [roll_no]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  const getStatusChip = (status) => {
    switch (status) {
      case 'Paid':
        return <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">{status}</span>;
      case 'Due':
        return <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">{status}</span>;
      default:
        return <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  if (!feeDetails) {
    return (
      <div className="flex justify-center items-center h-64">
        <SpinnerIcon className="w-8 h-8 text-[#638889] animate-spin" />
        <p className="text-gray-500 ml-3">Loading fee details...</p>
      </div>
    );
  }

  return (
    <div>
      {showUPIModal && (
        <UPIQRCodeModal 
          amount={feeDetails.outstanding}
          onClose={() => setShowUPIModal(false)}
        />
      )}

      <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
        <CreditCardIcon className="w-8 h-8 mr-3 text-gray-500" />
        Fees Portal
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT SIDE */}
        <div className="lg:col-span-1 space-y-6">

          {/* Outstanding Balance */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-500">Outstanding Balance</h3>
            <p className="text-4xl font-bold text-[#638889] mt-2">
              {formatCurrency(feeDetails.outstanding)}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Next payment due: <span className="font-medium text-red-600">{feeDetails.dueDate}</span>
            </p>
            <button
              disabled={feeDetails.outstanding === 0}
              onClick={() => setShowUPIModal(true)}
              className="cursor-pointer mt-6 w-full flex justify-center py-3 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-[#638889] hover:bg-[#527071] disabled:bg-[#9DBC98]"
            >
              {feeDetails.outstanding > 0 ? "Pay Now" : "No Dues"}
            </button>
          </div>

          {/* Fee Summary */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Fee Summary</h3>
            <div className="space-y-3 text-sm">

              <div className="flex justify-between">
                <span className="text-gray-500">Total Dues (This Year)</span>
                <span className="font-medium text-gray-800">
                  {formatCurrency(feeDetails.totalDues)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Total Paid</span>
                <span className="font-medium text-green-700">
                  {formatCurrency(feeDetails.totalPaid)}
                </span>
              </div>

              <div className="flex justify-between border-t pt-3 mt-3">
                <span className="text-gray-800 font-semibold">Outstanding</span>
                <span className="font-bold text-red-700">
                  {formatCurrency(feeDetails.outstanding)}
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6 h-full">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Payment History</h3>

            <div className="mt-4 space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {
                paymentHistory.length === 0
                  ? <p className="text-gray-500 text-sm text-center py-4">No payment history found.</p>
                  : paymentHistory.map((item) => (
                    <div key={item.id} className="border rounded-md p-4 bg-white hover:bg-gray-50">
                      <div className="flex justify-between mb-2">
                        <p className="text-gray-800 font-medium">{item.description}</p>
                        <p className={`font-semibold ${item.amount > 0 ? 'text-red-600' : 'text-green-700'}`}>
                          {formatCurrency(item.amount)}
                        </p>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">
                          {item.date} • {item.type}
                        </span>
                        {getStatusChip(item.status)}
                      </div>
                    </div>
                  ))
              }
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
