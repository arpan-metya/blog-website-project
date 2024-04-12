function Button({
  label = 'Button',
  className = '',
  bgColor = 'bg-blue-600',
  textColor = 'text-neutral-200',
  ...props
}) {
  return (
    <button className={`${bgColor} ${textColor} px-3 py-2 rounded-lg ${className}`} {...props}>
      {label}
    </button>
  );
}

export default Button;