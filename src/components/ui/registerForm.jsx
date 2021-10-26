import React, {useState, useEffect} from 'react';
import {validator} from '../../utils/validator';
import TextField from '../common/form/textField';
import api from '../../API';
import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelectField';
import CheckBoxField from '../common/form/checkBoxField';

const RegisterForm = () => {
    const initialDataState = {
        email: '', password: '', profession: '', sex: 'male', qualities: [], licence: false
    };
    const [data, setData] = useState(initialDataState);
    const [professions, setProfessions] = useState();
    const [errors, setErrors] = useState({});
    const [qualities, setQualities] = useState({});

    // Fetch professions
    useEffect(() => {
        api.professions.fetchAll().then(data => setProfessions(data));
        api.qualities.fetchAll().then(data => setQualities(data));
    }, []);

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
        profession: {
            isRequired: {message: 'Профессия должна быть указана'}
        },
        licence: {
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

    const handleSubmit = (evt) => {
        evt.preventDefault();

        if (!validate()) {
            alert('Errors detected:' + JSON.stringify(errors));
            return;
        }

        console.log('Submit val', data);
    };

    const isValid = Object.keys(errors).length === 0;

    // if (!isValid) {
    //     console.log(errors);
    // }

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
                value={data.licence}
                name='licence'
                onChange={handleChange}
                error={errors.licence}
            >Принимаю <a>лицензионное соглашение</a></CheckBoxField>

            <button type="submit" disabled={ !isValid } className="btn btn-primary w-100 mx-auto mb-4">Submit</button>
        </form>
    );
};

export default RegisterForm;
