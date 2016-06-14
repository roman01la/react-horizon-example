import React from 'react';
import { render } from 'react-dom';
import { HorizonProvider } from 'react-hz';
import App from './components/app';

const Horizon = window.Horizon;

render((
  <HorizonProvider instance={Horizon()}>
    <App uuid={Math.random()} />
  </HorizonProvider>
), document.getElementById('app'));
