import * as ActionTypes from './ActionTypes';
import { LIST } from '../shared/list';
import { baseUrl} from '../shared/baseUrl'
import { Newlist } from './newList';

export const deleteItem =(i) => {
    return fetch(baseUrl + `list/${i}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
          }
    })
         .then(response=> {
             if(response.ok)
             {
                 console.log(response)
                 return response;
             }
             else{
                 var error = new Error('Error '+ response.status + ': ' + response.statusText);
                 error.response = response;
                 throw error;
             }
         },
         error=> {
             var errmess = new Error(error.message);
             throw errmess;
         })
         .then(response => response.json())
}

export const postItem =(item) => {
    return fetch(baseUrl + `list`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(item)
    })
         .then(response=> {
             if(response.ok)
             {
                 console.log(response)
                 return response;
             }
             else{
                 var error = new Error('Error '+ response.status + ': ' + response.statusText);
                 error.response = response;
                 throw error;
             }
         },
         error=> {
             var errmess = new Error(error.message);
             throw errmess;
         })
         .then(response => response.json())
}

export const saveTasks = (list, newList) => (dispatch) => {
    console.log(newList)
   
    for(let i=0; i<list.length; i++){
        console.log(i)
        deleteItem(list[i].id)
    }

    for(let i=0; i<newList.length; i++){
        console.log(i)
        postItem(newList[i])
    }

    
}
export const fetchTasks = () => (dispatch) => {

    dispatch(tasksLoading(true));

    return fetch(baseUrl + 'list')
         .then(response=> {
             if(response.ok)
             {
                 console.log(response)
                 return response;
             }
             else{
                 var error = new Error('Error '+ response.status + ': ' + response.statusText);
                 error.response = response;
                 throw error;
             }
         },
         error=> {
             var errmess = new Error(error.message);
             throw errmess;
         })
         .then(response => response.json())
         .then(tasks => dispatch(addTasks(tasks)))
         .catch(error => dispatch(tasksFailed(error.message)));
};

export const tasksLoading = () => ({
    type: ActionTypes.TASKS_LOADING
});

export const tasksFailed = (errmess) => ({
    type: ActionTypes.TASKS_FAILED,
    payload: errmess
});

export const addTasks = (tasks) => ({
    type: ActionTypes.ADD_TASKS,
    payload: tasks
});




export const fetchList = (list) => (dispatch) => {

    dispatch(newListLoading(true));
    dispatch(addNewList(list));
    // dispatch(newListFailed(null))
};

export const newListLoading = () => ({
    type: ActionTypes.NEWLIST_LOADING
});

export const newListFailed = (errmess) => ({
    type: ActionTypes.NEWLIST_FAILED,
    payload: errmess
});

export const addNewList = (list) => ({
    type: ActionTypes.ADD_NEWLIST,
    payload: list
});

