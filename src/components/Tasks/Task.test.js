import React from 'react'
import Task  from './Task'
import { render, queryByAttribute, screen, getByLabelText } from '@testing-library/react'
import { Provider } from 'react-redux';
import { ConfigureStore } from '../../redux/configureStore';
import { BrowserRouter } from 'react-router-dom';


const store = ConfigureStore();


test("it works", () => {
    const { getByText, getByLabelText} = render(
    <Provider store={store}><BrowserRouter><Task /></BrowserRouter></Provider>)

    getByText("Your Plans");
    getByText("Save");
    
    expect(getByLabelText("Title")).not.toBeNull()
    expect(getByLabelText("Description")).not.toBeNull()
    // expect(screen.getByPlaceholderText('Title of the Task').not.toBeNull())
    expect(getByLabelText("Theme")).not.toBeNull()

}) 


