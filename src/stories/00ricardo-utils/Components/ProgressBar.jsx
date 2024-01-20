import React from 'react'
import { withStyles } from "@mui/styles";
import LinearProgress from "@mui/material/LinearProgress";

function ProgressBar({ backgroundColor, progressColor }) {

    const ProgressBarComponent = withStyles((theme) => ({
        root: {},
        colorPrimary: {
            backgroundColor: `${progressColor} !important`,
        },
        bar: {
            backgroundColor: `${backgroundColor} !important`,
        },
    }))(LinearProgress);
    return (
        <ProgressBarComponent />
    )
}

export default ProgressBar