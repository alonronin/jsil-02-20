import React from 'react';
import { render } from 'react-dom';
import './style.css';

import App from './App';

const div = document.createElement('div');
document.body.appendChild(div);

render(<App />, div);
