import React from 'react';
// import API from '../../../API';
import { useComments } from '../../../hooks/useComments';
import Comment from './comment';
import NewCommentForm from './newCommentForm';

const CommentsList = ({userId}) => {
    const {comments, createComment, removeComment} = useComments();
    const handleCommentDelete = (commentId) => {
        // API.comments.remove(commentId);
        // setComments(comments.filter(comment => comment._id !== commentId));
        removeComment(commentId);
    };

    const handleCommentAdd = (data) => {
        createComment(data);
    };

    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">
                    <NewCommentForm pageId={userId} onSubmit={handleCommentAdd}/>
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
