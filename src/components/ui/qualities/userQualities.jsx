import React from 'react';
import PropTypes from 'prop-types';
import Quality from './qality';

const UserQualities = ({qualities}) => {
    return (
        <>
            {
                qualities.map((quality, key) => (<Quality key={key} quality={quality}/>))
            }
        </>
    );
};

UserQualities.protoTypes = {
    qualities: PropTypes.array.isRequired
};

export default UserQualities;
