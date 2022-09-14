import styles from './BackImages.module.css';
import { Bull } from 'assets';

const BackImages = () => {
  return (
    <div className={styles.bull}>
      <img alt="bull" src={Bull} />
    </div>
  );
};

export default BackImages;
