/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

const PaymentReturn = () => {
    const [paymentDetails, setPaymentDetails] = useState<{ [key: string]: any } | null>(null);
    
  useEffect(() => {
    // Extract form data from the POST body
    const form = document.forms[0]; // Get the form PayTabs redirects to
    if (form) {
      const formData = new FormData(form);
      const details: { [key: string]: any } = {};
      formData.forEach((value, key) => {
        details[key] = value;
      });

      setPaymentDetails(details); // Store payment details in state
      console.log("Payment Details:", details); // Debugging/logging
    }
  }, []);

  return (
    <div>
      <h1>Payment Status</h1>
      {paymentDetails ? (
        <pre>{JSON.stringify(paymentDetails, null, 2)}</pre>
      ) : (
        <p>Loading payment details...</p>
      )}
      <form method="POST">
        {/* PayTabs will populate this form */}
      </form>
    </div>
  );
};

export default PaymentReturn;
