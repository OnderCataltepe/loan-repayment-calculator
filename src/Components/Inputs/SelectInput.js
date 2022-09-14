import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SelectInput = ({
  name,
  onBlur,
  value,
  onChange,
  terms,
  onClick,
  icon,
  labelText,
  className,
  condition
}) => {
  return (
    <>
      <input
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        onClick={onClick}
        autoComplete="off"
        required
      />
      <label htmlFor={name}>{labelText}</label>
      <span>
        <FontAwesomeIcon icon={icon} />{' '}
      </span>

      {condition && (
        <div className={className}>
          {terms.map((item, index) => {
            return (
              <div key={index}>
                <input
                  type="radio"
                  id={`${item}-${name}`}
                  name={`${name}Value`}
                  value={item}
                  onBlur={onBlur}
                  onChange={onChange}
                />
                <label htmlFor={`${item}-${name}`}>{item}</label>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default SelectInput;
