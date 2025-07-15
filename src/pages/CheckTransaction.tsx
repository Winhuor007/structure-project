// Assuming you're using lucide-react or similar icon library
import { Receipt, CheckCircle, DollarSign, Building, Calendar } from 'lucide-react';

const CheckTransaction = () => {
  return (
    <div className="">
      {/* Right Side - Transaction Details */}
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Transaction Details</h2>
          <p className="text-gray-600">View your transaction information</p>
        </div>

        {/* No Transaction Selected View */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <Receipt className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Transaction Selected</h3>
          <p className="text-gray-600 mb-6">
            Click "Validate Transaction" to view transaction details
          </p>
          <button
            className="px-6 py-3 bg-gradient-to-r from-[#AAC936]/90 to-[#034EA2]/90 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
            disabled
          >
            <CheckCircle className="w-4 h-4" />
            <span>Validate Transaction</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Transaction Information</h3>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
              Success
            </span>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="text-xs font-medium text-gray-600">Amount</span>
                </div>
                <p className="text-lg font-bold text-gray-900">$150.00</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <Receipt className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-medium text-gray-600">Transaction ID</span>
                </div>
                <p className="text-sm font-bold text-gray-900">TXN123456789</p>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <Building className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-medium text-gray-600">Bank Information</span>
              </div>
              <p className="text-sm font-semibold text-gray-900">Example Bank</p>
              <p className="text-sm text-gray-700">Account: 1234567890</p>
              <p className="text-sm text-gray-700">Name: John Doe</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <Calendar className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-medium text-gray-600">Transaction Details</span>
              </div>
              <p className="text-sm text-gray-700">Date: 2025-04-05</p>
              <p className="text-sm text-gray-700">External ID: EXT987654321</p>
            </div>

            <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-[#AAC936]/90 to-[#034EA2]/90 text-white rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-200 font-medium shadow-md hover:shadow-lg">
              View Complete Details
            </button>
          </div>
        </div>
    
      </div>
    </div>
  );
};

export default CheckTransaction;