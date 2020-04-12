import React from 'react';
import logo from './logo.svg';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/MainComponent';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
     
      <div>
        <Main />
    </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
