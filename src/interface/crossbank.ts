
export interface IdType {
  type_id: string;
  description: string;
}
export interface ListBankType {
  bank_name: string;
  description: string;
}
export interface TransferPurposeType {
  purpose_id: string;
  description: string;
}

export interface TransactionInquiryRequest {
  transaction_id: string;
  use_wing_id: boolean;
}

export interface TransactionInquiryResponse {
  amount: string;
  bank_name: string;
  bank_account_number: string;
  bank_account_name: string;
  transaction_id: string;
  transaction_date: string;
  ext_transaction_id: string;
  transaction_status: string;
}


 export interface FormTransferDetailsRequest {
  currency: string;
  amount: number;
  purpose: string;
  gender: string;
  occupation: string;
  nationality: string;
  bank_account_number: string;
  bank_name: string;
  first_name: string;
  last_name: string;
  date_of_birth: string; 
  id_type: string;
  id_number: string;
  country_code: string;
  country_of_birth: string;
  ext_transaction_id: string;
  sender_passport: string;
  receiver_name: string;
  receiver_currency: string;
  receiver_id_number: string;
  receiver_date_of_birth: string; 
  receiver_passport: string;
  receiver_nationality: string;
  receiver_address: string;
  receiver_phone: string;
}

 export interface FormTransferDetailsResponse {
  currency: string;
  fee: string;
  amount: string;
  bank_name: string;
  bank_account_number: string;
  bank_account_name: string;
  total_amount: string;
}
