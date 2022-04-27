import Button from '../../shared/components/UIElements/Button';
import Card from '../../shared/components/UIElements/Card';

import classes from './Main.module.css';

const texto =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
  'Fusce in urna quis nibh rutrum vehicula. Ut elit est, iaculis fringilla augue at, hendrerit gravida velit.' +
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at eleifend elit, molestie mattis purus.' +
  'Quisque tincidunt mattis dui, eget posuere metus ullamcorper vitae. Donec varius sem non cursus interdum.' +
  'Suspendisse euismod condimentum est in fermentum. Nunc lacinia ligula in nisi semper, at accumsan mi dictum. Mauris a suscipit ligula.';

const textoBoton = '¡Empezar!';

const Main = () => {
  return (
    <Card className={classes.container}>
      <div className={classes.caja}>
        <p className={classes.texto}>{texto}</p>
        <div className={classes.boton}>
          <Button to="/" className={classes.boton__texto}>
            {textoBoton}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Main;
