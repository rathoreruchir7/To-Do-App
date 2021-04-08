import * as ActionTypes from './ActionTypes';

export const Newlist = (state = { isLoading: true,
    errMess: null,
    list:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_NEWLIST:
            return {...state, isLoading: false, errMess: null, list: action.payload};

        case ActionTypes.NEWLIST_LOADING:
            return {...state, isLoading: true, errMess: null, list: []}

        case ActionTypes.NEWLIST_FAILED:
            return {...state, isLoading: false, errMess: action.payload, list:[]};

        default:
            return state;
    }
};