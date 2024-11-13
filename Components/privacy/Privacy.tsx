import React from "react";
import styles from "./privacy.module.css";

const TermsOfService = () => {
  return (
    <div className={styles.container}>
      <h1>Terms of Service</h1>
      <div className={styles.topP}>
        <p className={styles.p1}>
          Please read these Terms of Service (“Terms”) carefully as they contain
          important information about your legal rights, remedies and
          obligations. By accessing or using the Airbnb Platform, you agree to
          comply with and be bound by these Terms. Please note: Section 19 of
          these Terms contains an arbitration clause and class action waiver
          that applies to all Airbnb Members. If your country of residence is
          the United States, this provision applies to all disputes with Airbnb.
          If your country of residence is outside of the United States, this
          provision applies to any action you bring against Airbnb in the United
          States. It affects how disputes with Airbnb are resolved. By accepting
          these Terms, you agree to be bound by this arbitration clause and
          class action waiver. Please read it carefully.
        </p>
        <p className={styles.p2}>
          Please note: <a href="#section19">Section 19</a> of these Terms
          contains an arbitration clause and class action waiver that applies to
          all Airbnb Members. If your country of residence is the United States,
          this provision applies to all disputes with Airbnb. If your country of
          residence is outside of the United States, this provision applies to
          any action you bring against Airbnb in the United States. It affects
          how disputes with Airbnb are resolved. By accepting these Terms, you
          agree to be bound by this arbitration clause and class action waiver.
          Please read it carefully.
        </p>
      </div>
      <p
        style={{
          color: "var(--lightGreen)",
          margin: "24px auto 32px auto",
          fontSize: "clamp(16px, 4vw, 24px)",
        }}
      >
        Last Updated: January 21, 2019
      </p>
      <div className={styles.lowP}>
        <p className={styles.p3}>
          These Terms constitute a legally binding agreement (“Agreement”)
          between you and Airbnb (as defined below) governing your access to and
          use of the Airbnb website, including any subdomains thereof, and any
          other websites through which Airbnb makes its services available
          (collectively, “Site”), our mobile, tablet and other smart device
          applications, and application program interfaces (collectively,
          “Application”) and all associated services (collectively, “Airbnb
          Services”). The Site, Application and Airbnb Services together are
          hereinafter collectively referred to as the “Airbnb Platform”. Our{" "}
          <a href="#host-guarantee">Host Guarantee Terms</a>,{" "}
          <a href="#japan-host-insurance">Japan Host Insurance Terms</a>,{" "}
          <a href="#guest-refund">Guest Refund Policy</a>,{" "}
          <a href="#nondiscrimination">Nondiscrimination Policy</a> and other{" "}
          <a href="#policies">Policies</a> applicable to your use of the Airbnb
          Platform are incorporated by reference into this Agreement.
        </p>

        <p className={styles.p4}>
          When these Terms mention “Airbnb,” “we,” “us,” or “our,” it refers to
          the Airbnb company you are contracting with. Your contracting entity
          will generally be determined based on your country of residence or
          establishment.
        </p>

        <ul>
          <li className={styles.p4}>
            If your country of residence or establishment is the United States,
            you are contracting with Airbnb, Inc., 888 Brannan Street, 4th
            Floor, San Francisco, CA 94103, United States.
          </li>
          <li className={styles.p4}>
            If your country of residence or establishment is outside of the
            United States, the People’s Republic of China (which for purposes of
            these Terms does not include Hong Kong, Macau and Taiwan)
            (hereinafter “China”), Japan and the European Economic Area, you are
            contracting with Airbnb Ireland UC (“Airbnb Ireland”), The
            Watermarque Building, South Lotts Road, Ringsend, Dublin 4, Ireland.
          </li>
          <li className={styles.p4}>
            If your country of residence or establishment is in the European
            Economic Area or the United Kingdom, you are contracting with Airbnb
            Ireland UC (“Airbnb Ireland”), The Watermarque Building, South Lotts
            Road, Ringsend, Dublin 4, Ireland and your Agreement with Airbnb is
            subject to the{" "}
            <a href="#terms-eu">Terms of Service for European Users</a>.
          </li>
          <li className={styles.p4}>
            If your country of residence or establishment is China, you are
            contracting with Airbnb Internet (Beijing) Co., Ltd. (“Airbnb
            China”) except where you book a Host Service (as defined below) or
            when you create a Listing located outside of China, in which case
            you are contracting with Airbnb Ireland for that transaction.
          </li>
          <li className={styles.p4}>
            If your country of residence or establishment is Japan, you are
            contracting with Airbnb Global Services Limited (“Airbnb GSL”),
            25-28 North Wall Quay, Dublin 1, D01 H104, Ireland, except where you
            book a Host Service (as defined below) or when you create a Listing
            located outside of Japan, in which case you are contracting with
            Airbnb Ireland for that transaction.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TermsOfService;
