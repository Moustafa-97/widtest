/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import axios from "axios";
import styles from "./account.module.css";
import { useTranslations } from "next-intl";

export default function Account({
  account,
  token,
}: {
  account:
    | {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
      }
    | any;
  token: string | any;
}) {
  const [isEditing, setIsEditing] = useState({
    email: false,
    name: false,
    phoneNumber: false,
  });

  const [formData, setFormData] = useState({
    email: account?.email,
    firstName: account?.firstName,
    lastName: account?.lastName,
    phoneNumber: account?.phoneNumber,
  });

  const handleEditClick = (field: string) => {
    setIsEditing({
      ...isEditing,
      [field]: !isEditing[field as keyof typeof isEditing],
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (field: string, edited: string) => {

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKENDAPI}/v1/user/update-profileInfo`,
        {
          [field]: formData[field as keyof typeof formData],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setIsEditing({ ...isEditing, [edited]: false });
        alert("Updated successfully");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      // alert("Error updating account");
    }
  };
const t = useTranslations("profile")
  return (
    <>
      <section className={styles.accountSection}>
        {/* Email */}
        <div className={styles.field}>
          {isEditing.email ? (
            <>
              <label>
                <p>{t("email")}</p>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                />
              </label>
              <div className={styles.editBtns}>
                <button
                  className={styles.saveButton}
                  onClick={() => handleSubmit("email", "email")}
                >
                  {t("save")}
                </button>
                <button
                  className={styles.saveButton}
                  onClick={() => handleEditClick("email")}
                >
                  {t("cancel")}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className={styles.detail}>
                <p>{t("email")}</p>
                <span>{account.email}</span>
              </div>
              <button
                className={styles.editButton}
                onClick={() => handleEditClick("email")}
              >
                {t("edit")}
              </button>
            </>
          )}
        </div>

        {/* Name (First + Last) */}
        <div className={styles.field}>
          {isEditing.name ? (
            <>
              <div>
                <label>
                  <p>{t("name")}</p>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={styles.input}
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </label>
              </div>

              <div className={styles.editBtns}>
                <button
                  className={styles.saveButton}
                  onClick={() => {
                    handleSubmit("firstName", "name");
                    handleSubmit("lastName", "name");
                  }}
                >
                  {t("save")}
                </button>
                <button
                  className={styles.saveButton}
                  onClick={() => handleEditClick("name")}
                >
                  {t("cancel")}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className={styles.detail}>
                <p>{t("name")}</p>
                <span>
                  {account.firstName} {account.lastName}
                </span>
              </div>
              <button
                className={styles.editButton}
                onClick={() => handleEditClick("name")}
              >
                {t("edit")}
              </button>
            </>
          )}
        </div>

        {/* Phone Number */}
        {/* <div className={styles.field}>
          {isEditing.phoneNumber ? (
            <>
              <label>
                <p>Phone Number</p>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={styles.input}
                />
              </label>
              <div className={styles.editBtns}>
                <button
                  className={styles.saveButton}
                  onClick={() => handleSubmit("phoneNumber", "phoneNumber")}
                >
                  Save
                </button>
                <button
                  className={styles.saveButton}
                  onClick={() => handleEditClick("phoneNumber")}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div className={styles.detail}>
                <p>Phone Number</p>
                <span>{account.phoneNumber}</span>
              </div>

              <button
                className={styles.editButton}
                onClick={() => handleEditClick("phoneNumber")}
              >
                Edit
              </button>
            </>
          )}
        </div> */}
      </section>
    </>
  );
}
