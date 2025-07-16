import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { z } from "zod";
import { CheckCircle, User, CreditCard } from "lucide-react";

// Zod Schema for form validation
const crossBankSchema = z.object({
  currency: z.string().min(1, "Currency is required"),
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  purpose: z.string().min(1, "Purpose is required"),
  gender: z.enum(["M", "F"], {
    errorMap: () => ({ message: "Gender is required" }),
  }),
  occupation: z.string().min(1, "Occupation is required"),
  nationality: z.string().min(1, "Nationality is required"),
  bank_account_number: z.string().min(1, "Bank account number is required"),
  bank_name: z.string().min(1, "Bank name is required"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  id_type: z.string().min(1, "ID type is required"),
  id_number: z.string().min(1, "ID number is required"),
  country_code: z.string().min(1, "Country code is required"),
  country_of_birth: z.string().min(1, "Country of birth is required"),
  ext_transaction_id: z.string().min(1, "External transaction ID is required"),
  sender_passport: z.string().min(1, "Sender passport is required"),
  receiver_name: z.string().min(1, "Receiver name is required"),
  receiver_currency: z.string().min(1, "Receiver currency is required"),
  receiver_id_number: z.string().min(1, "Receiver ID number is required"),
  receiver_date_of_birth: z
    .string()
    .min(1, "Receiver date of birth is required"),
  receiver_passport: z.string().min(1, "Receiver passport is required"),
  receiver_nationality: z.string().min(1, "Receiver nationality is required"),
  receiver_address: z.string().min(1, "Receiver address is required"),
  receiver_phone: z.string().min(1, "Receiver phone is required"),
});

type CrossBankFormData = z.infer<typeof crossBankSchema>;

interface ValidationResult {
  currency: string;
  fee: string;
  amount: string;
  bank_name: string;
  bank_account_number: string;
  bank_account_name: string;
  total_amount: string;
}

interface TransactionResult {
  amount: string;
  bank_name: string;
  bank_account_number: string;
  bank_account_name: string;
  transaction_id: string;
  transaction_date: string;
  ext_transaction_id: string;
  transaction_status: string;
}

interface PopupData {
  fee: string;
  amount: string;
  total: string;
  balance: string;
  bank_name: string;
  bank_account_number: string;
  bank_account_name: string;
  transaction_id: string;
  transaction_date: string;
}

// Mock API function for validation
const validateCrossBankTransaction = async (
  data: CrossBankFormData
): Promise<ValidationResult> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    currency: data.currency,
    fee: `${data.currency} 3.50`,
    amount: `${data.currency} ${data.amount.toFixed(2)}`,
    bank_name: data.bank_name,
    bank_account_number: data.bank_account_number,
    bank_account_name: `${data.first_name} ${data.last_name}`,
    total_amount: `${data.currency} ${(data.amount + 3.5).toFixed(2)}`,
  };
};

// Mock API function for getting transaction
const getTransaction = async (): Promise<TransactionResult> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    amount: "USD 125.65",
    bank_name: "Dev Bank",
    bank_account_number: "123456789",
    bank_account_name: "John Cena",
    transaction_id: "FTU742179",
    transaction_date: "20241017103803",
    ext_transaction_id: "CR94170742787",
    transaction_status: "Success",
  };
};

const CrossBankForm: React.FC = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CrossBankFormData>({
    resolver: zodResolver(crossBankSchema),
    defaultValues: {
      currency: "USD",
      amount: 125.65,
      purpose: "TRF_RELATIVE",
      gender: "F",
      occupation: "STUDENT",
      nationality: "KH",
      bank_account_number: "123456789",
      bank_name: "DEVBKHPPXXX",
      first_name: "HENG",
      last_name: "SENGHORN",
      date_of_birth: "2005-04-22",
      id_type: "ID_RESCARDY",
      id_number: "SA08185470FA",
      country_code: "JPN",
      country_of_birth: "JPN",
      ext_transaction_id: "CR94170742787",
      sender_passport: "SA08185470FA",
      receiver_name: "MOM KANHA",
      receiver_currency: "USD",
      receiver_id_number: "090123456",
      receiver_date_of_birth: "2000-01-13",
      receiver_passport: "690123456",
      receiver_nationality: "KH",
      receiver_address: "PHNOM PENH",
      receiver_phone: "004113869",
    },
  });

  const validationMutation = useMutation({
    mutationFn: validateCrossBankTransaction,
    onSuccess: (data) => {
      setShowSuccess(true);
    },
    onError: (error) => {
      console.error("Validation error:", error);
    },
  });

  const transactionMutation = useMutation({
    mutationFn: getTransaction,
    onSuccess: (data) => {},
    onError: (error) => {
      console.error("Transaction error:", error);
    },
  });

  const onSubmit = (data: CrossBankFormData) => {
    validationMutation.mutate(data);
  };

  const closeSuccessModal = () => {
    setShowSuccess(false);
  };

  // Mock popup data based on the new format
  const mockPopupData: PopupData = {
    fee: "USD 3.50",
    amount: "USD 125.65",
    total: "USD 129.15",
    balance: "441.04",
    bank_name: "Dev Bank",
    bank_account_number: "123456789",
    bank_account_name: "John Cena",
    transaction_id: "FTU742179",
    transaction_date: "17-Oct-24 10:38",
  };

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

            <div className="bg-white rounded-2xl shadow-xl p-6 backdrop-blur-sm bg-opacity-95">
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
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      >
                        <option value="TRF_RELATIVE">
                          Transfer to Relative
                        </option>
                        <option value="TRF_BUSINESS">Business Transfer</option>
                        <option value="TRF_PERSONAL">Personal Transfer</option>
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
                        <input
                          type="text"
                          {...register("bank_name")}
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        />
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
                      <input
                        type="text"
                        {...register("id_type")}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      />
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
                  {/* <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    Reset Form
                  </button> */}
                  <button
                    type="submit"
                    disabled={validationMutation.isPending}
                    className="px-20 py-3 bg-gradient-to-r bg-[#AAC936] text-white rounded-2xl hover:from-indigo-[#AAC936] hover:to-purple-[#034EA2]/90 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 text-sm"
                  >
                    {validationMutation.isPending ? (
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
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal with New Data Format */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-8 max-w-lg w-full shadow-2xl border border-pink-200">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r from-[#AAC936]/90 to-[#034EA2]/90 mb-4">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Transaction Complete!
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Your transaction has been processed successfully.
              </p>

              <div className="space-y-3 text-left bg-white rounded-lg p-4 shadow-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">
                        Amount:
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {mockPopupData.amount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">
                        Fee:
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {mockPopupData.fee}
                      </span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-sm font-medium text-gray-600">
                        Total:
                      </span>
                      <span className="text-sm font-bold text-pink-600">
                        {mockPopupData.total}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h1>hello</h1>

                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">
                        Balance:
                      </span>
                      <span className="text-sm font-semibold text-green-600">
                        {mockPopupData.balance}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">
                        Transaction ID:
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {mockPopupData.transaction_id}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">
                        Date:
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {mockPopupData.transaction_date}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-3 mt-3">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">
                    Bank Details
                  </h4>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">
                        Bank:
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {mockPopupData.bank_name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">
                        Account:
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {mockPopupData.bank_account_number}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">
                        Account Name:
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {mockPopupData.bank_account_name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={closeSuccessModal}
                className="mt-6 w-full bg-gradient-to-r from-[#AAC936]/90 to-[#034EA2]/90 text-white py-3 px-4 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CrossBankForm />
    </QueryClientProvider>
  );
}

export default App;
