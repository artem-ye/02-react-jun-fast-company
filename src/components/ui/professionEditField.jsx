import React from 'react';
import PropTypes from 'prop-types';
import SelectField from '../common/form/selectField';
import { useSelector } from 'react-redux';
import { getProfessions, getProfessionsLoadingStatus } from '../../store/professions';

const ProfessionEditField = ({label, name, value: professionId, onChange, error}) => {
    const professions = useSelector(getProfessions());
    const isLoading = useSelector(getProfessionsLoadingStatus());

    if (isLoading) return 'loading...';

    const professionsToOptions = (professions) => Object.values(professions).map(
        ({_id, name}) => ({value: _id, name})
    );

    const handleChange = (data) => {
        onChange({
            name,
            value: data.value
        });
    };

    const selectedProfession = professions.find(prof => prof._id === professionId) || {};

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
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string
};

export default ProfessionEditField;
