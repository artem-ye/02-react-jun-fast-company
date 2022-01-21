import React from 'react';
import { useState, useEffect } from 'react/cjs/react.development';
import TextField from '../common/form/textField';
import {validator} from '../../utils/validator';
import CheckBoxField from '../common/form/checkBoxField';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { logIn } from '../../store/users';

const LoginForm = () => {
    const history = useHistory();
    const initialDataState = {email: '', password: '', stayOn: false};
    const [data, setData] = useState(initialDataState);
    const dispatch = useDispatch();

    const [errors, setErrors] = useState({});
    const [authError, setAuthError] = useState(null);

    useEffect(() => {
        validate();
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: {message: 'Адрес эл. почты обязателен для заполнения'}
        },
        password: {
            isRequired: {message: 'Пароль не может быть пустым'}
        },
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return (Object.keys(errors).length === 0);
    };

    const handleChange = (data) => {
        authError && setAuthError(null);
        setData((prevState) => {
            return {...prevState, [data.name]: data.value};
        });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();

        if (!validate()) {
            alert('Errors detected:' + JSON.stringify(errors));
            return;
        }

        const redirectPath = history?.location?.state?.from?.pathname || '/';
        dispatch(logIn(data, redirectPath));
        // const path = history?.location?.state?.from?.pathname || '/';
        // history.push(path);
    };

    const isValid = Object.keys(errors).length === 0;

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                labelContent="E-mail"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                labelContent="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />

            <CheckBoxField
                value={data.stayOn}
                name='stayOn'
                onChange={handleChange}
            >Запомнить меня</CheckBoxField>
            {authError && <p className="text-danger">{authError}</p>}
            <button type="submit" disabled={ !isValid || authError } className="btn btn-primary w-100 mx-auto mb-4">Submit</button>
        </form>
    );
};

export default LoginForm;
