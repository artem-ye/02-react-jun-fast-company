import React from 'react';
import PropTypes from 'prop-types';
import MultiSelectField from '../../common/form/multiSelectField';
import { useSelector } from 'react-redux';
import { getQualities, getQualitiesLoadingStatus } from '../../../store/qualities';

const QualitiesEditField = ({label, name, value, onChange}) => {
    const qualities = useSelector(getQualities());
    const isLoading = useSelector(getQualitiesLoadingStatus());

    if (isLoading) return null;

    const options = (qualities).map(
        ({_id, name}) => ({value: _id, label: name})
    );
    const defaultValue = value.map(_id => options.find(opt => opt.value === _id));

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
