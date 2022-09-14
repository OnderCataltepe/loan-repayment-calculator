import { createContext, useState } from 'react';
const CalculatorContext = createContext();

export const CalculatorProvider = ({ children }) => {
  const [payPlan, setPayPlan] = useState([]);
  const [isResult, setIsResult] = useState(false);
  const [result, setResult] = useState({
    totalRefund: 0,
    installment: 0,
    totalTax: 0
  });

  const convertTimes = (val) => {
    let type =
      val.compound
        .replace(/Aylık|Monthly/gi, 'm')
        .replace(/Haftalık|Weekly/gi, 'w')
        .replace(/Yıllık|Annual/gi, 'y') +
      val.period
        .replace(/Aylık|Monthly/gi, 'm')
        .replace(/Haftalık|Weekly/gi, 'w')
        .replace(/Yıllık|Annual/gi, 'y');

    switch (type) {
      case 'mm':
      case 'ww':
      case 'yy':
        return 1;
      case 'wm':
        return 4;
      case 'wy':
        return 52;
      case 'mw':
        return 1 / 4;
      case 'my':
        return 12;
      case 'yw':
        return 1 / 52;
      case 'ym':
        return 1 / 12;
      default:
        return null;
    }
  };

  const calculator = (data) => {
    let a = data.amount;
    let n = data.payNumber;
    let t = convertTimes(data);
    let installment;
    let p;
    let b;
    let k;
    let tableArr = [];
    let totalTax = 0;
    if (t < 1) {
      p = (data.rate * t) / 100;
      b = p * (data.bitt / 100);
      k = p * (data.rusf / 100);

      installment =
        (data.amount * (p + b + k) * Math.pow(1 + (p + b + k), n)) /
        (Math.pow(1 + (p + b + k), n) - 1);
    } else {
      p = Math.pow(1 + data.rate / 100, t) - 1;
      b = p * (data.bitt / 100);
      k = p * (data.rusf / 100);
      installment =
        (data.amount * (p + b + k) * Math.pow(1 + p + b + k, n)) / (Math.pow(1 + p + b + k, n) - 1);
    }

    for (let i = 0; i < n; i++) {
      let principal = installment - a * p - a * b - a * k;

      let row = {
        number: i + 1,
        installment: installment.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }),
        principal: principal.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }),
        profit: (a * p).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }),
        bitt: (a * b).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }),
        rusf: (a * k).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }),
        remainingPrinciple: (a - principal).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })
      };
      tableArr.push(row);
      totalTax += a * b + a * k;
      a -= principal;
    }
    setResult({
      totalRefund: (installment * n).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }),
      installment: installment.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }),
      totalTax: totalTax.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
    });
    setPayPlan(tableArr);
  };

  let values = { result, payPlan, calculator, isResult, setIsResult };

  return <CalculatorContext.Provider value={values}>{children}</CalculatorContext.Provider>;
};

export default CalculatorContext;
