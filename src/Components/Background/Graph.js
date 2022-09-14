import styles from './Graph.module.css';

const Graph = () => {
  return (
    <div className={styles.logoHolder}>
      <div className={styles.bg}></div>
      <div className={styles.bar}></div>
      <div className={`${styles.bar} ${styles.fill1}`}></div>
      <div className={`${styles.bar} ${styles.fill2}`}></div>
      <div className={`${styles.bar} ${styles.fill3}`}></div>
      <div className={`${styles.bar} ${styles.fill4}`}></div>
      <div className={`${styles.bar} ${styles.fill5}`}></div>
      <div className={`${styles.bar} ${styles.fill6}`}></div>
      <div className={`${styles.bar} ${styles.fill7}`}></div>
      <div className={`${styles.bar} ${styles.fill8}`}></div>
    </div>
  );
};

export default Graph;
