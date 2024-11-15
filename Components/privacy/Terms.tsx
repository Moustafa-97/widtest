import React from "react";
import styles from "./terms.module.css";

const TermsAndConditions = () => {
  return (
    <div className={styles.container}>
      <h1>Terms and Conditions</h1>
      <div className={styles.topP}>
        <p className={styles.p1}>
          Welcome to WID! These terms and conditions (“Terms”)
          outline the rules and regulations for the use of our services. By
          accessing our website, you accept these Terms in full. If you disagree
          with any part of these Terms, you must not use our Platform.
        </p>
        <p className={styles.p2}>
          Note: <a href="#section-disputes">Section 12</a> contains an
          arbitration clause and waiver of class actions, which may affect how
          disputes are resolved. Please read it carefully before proceeding.
        </p>
      </div>

      <p
        style={{
          color: "var(--lightGreen)",
          margin: "24px auto 32px auto",
          fontSize: "clamp(16px, 4vw, 24px)",
        }}
      >
        Last Updated: November 15, 2024
      </p>

      <div className={styles.lowP}>
        <p className={styles.p3}>
          By using this Platform, you agree to comply with all applicable laws
          and regulations. These Terms, along with our{" "}
          <a href="#privacy-policy">Privacy Policy</a>, form the entire
          agreement between you and [Your Company Name].
        </p>

        <p className={styles.p4}>
          When these Terms mention “we,” “us,” or “our,” they refer to [Your
          Company Name], based on your country of residence.
        </p>

        <ul>
          <li className={styles.p4}>
            If you reside in the United States, your agreement is with [Your
            Company Name], headquartered at [Company Address].
          </li>
          <li className={styles.p4}>
            If you reside outside of the United States, your agreement is with
            [Your Company Name International], located at [International
            Address].
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TermsAndConditions;
