import styles from './Navbar.module.css';
import { Britain, Turkey } from 'assets';
import { useContext } from 'react';
import LangContext from '../../contexts/LangContext';
const Navbar = () => {
  const { userLanguage, changeLanguage } = useContext(LangContext);

  return (
    <nav className={styles.navbar}>
      <div className={styles.languages}>
        <button onClick={() => changeLanguage(userLanguage === 'tr' ? 'eng' : 'tr')}>
          <img alt="Flag" src={userLanguage === 'tr' ? Britain : Turkey} />
          <p>{userLanguage === 'tr' ? 'English' : 'Türkçe'}</p>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
