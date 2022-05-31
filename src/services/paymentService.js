import { PostRequest } from "./BaseService";
const GET_INVOICE_DETAIL="invoice/getBillingDetail"

//function which send request to backend to caculate invoice cost
export const getInvoiceDetail = (defaultHeaders,data) => {
  return PostRequest(`${GET_INVOICE_DETAIL}`, defaultHeaders, data);
};
