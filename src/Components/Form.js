import styles from './Form.module.css';
//Hooks
import { useEffect, useState, useContext } from 'react';
import LangContext from '../contexts/LangContext';
import CalculatorContext from '../contexts/CalculatorContext';

//Fontawesome and Lottie
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTurkishLiraSign, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import Lottie from 'lottie-react';
import illust from '../assets/illust1.json';
//Yup and Formik
import { useFormik } from 'formik';
import * as yup from 'yup';

const weeks = Array(520)
  .fill(1)
  .map((n, i) => n + i);
const months = Array(120)
  .fill(1)
  .map((n, i) => n + i);
const years = Array(12)
  .fill(1)
  .map((n, i) => n + i);

const Form = () => {
  const { text, userLanguage } = useContext(LangContext);
  const { calculator, setIsResult } = useContext(CalculatorContext);
  //States
  const [isPerDrop, setIsPerDrop] = useState(false);
  const [isTermDrop, setIsTermDrop] = useState(false);
  const [isComDrop, setIsComDrop] = useState(false);
  const [terms, setTerms] = useState(months);

  //Formik, Yup and Error States
  const schema = yup.object().shape({
    loanAmount: yup
      .number()
      .required(text.form.errors.required)
      .min(1000, text.form.errors.loanMin),

    pRate: yup
      .number()
      .required(text.form.errors.required)
      .min(0.01, text.form.errors.profitMin)
      .max(99.99, text.form.errors.profitMax)
  });
  const formik = useFormik({
    initialValues: {
      loanAmount: '',
      comValue: text.form.monthly,
      pRate: '',
      bsmv: 15,
      kkdf: 10,
      perValue: text.form.monthly,
      termValue: 12
    },

    onSubmit: (values) => {
      const val = {
        amount: values.loanAmount,
        compound: values.comValue,
        bitt: values.bsmv,
        rusf: values.kkdf,
        rate: values.pRate,
        period: values.perValue,
        payNumber: values.termValue
      };
      calculator(val);
      setIsResult(true);
    },
    validationSchema: schema
  });
  const loanError = formik.errors.loanAmount && formik.touched.loanAmount ? 'error' : null;
  const pRateError = formik.errors.pRate && formik.touched.pRate ? 'error' : null;

  //Validations when user typing
  const amountValidation = (e) => {
    const re = /^[0-9]*$/;
    if (!re.test(e.key) || e.target.value.length > 8) {
      e.preventDefault();
    }
  };
  const pRateValidation = (e) => {
    const re = /^[0-9,]+$/;
    if (!re.test(e.key) || e.target.value.length > 4) {
      e.preventDefault();
    }
  };

  //Dropdown functions
  const firstdropDownToggle = () => {
    setIsPerDrop((prev) => !prev);
  };
  const secondDropDownToggle = () => {
    setIsTermDrop((prev) => !prev);
  };
  const thirdDropDownToggle = () => {
    setIsComDrop((prev) => !prev);
  };
  const closeDrop = () => {
    if (isPerDrop) {
      setTimeout(() => {
        setIsPerDrop(false);
      }, 100);
    }
    if (isTermDrop) {
      setTimeout(() => {
        setIsTermDrop(false);
      }, 100);
    }
    if (isComDrop) {
      setTimeout(() => {
        setIsComDrop(false);
      }, 100);
    }
  };

  useEffect(() => {
    if (formik.values.perValue === text.form.monthly) {
      setTerms(months);
    }
    if (formik.values.perValue === text.form.weekly) {
      setTerms(weeks);
    }
    if (formik.values.perValue === text.form.annual) {
      setTerms(years);
    }
    formik.setFieldValue('termValue', 12);
  }, [formik.values.perValue]);

  useEffect(() => {
    formik.setFieldValue('comValue', text.form.monthly);
    formik.setFieldValue('perValue', text.form.monthly);
  }, [userLanguage]);

  return (
    <div className={styles.formContainer} onClick={closeDrop}>
      <h1>{text.form.title}</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.firstContainer}>
          <div className={styles.animInputs}>
            <input
              name="loanAmount"
              type="number"
              onKeyPress={amountValidation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.loanAmount}
              className={styles[loanError]}
              required
            />
            <label htmlFor="loanAmount">{text.form.loanAmount}</label>
            <span>
              <FontAwesomeIcon icon={faTurkishLiraSign} />
            </span>
            {formik.errors.loanAmount && formik.touched.loanAmount && (
              <p className={styles[loanError]}>{formik.errors.loanAmount}</p>
            )}{' '}
          </div>
          <div className={styles.animInputs}>
            <input
              id="compounding"
              name="compounding"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.comValue}
              onClick={thirdDropDownToggle}
              autoComplete="off"
            />
            <label htmlFor="compounding">{text.form.profitFreq}</label>
            <span>
              <FontAwesomeIcon icon={isComDrop ? faCaretUp : faCaretDown} />{' '}
            </span>

            {isComDrop && (
              <div className={styles.dropdown}>
                <input
                  type="radio"
                  id="com-one"
                  name="comValue"
                  value={text.form.weekly}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                <label htmlFor="com-one">{text.form.weekly}</label>
                <input
                  type="radio"
                  id="com-two"
                  name="comValue"
                  value={text.form.monthly}
                  onChange={formik.handleChange}
                />
                <label htmlFor="com-two">{text.form.monthly}</label>
                <input
                  type="radio"
                  id="com-three"
                  name="comValue"
                  value={text.form.annual}
                  onChange={formik.handleChange}
                />
                <label htmlFor="com-three">{text.form.annual}</label>
              </div>
            )}
          </div>
          <div className={styles.animInputs}>
            <input
              name="pRate"
              type="number"
              step="0.01"
              onKeyPress={pRateValidation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.pRate}
              className={styles[pRateError]}
              required
            />
            <label htmlFor="pRate">{text.form.profitRate}</label>
            <span>%</span>
            {formik.errors.pRate && formik.touched.pRate && (
              <p className={styles[pRateError]}>{formik.errors.pRate}</p>
            )}{' '}
          </div>
          <div className={styles.animInputs}>
            <input
              id="per"
              name="per"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.perValue}
              onClick={firstdropDownToggle}
              autoComplete="off"
            />
            <label htmlFor="per">{text.form.payFreq}</label>
            <span>
              <FontAwesomeIcon icon={isPerDrop ? faCaretUp : faCaretDown} />{' '}
            </span>

            {isPerDrop && (
              <div className={styles.dropdown}>
                <input
                  type="radio"
                  id="option-one"
                  name="perValue"
                  value={text.form.weekly}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                <label htmlFor="option-one">{text.form.weekly}</label>
                <input
                  type="radio"
                  id="option-two"
                  name="perValue"
                  value={text.form.monthly}
                  onChange={formik.handleChange}
                />
                <label htmlFor="option-two">{text.form.monthly}</label>
                <input
                  type="radio"
                  id="option-three"
                  name="perValue"
                  value={text.form.annual}
                  onChange={formik.handleChange}
                />
                <label htmlFor="option-three">{text.form.annual}</label>
              </div>
            )}
          </div>
          <div className={styles.animInputs}>
            <input
              id="term"
              name="term"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.termValue}
              onClick={secondDropDownToggle}
              autoComplete="off"
              required
            />
            <label htmlFor="term">{text.form.payNum}</label>
            <span>
              <FontAwesomeIcon icon={isTermDrop ? faCaretUp : faCaretDown} />{' '}
            </span>

            {isTermDrop && formik.values.termValue && (
              <div className={styles.dropdown}>
                {terms.map((item, index) => {
                  return (
                    <div key={index}>
                      <input
                        type="radio"
                        id={`${item}-option`}
                        name="termValue"
                        value={item}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        onClick={() => setIsTermDrop()}
                      />
                      <label htmlFor={`${item}-option`}>{item}</label>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className={styles.secondContainer}>
          <div className={styles.rangeInputs}>
            <h2>{text.form.taxRates}</h2>
            <label htmlFor="lastName">
              {text.form.bitt} ({' '}
              {!(userLanguage === 'tr') ? formik.values.bsmv + '%' : '%' + formik.values.bsmv} )
            </label>
            <input
              name="bsmv"
              type="range"
              min="0"
              step="0.25"
              max="50"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.bsmv}
            />

            <label htmlFor="kkdf">
              {text.form.rusf} ({' '}
              {!(userLanguage === 'tr') ? formik.values.kkdf + '%' : '%' + formik.values.kkdf} )
            </label>
            <input
              name="kkdf"
              type="range"
              min="0"
              step="0.25"
              max="50"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.kkdf}
            />
          </div>
          <div className={styles.buttonDiv}>
            <Lottie animationData={illust} loop={true} style={{ width: '20rem' }} />
            <button type="submit">{text.form.calculate}</button>
          </div>
        </div>
        <div className={styles.logoHolder}>
          <div className={styles.bg}></div>
          <div className={styles.bar}></div>
          <div className={`${styles.bar} ${styles.fill1}`}></div>
          <div className={`${styles.bar} ${styles.fill2}`}></div>
          <div className={`${styles.bar} ${styles.fill3}`}></div>
          <div className={`${styles.bar} ${styles.fill4}`}></div>
          <div className={`${styles.bar} ${styles.fill5}`}></div>
          <div className={`${styles.bar} ${styles.fill6}`}></div>
          <div className={`${styles.bar} ${styles.fill7}`}></div>
          <div className={`${styles.bar} ${styles.fill8}`}></div>
        </div>
      </form>
    </div>
  );
};

export default Form;
