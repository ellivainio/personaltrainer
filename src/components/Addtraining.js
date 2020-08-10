import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export default function Addtraining(props) {

    const [training, setTraining] = useState({date:'', duration:'', activity:'', customer: props.customerTraining})
    const [open, setOpen] = useState(false);



    const handleClickOpen = () => {
        setOpen(true);
    };
  
    const handleClose = () => {
        // props.addTraining(training);
        let fixdate = training;
        fixdate.date = new Date(training.date);
        props.addTraining(fixdate);
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    }

    const inputChanged = (event) => {
        setTraining({...training, [event.target.name]: event.target.value});
    }

    return (
        <div>
            <Button label="Add training" onClick={handleClickOpen}>Add training</Button>
            <Dialog open={open} onClose={handleClose} disableBackdropClick={true} disableEscapeKeyDown={true} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit</DialogTitle>
                <TextField
                    autoFocus
                    margin="dense"
                    id="date"
                    name="date"
                    value={training.date}
                    onChange={inputChanged}
                    label="Date"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="duration"
                    name="duration"
                    value={training.duration}
                    onChange={inputChanged}
                    label="Duration"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="activity"
                    name="activity"
                    value={training.activity}
                    onChange={inputChanged}
                    label="Activity"
                    fullWidth
                />
                <DialogActions>
                <Button onClick={handleCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleClose} color="primary">
                    Save
                </Button>
                </DialogActions>
            </Dialog>
    </div>
  );
}