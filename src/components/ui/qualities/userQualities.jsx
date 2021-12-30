import React from 'react';
import PropTypes from 'prop-types';
import Quality from './qality';
// import { useQualities } from '../../../hooks/useQualities';

const UserQualities = ({qualities}) => {
    // const {isLoading, getQuality} = useQualities();

    // if (isLoading) {
    //     return <h1>loadig...</h1>;
    // }

    if (!qualities) return;

    return (
        <>
            {
                qualities.map((quality, key) => (<Quality key={key} id={quality}/>))
            }
        </>
    );
};

UserQualities.protoTypes = {
    qualities: PropTypes.array.isRequired
};

export default UserQualities;
