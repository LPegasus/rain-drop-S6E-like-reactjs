import './index.html';
import './index.css';
import ReactDOM from 'react-dom';
import React from 'react';
import Rd from './rd/rd';

ReactDOM.render(
  <Rd>
    <div style={{ display: 'inline-block', height: 50,
      lineHeight: '50px', padding: 0, margin: 0, backgroundColor: '#eee',
      textAlign: 'center', width: 100 }}>
        123
    </div>
  </Rd>
  , document.getElementById('root'));
