import React from 'react';

const Quality = ({quality}) => {
    const {color, name} = quality || {};

    return (
        <span
            className={`badge m-1 bg-${color}`}
        >{name}</span>
    );
};

export default Quality;
