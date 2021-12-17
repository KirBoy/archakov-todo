import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React from "react";
import EditField from "./EditField";

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

function ModalEdit({openEdit, editInput, handleEditTask, editTask, handleCloseEdit}) {
    return (
        <Modal
            open={openEdit.status}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <EditField editInput={editInput} handleEditTask={handleEditTask}/>
                <Button variant="contained" onClick={() => editTask(openEdit.id)}>Сохранить</Button>
                <Button variant="outlined" onClick={handleCloseEdit}>Не сохронять</Button>
            </Box>
        </Modal>
    )
}

export default ModalEdit