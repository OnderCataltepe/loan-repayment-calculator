import styles from "./Form.module.css";
//Hooks
import { useEffect, useState } from "react";
//Fontawesome and Lottie
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTurkishLiraSign,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import Lottie from "lottie-react";
import illust from "../assets/illust1.json";
//Yup and Formik
import { useFormik } from "formik";
import * as yup from "yup";
const schema = yup.object().shape({
  loanAmount: yup
    .number()
    .required("Kredi tutarı giriniz.")
    .min(1000, "En az 1000TL girmelisiniz."),
  pRate: yup
    .number()
    .required("Kâr oranı giriniz")
    .min(0.01, "En az 0.01 giriniz.")
    .max(99.99, "En fazla %99.99 girebilirsiniz."),
  selectorOne: yup.string().required("Bu alan zorunlu."),
  selectorTwo: yup.number().required("Bu alan zorunlu."),
});

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
  //Formik
  const formik = useFormik({
    initialValues: {
      loanAmount: "",
      pRate: "",
      bsmv: 15,
      kkdf: 10,
      per: "",
      selectorOne: "Aylık",
      term: "",
      selectorTwo: 12,
    },

    onSubmit: (values) => {},
    validationSchema: schema,
  });
  //States
  const [isSubmit, setIsSubmit] = useState(false);
  const [isPerDrop, setIsPerDrop] = useState(false);
  const [isTermDrop, setIsTermDrop] = useState(false);
  const [terms, setTerms] = useState(months);
  //Errors
  const loanError =
    formik.errors.loanAmount && formik.touched.loanAmount ? "error" : null;
  const pRateError =
    formik.errors.pRate && formik.touched.pRate ? "error" : null;
  const selectorOneError =
    formik.errors.selectorOne && formik.errors.per && formik.touched.per
      ? "error"
      : null;
  const selectorTwoError =
    formik.errors.selectorTwo && formik.touched.term ? "error" : null;

  //Dropdown functions
  const firstdropDownToggle = () => {
    setIsPerDrop((prev) => !prev);
  };
  const secondDropDownToggle = () => {
    setIsTermDrop((prev) => !prev);
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
  };
  //Validation for length and valid chars
  const amountValidation = (e) => {
    let key = e.which || e.KeyCode;

    if (
      e.target.value.length > 6 ||
      parseInt(e.target.value) < 1 ||
      !(key >= 48 && key <= 57)
    ) {
      e.preventDefault();
    }
  };
  const pRateValidation = (e) => {
    let key = e.which || e.KeyCode;
    if (
      e.target.value.length > 5 ||
      (key > 31 && (key < 48 || key > 57) && key !== 46)
    ) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (formik.values.selectorOne === "Aylık") {
      setTerms(months);
    }
    if (formik.values.selectorOne === "Haftalık") {
      setTerms(weeks);
    }
    if (formik.values.selectorOne === "Yıllık") {
      setTerms(years);
    }
    formik.setFieldValue("selectorTwo", 12);
  }, [formik.values.selectorOne]);

  return (
    <div className={styles.formContainer} onClick={closeDrop}>
      <h1>KREDİ HESAPLA</h1>
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
            <label htmlFor="loanAmount">Kredi Tutarı</label>
            <span>
              <FontAwesomeIcon icon={faTurkishLiraSign} />
            </span>
            {formik.errors.loanAmount && formik.touched.loanAmount && (
              <p className={styles[loanError]}>{formik.errors.loanAmount}</p>
            )}{" "}
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
            <label htmlFor="pRate">Kâr Oranı</label>
            <span>%</span>
            {formik.errors.pRate && formik.touched.pRate && (
              <p className={styles[pRateError]}>{formik.errors.pRate}</p>
            )}{" "}
          </div>
          <div className={styles.animInputs}>
            <input
              id="per"
              name="per"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.selectorOne}
              onClick={firstdropDownToggle}
              className={styles[selectorOneError]}
              autoComplete="off"
              required
            />
            <label htmlFor="per">Taksit Aralığı</label>
            <span>
              <FontAwesomeIcon icon={isPerDrop ? faCaretUp : faCaretDown} />{" "}
            </span>
            {formik.errors.per &&
              formik.errors.selectorOne &&
              formik.touched.per && (
                <p className={styles[selectorOneError]}>
                  {formik.errors.selectorOne}
                </p>
              )}{" "}
            {isPerDrop && (
              <div className={styles.dropdown}>
                <input
                  type="radio"
                  id="option-one"
                  name="selectorOne"
                  value="Haftalık"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  onClick={() => setIsPerDrop()}
                />
                <label htmlFor="option-one">Haftalık</label>
                <input
                  type="radio"
                  id="option-two"
                  name="selectorOne"
                  value="Aylık"
                  onChange={formik.handleChange}
                  onClick={() => setIsPerDrop()}
                />
                <label htmlFor="option-two">Aylık</label>
                <input
                  type="radio"
                  id="option-three"
                  name="selectorOne"
                  value="Yıllık"
                  onChange={formik.handleChange}
                  onClick={() => setIsPerDrop()}
                />
                <label htmlFor="option-three">Yıllık</label>
              </div>
            )}
          </div>
          <div className={styles.animInputs}>
            <input
              id="term"
              name="term"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.selectorTwo}
              onClick={secondDropDownToggle}
              className={styles[selectorTwoError]}
              autoComplete="off"
              required
            />
            <label htmlFor="term">Taksit Sayısı</label>
            <span>
              <FontAwesomeIcon icon={isTermDrop ? faCaretUp : faCaretDown} />{" "}
            </span>
            {formik.errors.selectorTwo && formik.touched.term && (
              <p className={styles[selectorTwoError]}>
                {formik.errors.selectorTwo}
              </p>
            )}{" "}
            {isTermDrop && formik.values.selectorOne && (
              <div className={styles.dropdown}>
                {terms.map((item, index) => {
                  return (
                    <div key={index}>
                      <input
                        type="radio"
                        id={`${item}-option`}
                        name="selectorTwo"
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
            <h2>Vergi Oranları:</h2>
            <label htmlFor="lastName">BSMV ( {formik.values.bsmv}% )</label>
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

            <label htmlFor="kkdf">KKDF ( {formik.values.kkdf}% )</label>
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
            <Lottie
              animationData={illust}
              loop={true}
              style={{ width: "20rem" }}
            />
            <button type="submit">Hesapla</button>
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
