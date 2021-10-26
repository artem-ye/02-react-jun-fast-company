import React, {useEffect, useState} from 'react';
import API from '../../../../API';
import SelectField from '../../../common/form/selectField';
import TextAreaField from '../../../common/form/textAreaField';
import {validator} from '../../../../utils/validator';

const NewCommentForm = ({userId}) => {
    const [users, setUsers] = useState([]);
    const [data, setData] = useState({pageId: userId});
    const [errors, setErrors] = useState({});

    const validatorConfig = {
        content: {
            isRequired: {message: 'Сообщение не может быть пустым'}
        },
        userId: {
            isRequired: {message: 'Не выбран получатель сообщения'}
        }
    };
    const validate = () => {
        const initialState = {content: '', userId: ''};
        const validateData = {...initialState, ...data};

        const errors = validator(validateData, validatorConfig);
        setErrors(errors);
        return (Object.keys(errors).length === 0);
    };

    useEffect(() => {
        API.users.fetchAll().then(res => {
            setUsers(res.filter(usr => usr._id.toString() !== userId));
        });
    }, []);

    const handleChange = (data) => {
        setData(prevState => ({...prevState, [data.name]: data.value}));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        API.comments.add(data).then(res => {
            document.location = '/users/' + userId;
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>New comment</h2>
            <SelectField
                label='Пользователь'
                name='userId'
                value={data.userId || ''}
                onChange={handleChange}
                defaultOption={'Выберите пользователя'}
                options={
                    users.map(usr => ({name: usr.name, value: usr._id}))
                }
                error={errors.userId}
            />
            <TextAreaField
                label='Сообщение'
                name='content'
                value={data.content}
                onChange={handleChange}
                error={errors.content}
            />
            <button className='btn btn-primary' type='submit'>Опубликовать</button>
        </form>
    );
};

export default NewCommentForm;
