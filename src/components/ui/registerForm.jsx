import React, {useState, useEffect} from 'react';
import {validator} from '../../utils/validator';
import TextField from '../common/form/textField';

import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelectField';
import CheckBoxField from '../common/form/checkBoxField';

import { useAuth } from '../../hooks/useAuth';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getQualities } from '../../store/qualities';
import { getProfessions } from '../../store/professions';

const RegisterForm = () => {
    const history = useHistory();

    const initialDataState = {
        email: '',
        name: '',
        password: '',
        profession: '',
        sex: 'male',
        qualities: [],
        license: false
    };
    const [data, setData] = useState(initialDataState);
    const [errors, setErrors] = useState({});
    const qualities = useSelector(getQualities());
    const professions = useSelector(getProfessions());
    const {signUp} = useAuth();

    useEffect(() => {
        validate();
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: {message: 'Адрес эл. почты обязателен для заполнения'},
            isEmail: {message: 'Адрес эл. имеет не верный формат'}
        },
        name: {
            isRequired: {message: 'Имя обязательно для заполнения'}
        },
        password: {
            isRequired: {message: 'Пароль не может быть пустым'},
            isCapital: {message: 'Должне содержать большую букву'},
            isDigit: {message: 'Должне содержать цифры'},
            minLen: {message: 'Пароль должен быть не менее 8 символов', value: 8}
        },
        profession: {
            isRequired: {message: 'Профессия должна быть указана'}
        },
        license: {
            isRequired: {message: 'Необходимо принять лицензионное соглашение'}
        }
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

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        if (!validate()) {
            alert('Errors detected:' + JSON.stringify(errors));
            return;
        }

        const submitData = {
            ...data,
            qualities: data.qualities.map(quality => quality.value)
        };

        try {
            await signUp(submitData);
            history.push('/');
        } catch (err) {
            setErrors(err);
        }
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
                labelContent="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />
            <TextField
                labelContent="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <SelectField
                label={'Профессия'}
                name='profession'
                value={data.profession}
                onChange={handleChange}
                options={
                    (professions || []).map(({name, _id}) => {
                        return {name, value: _id};
                    })
                }
                error={errors.profession}
                defaultOption='Choose...'
            />
            <RadioField
                label='Пол'
                name='sex'
                options={
                    [{name: 'Мучжчина', value: 'male'}, {name: 'Женщина', value: 'female'}]
                }
                onChange={handleChange}
                value={data.sex}
                error={errors.sex}
            />

            <MultiSelectField
                label='Качества'
                name="qualities"
                defaultValue={data.qualities}
                isMulti
                options={
                    Object.values(qualities || {}).map(({_id, name, color}) => {
                        return {value: _id, label: name};
                    })
                }
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
            />

            <CheckBoxField
                value={data.license}
                name='license'
                onChange={handleChange}
                error={errors.license}
            >Принимаю <a>лицензионное соглашение</a></CheckBoxField>

            <button type="submit" disabled={ !isValid } className="btn btn-primary w-100 mx-auto mb-4">Submit</button>
        </form>
    );
};

export default RegisterForm;
