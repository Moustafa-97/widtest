/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
const PaymentReturn = ({
  bookingId,
  paidWithSavedCard,
  data,
}: {
  bookingId?: string;
  paidWithSavedCard?: string;
  data: {
    acquirerMessage?: string;
    acquirerRRN?: string;
    cartId?: string;
    customerEmail?: string;
    respCode?: string;
    respMessage?: string;
    respStatus?: string;
    signature?: string;
    token?: string;
    tranRef?: string;
  };
}) => {
  console.log("decodedParams", data);
  console.log("bookingId", bookingId);
  console.log("paidWithSavedCard", paidWithSavedCard);

  return (
    <>
      <div>
        <h1>Success</h1>
        <h2>{bookingId}</h2>
        {paidWithSavedCard === "true" && <h1>{data.customerEmail}</h1>}
      </div>
    </>
  );
};

export default PaymentReturn;
