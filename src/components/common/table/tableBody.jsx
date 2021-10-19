import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const TableBody = ({data, columns}) => {
    const columnsEntries = Object.entries(columns);

    const renderCellContent = (col, rowData) => {
        const {component, path} = col;

        if (component) {
            if (typeof component === 'function') {
                return col.component(rowData);
            }
            return component;
        }

        return _.get(rowData, path);
    };

    return (
        <tbody>{
            data.map((dataItem) => {
                // const columnEntryToTableCol = ([key, colItem]) => (
                //     <td key={key}>{
                //         renderCellContent(colItem, dataItem)
                //     }</td>
                // );

                // return (
                //     <tr key={dataItem._id}>
                //         {columnsEntries.map(columnEntryToTableCol)}
                //     </tr>
                // );
                // const columnEntryToTableCol = ([key, colItem]) => (
                //     <td key={key}>{
                //         renderCellContent(colItem, dataItem)
                //     }</td>
                // );

                return (
                    <tr key={dataItem._id}>
                        {columnsEntries.map(
                            ([key, columnEntry]) => (
                                <td key={key}>{renderCellContent(columnEntry, dataItem)}</td>
                            )
                        )}
                    </tr>
                );
            })
        }</tbody>
    );
};

TableBody.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableBody;
