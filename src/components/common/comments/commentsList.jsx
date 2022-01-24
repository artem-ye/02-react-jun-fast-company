import { nanoid } from 'nanoid';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createComment, getComments, getCommentsLoadingStatus, loadCommentsList, removeComment } from '../../../store/comments';
import { getCurrentUserId } from '../../../store/users';
import Comment from './comment';
import NewCommentForm from './newCommentForm';

const CommentsList = ({userId}) => {
    const dispatch = useDispatch();
    const comments = useSelector(getComments());
    const commentsLoadingStatus = useSelector(getCommentsLoadingStatus());
    const currentUserId = useSelector(getCurrentUserId());

    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);

    const handleCommentDelete = (commentId) => {
        dispatch(removeComment(commentId));
    };

    const handleCommentAdd = (data) => {
        const comment = {
            _id: nanoid(),
            ...data,
            pageId: userId,
            created_at: Date.now(),
            userId: currentUserId
        };

        dispatch(createComment(comment));
    };

    if (commentsLoadingStatus) return 'loading';

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
