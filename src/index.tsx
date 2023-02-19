import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Electroware from './Electroware';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Electroware />
  </React.StrictMode>
);
