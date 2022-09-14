import styles from './BackAnimations.module.css';

import bull from '../assets/bull.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faCoins,
  faTurkishLiraSign,
  faSterlingSign,
  faDollarSign,
  faEuroSign
} from '@fortawesome/free-solid-svg-icons';
const BackAnimations = () => {
  return (
    <>
      <div className={`${styles.money} ${styles.gold}`}>
        <FontAwesomeIcon icon={faCoins} />
      </div>
      <div className={`${styles.money} ${styles.lira}`}>
        <FontAwesomeIcon icon={faTurkishLiraSign} />
      </div>
      <div className={`${styles.money} ${styles.sterling}`}>
        <FontAwesomeIcon icon={faSterlingSign} />
      </div>
      <div className={`${styles.money} ${styles.dollar}`}>
        <FontAwesomeIcon icon={faDollarSign} />
      </div>
      <div className={`${styles.money} ${styles.euro}`}>
        <FontAwesomeIcon icon={faEuroSign} />
      </div>

      <div className={styles.bull}>
        <img alt="bull" src={bull} />
      </div>
    </>
  );
};

export default BackAnimations;
