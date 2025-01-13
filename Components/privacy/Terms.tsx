import React from "react";
import styles from "./privacy.module.css";

const TermsOfService = () => {
  return (
    <div className={styles.container}>
      <h1>Privacy Policy</h1>

      <section>
        <h2>1. Privacy Policy</h2>

        <h3>1.1. About WID</h3>
        <p>
          WID provides a platform for users to book apartments for short-term
          and long-term stays. Our mission is to connect users with high-quality
          apartments that fit their needs.
        </p>

        <h3>1.2. User Agreement</h3>
        <p>
          By accessing our website, you agree to provide accurate information,
          use the platform responsibly, and comply with all applicable laws and
          regulations. WID reserves the right to modify these Terms at any time.
        </p>

        <h3>1.3. Booking Process</h3>
        <p>To book an apartment on WID:</p>
        <ul>
          <li>Browse available apartments.</li>
          <li>Select your preferred dates and apartment.</li>
          <li>
            Complete the booking process by providing your details and payment.
          </li>
        </ul>

        <h3>1.4. Cancellations and Refunds</h3>
        <p>
          Cancellation policies vary by apartment. Users are advised to
          carefully review the cancellation terms before confirming a booking.
          WID is not responsible for refund disputes outside the agreed
          cancellation policy.
        </p>

        <h3>1.5. Prohibited Activities</h3>
        <p>
          Users are prohibited from providing false information or engaging in
          fraudulent or harmful activities.
        </p>
      </section>

      <section>
        <h2>2. Privacy Policy</h2>

        <h3>2.1. Information We Collect</h3>
        <p>
          When you use our website, we may collect personal information such as
          your name, email, and payment details, as well as usage data like your
          IP address and browser type.
        </p>

        <h3>2.2. How We Use Your Information</h3>
        <p>
          We use your information to process bookings, communicate with you,
          send promotional offers (with your consent), and improve website
          security.
        </p>

        <h3>2.3. Third-Party Services</h3>
        <p>
          We may share your information with third-party services for payment
          processing, email notifications, and website analytics. We ensure our
          partners follow strict data privacy policies.
        </p>

        <h3>2.4. Your Rights</h3>
        <p>
          You have the right to access your personal data, request corrections
          or deletions, and withdraw consent for promotional communications.
          Contact us at <a href="mailto:support@wid.com">support@wid.com</a> to
          exercise these rights.
        </p>
      </section>

      <section className={styles.contactSection}>
        <h2>3. Contact Us</h2>
        <p>
          For any questions or concerns about these Terms or our Privacy Policy,
          please reach out to us:
        </p>
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:support@wid.com">wid@rentals.org</a>
        </p>
        <p>
          <strong>Website:</strong>{" "}
          <a href="https://www.widresidences.com">
            https://www.widresidences.com
          </a>
        </p>
      </section>
    </div>
  );
};

export default TermsOfService;
