import React from "react";
import styles from "./privacy.module.css";

const TermsOfService = () => {
  return (
    <div className={styles.container}>
      <h1>Privacy Policy</h1>
      <div className={styles.topP}>
        <p className={styles.p1}>
          Please read these Privacy Policy carefully before using our application WID. By downloading, accessing, or using the App, you agree to be bound by these Terms. If you do not agree to these Terms, please uninstall the App immediately.
        </p>
        <p className={styles.p2}>
          These Terms outline the rules and guidelines that govern your use of the App, including your rights, responsibilities, and how we handle your data. Our goal is to ensure transparency and protect your privacy.
        </p>
      </div>

      <h2>User Responsibilities</h2>
      <p className={styles.p3}>
        By using our App, you agree to:
      </p>
      <ul>
        <li className={styles.p4}>Use the App for lawful purposes only.</li>
        <li className={styles.p4}>Provide accurate and up-to-date information when creating an account or interacting with the App.</li>
        <li className={styles.p4}>Respect other users and not engage in any harmful, abusive, or inappropriate behavior.</li>
      </ul>

      <h2>Data Collection and Privacy</h2>
      <p className={styles.p3}>
        We value your privacy. By using the App, you consent to the collection and use of your information as described in our Privacy Policy. We may collect data such as your name, email address, and usage patterns to improve our services. For more details, please review our full <a href="#privacy-policy">Privacy Policy</a>.
      </p>

      <h2>Third-Party Services</h2>
      <p className={styles.p4}>
        Our App may use third-party services to enhance functionality, such as payment processors or analytics providers. We ensure that these services comply with applicable privacy and security standards. However, we are not responsible for the content, policies, or practices of any third-party service providers.
      </p>

      <h2>Limitation of Liability</h2>
      <p className={styles.p4}>
        We strive to provide a reliable and secure App experience, but we do not guarantee that the App will be error-free or uninterrupted. We are not responsible for any damages, losses, or issues resulting from your use of the App.
      </p>

      <h2>Changes to the Terms</h2>
      <p className={styles.p4}>
        We may update these Terms from time to time. Any changes will be posted within the App. Continued use of the App after changes are made constitutes your acceptance of the updated Terms.
      </p>

      <h2>Contact Us</h2>
      <p className={styles.p4}>
        If you have any questions or concerns about these Terms or the App, please contact us at <strong>support@wid.com</strong>.
      </p>

      <p
        style={{
          color: "var(--lightGreen)",
          margin: "24px auto 32px auto",
          fontSize: "clamp(16px, 4vw, 24px)",
        }}
      >
        Last Updated: January 13, 2025
      </p>
    </div>
  );
};

export default TermsOfService;
