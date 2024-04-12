import { useId, forwardRef } from "react";
import Container from "./Container";

function Input({
  label = 'inputLabel',
  type = 'text',
  name = '',
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
      <input
        id={id}
        type={type}
        name={name}
        ref={ref}
        placeholder={placeHolder}
        className={`${bgColor} ${textColor} p-3 w-full rounded-lg 
        shadow-md focus:ring-1 focus:ring-offset-2 outline-none ${className}`}
        {...props} />
    </Container>
  );
}

export default forwardRef(Input);