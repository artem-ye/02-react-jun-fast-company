import React from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../../hooks/useAuth';
import { getUserById } from '../../../store/users';
import displayDate from '../../../utils/dateMoment';

const Comment = ({data, handleDelete}) => {
    const commentAuthor = useSelector(getUserById(data.userId));
    const {currentUser} = useAuth();

    const onDeleteClick = (id) => {
        handleDelete(id);
    };

    return (
        <div className="bg-light card-body  mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start ">

                        {/* <Avatar
                            style={{width: 65, height: 65}}
                            className='shadow-1-strong me-3'
                        /> */}
                        <img
                            className='shadow-1-strong me-3'
                            style={{width: 65, height: 65}}
                            src={commentAuthor.image}
                        />

                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1 ">
                                        {commentAuthor.name}&nbsp;
                                        <span className="small">
                                            {displayDate(data.created_at)}
                                        </span>
                                    </p>
                                    {data.userId === currentUser._id &&
                                        <button className="btn btn-sm text-primary d-flex align-items-center" onClick={() => onDeleteClick(data._id)}>
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    }
                                </div>
                                <p className="small mb-0">{data.content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comment;
