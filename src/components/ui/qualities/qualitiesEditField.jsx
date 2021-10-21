import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import API from '../../../API';
import MultiSelectField from '../../common/form/multiSelectField';

const QualitiesEditField = ({label, name, value, onChange}) => {
    const defaultQualities = value || {};
    const [qualities, setQualities] = useState(defaultQualities);

    useEffect(() => {
        API.qualities.fetchAll()
            .then(data => setQualities(data));
    }, []);

    const qualitiesToOptions = (qualities) => Object.values(qualities).map(
        ({_id, name, color}) => ({value: _id, label: name})
    );

    const optionsToQualities = (options) => {
        const qualitiesValues = Object.values(qualities);
        return options.map(option => qualitiesValues.find(quality => quality._id === option.value));
    };

    const handleChange = (data) => {
        onChange({
            name,
            value: optionsToQualities(data.value)
        });
    };

    return (
        <MultiSelectField
            label={label}
            name={name}
            defaultValue={qualitiesToOptions(defaultQualities)}
            isMulti
            options={qualitiesToOptions(qualities)}
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
