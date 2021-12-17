import {Paper, Divider, Button, List, Tabs, Tab} from '@mui/material';
import {AddField} from './components/AddField';
import {Item} from './components/Item';
import React from "react";

const SET_INPUT = 'SET_INPUT';
const SET_TASK = 'SET_TASK';
const SET_CHECKBOX = 'SET_CHECKBOX';
const SET_TASK_CHECKBOX = 'SET_TASK_CHECKBOX';

function reducer(state, action) {

    switch (action.type) {
        case SET_INPUT:
            return {
                ...state,
                input: action.text,
            }
        case SET_TASK:
            return {
                ...state,
                tasks: [...state.tasks, {
                    id: state.tasks[state.tasks.length - 1].id + 1,
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

        default:
            return state;
    }
}

function App() {
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

    return (
        <div className="App">
            <Paper className="wrapper">
                <Paper className="header" elevation={0}>
                    <h4>Список задач</h4>
                </Paper>
                <AddField value={state.input} setInput={setInput} setTask={setTask} completed={state.completed}
                          setCheckbox={setCheckbox}/>
                <Divider/>
                <Tabs value={0}>
                    <Tab label="Все"/>
                    <Tab label="Активные"/>
                    <Tab label="Завершённые"/>
                </Tabs>
                <Divider/>
                <List>
                    {state.tasks.map(el => <Item key={el.id} text={el.text} completed={el.completed}
                                                 setTaskCheckbox={setTaskCheckbox} id={el.id}/>)}

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
