import React, { useEffect, useState } from 'react';
import API from '../../../../API';
import Comment from './comment';
import NewCommentForm from './newCommentForm';

const CommentsList = ({userId}) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        API.comments.fetchCommentsForUser(userId)
            .then(res => {
                const sortedComments = res.sort((a, b) => a.created_at > b.created_at ? -1 : 1);
                setComments(sortedComments);
            });
    }, []);

    const handleCommentDelete = (commentId) => {
        API.comments.remove(commentId);
        setComments(comments.filter(comment => comment._id !== commentId));
    };

    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">
                    <NewCommentForm userId={userId}/>
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr />
                    {
                        comments.map(comment =>
                            (<Comment key={comment._id} data={comment} handleDelete={handleCommentDelete}/>)
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default CommentsList;
