import React from 'react';
import { useState } from 'react/cjs/react.development';

const Login = () => {
    const initialState = {email: '', password: ''};
    const [data, setData] = useState(initialState);

    const handleChange = (e) => {
        const {name: propName, value} = e.target;
        setData((prevState) => {
            return {...prevState, [propName]: value};
        });
    };

    return (
        <form action="">
            <div>
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="password">Пароль</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                />
            </div>
        </form>
    );
};

export default Login;
