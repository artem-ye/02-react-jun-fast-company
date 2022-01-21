import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { validator } from '../../utils/validator';
import TextField from '../common/form/textField';
import ProfessionEditField from './professionEditField';
import { QualitiesEditField } from './qualities';
import SexEditField from './sexEditField';
import { useAuth } from '../../hooks/useAuth';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../../store/users';

const UserEditForm = ({userId}) => {
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const { updateUserData} = useAuth();
    const currentUser = useSelector(getCurrentUser());
    const [user, setUser] = useState(currentUser);

    useEffect(() => {
        setUser(currentUser);
    }, [currentUser]);

    useEffect(() => {
        validate();
    }, [user]);

    const validatorConfig = {
        email: {
            isRequired: {message: 'Адрес эл. почты обязателен для заполнения'},
            isEmail: {message: 'Адрес эл. имеет не верный формат'}
        },
        name: {
            isRequired: {message: 'Имя не может быть пустым'}
        }
    };

    const validate = () => {
        const errors = validator(
            {email: '', name: '', ...user},
            validatorConfig
        );
        setErrors(errors);
        return (Object.keys(errors).length === 0);
    };

    const isFormDataValid = () => (Object.keys(errors).length === 0);

    const handleChange = (data) => {
        setUser((prevState) => {
            return {...prevState, [data.name]: data.value};
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userNewState = {...user, _id: userId};
        await updateUserData(userNewState);
        history.push('/users/'+userId);
    };

    if (!user) return (<h3>User {userId} not found</h3>);
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                labelContent="Имя"
                name="name"
                value={user.name}
                onChange={handleChange}
                error={errors.name}
            />
            <TextField
                labelContent="Электропочта"
                name="email"
                value={user.email || ''}
                onChange={handleChange}
                error={errors.email}
            />
            <ProfessionEditField
                label='Профессия'
                name='profession'
                value={user.profession}
                onChange={handleChange}
                error={errors.profession}
            />
            <SexEditField
                label='Пол'
                name='sex'
                onChange={handleChange}
                value={user.sex}
                error={errors.sex}
            />
            <QualitiesEditField
                label='Качества'
                name="qualities"
                value={user.qualities}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
            />
            <button
                type="submit"
                disabled={ !isFormDataValid() }
                className="btn btn-primary"
            >Обновить</button>
        </form>
    );
};

UserEditForm.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserEditForm;
