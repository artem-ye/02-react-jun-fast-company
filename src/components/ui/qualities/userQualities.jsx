import React from 'react';
import PropTypes from 'prop-types';
import Quality from './qality';
// import { useQualities } from '../../../hooks/useQualities';

const UserQualities = ({qualities}) => {
    // const {isLoading, getQuality} = useQualities();

    // if (isLoading) {
    //     return <h1>loadig...</h1>;
    // }

    return (
        <>
            {
                qualities.map((qualityId, key) => (<Quality key={key} id={qualityId}/>))
            }
        </>
    );
};

UserQualities.protoTypes = {
    qualities: PropTypes.array.isRequired
};

export default UserQualities;
