import styles from './Table.module.css';
import { forwardRef, useImperativeHandle, useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import LangContext from '../contexts/LangContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
const Table = forwardRef((props, ref) => {
  const { text } = useContext(LangContext);

  const [isPortalOpen, setIsPortalOpen] = useState(false);

  const portalToggle = () => {
    setIsPortalOpen((prev) => !prev);
  };
  useImperativeHandle(ref, () => ({
    portalToggle
  }));
  if (!isPortalOpen) {
    return null;
  }
  return ReactDOM.createPortal(
    <div className={styles.bgContainer}>
      <div className={styles.cardContainer}>
        <div className={styles.buttonContainer}>
          <button onClick={portalToggle}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <div className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                <th>{text.table.paymentNumber}</th>
                <th>{text.table.installment}</th>
                <th>{text.table.principle}</th>
                <th>{text.table.remainingPrinciple}</th>
                <th>{text.table.profitAmount}</th>
                <th>{text.table.rusf}</th>
                <th>{text.table.bitt}</th>
              </tr>
            </thead>
            <tbody>
              {props.payPlan.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.number}</td>
                    <td>{item.installment} TL</td>
                    <td>{item.principal} TL</td>
                    <td>{item.remainingPrinciple} TL</td>
                    <td>{item.profit} TL</td>
                    <td>{item.rusf} TL</td>
                    <td>{item.bitt} TL</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>,
    document.body
  );
});

Table.displayName = 'Table';
export default Table;
