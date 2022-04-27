import { useHistory } from 'react-router-dom';
import { Fragment, useState, useContext } from 'react';
import Input from '../../shared/components/FormElements/Input';
import MainNavigation from '../../shared/components/Navigation/MainNavigation';
import Footer from '../../shared/components/Overlay/Footer';
import Button from '../../shared/components/UIElements/Button';
import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

import classes from './Auth.module.css';

const location = {
  pathname: '/',
  state: { fromDashboard: true },
};

const Auth = () => {
  const auth = useContext(AuthContext);
  const [loginMode, setLoginMode] = useState(true);
  const { isLoading, error, sendRequest } = useHttpClient();

  let history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!loginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          passwordConfirm: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false,
          },
          passwordConfirm: {
            value: '',
            isValid: false,
          },
        },
        false
      );
    }
    setLoginMode((prevMode) => !prevMode);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (loginMode) {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/v1/users/login',
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            'Content-Type': 'application/json',
          }
        );
        auth.login(responseData.userId, responseData.token);
        history.push(location);
      } catch (err) {}
    } else {
      try {
        console.log(formState.inputs.passwordConfirm.value);
        const responseData = await sendRequest(
          'http://localhost:5000/api/v1/users/signup',
          'POST',
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
            passwordConfirm: formState.inputs.passwordConfirm.value,
          }),
          {
            'Content-Type': 'application/json',
          }
        );
        auth.login(responseData.userId, responseData.token);
        history.push(location);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Fragment>
      <MainNavigation />
      <Card className={classes.container}>
        {isLoading && (
          <div className={classes[`spinner${loginMode ? '' : '--signup'}`]}>
            <LoadingSpinner asOverlay />
          </div>
        )}

        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.inputs}>
            {!loginMode && (
              <Input
                id="name"
                type="text"
                label="Nombre"
                errorText="Please enter a name"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
              />
            )}
            <Input
              id="email"
              label="Email"
              type="text"
              validators={[VALIDATOR_EMAIL()]}
              errorText="Please enter a valid email"
              onInput={inputHandler}
            />
            <Input
              id="password"
              label="Contraseña"
              type="password"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter your password"
              onInput={inputHandler}
            />
            {!loginMode && (
              <Input
                id="passwordConfirm"
                label="Confirmar Contraseña"
                type="password"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please confirm your password"
                onInput={inputHandler}
              />
            )}
          </div>
          {error && (
            <p className={classes.error}>Datos introducidos incorrectos.</p>
          )}
          <div className={classes.enviarButton}>
            <Button
              type="submit"
              className={classes.enviarButton__text}
              disabled={!formState.isValid}
            >
              Enviar
            </Button>
          </div>
        </form>
        <div className={classes.cambioModo}>
          {loginMode && (
            <p className={classes.cambioModo__texto}>
              ¿No tienes cuenta todavía?
            </p>
          )}
          {!loginMode && (
            <p className={classes.cambioModo__texto}>¿Ya tienes cuenta?</p>
          )}
          <Button
            className={classes.cambioModo__boton}
            clicked={switchModeHandler}
          >
            {loginMode ? 'SIGN UP' : 'LOG IN'}
          </Button>
        </div>
      </Card>
      <Footer />
    </Fragment>
  );
};

export default Auth;
