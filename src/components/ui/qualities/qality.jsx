import React from 'react';
import { useQualities } from '../../../hooks/useQualities';

const Quality = ({id}) => {
    const {isLoading, getQuality} = useQualities();

    if (isLoading) {
        return null;
    }

    const {color, name} = getQuality(id);

    return (
        <span
            className={`badge m-1 bg-${color}`}
        >{name}</span>
    );
};

export default Quality;
