import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = ({pagesCount, currentPageNum, onPageChange}) => {
    if (pagesCount < 2) return null;

    const pagesNums = _.range(1, pagesCount+1);

    return (
        <ul className="pagination">
            {pagesNums.map(pageNum => {
                return (
                    <li key={pageNum} className={'page-item' + (pageNum === currentPageNum ? ' active' : '')}>
                        <a
                            className="page-link"
                            onClick={() => onPageChange(pageNum)}
                        >{pageNum}</a>
                    </li>
                );
            })}

        </ul>
    );
};

Pagination.propTypes = {
    pagesCount: PropTypes.number.isRequired,
    currentPageNum: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export default Pagination;
