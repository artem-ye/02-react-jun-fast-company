import React from 'react';
// import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import API from '../../../API';
import MultiSelectField from '../../common/form/multiSelectField';
import { useQualities } from '../../../hooks/useQualities';

const QualitiesEditField = ({label, name, value, onChange}) => {
    const qualitiesContext = useQualities();

    if (qualitiesContext.isLoading) return null;
    const qualities = qualitiesContext.qualities;

    const options = (qualities).map(
        ({_id, name}) => ({value: _id, label: name})
    );
    // const defaultValue = value.map(qualityId => options.find(el => el.value === qualityId));
    const defaultValue = value.map(_id => options.find(opt => opt.value === _id));

    // const optionsToQualities = (options) => {
    //     const qualitiesValues = Object.values(qualities);
    //     return options.map(option => qualitiesValues.find(quality => quality._id === option.value));
    // };

    const handleChange = (data) => {
        const payload = {
            name,
            value: data.value.map(el => el.value)
        };

        onChange(payload);
    };

    return (
        <MultiSelectField
            label={label}
            name={name}
            // defaultValue={qualitiesToOptions(defaultQualities)}
            defaultValue={defaultValue}
            isMulti
            // options={qualitiesToOptions(qualities)}
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleChange}
        />

    );
};

QualitiesEditField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    defaultValue: PropTypes.array,
    onChange: PropTypes.func.isRequired
};

export default QualitiesEditField;
