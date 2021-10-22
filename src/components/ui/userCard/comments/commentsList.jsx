import React, { useEffect, useState } from 'react';
import API from '../../../../API';
import Comment from './comment';

const CommentsList = ({userId}) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        API.comments.fetchCommentsForUser(userId)
            .then(res => {
                setComments(res);
            });
    }, []);

    return (
        <>
            <div className="card mb-2">
                {'FUCK!!!'+comments.length}
                <div className="card-body ">
                    add comment
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr />
                    {
                        comments.map(comment =>
                            (<Comment key={comment._id} data={comment}/>)
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default CommentsList;
