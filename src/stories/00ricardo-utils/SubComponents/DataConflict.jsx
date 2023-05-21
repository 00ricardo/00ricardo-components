import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Button, Dialog, DialogTitle, DialogContent,
    DialogActions, IconButton, Typography, Chip,
    CircularProgress, styled
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import LayersIcon from '@mui/icons-material/Layers';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import rutils from '00ricardo-utils'


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

export const DataConflict = ({ open, handleClickClose, conflicts }) => {
    const [_open_, setOpen] = useState(open);
    const [secondsRemaining, setSecondsRemaining] = useState(5);
    const [openDetails, setOpenDetails] = useState(false);
    const [solvedConflicts, setSolvedConflicts] = useState([]);
    const [unsolvedConflictsCount, setUnsolvedConflictsCount] = useState(undefined);
    const [conflictedProps, setConflictedProps] = useState([]);
    const [_conflicts_, setConflicts] = useState(conflicts);
    const [RawData, setRawData] = useState([{
        id: 1234,
        postponed_by: 'Ricardo',
        can_edit_YN: 'Y',
        lot_name: 'H12312.01',
        status: 'open',
        act_comment: 'comment'
    },
    {
        id: 5678,
        postponed_by: 'David',
        can_edit_YN: 'N',
        lot_name: 'H12312.02',
        status: 'open',
        act_comment: 'comment'
    }])
    const [localChanges, setLocalChanges] = useState(
        [{
            lot_name: 'H12312.01',
            object_type: 'action',
            object_metadata: {
                id: 1234,
                status: 'finished'
            }
        },
        {
            lot_name: 'H12312.01',
            object_type: 'action',
            object_metadata: {
                id: 1234,
                act_comment: 'comment v2'
            }
        },
        {
            lot_name: 'H12312.02',
            object_type: 'action',
            object_metadata: {
                id: 5678,
                act_comment: 'comment 0101010101'
            }
        }
        ])

    const handleClickSeeDetails = () => {
        setOpenDetails(true);
    };


    // Update conflicts count on solve
    const solveIndividualConflictCount = (actid) => {
        const updatedConflicts = _conflicts_.map(conf => {
            const updatedActions = conf.actions.map(act => {
                if (act.id === actid) {
                    setUnsolvedConflictsCount(unsolvedConflictsCount - act.conflictCount);
                    return { ...act, conflictCount: 0 }; // create a new object with updated conflictCount
                }
                return act;
            });
            return { ...conf, actions: updatedActions }; // create a new object with updated actions
        });
        setConflicts(updatedConflicts);
    };

    const applyLocalChanges = (localChanges, RawData, id) => {
        // Create a copy of RawData with deep copies of the objects
        //Avoid nested copies
        const copyRawData = JSON.parse(JSON.stringify(RawData));

        // Find the corresponding object in copyRawData based on the id
        const index = copyRawData.findIndex((item) => item.id === id);

        // If the object exists in copyRawData, apply the changes
        if (index !== -1) {
            const changes = localChanges.filter((change) => change.object_metadata.id === id);

            // Apply each property change to the corresponding property in copyRawData
            changes.forEach((change) => {
                const { object_metadata } = change;
                const { id: metadataId, ...changeProperties } = object_metadata;

                // Apply each property change to the corresponding property in copyRawData
                Object.keys(changeProperties).forEach((property) => {
                    copyRawData[index][property] = changeProperties[property];
                });
            });
        }

        return copyRawData;
    };

    const acceptRawDataChanges = (localChanges, RawData) => {
        const updatedLocalChanges = localChanges.map((change) => {
            const { lot_name, object_type, object_metadata } = change;
            const originalMetadata = { ...object_metadata };

            for (const property in originalMetadata) {
                if (property !== 'id') {
                    const matchingData = RawData.find((data) => data.id === object_metadata.id);
                    if (matchingData && matchingData[property]) {
                        originalMetadata[property] = matchingData[property];
                    }
                }
            }

            return {
                lot_name,
                object_type,
                object_metadata: originalMetadata,
            };
        });

        return updatedLocalChanges;
    };

    const getConflicts = () => {
        const conflicts = RawData.reduce((result, rd) => {
            const conflictProperties = localChanges.reduce((props, lc) => {
                if (lc.object_metadata.id === rd.id) {
                    const metadataKeys = Object.keys(lc.object_metadata).filter((key) => key !== 'id');
                    return props.concat(metadataKeys);
                }
                return props;
            }, []);

            const conflictCount = conflictProperties.length;

            result.push({
                lot_label: rd.lot_name,
                maverickType: undefined,
                actions: [{
                    id: rd.id,
                    conflictCount,
                    actt: undefined,
                }],
            });

            return result;
        }, []);

        console.log(conflicts);
    };



    // Solve conflicts (Accept Local/Remote)
    const handleConflicts = (msgType, actid) => {
        switch (msgType) {
            case 'ACCEPT_LOCAL':
                // do stuff
                console.log(`Accept Local changes for ${actid} action.`)

                const updatedDBValues = applyLocalChanges(localChanges, RawData, actid);
                console.log('RawData', RawData)
                console.log('localChanges', localChanges)
                console.log('updatedDBValues', updatedDBValues)
                break;
            case 'ACCEPT_REMOTE':
                // do stuff
                console.log(`Accept Remote changes for ${actid} action.`)
                const updatedLocalChanges = acceptRawDataChanges(localChanges, RawData);
                console.log('RawData', RawData)
                console.log('localChanges', localChanges)
                console.log('updatedLocalChanges', updatedLocalChanges)
                break;
            default:
                break;
        }
        solveIndividualConflictCount(actid)
        setSolvedConflicts([...solvedConflicts, actid])
    };

    // Commits handler
    const handleCommit = (msgType) => {
        switch (msgType) {
            case 'COMMIT_MERGE':
                break;
            case 'ABORT_MERGE':
                // Reset Choices
                setOpen(open)
                setOpenDetails(false)
                setSolvedConflicts([])
                setConflicts(conflicts)
                break;
            default:
                break;
        }
    };

    // Conflict counter
    useEffect(() => {
        // This block is affected by SWR statement (fetching fresh data)
        // Calculate the total number of conflicts found
        const confCount = _conflicts_.reduce((total, conf) => {
            return total + conf.actions.reduce((acc, action) => {
                return acc + (rutils.hasValue(action.conflictCount) ? action.conflictCount : 0);
            }, 0);
        }, 0);
        setUnsolvedConflictsCount(confCount);
    }, [_conflicts_]);

    // Fetching timer
    useEffect(() => {
        let interval;
        if (_open_ && secondsRemaining > -1) {
            interval = setInterval(() => {  // Start the timer
                setSecondsRemaining((prev) => prev - 1);
            }, 1000);
        } else {
            setSecondsRemaining(5);  // Reset the timer
        }
        return () => clearInterval(interval); // Clean up the interval
    }, [_open_, secondsRemaining]);


    return (
        <div>
            {/* Modal Title */}
            <BootstrapDialog
                onClose={handleClickClose}
                open={_open_} >
                <BootstrapDialogTitle
                    onClose={handleClickClose}
                    style={{
                        display: 'flex',
                        fontSize: '15px',
                        margin: '0',
                        padding: '20px 60px 20px 20px'
                    }} >
                    <span>Resolve conflicts before merging <b> local changes </b> into <b>remote database</b></span>
                    <Button
                        onClick={() => { getConflicts() }}>
                        Test btn
                    </Button>
                </BootstrapDialogTitle>
                {/* Fetching counter */}
                <DialogContent dividers>
                    <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <b style={{
                            fontSize: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0px 0px 40px 0px'
                        }}>
                            {unsolvedConflictsCount > 0 && unsolvedConflictsCount !== undefined ?
                                <WarningAmberIcon style={{ color: '#edae14' }} /> :
                                <CheckCircleIcon style={{ color: '#09bf09' }} />}
                            {unsolvedConflictsCount > 0 && unsolvedConflictsCount !== undefined ?
                                `${unsolvedConflictsCount} ${unsolvedConflictsCount > 1 && unsolvedConflictsCount !== undefined ?
                                    'conflicts found.' : 'conflict found.'}` :
                                'Conflicts resolved.'}
                        </b>
                        <span>
                            <CircularProgress style={{
                                color: '#626262',
                                width: '25px',
                                height: '25px',
                                marginRight: '10px'
                            }} />
                            Looking for conflicts in: {secondsRemaining}
                        </span>
                    </span>
                    {/* Conflicts */}
                    {_conflicts_.map((conf, idx) => (
                        <span key={idx} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                    <div>
                                        <Typography
                                            gutterBottom
                                            style={{ marginLeft: '5px', fontSize: '15px', display: 'flex', alignItems: 'center' }}>
                                            <LayersIcon />
                                            {`${conf.lot_label} - ${conf.maverickType}`}
                                        </Typography>
                                    </div>
                                    {conf.actions.map((act, _idx) => (
                                        <div key={_idx} style={{ display: 'flex', marginBottom: '20px', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', fontSize: '12px', flexDirection: 'column' }}>
                                                <span style={{ fontSize: '14px', marginLeft: '5px' }}>{act.type}</span>
                                                <div style={{ display: 'flex', width: '170px', justifyContent: 'space-between' }}>
                                                    <Typography
                                                        gutterBottom
                                                        style={{
                                                            marginLeft: '5px',
                                                            color: solvedConflicts.includes(act.id) ? '#09bf09' : '#edae14',
                                                            marginRight: '5px',
                                                            fontSize: '15px'
                                                        }}>
                                                        {solvedConflicts.includes(act.id) ? (
                                                            <span style={{ display: 'flex', whiteSpace: 'nowrap' }}>
                                                                No Conflicts remaining
                                                                <CheckCircleIcon style={{
                                                                    color: '#09bf09',
                                                                    marginBottom: '0.35em'
                                                                }} />
                                                            </span>)
                                                            : `${act.conflictCount} ${act.conflictCount > 1 ? 'conflicts' : 'conflict'}`}
                                                    </Typography>
                                                    <Chip
                                                        label="See details"
                                                        size="small"
                                                        variant="outlined"
                                                        onClick={() => handleClickSeeDetails()}
                                                    />
                                                </div>
                                            </div>
                                            {/* Merge options */}
                                            <span style={{ display: 'flex', flexDirection: 'column' }}>
                                                <Chip
                                                    style={{ marginTop: '5px', marginBottom: '5px' }}
                                                    label="Accept local changes"
                                                    size="small"
                                                    variant="outlined"
                                                    disabled={solvedConflicts.includes(act.id)}
                                                    onClick={() => handleConflicts('ACCEPT_LOCAL', act.id)}
                                                />
                                                <Chip
                                                    label="Accept remote changes"
                                                    size="small"
                                                    variant="outlined"
                                                    disabled={solvedConflicts.includes(act.id)}
                                                    onClick={() => handleConflicts('ACCEPT_REMOTE', act.id)}
                                                />
                                            </span>
                                        </div>
                                    ))}
                                </span>
                            </span>
                        </span>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button
                        size="small"
                        variant="contained"
                        disabled={solvedConflicts.length === 0}
                        onClick={() => handleCommit('ABORT_MERGE')}>
                        Abort merge
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        disabled={unsolvedConflictsCount !== 0}
                        onClick={() => handleCommit('COMMIT_MERGE')}>
                        Commit merge
                    </Button>
                </DialogActions>
                {/* Call Conflict Table for details */}
                {openDetails ? '' : ''}
            </BootstrapDialog >
        </div >
    );
}
