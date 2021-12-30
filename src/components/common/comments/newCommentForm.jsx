import React, {useState} from 'react';
// import API from '../../../API';
import {validator} from '../../../utils/validator';
// import SelectField from '../form/selectField';
import TextAreaField from '../form/textAreaField';

const NewCommentForm = ({onSubmit}) => {
    // const [users, setUsers] = useState([]);
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});

    const validatorConfig = {
        content: {
            isRequired: {message: 'Сообщение не может быть пустым'}
        }
        // userId: {
        //     isRequired: {message: 'Не выбран получатель сообщения'}
        // }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return (Object.keys(errors).length === 0);
    };

    const clear = () => {
        setData({});
        setErrors({});
    };

    // useEffect(() => {
    //     let isAborted = false;

    //     API.users.fetchAll().then(res => {
    //         if (!isAborted) {
    //             setUsers(res.filter(usr => usr._id.toString() !== pageId));
    //         }
    //     }).catch(e => console.log('NewCommentForm API.users.fetchAll() error'));

    //     return () => {
    //         isAborted = true;
    //     };
    // }, []);

    const handleChange = (data) => {
        setData(prevState => ({...prevState, [data.name]: data.value}));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        onSubmit(data);
        clear();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>New comment</h2>
            <TextAreaField
                label='Сообщение'
                name='content'
                value={data.content || ''}
                onChange={handleChange}
                error={errors.content}
            />
            <button className='btn btn-primary' type='submit'>Опубликовать</button>
        </form>
    );
};

export default NewCommentForm;
