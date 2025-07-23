import { useForm } from "react-hook-form";
import {
  useIdTypesQuery,
  useListBankQuery,
  usePurposeQuery,
  useCrossBank,
} from "@/features/crossbank/hook/useCrossBank";
import { toast } from "sonner";
import { yupResolver } from "@hookform/resolvers/yup";
import { validateSchema } from "../../schema/validate";
import { useState, useEffect } from "react";
import { setNewTransactionId } from "@/components/helper/externalTransaction";
import { User, CreditCard, CheckCircle } from "lucide-react";
import type {
  FormTransferDetailsRequest,
  FormTransferDetailsResponse,
} from "@/interface/crossbank";

const CrossBankForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormTransferDetailsRequest>({
    resolver: yupResolver(validateSchema),
  });
  const { validateTransactionMutation } = useCrossBank();
  const { data:idTypesQuery } = useIdTypesQuery();
  const { data:listBankQuery } = useListBankQuery();
  const { data: PurposeQuery } = usePurposeQuery();
  const { mutate, isPending } = validateTransactionMutation;
  
      console.log("✅ Purpose fetched inside hook ID TYPE:", idTypesQuery);
       console.log("✅ Purpose fetched inside hook Bank list:", listBankQuery);
        console.log("✅ Purpose fetched inside hook purpose:",PurposeQuery);
  

  const [formData, setFormData] = useState<FormTransferDetailsRequest | null>(
    null
  );
  const [showFirstConfirm, setShowFirstConfirm] = useState(false);
  const [showSecondConfirm, setShowSecondConfirm] = useState(false);
  const [apiResponse, setApiResponse] =
    useState<FormTransferDetailsResponse | null>(null);

  const onSubmit = (data: FormTransferDetailsRequest) => {
    setFormData(data);
    setShowFirstConfirm(true);
  };

  const handleConfirm = () => {
    if (!formData) return;

    mutate(formData, {
      onSuccess: (res) => {
        toast.success("Validation successful");
        setApiResponse(res); // save API response
        setShowFirstConfirm(false);
        setShowSecondConfirm(true);
      },
      onError: () => {
        toast.error("Validation failed");
        setShowFirstConfirm(false);
      },
    });
  };

  useEffect(() => {
    setNewTransactionId(setValue);
  }, [setValue]);

  return (
    <div className="min-h-screen bg-gradient-to-br items-center">
      <div className=" h-screen">
        {/* Left Side - Form   bg-indigo-50 */}
        <div className="">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Cross Bank Transfer
              </h1>
              <p className="text-gray-600">
                Complete Your Information Bank Transfer
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6  bg-opacity-95">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Transaction Details */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <CreditCard className="w-4 h-4 text-indigo-600" />
                    <h2 className="text-lg font-semibold text-gray-900">
                      Transaction Information
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Currency
                      </label>
                      <select
                        {...register("currency")}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      >
                        <option value="">Please Select</option>
                        <option value="USD">USD</option>
                        <option value="KHQR">KHQR</option>
                      </select>
                      {errors.currency && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.currency.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Amount
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        {...register("amount", { valueAsNumber: true })}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      />
                      {errors.amount && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.amount.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Purpose
                      </label>
                      <select
                        {...register("purpose")}
                        className={`w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                          errors.purpose ? "border-red-500" : "border-gray-300"
                        }`}
                        defaultValue=""
                      >
                        <option value="">Please Select</option>
                        {PurposeQuery?.map((item) => (
                          <option key={item.purpose_id} value={item.purpose_id}>
                            {item.description}
                          </option>
                        ))}
                      </select>
                      {errors.purpose && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.purpose.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* ============ */}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Bank Name
                        </label>
                        <select
                          {...register("bank_name")}
                          className={`w-full px-2 py-1.5 text-sm border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                            errors.id_type
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          defaultValue="" // ensure default empty option selected
                        >
                          <option value="">Please Select</option>
                          {listBankQuery?.map((item) => (
                            <option key={item.bank_name} value={item.bank_name}>
                              {item.description}
                            </option>
                          ))}
                        </select>
                        {errors.bank_name && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.bank_name.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Bank Account Number
                        </label>
                        <input
                          type="text"
                          {...register("bank_account_number")}
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        />
                        {errors.bank_account_number && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.bank_account_number.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        External Transaction ID
                      </label>
                      <input
                        type="text"
                        {...register("ext_transaction_id")}
                        readOnly
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      />
                      {errors.ext_transaction_id && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.ext_transaction_id.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* ============ */}
                </div>

                {/* Sender Information */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <User className="w-4 h-4 text-indigo-600" />
                    <h2 className="text-lg font-semibold text-gray-900">
                      Sender Information
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        {...register("first_name")}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      />
                      {errors.first_name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.first_name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        {...register("last_name")}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      />
                      {errors.last_name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.last_name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        {...register("date_of_birth")}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      />
                      {errors.date_of_birth && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.date_of_birth.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Gender
                      </label>
                      <select
                        {...register("gender")}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      >
                        <option value="">Please Select</option>
                        <option value="M">M</option>
                        <option value="F">F</option>
                      </select>
                      {errors.gender && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.gender.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Occupation
                      </label>
                      <input
                        type="text"
                        {...register("occupation")}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      />
                      {errors.occupation && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.occupation.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Nationality
                      </label>
                      <input
                        type="text"
                        {...register("nationality")}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      />
                      {errors.nationality && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.nationality.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        ID Type
                      </label>
                      <select
                        {...register("id_type")}
                        className={`w-full px-2 py-1.5 text-sm border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                          errors.id_type ? "border-red-500" : "border-gray-300"
                        }`}
                        defaultValue="please select" // ensure default empty option selected
                      >
                        <option value="">Select ID Type</option>
                        {idTypesQuery?.map((item) => (
                          <option key={item.type_id} value={item.type_id}>
                            {item.description}
                          </option>
                        ))}
                      </select>
                      {errors.id_type && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.id_type.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        ID Number
                      </label>
                      <input
                        type="text"
                        {...register("id_number")}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      />
                      {errors.id_number && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.id_number.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Country Code
                      </label>
                      <input
                        type="text"
                        {...register("country_code")}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      />
                      {errors.country_code && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.country_code.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Country of Birth
                      </label>
                      <input
                        type="text"
                        {...register("country_of_birth")}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      />
                      {errors.country_of_birth && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.country_of_birth.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Sender Passport
                      </label>
                      <input
                        type="text"
                        {...register("sender_passport")}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      />
                      {errors.sender_passport && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.sender_passport.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Receiver Information */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <User className="w-4 h-4 text-indigo-600" />
                    <h2 className="text-lg font-semibold text-gray-900">
                      Receiver Information
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Receiver Name
                      </label>
                      <input
                        type="text"
                        {...register("receiver_name")}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      />
                      {errors.receiver_name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.receiver_name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Receiver Currency
                      </label>
                      <select
                        {...register("receiver_currency")}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      >
                        <option value="USD">USD</option>
                        <option value="KHQR">KHQR</option>
                      </select>
                      {errors.receiver_currency && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.receiver_currency.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Receiver ID Number
                      </label>
                      <input
                        type="text"
                        {...register("receiver_id_number")}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      />
                      {errors.receiver_id_number && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.receiver_id_number.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Receiver Date of Birth
                      </label>
                      <input
                        type="date"
                        {...register("receiver_date_of_birth")}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      />
                      {errors.receiver_date_of_birth && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.receiver_date_of_birth.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Receiver Passport
                      </label>
                      <input
                        type="text"
                        {...register("receiver_passport")}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      />
                      {errors.receiver_passport && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.receiver_passport.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Receiver Nationality
                      </label>
                      <input
                        type="text"
                        {...register("receiver_nationality")}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      />
                      {errors.receiver_nationality && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.receiver_nationality.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Receiver Address
                      </label>
                      <input
                        type="text"
                        {...register("receiver_address")}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      />
                      {errors.receiver_address && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.receiver_address.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Receiver Phone
                      </label>
                      <input
                        type="text"
                        {...register("receiver_phone")}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      />
                      {errors.receiver_phone && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.receiver_phone.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center space-x-3 pt-4">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="px-20 py-3 bg-gradient-to-r bg-[#AAC936] text-white rounded-2xl hover:from-indigo-[#AAC936] hover:to-purple-[#034EA2]/90 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center cursor-pointer space-x-2 text-sm"
                  >
                    {isPending ? (
                      <>
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                        <span>Creating...</span>
                      </>
                    ) : (
                      <>
                        <span>Create Transaction</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
              {/* === POPUP 1: Confirm Input === */}
              {showFirstConfirm && formData && (
                <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center p-4 z-30">
                  <div className="rounded-2xl bg-white p-8 max-w-lg w-full shadow-2xl text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#AAC936] mb-4">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Confirm Your Transaction
                    </h3>
                    <div className=" text-sm max-h-96 overflow-y-auto">
                      <div className="flex justify-between">
                        <span className="">External Transaction ID:</span>
                        <span>{formData.ext_transaction_id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Currency:</span>
                        <span>{formData.currency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Amount:</span>
                        <span>{formData.amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Purpose:</span>
                        <span>{formData.purpose}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bank Name:</span>
                        <span>{formData.bank_name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bank Account Number:</span>
                        <span>{formData.bank_account_number}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>First Name:</span>
                        <span>{formData.first_name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Last Name:</span>
                        <span>{formData.last_name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Date of Birth:</span>
                        <span>{formData.date_of_birth}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Gender:</span>
                        <span>{formData.gender}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Occupation:</span>
                        <span>{formData.occupation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Nationality:</span>
                        <span>{formData.nationality}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ID Type:</span>
                        <span>{formData.id_type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ID Number:</span>
                        <span>{formData.id_number}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Country Code:</span>
                        <span>{formData.country_code}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Country of Birth:</span>
                        <span>{formData.country_of_birth}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Sender Passport:</span>
                        <span>{formData.sender_passport}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Receiver Name:</span>
                        <span>{formData.receiver_name}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Receiver Currency:</span>
                        <span>{formData.receiver_currency}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Receiver ID Number:</span>
                        <span>{formData.receiver_id_number}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Receiver Date of Birth:</span>
                        <span>{formData.receiver_date_of_birth}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Receiver Passport:</span>
                        <span>{formData.receiver_passport}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Receiver Nationality:</span>
                        <span>{formData.receiver_nationality}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Receiver Address:</span>
                        <span>{formData.receiver_address}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Receiver Phone:</span>
                        <span>{formData.receiver_phone}</span>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        onClick={() => setShowFirstConfirm(false)}
                        className="px-4 py-3 bg-gray-300 rounded-2xl cursor-pointer space-2 text-sm"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={handleConfirm}
                        className="px-20 py-3 bg-gradient-to-r bg-[#AAC936] text-white rounded-2xl hover:from-indigo-[#AAC936] hover:to-purple-[#034EA2]/90 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center cursor-pointer space-x-2 text-sm"
                      >
                        {isPending ? (
                          <>
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                            <span>Confirming...</span>
                          </>
                        ) : (
                          <>
                            <span>Confirm</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* === POPUP 2: Show API Response + Input === */}
              {showSecondConfirm && apiResponse && formData && (
                <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center p-4 z-30">
                  <div className="rounded-2xl bg-white p-8 max-w-lg w-full shadow-2xl text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#AAC936] mb-4">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Transaction Details
                    </h3>
                    <div className=" text-sm max-h-96 overflow-y-auto">
                      <div className="flex justify-between">
                        <span className="">External Transaction ID:</span>
                        <span>{formData.ext_transaction_id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Currency:</span>
                        <span>{formData.currency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Amount:</span>
                        <span>{formData.amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Purpose:</span>
                        <span>{formData.purpose}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bank Name:</span>
                        <span>{formData.bank_name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bank Account Number:</span>
                        <span>{formData.bank_account_number}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>First Name:</span>
                        <span>{formData.first_name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Last Name:</span>
                        <span>{formData.last_name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Date of Birth:</span>
                        <span>{formData.date_of_birth}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Gender:</span>
                        <span>{formData.gender}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Occupation:</span>
                        <span>{formData.occupation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Nationality:</span>
                        <span>{formData.nationality}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ID Type:</span>
                        <span>{formData.id_type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ID Number:</span>
                        <span>{formData.id_number}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Country Code:</span>
                        <span>{formData.country_code}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Country of Birth:</span>
                        <span>{formData.country_of_birth}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Sender Passport:</span>
                        <span>{formData.sender_passport}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Receiver Name:</span>
                        <span>{formData.receiver_name}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Receiver Currency:</span>
                        <span>{formData.receiver_currency}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Receiver ID Number:</span>
                        <span>{formData.receiver_id_number}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Receiver Date of Birth:</span>
                        <span>{formData.receiver_date_of_birth}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Receiver Passport:</span>
                        <span>{formData.receiver_passport}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Receiver Nationality:</span>
                        <span>{formData.receiver_nationality}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Receiver Address:</span>
                        <span>{formData.receiver_address}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Receiver Phone:</span>
                        <span>{formData.receiver_phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Amount:</span>
                        <span>{apiResponse.total_amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bank Account Name:</span>
                        <span>{apiResponse.bank_account_name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fee:</span>
                        <span>{apiResponse.fee}</span>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        onClick={() => {
                          setShowSecondConfirm(false);
                          setFormData(null);
                          setApiResponse(null);
                          reset();
                          setNewTransactionId(setValue);
                        }}
                        className="px-4 py-2 bg-[#AAC936] text-white rounded"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrossBankForm;
