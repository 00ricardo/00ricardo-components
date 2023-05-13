import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import rutils from '00ricardo-utils'
import { TextareaAutosize } from '@mui/base';
import TransferList from '../SubComponents/TransferList';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
export const HasValue = ({ dataType }) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState('')
    const [output, setOutput] = useState(false)
    const [editable, setEditable] = useState(false)
    const [obj, setObj] = useState(`{}`)

    const _hasValue = (e) => {

        let value = e.target.value
        console.log(value)
        if (dataType === 'String') {
            setValue(value)
        } else {
            setObj(value)
        }
        setOutput(rutils.hasValue(value))
        return rutils.hasValue(value)
    }

    useEffect(() => {
        if (!editable) {
            try {
                setOutput(rutils.hasValue(JSON.parse(obj)))
                setError(null)
            } catch (error) {
                setError('Invalid Object')
                setOutput(false)
            }
        }
    }, [obj, editable])

    useEffect(() => {
        setValue('')
        setOutput(false)
    }, [dataType])

    return (
        <div>
            {dataType === 'String' ?
                <TextareaAutosize
                    placeholder="Testing hasValue"
                    value={value}
                    style={{ width: '100%', height: '300px' }}
                    onChange={(e) => _hasValue(e)}
                    disabled={true}
                />
                : dataType === 'Array' ?
                    <div>
                        <TransferList setValue={setValue} value={value} setOutput={setOutput} />
                        <span>{value !== '' ? JSON.stringify(value) : '[]'}</span>
                    </div>
                    : dataType === 'Object' ?

                        <div style={{ display: 'flex', flexDirection: 'column', width: '70%', maxWidth: '70%' }}>
                            <FormControlLabel control={<Switch checked={editable} onChange={() => setEditable(!editable)} />} label="Editable" />
                            {editable ? <TextareaAutosize
                                placeholder="Testing hasValue"
                                value={obj}
                                style={{ width: '70%', maxWidth: '70%', height: '400px' }}
                                onChange={(e) => _hasValue(e)}
                                disabled={!editable}
                            /> :
                                <pre>
                                    <code style={{ color: error ? 'red' : 'black' }}>
                                        {obj}
                                        {error ? <><br></br> <div>{error}</div></> : ''}
                                    </code>
                                </pre>}
                        </div>
                        : <></>
            }

            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h4>Result: </h4>
                <span style={{ marginLeft: '10px' }}>{output ? 'True' : 'False'}</span>
            </div>
        </div>
    );
};

HasValue.propTypes = {
    'dataType': PropTypes.oneOf(['String', 'Array', 'Object'])
};

HasValue.defaultProps = {
    'dataType': 'String'
};
