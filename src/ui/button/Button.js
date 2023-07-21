import style from './Button.module.scss';

const Button = (props) => {
  return (
    <button onClick={props.delete} className={style.button}>
      {props.children}
    </button>
  );
};

export default Button;
