function Container({
  children,
  variant = '',
  height = '',
  width = '',
  bgColor = 'transparent dark:transparent',
  flexBox = false,
  flexProp = '',
  className = '',
  ...props
}) {
  let size;
  switch (variant) {
    case 'fit':
      size = 'w-fit'
      break
    case 'fluid':
      size = 'container mx-auto'
      break
    default:
      size = 'w-full'
  }
  let flex = flexBox ? `flex flex-col justify-center items-center gap-3 ${flexProp}` : ''

  return (
    <div className={`${width ? width : size} ${height} ${flex} ${bgColor} ${className}`}
      {...props}>
      {children}
    </div>
  );
}

export default Container;