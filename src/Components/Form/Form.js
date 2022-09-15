import styles from './Form.module.css';
import { Button, Graph, RangeInput, NumberInput, SelectInput } from 'Components';
//Hooks, Context and helpers
import { useEffect, useState, useContext } from 'react';
import LangContext from 'contexts/LangContext';
import CalculatorContext from 'contexts/CalculatorContext';
import { calculator, weeks, months, years } from 'helpers';
//Fontawesome and Lottie
import {
  faTurkishLiraSign,
  faCaretDown,
  faCaretUp,
  faPercent
} from '@fortawesome/free-solid-svg-icons';
import Lottie from 'lottie-react';
import { Illustration } from 'assets';
//Yup and Formik
import { useFormik } from 'formik';
import * as yup from 'yup';

const Form = () => {
  const { text, userLanguage } = useContext(LangContext);
  const { setIsResult, setCalculatedDatas } = useContext(CalculatorContext);
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
      bitt: 15,
      rusf: 10,
      perValue: text.form.monthly,
      termValue: 12
    },

    onSubmit: (values) => {
      const val = {
        amount: values.loanAmount,
        compound: values.comValue,
        bitt: values.bitt,
        rusf: values.rusf,
        rate: values.pRate,
        period: values.perValue,
        payNumber: values.termValue
      };
      let sendingData = calculator(val);
      setCalculatedDatas(sendingData);
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
    formik.resetForm();
    formik.setFieldValue('comValue', text.form.monthly);
    formik.setFieldValue('perValue', text.form.monthly);
  }, [userLanguage]);

  return (
    <div className={styles.formContainer} onClick={closeDrop}>
      <h1>{text.form.title}</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.firstContainer}>
          <div className={styles.animInputs}>
            <NumberInput
              name="loanAmount"
              step="1"
              type="number"
              onKeyPress={amountValidation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.loanAmount}
              className={styles[loanError]}
              icon={faTurkishLiraSign}
              labelText={text.form.loanAmount}
              errorCondition={formik.errors.loanAmount && formik.touched.loanAmount}
              errorMessage={formik.errors.loanAmount}
            />
          </div>
          <div className={styles.animInputs}>
            <SelectInput
              name="com"
              value={formik.values.comValue}
              terms={[text.form.weekly, text.form.monthly, text.form.annual]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onClick={thirdDropDownToggle}
              icon={isComDrop ? faCaretUp : faCaretDown}
              labelText={text.form.profitFreq}
              className={styles.dropdown}
              condition={isComDrop}
            />
          </div>
          <div className={styles.animInputs}>
            <NumberInput
              name="pRate"
              type="number"
              step="0.01"
              onKeyPress={pRateValidation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.pRate}
              className={styles[pRateError]}
              icon={faPercent}
              labelText={text.form.profitRate}
              errorCondition={formik.errors.pRate && formik.touched.pRate}
              errorMessage={formik.errors.pRate}
            />
          </div>
          <div className={styles.animInputs}>
            <SelectInput
              name="per"
              value={formik.values.perValue}
              terms={[text.form.weekly, text.form.monthly, text.form.annual]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onClick={firstdropDownToggle}
              icon={isPerDrop ? faCaretUp : faCaretDown}
              labelText={text.form.payFreq}
              className={styles.dropdown}
              condition={isPerDrop}
            />
          </div>
          <div className={styles.animInputs}>
            <SelectInput
              name="term"
              value={formik.values.termValue}
              terms={terms}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onClick={secondDropDownToggle}
              icon={isTermDrop ? faCaretUp : faCaretDown}
              labelText={text.form.payNum}
              className={styles.dropdown}
              condition={isTermDrop && formik.values.termValue}
            />
          </div>
        </div>
        <div className={styles.secondContainer}>
          <div className={styles.rangeInputs}>
            <h2>{text.form.taxRates}</h2>
            <RangeInput
              name="bitt"
              min="0"
              step="0.25"
              max="50"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.bitt}
              labelText={
                text.form.bitt +
                '  ( ' +
                (!(userLanguage === 'tr') ? formik.values.bitt + '%' : '%' + formik.values.bitt) +
                ' )'
              }
            />
            <RangeInput
              name="rusf"
              min="0"
              step="0.25"
              max="50"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rusf}
              labelText={
                text.form.rusf +
                ' ( ' +
                (!(userLanguage === 'tr') ? formik.values.rusf + '%' : '%' + formik.values.rusf) +
                ' )'
              }
            />
          </div>
          <div className={styles.buttonDiv}>
            <Lottie animationData={Illustration} loop={true} style={{ width: '20rem' }} />
            <Button type="submit" text={text.form.calculate} />
          </div>
        </div>
        <Graph />
      </form>
    </div>
  );
};

export default Form;
