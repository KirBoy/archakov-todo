import {Divider, Paper, Tab, Tabs} from "@mui/material";
import {AddField} from "./AddField";
import React from "react";

function FormTop({setCheckbox,setInput, setTask, state}) {
    return (
        <>
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
        </>
    )

}

export default FormTop