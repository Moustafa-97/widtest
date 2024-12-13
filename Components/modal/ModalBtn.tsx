/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./modalBtn.module.css";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ApiButtonProps {
  endpoint?: string;
  data?: any;
  text: string;
  width?: string;
  locale?: string | null;
  policy?: string;
}

const ModalButton = ({ endpoint, text, policy }: ApiButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const token = localStorage.getItem("token");

  const handleClick = async () => {
    setShowModal(true);
  };
  const handleConfirm = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKENDAPI}${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );


      const result = await res.json();
      if (result) {
        setResponse(result);
        setShowModal(false);
        toast(`${response.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setTimeout(() => {
          
          window.location.reload();
        }, 5000);
      }
    } catch (error) {
      console.error("API request failed:", error);
      toast(`Error happened, please contact customer support`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setTimeout(() => {
          
        window.location.reload();
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  // Close modal when clicking outside of it
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  return (
    <>
      {/* {token && token ? ( */}
      <>
        <div>
          <button onClick={handleClick} className={styles.button}>
            {`${text}`}
          </button>
        </div>

        {/* Modal */}
        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal} ref={modalRef}>
              <h2>Are you sure</h2>
              <p>you want to cancel this booking?</p>
              <p style={{ color: "red", fontWeight: "bold", fontSize: "12px" }}>{policy}</p>
              <div className={styles.modalButtons}>
                <div onClick={handleConfirm} className={styles.yes}>
                  {loading ? "..." : "yes"}
                </div>
                <div onClick={() => setShowModal(false)} className={styles.no}>
                  No
                </div>
              </div>
            </div>
          </div>
        )}
      </>
      {/* ) : (
        <div>
          <Link href={`/${locale}/login`} className={styles.link}>
            <p>Please Login</p>
          </Link>
        </div>
      )} */}
    </>
  );
};

export default ModalButton;
