import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NumberInput = ({
  name,
  onKeyPress,
  onChange,
  onBlur,
  value,
  className,
  errorMessage,
  errorCondition,
  labelText,
  icon,
  step
}) => {
  return (
    <>
      <input
        name={name}
        step={step}
        type="number"
        onKeyPress={onKeyPress}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className={className}
      />
      <label htmlFor={name}>{labelText}</label>
      <span>
        <FontAwesomeIcon icon={icon} />
      </span>
      {errorCondition && <p className={className}>{errorMessage}</p>}{' '}
    </>
  );
};

export default NumberInput;
