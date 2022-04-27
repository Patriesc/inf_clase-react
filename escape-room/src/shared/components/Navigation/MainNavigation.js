import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import MainHeader from './MainHeader';
import { AuthContext } from '../../context/auth-context';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const auth = useContext(AuthContext);

  return (
    <MainHeader>
      <NavLink className={classes.logo} to="/">
        <h1 className={classes.logo__texto}>Escape Room</h1>
      </NavLink>
      <nav className={classes.options}>
        {!auth.isLoggedIn && (
          <NavLink className={classes.options__link} to="/auth">
            <p className={classes.options__texto}>Log In</p>
          </NavLink>
        )}
        {auth.isLoggedIn && (
          <button className={classes.options__button} onClick={auth.logout}>
            <p className={classes.options__texto}>Log Out</p>
          </button>
        )}
      </nav>
    </MainHeader>
  );
};

export default MainNavigation;
