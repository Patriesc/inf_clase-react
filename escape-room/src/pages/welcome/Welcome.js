import { Fragment } from 'react';

import MainNavigation from '../../shared/components/Navigation/MainNavigation';
import Footer from '../../shared/components/Overlay/Footer';
import Main from './Main';

const Welcome = () => {
  return (
    <Fragment>
      <MainNavigation />
      <Main />
      <Footer />
    </Fragment>
  );
};

export default Welcome;
