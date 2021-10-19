import React from 'react';
import TableBody from './tableBody';
import TableHeader from './tableHeader';
import PropTypes from 'prop-types';

const Table = ({sortParams, onSort, columns, data, children}) => {
    return (
        <table className="table">
            {children ||
                <>
                    <TableHeader {...{sortParams, onSort, columns}}/>
                    <TableBody
                        {...{columns, data}}
                    />
                </>
            }
        </table>
    );
};

Table.propTypes = {
    sortParams: PropTypes.object,
    onSort: PropTypes.func,
    columns: PropTypes.object,
    data: PropTypes.array,
    children: PropTypes.array
};

export default Table;
