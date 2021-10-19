import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const MultiSelectField = ({label, defaultValue, name, options, onChange}) => {
    const handleChange = (value) => {
        onChange({name, value});
    };

    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <Select
                defaultValue={defaultValue}
                closeMenuOnSelect={false}
                isMulti
                name={name}
                options={options || []}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
            />
        </div>
    );
};

MultiSelectField.propTypes = {
    label: PropTypes.string,
    defaultValue: PropTypes.array,
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func
};

export default MultiSelectField;
