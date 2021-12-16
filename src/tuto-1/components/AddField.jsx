import {TextField, Button, Checkbox} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from "react";

export const AddField = ({value, setInput, setTask, completed, setCheckbox}) => {
    return (
        <div className="field">
            <Checkbox
                className="checkbox"
                checked={completed}
                onChange={setCheckbox}
                inputProps={{'aria-label': 'controlled'}}
            />
            <TextField value={value} placeholder="Введите текст задачи..." variant="standard" fullWidth
                       onChange={setInput}/>
            <Button onClick={setTask}>
                <AddIcon/>
            </Button>
        </div>
    );
};
