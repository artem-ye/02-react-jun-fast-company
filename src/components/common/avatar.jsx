import React from 'react';
import PropTypes from 'prop-types';

const Avatar = ({style, className}) => {
    className = 'rounded-circle' + (!className ? '' : ' '+className);

    return (
        <img
            src={`https://avatars.dicebear.com/api/avataaars/${(
                Math.random() + 1
            )
                .toString(36)
                .substring(7)}.svg`}
            className={className}
            style={style}
            alt="avatar"
        />
    );
};

Avatar.propTypes = {
    style: PropTypes.object,
    className: PropTypes.string
};

export default Avatar;
