import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <div className="Header">
      <h2>Sorting Algorithms Simulator</h2>
    </div>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);