import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import LayersIcon from '@mui/icons-material/Layers';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;
    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export const DataConflict = () => {
    const [open, setOpen] = useState(true);
    const [secondsRemaining, setSecondsRemaining] = useState(5);
    const [openDetails, setOpenDetails] = useState(false);

    useEffect(() => {
        if (open && secondsRemaining > 0) {
            const interval = setInterval(() => {
                setSecondsRemaining((prev) => prev - 1)
            }, 1000);

            return () => clearInterval(interval);
        } else {
            setTimeout(() => {
                setSecondsRemaining(5)
            }, 1000)

        }
    }, [open, secondsRemaining]);


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClickClose = () => {
        setOpen(false);
    };
    const handleClickSeeDetails = () => {
        setOpenDetails(true);
    };
    const handleConflicts = (msgType) => {
        console.info(msgType);
    };
    const handleCommit = (msgType) => {
        console.info(msgType);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>  Open dialog </Button>
            <BootstrapDialog onClose={handleClickClose} open={open} >
                <BootstrapDialogTitle onClose={handleClickClose} style={{ display: 'flex', fontSize: '15px', margin: '0', padding: '20px 60px 20px 20px' }} >
                    <span>Resolve conflicts before merging <b> local changes </b> into <b>remote database</b> </span>
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <b style={{ fontSize: '16px', display: 'flex', alignItems: 'center', padding: '0px 0px 40px 0px' }}>
                            <WarningAmberIcon style={{ color: '#edae14' }} />
                            5 conflicts found.
                        </b>
                        <span>
                            <CircularProgress style={{ color: '#626262', width: '25px', height: '25px', marginRight: '10px' }} />
                            Fetching conflicts in: {secondsRemaining}
                        </span>

                    </span>

                    <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
                        <span style={{ display: 'flex' }}>
                            <LayersIcon />
                            <span>
                                <Typography gutterBottom style={{ marginLeft: '5px' }}>
                                    yargs.xml
                                </Typography>
                                <Typography gutterBottom style={{ marginLeft: '5px', color: '#09bf09' }}>
                                    No Conflicts remaining.
                                </Typography>
                            </span>
                        </span>
                        <CheckCircleIcon style={{ marginRight: '50px', color: '#09bf09', marginBottom: '0.35em' }} />
                    </span>
                    <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ display: 'flex' }}>
                            <LayersIcon />
                            <span>
                                <Typography gutterBottom style={{ marginLeft: '5px' }}>
                                    package.json
                                </Typography>
                                <div style={{ display: 'flex' }}>
                                    <Typography gutterBottom style={{ marginLeft: '5px', color: '#edae14', marginRight: '5px' }}>
                                        5 conflicts
                                    </Typography>
                                    <Chip
                                        label="See details"
                                        size="small"
                                        variant="outlined"
                                        onClick={() => handleClickSeeDetails()}
                                    />
                                </div>

                            </span>
                        </span>
                        <span style={{ display: 'flex', flexDirection: 'column' }}>
                            <Chip
                                style={{ marginTop: '5px', marginBottom: '5px' }}
                                label="Accept local changes"
                                size="small"
                                variant="outlined"
                                onClick={() => handleConflicts('ACCEPT_LOCAL')}
                            />
                            <Chip
                                label="Accept remote changes"
                                size="small"
                                variant="outlined"
                                onClick={() => handleConflicts('ACCEPT_REMOTE')}
                            />
                        </span>
                    </span>
                </DialogContent>
                <DialogActions>
                    <Button size="small" variant="contained" onClick={() => handleCommit('ABORT_MERGE')}>
                        Abort merge
                    </Button>
                    <Button size="small" variant="contained" onClick={() => handleCommit('COMMIT_MERGE')}>
                        Commit merge
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}