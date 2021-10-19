import React from 'react';
import { useState, useEffect } from 'react/cjs/react.development';
import TextField from '../common/form/textField';
import {validator} from '../../utils/validator';
import CheckBoxField from '../common/form/checkBoxField';

const LoginForm = () => {
    const initialDataState = {email: '', password: '', stayOn: false};
    const [data, setData] = useState(initialDataState);

    const [errors, setErrors] = useState({});

    useEffect(() => {
        validate();
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: {message: 'Адрес эл. почты обязателен для заполнения'},
            isEmail: {message: 'Адрес эл. имеет не верный формат'}
        },
        password: {
            isRequired: {message: 'Пароль не может быть пустым'},
            isCapital: {message: 'Должне содержать большую букву'},
            isDigit: {message: 'Должне содержать цифры'},
            minLen: {message: 'Пароль должен быть не менее 8 символов', value: 8}
        },
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return (Object.keys(errors).length === 0);
    };

    const handleChange = (data) => {
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

        console.log('Submit val', data);
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

            <button type="submit" disabled={ !isValid } className="btn btn-primary w-100 mx-auto mb-4">Submit</button>
        </form>
    );
};

export default LoginForm;
