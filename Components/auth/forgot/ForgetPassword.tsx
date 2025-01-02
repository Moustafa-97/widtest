"use client";

import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./forget.module.css";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { FaBackward } from "react-icons/fa";
import { BlinkBlur } from "react-loading-indicators";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

const ForgetPassword = () => {
  const locale = useLocale();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const t = useTranslations("forms");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: { email: string }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKENDAPI}/v1/auth/forgot-password`,
        data
      );

      if (response.status === 200) {
        // console.log("OTP sent to email:", response.data);
        router.push(`/${locale}/otp`); // Navigate to OTP input page
      }
    } catch (error) {
      setErrorMessage(t("failedOtp"));
      console.error("Error during password recovery:", error);
    }
  };

  return (
    <div>
      <div className={styles.back}>
        <Link href={`/${locale}/login`}>
          <FaBackward /> Back to Login
        </Link>
      </div>
      <div className={styles.header}>
        <h3>{t("forgotPassword")}</h3>
        <p>{t("forgotPasswordText")}</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.input}>
          <label htmlFor="email">{t("email")}:</label>
          <input id="email" {...register("email")} type="email" />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>

        <button className={styles.button} type="submit" disabled={isSubmitting}>
          {t("sendOtp")}
        </button>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <p className={styles.loginText}>
          {t("dontHaveAccount")}{" "}
          <Link
            href={`/${locale}/register`}
            onWaiting={() => (
              <BlinkBlur
                color={"#47b3c5"}
                size="large"
                text="loading"
                textColor=""
              />
            )}
          >
            {t("register")}
          </Link>
          .
        </p>
      </form>
    </div>
  );
};

export default ForgetPassword;
