import classes from './Footer.module.css';

const Footer = () => {
  return (
    <div className={classes.footer}>
      <div className={classes.footer__container}>
        <div className={classes.footer__container__left}>
          <div>
            <img
              className={classes.footer__container__left__logo}
              src="https://petra-education.eu/wp-content/uploads/sites/29/2016/07/124.png"
              alt="Logo"
            />
          </div>
        </div>
        <div className={classes.footer__container__right}>
          <p className={classes.footer__container__right__text}>
            Realizado por alumnos de Ingeniería Informática
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
