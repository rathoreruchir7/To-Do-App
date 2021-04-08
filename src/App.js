import React from 'react';
import logo from './logo.svg';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/MainComponent';
import './App.css';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();


function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <div className="App">
     
      <div>
        <Main />
    </div>
    </div>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
