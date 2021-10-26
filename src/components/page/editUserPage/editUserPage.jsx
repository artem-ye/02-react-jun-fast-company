import React from 'react';
import PropTypes from 'prop-types';
import UserEditForm from '../../ui/userEditForm';
import BackButton from '../../common/backButton';

const EditUserPage = ({userId}) => {
    return (
        <div className="container mt-5">
            {/* <button
                className="btn btn-primary position-absolute"
                style={{left: '15px', top: '50px'}}
                onClick={onBackBtnClick}
            >Назад</button>
             */}
            <BackButton/>
            <div className="row">
                <div className='col-md-6 offset-md-3 p-4 shadow'>
                    <UserEditForm userId={userId}/>
                </div>
            </div>
        </div>
    );
};

EditUserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default EditUserPage;
