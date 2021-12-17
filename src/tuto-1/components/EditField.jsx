import {TextField, Button, Checkbox} from '@mui/material';
import React from "react";

export const EditField = ({editInput, handleEditTask}) => {
    return (
        <div className="field">
            <TextField value={editInput.input} placeholder="Введите текст задачи..." variant="standard" fullWidth
                       onChange={handleEditTask} helperText={!editInput.input.trim()&&'введите задачу'}/>
        </div>
    );
};

export default EditField
