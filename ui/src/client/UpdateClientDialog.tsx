import {LoadingButton} from '@mui/lab';
import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import {useAppSelector} from '../store';

interface IProps {
    fClose: VoidFunction;
    fOnSubmit: (name: string) => Promise<void>;
    initialName: string;
}

const UpdateClientDialog = ({fClose, fOnSubmit, initialName = ''}: IProps) => {
    const [name, setName] = useState(initialName);
    const isLoading = useAppSelector((state) => state.client.isLoading);

    const submitEnabled = name.length !== 0;
    const submitAndClose = async () => {
        await fOnSubmit(name);
        fClose();
    };

    return (
        <Dialog
            open={true}
            onClose={fClose}
            aria-labelledby="form-dialog-title"
            id="client-dialog">
            <DialogTitle id="form-dialog-title">Update a Client</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    A client manages messages, clients, applications and users (with admin
                    permissions).
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    className="name"
                    label="Name *"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={fClose} disabled={isLoading}>Cancel</Button>
                <Tooltip title={submitEnabled ? '' : 'name is required'}>
                    <div>
                        <LoadingButton
                            className="update"
                            disabled={!submitEnabled}
                            onClick={submitAndClose}
                            color="primary"
                            variant="contained"
                            loading={isLoading}>
                            Update
                        </LoadingButton>
                    </div>
                </Tooltip>
            </DialogActions>
        </Dialog>
    );
}

export default UpdateClientDialog;
