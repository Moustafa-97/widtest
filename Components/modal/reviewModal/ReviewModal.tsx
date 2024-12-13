/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "../modalBtn.module.css";
import style from "./reviewModal.module.css";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ApiButtonProps {
  method?: "POST" | "GET" | "DELETE";
  endpoint?: string;
  data?: any;
  text: string;
  width: string;
  locale: string | undefined;
  id?: string | any;
}
type History = [
  {
    Apartment: {
      id: string;
    };
  }
];

const ReviewModal = ({ endpoint, text, locale, id }: ApiButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  console.log("response", response);

  const [showModal, setShowModal] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<History | null>();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      return;
    }
    try {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BACKENDAPI}/v1/user/get-bookings-history?locale=${locale}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          setHistory(res.data);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const isHistory = history?.filter((item: any) => item?.Apartment?.id === id);

  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKENDAPI}${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ review, rating }),
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
      }
    } catch (error) {
      console.error("API request failed:", error);
      toast(`error`, {
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
    } finally {
      setLoading(false);
    }
  };

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
      {isHistory && isHistory.length > 0 ? (
        <div>
          <button
            onClick={() => {
              setShowModal(true);
            }}
            className={styles.button}
          >
            {loading ? "..." : `${text}`}
          </button>
        </div>
      ) : null}
      {/* Modal */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal} ref={modalRef}>
            <h2>Leave your review!</h2>
            <form onSubmit={handleClick}>
              <textarea
                className={style.textArea}
                name="review"
                id="review"
                cols={50}
                rows={10}
                placeholder="Write your review here..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
              ></textarea>
              <div className={style.rating}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={
                      rating >= star ? style.starFilled : style.starEmpty
                    }
                    onClick={() => setRating(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
              <button className={style.button} type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewModal;
