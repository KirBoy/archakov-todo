import {Paper, Divider, Button, List} from '@mui/material';

import {Item} from './components/Item';
import React from "react";
import FormTop from "./components/FormTop";
import ModalWindow from "./components/ModalWindow";

const SET_INPUT = 'SET_INPUT';
const SET_TASK = 'SET_TASK';
const SET_CHECKBOX = 'SET_CHECKBOX';
const SET_TASK_CHECKBOX = 'SET_TASK_CHECKBOX';
const DELETE_POST = 'DELETE_POST';

function reducer(state, action) {
    switch (action.type) {
        case SET_INPUT:
            return {
                ...state,
                input: action.text,
            }
        case SET_TASK:
            let id = 1;
            if (state.tasks.length) {
                id = state.tasks[state.tasks.length - 1].id + 1
            }
            return {
                ...state,
                tasks: [...state.tasks, {
                    id: id,
                    text: state.input.trim(),
                    completed: state.completed
                }],
                input: '',
                completed: false
            }

        case SET_CHECKBOX:
            return {
                ...state,
                completed: !state.completed
            }

        case SET_TASK_CHECKBOX:
            return {
                ...state,
                tasks: state.tasks.map(el => {
                    if (el.id === action.id) {
                        return (
                            {
                                ...el,
                                completed: !el.completed
                            }
                        )
                    }
                    return el
                })

            }

        case DELETE_POST:
            return {
                ...state,
                tasks: state.tasks.filter(el => el.id !== action.id)
            }
        default:
            return state;
    }
}

function App() {
    const [open, setOpen] = React.useState({status: false});
    const [state, dispatch] = React.useReducer(reducer, {
            tasks: [{
                id: 1,
                text: 'Это задача',
                completed: true
            },
                {
                    id: 2,
                    text: 'Это задача',
                    completed: true
                },
                {
                    id: 3,
                    text: 'Это задача',
                    completed: false
                },],
            input: '',
            completed: false
        }
    )

    const handleOpen = (id, text) => setOpen({status: true, id, text});
    const handleClose = () => setOpen({status: false});

    function setInput(e) {
        dispatch({
            type: SET_INPUT,
            text: e.target.value
        })
    }

    function setTask() {
        if (state.input.trim()) {
            dispatch({
                type: SET_TASK,
            })
        }

    }

    function setTaskCheckbox(id) {
        dispatch({
            type: SET_TASK_CHECKBOX,
            id
        })
    }

    function setCheckbox() {
        dispatch({
            type: SET_CHECKBOX,
        })
    }

    function deleteTask(id) {
        dispatch({
            type: DELETE_POST,
            id
        })
        handleClose()
    }


    return (
        <div className="App">
            <ModalWindow handleClose={handleClose} open={open} deleteTask={deleteTask}/>
            <Paper className="wrapper">
                <FormTop setCheckbox={setCheckbox} setTask={setTask} setInput={setInput} state={state}/>
                <List>
                    {state.tasks.map(el => <Item key={el.id} text={el.text} completed={el.completed}
                                                 setTaskCheckbox={setTaskCheckbox} id={el.id}
                                                 handleOpen={handleOpen}/>)}
                </List>
                <Divider/>
                <div className="check-buttons">
                    <Button>Отметить всё</Button>
                    <Button>Очистить</Button>
                </div>
            </Paper>
        </div>
    );
}

export default App;
