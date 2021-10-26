import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import API from '../../API';
import SelectField from '../common/form/selectField';

const ProfessionEditField = ({label, name, value, onChange, error}) => {
    const [professions, setProfessions] = useState(!value ? [] : [value]);

    useEffect(() => {
        let isAborted = false;

        API.professions.fetchAll()
            .then(res => {
                if (!isAborted) setProfessions(res);
            });

        return () => {
            isAborted = true;
        };
    }, []);

    const professionsToOptions = (professions) => Object.values(professions).map(
        ({_id, name}) => ({value: _id, name})
    );

    const handleChange = (data) => {
        onChange({
            name,
            value: professions.find(el => el._id === data.value)
        });
    };

    const selectedProfession = value || {};

    return (
        <SelectField
            label={label}
            value={selectedProfession._id}
            onChange={handleChange}
            options={professionsToOptions(professions)}
            error={error}
            defaultOption='Choose...'
        />
    );
};

ProfessionEditField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string
};

export default ProfessionEditField;
