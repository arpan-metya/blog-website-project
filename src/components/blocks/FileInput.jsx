import { useId, forwardRef } from "react";
import Container from "./Container";

function FileInput({
  label = 'inputLabel',
  name = '',
  placeHolder = label,
  bgColor = 'bg-neutral-100 dark:bg-neutral-600',
  bgColorFile = 'file:bg-neutral-200 file:dark:bg-neutral-700',
  textColor = 'text-neutral-800 dark:text-neutral-200',
  textColorFile = 'file:text-neutral-800 file:dark:text-neutral-200',
  className = '',
  ...props
}, ref) {
  const id = useId()

  return (
    <Container flexBox flexProp="!items-start" className="p-5">
      <label htmlFor={id} className={`${textColor} text-lg w-full`}>{label}</label>
      <input
        id={id}
        type='file'
        name={name}
        ref={ref}
        placeholder={placeHolder}
        className={`${bgColor} ${bgColorFile} ${textColor} ${textColorFile} w-full 
        rounded-lg shadow-md focus:ring-1 focus:ring-offset-2 outline-none cursor-pointer
        file:py-3 file:px-4 file:mr-4 file:rounded-s-lg file:border-none
        ${className}`}
        {...props} />
    </Container>
  );
}

export default forwardRef(FileInput);