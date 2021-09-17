import React from 'react';
import PropTypes from 'prop-types';

const TableHeader = ({sortParams, onSort, columns}) => {
    const handleSort = (field) => {
        let order = 'asc';

        if (field === sortParams.iter) {
            order = (sortParams.order === 'asc' ? 'desc' : 'asc');
        }

        onSort({iter: field, order});
    };

    const renderSortCaret = (path) => {
        if (path !== sortParams.iter) return null;

        return (
            <i className={'bi bi-caret-' + (sortParams.order === 'asc' ? 'up' : 'down') + '-fill'}></i>
        );
    };

    return (
        <thead>
            <tr>{
                Object.entries(columns).map(([key, val]) => {
                    const {path, name} = val;
                    const onClick = path
                        ? () => handleSort(path)
                        : null;

                    return (
                        <th
                            key={key}
                            onClick={onClick}
                            role={onClick && 'button'}
                            scope="col"
                        >{name} {renderSortCaret(path)}</th>
                    );
                })
            }</tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    sortParams: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
