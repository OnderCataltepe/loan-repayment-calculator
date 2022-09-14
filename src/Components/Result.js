import { useContext, useRef } from 'react';
import CalculatorContext from '../contexts/CalculatorContext';
import LangContext from '../contexts/LangContext';
import styles from './Result.module.css';
import Table from './Table';
const Result = () => {
  const { result, isResult, payPlan } = useContext(CalculatorContext);
  const { text } = useContext(LangContext);
  const modalRef = useRef();

  if (!isResult) {
    return null;
  }
  return (
    <div className={styles.resultContainer}>
      <div>
        <p>{text.result.totalRefund}</p>
        <hr />
        <p>{result.totalRefund}TL</p>
      </div>
      <div>
        <p>{text.result.installment}</p>
        <hr />
        <p>{result.installment}TL</p>
      </div>
      <div>
        <p>{text.result.totalFees}</p>
        <hr />
        <p>{result.totalTax}TL</p>
      </div>
      <div>
        <button onClick={() => modalRef.current.portalToggle()}>
          {text.result.paymentSchedule}
        </button>
      </div>
      <Table ref={modalRef} payPlan={payPlan} />
    </div>
  );
};

export default Result;
