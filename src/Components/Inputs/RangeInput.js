const RangeInput = ({ onChange, onBlur, value, name, max, min, step, labelText }) => {
  return (
    <>
      <label htmlFor={name}>{labelText}</label>
      <input
        name={name}
        type="range"
        min={min}
        step={step}
        max={max}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
    </>
  );
};

export default RangeInput;
