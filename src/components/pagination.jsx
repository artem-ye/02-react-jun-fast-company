import React from 'react';

const Pagination = ({pageCount, onPageSelect}) => {
    const renderPageItems = () => {
        const component = [];
        for (let i=1; i<=pageCount; i++) {
            component.push(
                <li 
                    key={i} 
                    className ="page-item"
                    onClick={(e)=>{
                        e.preventDefault();
                        onPageSelect(i)
                    }}
                >
                    <a className ="page-link" href="/">{i}</a>
                </li>
            );
        }
        return component;
    }

    return ( 
        <nav aria-label="Page navigation example">
        <ul className ="pagination">
            <li className ="page-item">
                <a className ="page-link" href="/" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>

            {renderPageItems()}
            
            <li className ="page-item">
                <a className ="page-link" href="/" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
        </nav>
    );
}

export default Pagination;