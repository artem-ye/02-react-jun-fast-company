import React from 'react';

const UsersTableRowQualities = ({qualities}) => {
    const renderQuality = quality => {
        return (
            <span 
                key={quality._id} 
                className={`badge m-1 bg-${quality.color}`}
            >{quality.name}</span>
        );
    };

    return (
        <>
            {qualities.map(renderQuality)}
        </>        
    );
}
 
export default UsersTableRowQualities;
