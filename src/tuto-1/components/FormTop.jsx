import {Divider, Paper, Tab, Tabs} from "@mui/material";
import {AddField} from "./AddField";
import React from "react";

function FormTop({setCheckbox,setInput, setTask, state, setTab}) {
    return (
        <>
            <Paper className="header" elevation={0}>
                <h4>Список задач</h4>
            </Paper>
            <AddField value={state.input} setInput={setInput} setTask={setTask} completed={state.completed}
                      setCheckbox={setCheckbox}/>
            <Divider/>
            <Tabs value={state.tab}>
                <Tab label="Все" onClick={()=>setTab(0)}/>
                <Tab label="Активные" onClick={()=>setTab(1)}/>
                <Tab label="Завершённые" onClick={()=>setTab(2)}/>
            </Tabs>
            <Divider/>
        </>
    )

}

export default FormTop