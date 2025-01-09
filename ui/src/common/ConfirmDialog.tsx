import {LoadingButton} from '@mui/lab';
import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface IProps {
    title: string;
    text: string;
    fClose: VoidFunction;
    fOnSubmit: () => Promise<void>;
    isLoading?: boolean;
}

export default function ConfirmDialog({title, text, fClose, fOnSubmit, isLoading = false}: IProps) {
    const submitAndClose = async () => {
        await fOnSubmit();
        fClose();
    };

    return (
        <Dialog
            open={true}
            onClose={fClose}
            aria-labelledby="form-dialog-title"
            className="confirm-dialog">
            <DialogTitle id="form-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{text}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={fClose} className="cancel" disabled={isLoading}>
                    No
                </Button>
                <LoadingButton
                    onClick={submitAndClose}
                    autoFocus
                    color="primary"
                    variant="contained"
                    className="confirm"
                    loading={isLoading}>
                    Yes
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
}
