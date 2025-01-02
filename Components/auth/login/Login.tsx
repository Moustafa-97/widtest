"use client";

import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import styles from "./login.module.css";
import Link from "next/link";
import { BlinkBlur } from "react-loading-indicators";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const locale = useLocale();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  // const [resData, setResData] = useState(null);
  const t = useTranslations("forms");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKENDAPI}/v1/auth/login`,
        data,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        // setResData(response.data);
        localStorage.setItem("token", response.data.token);
        router.push(`/${locale}`);
      }
    } catch (error) {
      setErrorMessage(t("loginError"));
      console.error("Error during login:", error);
    }
  };

  return (
    <div>
      <div className={styles.header}>
        <p>{t("loginTitle")}</p>
        <h3>{t("welcome")}</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.input}>
          <label htmlFor="email">{t("email")}</label>
          <input id="email" {...register("email")} type="email" />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>

        <div className={styles.input}>
          <label htmlFor="password">{t("password")}</label>
          <input id="password" {...register("password")} type="password" />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>

        <p className={styles.termsText}>
          <Link href={`/${locale}/forgetPassword`}> {t("forgetPassword")}</Link>
        </p>

        <button className={styles.button} type="submit" disabled={isSubmitting}>
          {t("login")}
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

export default Login;
