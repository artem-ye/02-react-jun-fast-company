import React from 'react';
import PropTypes from 'prop-types';

const UsersTableRowQualities = ({qualities}) => {
    const renderQuality = quality => (
        <span
            key={quality._id}
            className={`badge m-1 bg-${quality.color}`}
        >{quality.name}</span>
    );

    return (
        <>
            {qualities.map(renderQuality)}
        </>
    );
};

UsersTableRowQualities.protoTypes = {
    qualities: PropTypes.array.isRequired
};

export default UsersTableRowQualities;
