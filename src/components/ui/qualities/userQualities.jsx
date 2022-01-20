import React from 'react';
import PropTypes from 'prop-types';
import Quality from './qality';
import { useSelector } from 'react-redux';
import { getQalitiesByIds, getQualitiesLoadingStatus } from '../../../store/qualities';

const UserQualities = ({qualities}) => {
    if (!qualities) return;

    const qualitiesList = useSelector(getQalitiesByIds(qualities));
    const isLoading = useSelector(getQualitiesLoadingStatus());

    if (isLoading) return 'loading';

    return (
        <>
            {
                // qualities.map((quality, key) => (<Quality key={key} id={quality}/>))
                qualitiesList.map((quality, key) => (<Quality key={key} quality={quality}/>))
            }
        </>
    );
};

UserQualities.protoTypes = {
    qualities: PropTypes.array.isRequired
};

export default UserQualities;
