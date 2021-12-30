import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from './useAuth';
import {nanoid} from 'nanoid';
import commentService from '../services/comment.service';
import { toast } from 'react-toastify';

const CommentsContext = React.createContext(null);

export const useComments = () => {
    return React.useContext(CommentsContext);
};

export const CommentsProvider = ({children}) => {
    const [comments, setComments] = useState([]);
    const {userId} = useParams();
    const {currentUser} = useAuth();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getComments();
    }, [userId]);

    async function createComment(data) {
        const comment = {
            _id: nanoid(),
            ...data,
            pageId: userId,
            created_at: Date.now(),
            userId: currentUser._id
        };

        try {
            const res = await commentService.createComment(comment);
            setComments(prev => [...prev, res]);
        } catch (err) {
            errorCatcher(err);
        } finally {
            setIsLoading(false);
        }
    }

    async function getComments() {
        try {
            const {content} = await commentService.getComments(userId);
            setComments(content);
        } catch (err) {
            errorCatcher(err);
        }
    }

    async function removeComment(commentId) {
        try {
            const {content} = await commentService.removeComment(commentId);
            console.log('Del res', content);
            setComments(prev => prev.filter(comment => comment._id !== commentId));
        } catch (err) {
            errorCatcher(err);
        }
    }

    function errorCatcher(error) {
        const errMsg =
            error?.response?.data?.error ||
            error?.response?.data?.message ||
            error?.response?.statusText ||
            error?.message ||
            JSON.stringify(error);

        setError(errMsg);
        toast.error('Error ' + errMsg);
    }

    return (
        <CommentsContext.Provider value={{comments, getComments, createComment, removeComment, error, isLoading}}>
            {children}
        </CommentsContext.Provider>
    );
};
