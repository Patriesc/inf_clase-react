import { NavLink } from 'react-router-dom';

import classes from './Button.module.css';

const Button = (props) => {
  if (props.href) {
    return (
      <a href={props.href} className={classes.button}>
        {props.children}
      </a>
    );
  }

  if (props.to) {
    return (
      <NavLink to={props.to} className={classes.button}>
        {props.children}
      </NavLink>
    );
  }

  return (
    <button
      className={classes.button + ' ' + props.className}
      onClick={props.clicked}
      type={props.type}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
