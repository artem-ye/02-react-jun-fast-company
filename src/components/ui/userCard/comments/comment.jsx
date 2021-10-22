import React, { useEffect, useState } from 'react';
import API from '../../../../API';
import Avatar from '../../avatar';

const Comment = ({data}) => {
    const [commentAuthor, setCommentAuthor] = useState({});

    useEffect(() => {
        API.users.getById(data.userId).then(res => {
            setCommentAuthor(res);
        });
    }, []);

    return (
        <div className="bg-light card-body  mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start ">

                        <Avatar
                            style={{width: 65, height: 65}}
                            className='shadow-1-strong me-3'
                        />

                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1 ">
                                        {commentAuthor.name}&nbsp;
                                        <span className="small">
                                            {data.created_at}
                                        </span>
                                    </p>
                                    <button className="btn btn-sm text-primary d-flex align-items-center">
                                        <i className="bi bi-x-lg"></i>
                                    </button>
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
