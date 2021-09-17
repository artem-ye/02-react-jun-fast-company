import React from 'react';
import TableBody from './tableBody';
import TableHeader from './tableHeader';

const Table = ({sortParams, onSort, columns, data}) => {
    return (
        <table className="table">
            <TableHeader {...{sortParams, onSort, columns}}/>
            <TableBody
                {...{columns, data}}
            />
        </table>
    );
};

export default Table;
