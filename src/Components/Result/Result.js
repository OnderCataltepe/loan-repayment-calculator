import styles from './Result.module.css';
import { Button, Table } from '../index.js';
import { useContext, useRef } from 'react';
import CalculatorContext from 'contexts/CalculatorContext';
import LangContext from 'contexts/LangContext';

const Result = () => {
  const { isResult, calculatedDatas } = useContext(CalculatorContext);
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
        <p>{calculatedDatas.result.totalRefund}TL</p>
      </div>
      <div>
        <p>{text.result.installment}</p>
        <hr />
        <p>{calculatedDatas.result.installment}TL</p>
      </div>
      <div>
        <p>{text.result.totalFees}</p>
        <hr />
        <p>{calculatedDatas.result.totalTax}TL</p>
      </div>
      <div>
        <Button
          text={text.result.paymentSchedule}
          type="button"
          onClick={() => modalRef.current.portalToggle()}
        />
      </div>
      <Table ref={modalRef} payPlan={calculatedDatas.payPlan} />
    </div>
  );
};

export default Result;
