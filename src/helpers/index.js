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

// p is stands for profit rate. Similarly, b --> bitt, k--> rusf

export const calculator = (data) => {
  let a = data.amount;
  let n = data.payNumber;
  let t = convertTimes(data);
  let installment;
  let p;
  let b;
  let k;
  let tableArr = [];
  let totalTax = 0;
  let results = {};
  let result = {};

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
  result = {
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
  };

  results = { payPlan: tableArr, result: result };
  return results;
};

export const weeks = Array(520)
  .fill(1)
  .map((n, i) => n + i);
export const months = Array(120)
  .fill(1)
  .map((n, i) => n + i);
export const years = Array(12)
  .fill(1)
  .map((n, i) => n + i);
