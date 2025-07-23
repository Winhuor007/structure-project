import type { UseFormSetValue } from "react-hook-form";
import type { FormTransferDetailsRequest } from "@/interface/crossbank";

// Generate a unique external transaction ID
export const autoGenerateId = (): string => {
  const prefix = "CR";
  const regionCode = "94";
  // Keep total digits after "CR" = 11 → regionCode (2) + timestamp part (9)
  const uniquePart = Date.now().toString().slice(-9);

  return `${prefix}${regionCode}${uniquePart}`;
};

// Reusable helper to set a new transaction ID in the form
export const setNewTransactionId = (
  setValue: UseFormSetValue<FormTransferDetailsRequest>
) => {
  const newId = autoGenerateId();
  setValue("ext_transaction_id", newId);
};
