import React from 'react';
import PropTypes from 'prop-types';

const GroupList = ({items, keyProperty, contentProperty, onItemSelect, selectedItem}) => {
    const renderListItem = (item) => {
        const {[keyProperty]: id, [contentProperty]: content} = item;
        return (
            <li
                key={id}
                className={'list-group-item' + (item === selectedItem ? ' active' : '')}
                onClick={() => onItemSelect(item)}
                role='button'
            >{content}</li>
        );
    };

    const itemsArray = Object.values(items);

    return (
        <ul className="list-group">
            {items && itemsArray.map(renderListItem)}
        </ul>
    );
};
GroupList.defaultProps = {
    keyProperty: '_id',
    contentProperty: 'name'
};
GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    keyProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func.isRequired,
    selectedItem: PropTypes.object
};

export default GroupList;
