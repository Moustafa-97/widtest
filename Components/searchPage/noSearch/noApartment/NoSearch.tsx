// NoApartmentsAvailable.tsx
import React from 'react';
import styles from './NoSearch.module.css';

export default function NoSearch() {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>🔎</div>
      <h2 className={styles.message}>Enter seach field</h2>
    </div>
  );
}
