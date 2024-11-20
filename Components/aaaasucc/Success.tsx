/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

const PaymentReturn = () => {
    // reload page
    document.location.reload();
    const [paymentDetails, setPaymentDetails] = useState<{ [key: string]: any } | null>(null);
    
  useEffect(() => {
    // Parse the form data PayTabs sends
    const form = document.forms[0]; // The auto-populated form
    if (form) {
      const formData = new FormData(form);
      const details: { [key: string]: any } = {};
      formData.forEach((value, key) => {
        details[key] = value;
      });

      setPaymentDetails(details); // Store payment details in state
      console.log("Payment Details:", details);
    }
  }, []);

  return (
    <div>
      <h1>Processing Payment...</h1>
      <form method="POST" style={{ display: "none" }}>
        {/* The form is populated by PayTabs */}
      </form>
      {paymentDetails && (
        <div>
          <h2>Payment Details</h2>
          <pre>{JSON.stringify(paymentDetails, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default PaymentReturn;
