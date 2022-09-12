import { useContext, useEffect, useRef } from "react";
import CalculatorContext from "../contexts/CalculatorContext";
import styles from "./Result.module.css";
import Table from "./Table";
const Result = () => {
  const { result, isResult } = useContext(CalculatorContext);

  const modalRef = useRef();
  useEffect(() => {
    console.log(result);
  }, []);
  if (!isResult) {
    return null;
  }
  return (
    <div className={styles.resultContainer}>
      <div>
        <p>Total Refund:</p>
        <hr />
        <p>{result.totalRefund}TL</p>
      </div>
      <div>
        <p>Installment:</p>
        <hr />

        <p>{result.installment}TL</p>
      </div>
      <div>
        <p>Total Fees:</p>
        <hr />

        <p>{result.totalTax}TL</p>
      </div>
      <div>
        <button onClick={() => modalRef.current.portalToggle()}>
          Payment Schedule
        </button>
      </div>
      <Table ref={modalRef} />
    </div>
  );
};

export default Result;
