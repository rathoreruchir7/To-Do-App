import {createStore,combineReducers,applyMiddleware} from 'redux';
import { Tasks } from './tasks';
import { Newlist } from './newList'
import thunk from 'redux-thunk';
import logger from 'redux-logger';
// import { createForms } from 'react-redux-form';
// import { InitialFeedback } from './forms';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            tasks: Tasks,
            newList: Newlist
        //     ...createForms({
        //         feedback: InitialFeedback
        // })
    }),
        applyMiddleware(thunk, logger)
    );

    return store;
};