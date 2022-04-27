import { useState, useEffect } from 'react';

const Uax = (props) => {
  const [hora, setHora] = useState(Date.now());

  useEffect(() => {
    setInterval(() => {
      setHora(() => Date.now());
    }, Number(props.tiempo));
  }, [props.tiempo]);

  return (
    <h1>
      Hola {props.tiempo}. Son las {hora}{' '}
    </h1>
  );
};

export default Uax;
