import './styles.scss';

const Button = ({className, children, ...restProps}) => {
  return (
    <button className={`button ${className ?? ''}`}{...restProps} >{children}</button>
  )
}

export default Button;
