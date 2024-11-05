import React from "react";
import styles from "./middleabout.module.css";
import { getTranslations } from "next-intl/server";

export default async function MiddleAbout() {
  const t = getTranslations("About");
  return (
    <>
      <section className={styles.middleSection}>
        <section className={styles.subMiddle}>
          <div className={styles.headContainer}>
            <h6>{(await t)("whyUs")}</h6>
          </div>
          <div className={styles.descContainer}>
            <h5>{(await t)("enjoy")}</h5>
            <p>
              {(await t)("services")}
            </p>
          </div>
          <div className={styles.cardsContainer}>
            <div className={styles.cardS}>
              <div className={styles.cardSContent}>
                <div className={styles.cardIcon}>
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_950_4924)">
                      <path
                        d="M28.1899 2.15827C22.7756 2.86166 17.8184 4.93669 13.4823 8.28955C12.1111 9.35637 9.77898 11.6541 8.64222 13.0609C5.4077 17.0703 3.26308 21.8065 2.34897 26.9648C2.02083 28.7936 1.89192 33.1898 2.10287 35.1945C2.6068 39.8721 4.23577 44.4559 6.76713 48.3481C7.91562 50.1066 8.92348 51.3609 10.4939 52.967C15.4042 58.0081 21.6037 61.0561 28.6587 61.8767C30.2291 62.0643 34.0496 62.0292 35.7489 61.8299C44.468 60.7513 52.2847 55.8627 57.1482 48.4653C59.6796 44.6083 61.25 40.3176 61.8242 35.7455C62.0586 33.8463 62.0586 30.1535 61.8242 28.2426C60.746 19.5439 55.8474 11.6893 48.4643 6.83586C44.6086 4.30363 40.3194 2.73271 35.7489 2.15827C33.9675 1.94725 29.8775 1.94725 28.1899 2.15827ZM34.2371 9.02812C37.8935 9.39154 41.7726 10.7749 44.7141 12.7561L45.7688 13.4595L45.804 12.3575L45.8391 11.2438H47.5267H49.226V12.5568C49.226 13.2837 49.2612 15.0187 49.308 16.4138L49.3784 18.9343L45.511 19.286L41.6436 19.626L41.503 17.9964C41.3389 16.1324 41.3155 16.1793 42.253 16.1559C42.5812 16.1442 42.9914 16.109 43.1906 16.0621C43.5304 15.9918 43.5304 15.98 42.6632 15.429C36.5223 11.4666 28.4946 11.2907 22.1428 14.9484C20.7599 15.7456 19.4591 16.7538 18.17 17.9964L17.0332 19.0984L15.791 18.0316L14.537 16.9648L14.9003 16.5076C15.3808 15.898 17.0332 14.3974 18.1465 13.5533C22.717 10.1067 28.5884 8.45368 34.2371 9.02812ZM42.2648 24.9835C42.0538 25.5814 40.7764 29.2274 39.4287 33.0726L36.9794 40.0831H35.5848C34.3191 40.0831 34.2019 40.0714 34.284 39.8721C34.4363 39.4735 39.8506 23.987 39.8506 23.9519C39.8506 23.9284 40.4834 23.905 41.2569 23.905H42.6632L42.2648 24.9835ZM18.3106 26.4607C19.5294 26.8944 20.3732 27.6799 20.7248 28.6998C20.924 29.2743 20.8888 30.5638 20.6545 31.15C20.3263 31.9823 19.5411 32.9202 18.0528 34.2684C17.2793 34.9835 16.6465 35.5931 16.6465 35.6517C16.6465 35.6986 17.6778 35.7455 18.9317 35.7455H21.217V37.0351V38.3246H16.5879H11.9588L11.9705 37.293V36.2731L14.537 33.8815C17.1738 31.4313 17.584 30.939 17.584 30.1418C17.584 29.2391 17.0684 28.8288 15.9433 28.8288C15.1581 28.8288 14.6776 29.0163 14.1151 29.5439L13.7635 29.8839L12.5682 29.2274L11.3728 28.5709L11.6072 28.2426C12.2869 27.293 13.6815 26.4841 15.123 26.2028C15.7792 26.0738 17.6543 26.2262 18.3106 26.4607ZM31.1784 26.4255C31.1784 26.4841 26.7719 32.8616 26.4555 33.2485C26.3735 33.3657 26.6196 33.4009 27.6509 33.4009H28.9517V32.4044V31.4079H30.5338H32.1159V32.4044V33.4009H32.9948H33.8738V34.6904V35.98H32.9948H32.1159V37.1523V38.3246H30.4752H28.8345V37.1523V35.98H25.6703H22.5061V34.9366V33.905L25.2132 30.1301L27.9087 26.3669H29.5494C30.44 26.3669 31.1784 26.3903 31.1784 26.4255ZM52.6246 27.4454L52.6129 28.5357L50.5268 33.4009L48.4408 38.266L46.6595 38.3012C45.6868 38.3129 44.8899 38.3012 44.8899 38.266C44.8899 38.2426 45.7923 36.1441 46.8822 33.6236C47.9838 31.1031 48.8744 29.0163 48.8744 28.9929C48.8744 28.9695 48.1361 28.946 47.2337 28.946H45.593V29.8839V30.8217H44.1867H42.7804V28.5943V26.3669H47.7025H52.6246V27.4454ZM22.4827 47.715C22.4006 47.7736 22.0725 47.8205 21.7443 47.8322C21.4279 47.844 21.006 47.8791 20.8068 47.926C20.4669 47.9964 20.4669 48.0081 21.3342 48.5591C27.4751 52.5216 35.5028 52.6974 41.8546 49.0397C43.2375 48.2426 44.5383 47.2343 45.8274 45.9917L46.9642 44.8897L48.2064 45.9565L49.4604 47.0351L49.0737 47.5157C48.3588 48.3832 46.261 50.1652 44.8313 51.1382C39.6631 54.6083 33.4167 55.8392 27.3696 54.5966C24.7093 54.0573 21.4748 52.7091 19.2833 51.232L18.2286 50.5286L18.1934 51.6306L18.1583 52.7443H16.4707H14.7714V51.4196C14.7714 50.7044 14.7362 48.9694 14.6894 47.586L14.619 45.0538L18.4747 44.7138L22.3303 44.3621L22.4827 45.9917C22.6233 47.3516 22.6233 47.6329 22.4827 47.715Z"
                        fill="url(#paint0_linear_950_4924)"
                      />
                    </g>
                    <defs>
                      <linearGradient
                        id="paint0_linear_950_4924"
                        x1="32"
                        y1="2"
                        x2="32"
                        y2="62"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#4F8F92" />
                        <stop offset="1" stop-color="#014751" />
                      </linearGradient>
                      <clipPath id="clip0_950_4924">
                        <rect width="64" height="64" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <h6 className={styles.cardH6}>{(await t)("customerSupport")}</h6>
                <p className={styles.cardPara}>
                  {(await t)("customerSupportText")}
                </p>
              </div>
            </div>
            <div className={styles.cardM}>
              {/* -------------- */}
              <div className={styles.cardIcon}>
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M31.3633 0.112305C30.5758 0.362305 30.3883 0.637304 29.1133 3.1748C28.4133 4.5498 27.8258 5.6998 27.8133 5.7248C27.7883 5.7498 26.6008 5.9373 25.1758 6.1373C23.7383 6.3498 22.3508 6.5998 22.0758 6.7248C21.2258 7.0873 20.7383 8.1623 21.0008 9.1123C21.1133 9.5498 21.4883 9.9873 23.2008 11.6623L25.2758 13.6873L24.8258 16.2623C24.5758 17.6748 24.3758 19.0248 24.3758 19.2623C24.3758 19.4998 24.5008 19.9123 24.6633 20.1748C25.0258 20.8373 25.6383 21.1748 26.4383 21.1748C26.9883 21.1748 27.3383 21.0248 29.4758 19.8998C30.8008 19.1998 31.9383 18.6248 32.0008 18.6248C32.0633 18.6248 33.2008 19.1998 34.5258 19.8998C36.6633 21.0248 37.0133 21.1748 37.5633 21.1748C38.6758 21.1748 39.4758 20.4873 39.5883 19.4623C39.6258 19.1623 39.4508 17.8123 39.1883 16.3123L38.7258 13.6873L40.8008 11.6623C42.5133 9.9748 42.8883 9.5623 43.0008 9.1248C43.2633 8.1623 42.7883 7.0873 41.9258 6.7123C41.6508 6.5998 40.2633 6.3373 38.8383 6.1373C37.4008 5.9373 36.2133 5.7498 36.1883 5.7248C36.1758 5.6998 35.5883 4.5498 34.8883 3.1623C33.8508 1.08731 33.5508 0.599804 33.2008 0.387304C32.7258 0.0873051 31.8383 -0.0376949 31.3633 0.112305Z"
                    fill="white"
                  />
                  <path
                    d="M9.93743 6.14978C9.48743 6.41228 9.32493 6.68728 8.12493 9.06228L6.81243 11.6873L3.99993 12.0998C0.987432 12.5248 0.812432 12.5873 0.274932 13.3748C-0.0875676 13.9248 -0.112568 15.0248 0.249932 15.5623C0.387432 15.7623 1.34993 16.7498 2.38743 17.7498L4.28743 19.5623L3.82493 22.2498C3.57493 23.7248 3.37493 25.0623 3.37493 25.2248C3.37493 25.6748 3.82493 26.4498 4.27493 26.7748C4.59993 26.9998 4.84993 27.0623 5.43743 27.0623C6.14993 27.0623 6.31243 26.9873 8.58743 25.7748L10.9999 24.4873L13.5749 25.8248C16.0249 27.0998 16.1749 27.1498 16.7749 27.0998C17.8124 26.9998 18.6249 26.1623 18.6249 25.1998C18.6249 24.9123 18.4249 23.5373 18.1874 22.1373L17.7499 19.5873L19.7124 17.6998C22.1749 15.3248 22.4624 14.7748 21.8624 13.5498C21.4374 12.6623 21.0999 12.5373 17.9874 12.0873L15.2249 11.6873L13.9249 9.11228C12.4624 6.17478 12.2874 5.97478 11.1374 5.91228C10.5874 5.87478 10.3374 5.92478 9.93743 6.14978Z"
                    fill="white"
                  />
                  <path
                    d="M52.0628 6.14993C51.4753 6.47494 51.1628 6.94994 50.0003 9.24994L48.7753 11.6874L46.0128 12.0874C42.9003 12.5374 42.5628 12.6624 42.1378 13.5499C41.5378 14.7749 41.8253 15.3249 44.3003 17.6999L46.2503 19.5749L45.8128 22.1374C45.5753 23.5374 45.3753 24.9124 45.3753 25.1999C45.3753 26.1624 46.1878 26.9999 47.2253 27.0999C47.8253 27.1499 47.9753 27.0999 50.4253 25.8249L53.0003 24.4874L55.4128 25.7624C58.0628 27.1624 58.6003 27.3249 59.4253 26.9374C60.0003 26.6624 60.4878 26.0374 60.5878 25.4624C60.6253 25.2249 60.4503 23.8874 60.1878 22.2999L59.7128 19.5624L61.6128 17.7499C62.6503 16.7499 63.6128 15.7624 63.7503 15.5624C64.1128 15.0249 64.0878 13.9249 63.7253 13.3749C63.1753 12.5749 63.0003 12.5249 60.0003 12.0874L57.1878 11.6874L56.0003 9.28744C54.7628 6.79994 54.5378 6.46243 53.9753 6.17494C53.5753 5.96243 52.4128 5.94994 52.0628 6.14993Z"
                    fill="white"
                  />
                  <path
                    d="M10.1 30.2374C8.2875 30.8249 6.7375 32.4124 6.2 34.2374C6.025 34.8374 6 36.0749 6 43.9999C6 51.9249 6.025 53.1624 6.2 53.7624C6.7375 55.6124 8.3 57.1874 10.1375 57.7624C10.85 57.9874 11.375 57.9999 17.975 57.9999H25.0625L27.875 60.8249C29.425 62.3749 30.8375 63.7249 31.025 63.8249C31.4625 64.0499 32.5375 64.0499 32.975 63.8249C33.1625 63.7249 34.575 62.3749 36.125 60.8249L38.9375 57.9999H46.025C52.625 57.9999 53.15 57.9874 53.8625 57.7624C55.7 57.1874 57.2625 55.6124 57.8 53.7624C57.975 53.1624 58 51.9249 58 43.9999C58 36.0749 57.975 34.8374 57.8 34.2374C57.2625 32.3874 55.7 30.8124 53.8625 30.2374C53.125 30.0124 52.375 29.9999 31.9625 30.0124C11.8 30.0124 10.775 30.0249 10.1 30.2374ZM48.875 38.3249C50.2125 39.1124 50.2125 40.8874 48.875 41.6749C48.4375 41.9374 48.3625 41.9374 32 41.9374C15.6375 41.9374 15.5625 41.9374 15.125 41.6749C13.55 40.7624 13.8875 38.5499 15.6625 38.1249C15.875 38.0624 23.35 38.0374 32.25 38.0374C48.3375 38.0624 48.4375 38.0624 48.875 38.3249ZM48.875 46.3249C50.2125 47.1124 50.2125 48.8874 48.875 49.6749C48.4375 49.9374 48.3625 49.9374 32 49.9374C15.6375 49.9374 15.5625 49.9374 15.125 49.6749C13.55 48.7624 13.8875 46.5499 15.6625 46.1249C15.875 46.0624 23.35 46.0374 32.25 46.0374C48.3375 46.0624 48.4375 46.0624 48.875 46.3249Z"
                    fill="white"
                  />
                </svg>
              </div>
              <h6 className={styles.cardH6}>{(await t)("trusted")}</h6>
              <p className={styles.cardPara}>
                {(await t)("trustedText")}
              </p>
              {/* --------- */}
            </div>
            <div className={styles.cardE}>
              <div className={styles.cardEContent}>
                <div className={styles.cardIcon}>
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_950_4962)">
                      <path
                        d="M29.0489 2.04124C23.0534 2.75646 18.3837 4.59727 13.6788 8.10303C12.2239 9.19345 9.13819 12.2771 8.05876 13.731C4.83222 18.0575 2.97843 22.5013 2.15713 27.883C1.92247 29.4307 1.95767 34.8828 2.2158 36.4657C3.28349 43.1137 6.31056 48.9762 10.992 53.502C15.5678 57.9223 20.7303 60.537 27.0543 61.6509C28.8963 61.9792 33.0498 62.1081 35.0561 61.8971C46.9297 60.6777 56.8792 52.6226 60.622 41.2143C61.1382 39.6549 61.7014 37.005 61.9126 35.1642C62.0886 33.5344 61.983 28.9148 61.7366 27.414C60.4577 19.9218 57.0787 13.9069 51.4117 9.05275C47.2935 5.51182 42.1662 3.15511 36.6166 2.25229C35.4902 2.07641 30.0813 1.92399 29.0489 2.04124ZM32.7212 13.7427C32.9324 13.8248 34.094 14.9152 35.3142 16.1698C37.5669 18.4796 41.474 22.4426 47.9505 29.0086C49.9333 31.0136 51.6464 32.8309 51.7519 33.042C51.8927 33.3117 51.9397 33.6048 51.9045 33.98C51.7637 35.3518 50.3675 36.0905 49.112 35.4456C48.9478 35.3635 47.974 34.4255 46.9532 33.382C39.233 25.456 33.0498 19.2652 32.7212 19.1362C32.2402 18.9252 31.6066 18.9252 31.1256 19.1362C30.7971 19.2652 23.7808 26.3001 17.1283 33.1475C16.1662 34.1441 15.1689 35.1056 14.9225 35.2815C14.1364 35.8677 12.9279 35.6801 12.3647 34.8828C12.0362 34.4255 11.9541 33.5462 12.1887 33.0889C12.4117 32.6785 12.3882 32.702 20.4839 24.4828C24.0037 20.9067 27.77 17.0726 28.8611 15.9587C29.9405 14.8566 30.9965 13.8717 31.196 13.7662C31.6653 13.5434 32.2285 13.5317 32.7212 13.7427ZM37.1211 26.8512C39.761 29.5128 42.8819 32.6668 44.0552 33.8627L46.1788 36.0319V42.9261V49.8204L45.8855 50.1018L45.6039 50.3949H40.9577H36.2998L35.9595 50.0549L35.6193 49.7149V45.7049V41.7067L35.3259 41.4253L35.0443 41.1322H31.9821H28.9198L28.6382 41.4253L28.3449 41.7067V45.6346C28.3449 49.7852 28.3214 50.0314 27.7934 50.2659C27.6057 50.348 26.0452 50.3949 22.936 50.3949H18.3602L18.0786 50.1018L17.7853 49.8204V42.8792V35.9498L21.3404 32.3619C31.9821 21.575 31.5362 22.0205 31.9351 22.0205C32.2754 22.0205 32.7682 22.4778 37.1211 26.8512Z"
                        fill="url(#paint0_linear_950_4962)"
                      />
                    </g>
                    <defs>
                      <linearGradient
                        id="paint0_linear_950_4962"
                        x1="32"
                        y1="62"
                        x2="32"
                        y2="2"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#014751" />
                        <stop offset="1" stop-color="#4F8F92" />
                      </linearGradient>
                      <clipPath id="clip0_950_4962">
                        <rect width="64" height="64" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <h6 className={styles.cardH6}>{(await t)("exceptional")}</h6>
                <p className={styles.cardPara}>
                  {(await t)("exceptionalText")}
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
