import styles from "./BackAnimations.module.css";
import wave from "../assets/waveGrey.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCoins,
  faTurkishLiraSign,
  faSterlingSign,
  faDollarSign,
  faEuroSign,
} from "@fortawesome/free-solid-svg-icons";
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

      <div className={styles.curvyChild}></div>
      <div className={styles.curvyChildTwo}></div>
      <div className={styles.curvyChildThree}></div>
      <div className={styles.plus}>
        <img alt="wave" src={wave} />
      </div>
    </>
  );
};

export default BackAnimations;
