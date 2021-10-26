import React from 'react';
import { useHistory } from 'react-router';

const BackButton = () => {
    const history = useHistory();
    const onBackBtnClick = () => {
        history.goBack();
    };

    return (
        <button className="btn btn-primary" onClick={onBackBtnClick}>
            <i className="bi bi-caret-left"></i>
            Назад
        </button>
    );
};

export default BackButton;
