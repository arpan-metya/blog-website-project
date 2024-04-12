import { useId, forwardRef } from 'react'
import Container from "./Container";

function Select({
  label = 'inputLabel',
  name = '',
  options,
  placeHolder = label,
  bgColor = 'bg-neutral-100 dark:bg-neutral-700',
  textColor = 'text-neutral-800 dark:text-neutral-200',
  className = '',
  ...props
}, ref) {
  const id = useId()

  return (
    <Container flexBox flexProp="!items-start" className="p-5">
      <label htmlFor={id} className={`${textColor} text-lg w-full`}>{label}</label>
      <select
        id={id}
        name={name}
        ref={ref}
        placeholder={placeHolder}
        className={`${bgColor} ${textColor} p-3 w-full rounded-lg 
        shadow-md focus:ring-2 outline-none cursor-pointer ${className}`}
        {...props} >
        {options?.map(option => (
          <option value={option.toLowerCase()} key={option}>
            {option}
          </option>
        ))}
      </select>
    </Container>
  );
}

export default forwardRef(Select)