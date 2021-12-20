import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function ModalWindow({handleClose, open, deleteTask}) {
    return (
        <Modal
            open={open.status}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Вы дейсвительно хотите удалить данную задачу ?
                    {open.text}
                </Typography>
                <Button variant="contained" onClick={() => deleteTask(open.id)}>Да</Button>
                <Button variant="outlined" onClick={handleClose}>Нет</Button>
            </Box>
        </Modal>
    )
}

export default ModalWindow