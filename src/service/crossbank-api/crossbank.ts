import axiosInstance from "@/lib/constants/axios";
import type { IdType, TransferPurposeType,ListBankType} from '@/interface/crossbank';
import type {
  TransactionInquiryRequest,
  TransactionInquiryResponse,FormTransferDetailsRequest,FormTransferDetailsResponse
} from '@/interface/crossbank';


export const fetchPurpose = async ():Promise<TransferPurposeType[]> => {
  const { data } = await axiosInstance.get('https://e07f5bd5-8042-48ee-bcce-5f4a207f1917.mock.pstmn.io/api/v1/crossbank/purpose');
  return data;
};
 
export const fetchIdTypes = async ():Promise<IdType[]> => {
  const { data } = await axiosInstance.get('https://1618038a-80a8-4134-8833-ccab16fd7d74.mock.pstmn.io/api/v1/crossbank/get_id_types');
  return data.list_id_types;
};

export const fetchListBank = async ():Promise<ListBankType[]> => {
  const { data } = await axiosInstance.get('https://8a09289e-cfd2-4c27-99ce-0376ca9b1a0f.mock.pstmn.io/api/v1/crossbank/get_bank_list');
  return data.list_banks;
};

export const fetchTransactionDetail= async (
  payload: TransactionInquiryRequest
): Promise<TransactionInquiryResponse> => {
  const { data } = await axiosInstance.post<TransactionInquiryResponse>(
    'https://8d4acd8c-7243-4486-8b09-dbcd20e12c4f.mock.pstmn.io/api/v1/crossbank/txn_inquiry',
    payload
  );
  return data;
};

export const fetchValidateTransactionDetail = async (
  payload: FormTransferDetailsRequest
): Promise<FormTransferDetailsResponse> => {
  const { data } = await axiosInstance.post<FormTransferDetailsResponse>(
    'https://b703446c-d157-4751-b6fd-4dc104dbeee1.mock.pstmn.io/api/v1/crossbank/validate',
    payload
  );
  return data;
};

