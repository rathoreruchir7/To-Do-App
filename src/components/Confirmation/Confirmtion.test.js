import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux';
import { ConfigureStore } from '../../redux/configureStore';
import { BrowserRouter } from 'react-router-dom';
import ConfirmationPage from './ConfirmationPage';

const store = ConfigureStore();


test("it works", () => {
    const { getByText, getByLabelText } = render(
    <Provider store={store}><BrowserRouter><ConfirmationPage /></BrowserRouter></Provider>)

    
    getByText("Save Changes");
    getByText("Items Deleted");
    getByText("New Items Added")
    
    expect(getByLabelText("Theme")).not.toBeNull()
}) 


