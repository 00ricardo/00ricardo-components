import {
    useEffect, useState, Fragment
} from 'react'
import rutils from '00ricardo-utils'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
const PersonalFilters = () => {
    const [personalFilters, setPersonalFilters] = useState([])
    const [autoCompleteOpen, setAutoCompleteOpen] = useState(false)
    const [personalFilterSelected, setPersonalFilterSelected] = useState({
        filterViewName: '',
        filterViewLabel: '',
        filterName: '',
        filters: []
    })
    const viewSelected = 'RBG_EPI_INLINE'

    // ! JSON from API
    function simulatePromiseResult(): Promise<string> {
        return new Promise((resolve, reject) => {
            // Simulating some asynchronous operation, like fetching data from a server
            setTimeout(() => {
                // Simulating a successful result
                const options = [
                    {
                        filterViewName: 'RBG_EPI_INLINE',
                        filterViewLabel: 'Regensburg: EPI Inline',
                        filterName: 'Filter 1',
                        filters: [
                            { lot: 111, system_code: 'RBG' }
                        ]
                    },
                    {
                        filterViewName: 'RBG_EPI_INLINE',
                        filterViewLabel: 'Regensburg: EPI Inline',
                        filterName: 'Filter 2',
                        filters: [
                            { lot: 222, system_code: 'RBG' },
                            { lot: 333, system_code: 'RBG' },
                            { lot: 444, system_code: 'RBG' },
                        ]
                    },
                    {
                        filterViewName: 'RBG_EOL_INLINE',
                        filterViewLabel: 'Regensburg: End Of Line Inline',
                        filterName: 'Filter 1',
                        filters: [
                            { lot: 555, system_code: 'RBG' },
                            { lot: 666, system_code: 'RBG' },
                            { lot: 777, system_code: 'RBG' },
                        ]
                    },
                    {
                        filterViewName: 'RBG_EPI_MEETING',
                        filterViewLabel: 'Regensburg: EPI Meeting',
                        filterName: 'Filter 1',
                        filters: [
                            { lot: 888, system_code: 'RBG' },
                            { lot: 999, system_code: 'RBG' },
                            { lot: 9999, system_code: 'RBG' },
                        ]
                    },
                    {
                        filterViewName: 'CMOS_EXTRACT_PRODUCT',
                        filterViewLabel: 'CMOS Extract Product',
                        filterName: 'Filter X',
                        filters: [
                            { lot: 123, system_code: 'RBG' },
                            { lot: 456, system_code: 'RBG' },
                            { lot: 789, system_code: 'RBG' },
                        ]
                    },
                    {
                        filterViewName: 'CMOS_EXTRACT_PRODUCT',
                        filterViewLabel: 'CMOS Extract Product',
                        filterName: 'Filter Z',
                        filters: [
                            { lot: 113123, system_code: 'RBG' },
                            { lot: 41312356, system_code: 'RBG' },
                            { lot: 54576788, system_code: 'RBG' },
                        ]
                    },
                    {
                        filterViewName: 'CMOS_EXTRACT_PRODUCT',
                        filterViewLabel: 'CMOS Extract Product',
                        filterName: 'Filter Y',
                        filters: [
                            { lot: 324567, system_code: 'RBG' },
                            { lot: 745675, system_code: 'RBG' },
                            { lot: 757546789, system_code: 'RBG' },
                        ]
                    },
                ]
                resolve([...options]);

                // Simulating an error
                // reject(new Error("Simulated error"));
            }, 3000); // Simulating a delay of 2 seconds
        });
    }
    const handlePersonalFilterSelection = (e) => {
        const idx = parseInt(e.target.attributes['data-option-index'].value)
        setPersonalFilterSelected({ ...options[idx] })
        console.log("Personal Filter Selected: ", { ...options[idx] })
    }

    useEffect(() => {
        const loadPersonalFilters = async () => {
            const result = await simulatePromiseResult()
            setPersonalFilters([...result])
        }

        if (autoCompleteOpen && !rutils.hasValue(personalFilters)) loadPersonalFilters()

    }, [autoCompleteOpen, personalFilters])

    return (
        <Autocomplete
            sx={{
                width: 300,
                "& .Mui-focused": {
                    color: '#4f4e4e !important'
                },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: '#4f4e4e !important'
                },
            }}
            open={autoCompleteOpen}
            onOpen={() => { setAutoCompleteOpen(true); }}
            onClose={() => { setAutoCompleteOpen(false); }}
            loadingText={"Loading Personal Filters..."}
            loading={autoCompleteOpen && !rutils.hasValue(personalFilters)}
            options={personalFilters}
            groupBy={(option) => option.filterViewLabel}
            getOptionLabel={(option) => option.filterName}
            getOptionDisabled={(option) => option.filterViewName !== viewSelected}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Personal Filters"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <Fragment>
                                {autoCompleteOpen && !rutils.hasValue(personalFilters) ?
                                    <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </Fragment>
                        ),
                    }}
                />
            )}
            onChange={handlePersonalFilterSelection}
            isOptionEqualToValue={(option) => option.filterViewName === viewSelected && option.filterName === personalFilterSelected.filterName}
        />
    )
}


export default PersonalFilters