import {Button, Divider, List, Paper} from '@mui/material';

import {Item} from './components/Item';
import React from "react";
import FormTop from "./components/FormTop";
import ModalWindow from "./components/ModalWindow";
import ModalEdit from "./components/ModalEdit";

const SET_INPUT = 'SET_INPUT';
const SET_TASK = 'SET_TASK';
const SET_CHECKBOX = 'SET_CHECKBOX';
const SET_TASK_CHECKBOX = 'SET_TASK_CHECKBOX';
const DELETE_TASK = 'DELETE_TASK';
const EDIT_TASK = 'EDIT_TASK';

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

        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(el => el.id !== action.id)
            }

        case EDIT_TASK:
            return {
                ...state,
                tasks: state.tasks.map(el => {
                    if (el.id === action.id) {
                        return (
                            {
                                ...el,
                                text: action.text
                            }
                        )
                    }
                    return el
                })

            }

        default:
            return state;
    }
}

function App() {
    const [open, setOpen] = React.useState({status: false});
    const [openEdit, setOpenEdit] = React.useState({status: false});
    const [editInput, setEditInput] = React.useState({
        id: null,
        input: ''
    })
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
    const handleOpenEdit = (id, text) => setOpenEdit({status: true, id, text});
    const handleCloseEdit = () => setOpenEdit({status: false});
    const handleEditTask = (e, id) => {

        if (id) {
            setEditInput({
                id: id,
                input: state.tasks.filter(el => el.id === id)[0].text
            })
        } else {
            setEditInput({
                ...editInput,
                input: e.target.value
            })
        }
    }


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
            type: DELETE_TASK,
            id
        })
        handleClose()
    }

    function editTask(id) {
        if (editInput.input.trim()) {
            dispatch({
                type: EDIT_TASK,
                id,
                text: editInput.input
            })
            handleCloseEdit()
        }

    }


    return (
        <div className="App">
            <ModalWindow handleClose={handleClose} open={open} deleteTask={deleteTask}/>
            <ModalEdit handleCloseEdit={handleCloseEdit} openEdit={openEdit} editTask={editTask} editInput={editInput}
                       handleEditTask={handleEditTask}/>
            <Paper className="wrapper">
                <FormTop setCheckbox={setCheckbox} setTask={setTask} setInput={setInput} state={state}/>
                <List>
                    {state.tasks.map(el => <Item key={el.id} text={el.text} completed={el.completed}
                                                 setTaskCheckbox={setTaskCheckbox} id={el.id}
                                                 handleOpen={handleOpen} handleOpenEdit={handleOpenEdit}
                                                 handleEditTask={handleEditTask}/>)}
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
