// import { useState } from "react";
// import { Search, Loader2 } from "lucide-react";

// const CheckTransactionTab = () => {
//   const [transactionId, setTransactionId] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [transactionData, setTransactionData] = useState<any>(null);
//   const [error, setError] = useState("");

//   const handleSubmit = async () => {
//     setIsLoading(true);
//     setError("");
//     setTransactionData(null);

//     try {
//       await new Promise((res) => setTimeout(res, 1000));
//       const mockData = {
//         amount: "USD 1.00",
//         bank_name: "Wing Bank",
//         bank_account_number: "123456789",
//         bank_account_name: "Big Boss",
//         transaction_id: "HPS589593",
//         transaction_date: "12-07-2025",
//         ext_transaction_id: "FT19227Q15LL",
//         transaction_status: "success",
//       };

//       if (transactionId !== "HPS589593") {
//         throw new Error("Transaction not found");
//       }

//       setTransactionData(mockData);
//     } catch (err: any) {
//       setError(err.message || "Something went wrong");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-50 rounded-xl border border-gray-200">
//       <div className="p-6 space-y-6">
//         <div className="space-y-4">
//           <div className="flex items-end justify-between gap-4">
//             <div className="flex-1">
//               <label
//                 htmlFor="transactionId"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Transaction ID
//               </label>
//               <input
//                 id="transactionId"
//                 type="text"
//                 value={transactionId}
//                 onChange={(e) => setTransactionId(e.target.value)}
//                 placeholder="Enter transaction ID"
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AAC936]"
//               />
//             </div>

//             <button
//               onClick={handleSubmit}
//               disabled={!transactionId.trim() || isLoading}
//               className="bg-[#AAC936] text-white px-6 py-3 rounded-md transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
//             >
//               {isLoading ? (
//                 <>
//                   <Loader2 size={20} className="animate-spin" />
//                   Searching...
//                 </>
//               ) : (
//                 <>
//                   <Search size={20} />
//                   Search
//                 </>
//               )}
//             </button>
//           </div>

//           {error && (
//             <div className="text-red-500 text-sm mt-2 text-center">{error}</div>
//           )}

//           {transactionData && (
//             <div className="mt-6 bg-white rounded-md border border-gray-200 p-6 space-y-6">
//               <button
//                 className={`px-3 py-1 rounded-full text-sm font-medium ${
//                   transactionData.transaction_status === "Failed"
//                     ? "bg-red-100 text-red-600"
//                     : "bg-green-100 text-green-700"
//                 }`}
//               >
//                 {transactionData.transaction_status}
//               </button>

//               <div>
//                 <div className="text-2xl font-semibold text-gray-900">
//                   {transactionData.amount}
//                 </div>
//                 <div className="text-sm text-gray-500">Transaction Amount</div>
//               </div>

//               <div className="divide-y divide-gray-100 bg-gray-50 p-4 rounded-md text-sm text-gray-700">
//                 <div className="flex justify-between py-2">
//                   <span>Date:</span>
//                   <span className="font-medium">
//                     {transactionData.transaction_date}
//                   </span>
//                 </div>
//                 <div className="flex justify-between py-2">
//                   <span>Account Number:</span>
//                   <span className="font-mono text-xs">
//                     {transactionData.bank_account_number}
//                   </span>
//                 </div>
//                 <div className="flex justify-between py-2">
//                   <span>Account Name:</span>
//                   <span className="font-mono text-xs">
//                     {transactionData.bank_account_name}
//                   </span>
//                 </div>
//                 <div className="flex justify-between py-2">
//                   <span>Amount:</span>
//                   <span className="font-mono text-xs">
//                     {transactionData.amount}
//                   </span>
//                 </div>
//                 <div className="flex justify-between py-2">
//                   <span>Transaction ID:</span>
//                   <span className="font-mono text-xs">
//                     {transactionData.transaction_id}
//                   </span>
//                 </div>
//                 <div className="flex justify-between py-2">
//                   <span>External ID:</span>
//                   <span className="font-mono text-xs">
//                     {transactionData.ext_transaction_id}
//                   </span>
//                 </div>
//                 <div className="flex justify-between py-2">
//                   <span>Transfer Type:</span>
//                   <span className="font-mono text-xs">
//                     {transactionData.bank_name}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export { CheckTransactionTab };

import { useState } from "react";
import { useForm } from "react-hook-form";

// Example type for form fields
type FormValues = {
  name: string;
  email: string;
  purpose: string;
};

const  CheckTransactionTab = () => {
  const { register, handleSubmit, reset, watch } = useForm<FormValues>();
  const [showConfirm, setShowConfirm] = useState(false);

  // Get current form values
  const formData = watch();

  const onSubmit = (data: FormValues) => {
    // This only triggers after confirmation
    console.log("Form Submitted:", data);
    reset();
    setShowConfirm(false);
  };

  const handleCreateClick = () => {
    setShowConfirm(true); // show confirmation popup
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="block text-sm">Name</label>
          <input
            {...register("name")}
            className="w-full border px-2 py-1 rounded"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full border px-2 py-1 rounded"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm">Purpose</label>
          <select {...register("purpose")} className="w-full border px-2 py-1 rounded">
            <option value="">Select purpose</option>
            <option value="TRF_RELATIVE">Transfer to Relative</option>
            <option value="TRF_BUSINESS">Business</option>
          </select>
        </div>

        <button
          type="button"
          onClick={handleCreateClick}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create
        </button>

        {/* Confirmation Modal */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <h2 className="text-lg font-bold mb-4">Confirm Submission</h2>
              <div className="text-sm space-y-1">
                <p><strong>Name:</strong> {formData.name}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Purpose:</strong> {formData.purpose}</p>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-1 text-sm rounded border"
                  onClick={() => setShowConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-1 text-sm rounded"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export { CheckTransactionTab }

