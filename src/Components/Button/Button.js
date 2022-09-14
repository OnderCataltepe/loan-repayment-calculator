import styles from './Button.module.css';

const Button = ({ text, type, onClick }) => {
  return (
    <button type={type} onClick={onClick || undefined} className={styles.customButton}>
      {text}
    </button>
  );
};

export default Button;
