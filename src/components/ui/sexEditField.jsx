import React from 'react';
import PropTypes from 'prop-types';
import RadioField from '../common/form/radioField';

const SexEditField = ({label, name, value, onChange, error}) => {
    const options = [
        {name: 'Мучжчина', value: 'male'},
        {name: 'Женщина', value: 'female'},
        {name: 'Еще не определился', value: 'other'}
    ];
    return (
        <RadioField
            label={label}
            name={name}
            value={value || options[0].value}
            options={options}
            onChange={onChange}
            error={error}
        />
    );
};

SexEditField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string
};

export default SexEditField;
