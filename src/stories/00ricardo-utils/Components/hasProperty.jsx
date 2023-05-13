import React, { useState } from 'react';
import PropTypes from 'prop-types';
import rutils from '00ricardo-utils'
import { TextareaAutosize } from '@mui/base';

export const HasProperty = ({ property }) => {
    const [object, setValue] = useState('')
    const [output, setOutput] = useState(null)
    const _hasValue = (e) => {
        setValue(e.target.value)
        setOutput(rutils.hasProperty(JSON.parse(e.target.value), property))
        return rutils.hasProperty(JSON.parse(e.target.value), property)
    }

    return (
        <div>
            <TextareaAutosize
                placeholder='Testing hasProperty'
                value={object}
                style={{ width: '70%', maxWidth: '70%', height: '400px' }}
                onChange={(e) => _hasValue(e)}
            />

            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h4>Result: </h4>
                <span style={{ marginLeft: '10px' }}>{output ? 'True' : 'False'}</span>
            </div>
        </div>
    );
};

HasProperty.propTypes = {
    'property': PropTypes.string
};

HasProperty.defaultProps = {
    'property': ''
};
