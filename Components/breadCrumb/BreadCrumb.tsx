"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { useEffect, useState } from "react";
import styles from "./breadcrumb.module.css";

const Breadcrumb: React.FC = () => {
  const router = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; 
  }
  const pathParts = router.split("/").filter(Boolean); 
  const formatPart = (part: string) => {

    if (part.length > 10 && !isNaN(Number(part[0])) === false) {
      return "Apartment"; 
    }
    return part.charAt(0).toUpperCase() + part.slice(1);
  };
  const currentLocation = pathParts.length
    ? formatPart(pathParts[pathParts.length - 1])
    : "Home";
  return (
    <nav
      aria-label="breadcrumb"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        listStyle: "none",
        padding: 0,
        margin: 0,
        width: "100vw",
        marginTop:"10vh"
      }}
    >
      <h2 className={styles.title}>{currentLocation}</h2>
      <ul className={styles.breadcrumbUl}>
        {pathParts.map((part, index) => {
          const href = `/${pathParts.slice(0, index + 1).join("/")}`;

          return (
            <li key={index} className={styles.breadcrumbLi}>
              {index === 0 && <FaHome style={{ color: "white" }} />}
              <Link href={href} passHref className={styles.breadcrumbLink}>
                {index === 0 ? "Home" : formatPart(part)}
              </Link>
              {index < pathParts.length - 1 && (
                <span style={{ margin: "0 5px", color: "white" }}>/</span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
