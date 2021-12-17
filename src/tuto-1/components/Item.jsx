import React from 'react';
import {IconButton, Checkbox, ListItem, Typography} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


export const Item = ({text, completed, setTaskCheckbox, id}) => {
    return (
        <ListItem>
            <div className="d-flex item">
                <Checkbox
                    onChange={() => setTaskCheckbox(id)}
                    className="checkbox"
                    checked={completed}
                    inputProps={{'aria-label': 'controlled'}}
                />
                <Typography className="item-text">{text}</Typography>
                <div className="item-buttons d-flex">
                    <IconButton>
                        <EditIcon style={{fontSize: 20}}/>
                    </IconButton>
                    <IconButton>
                        <DeleteOutlineIcon style={{fontSize: 20}}/>
                    </IconButton>
                </div>
            </div>
        </ListItem>
    );
};
