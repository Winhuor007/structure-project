// src/hooks/useIdTypes.ts
import { useQuery } from "@tanstack/react-query";
import { fetchIdTypes, fetchListBank } from "@/service/crossbank-api/crossbank";
import type { IdType, ListBankType,TransferPurposeType } from "@/interface/crossbank";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTransactionDetail,fetchValidateTransactionDetail, fetchPurpose } from "@/service/crossbank-api/crossbank";
import type {
  TransactionInquiryRequest,
  TransactionInquiryResponse,FormTransferDetailsRequest,FormTransferDetailsResponse
} from "@/interface/crossbank";



export const useIdTypesQuery = () =>
  useQuery<IdType[]>({
    queryKey: ["idTypes"],
    queryFn: fetchIdTypes,
     staleTime: 5 * 60 * 1000, 
    refetchOnWindowFocus: false,
  });

export const useListBankQuery = () =>
  useQuery<ListBankType[]>({
    queryKey: ["listBank"],
    queryFn: fetchListBank,
     staleTime: 5 * 60 * 1000, 
    refetchOnWindowFocus: false,
  });

export const usePurposeQuery = () =>
  useQuery<TransferPurposeType[]>({
    queryKey: ["Purpose"],
    queryFn: fetchPurpose,
     staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
[]
export const useCrossBank = () => {

  const queryClient = useQueryClient();

  const transactionDetailMutation = useMutation<TransactionInquiryResponse, Error,TransactionInquiryRequest>({
    mutationFn: fetchTransactionDetail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['TransactionDetail'] });
    },
  });
    const validateTransactionMutation = useMutation<FormTransferDetailsResponse, Error,FormTransferDetailsRequest>({
    mutationFn: fetchValidateTransactionDetail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Validateform'] });
    },
  });
 
  return {
    transactionDetailMutation,
    validateTransactionMutation
  };
};

