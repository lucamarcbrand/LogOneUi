import { PostRequest } from "./BaseService";
const GET_INVOICE_DETAIL="invoice/getBillingDetail"

export const getInvoiceDetail = (defaultHeaders,data) => {
 
  return PostRequest(`${GET_INVOICE_DETAIL}`, defaultHeaders, data);
};
