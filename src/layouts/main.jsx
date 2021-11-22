import React from 'react';
import useMockData from '../utils/mockData';

const Main = () => {
    const {initialize, status, progress, error} = useMockData();

    const handelInitDb = () => {
        initialize().then(res => console.log('done'));
    };

    return (
        <div className="container mt-5">
            <h1>Main</h1>
            <h3>Инициализация Fire base</h3>

            <ul>
                <li>Status: {status}</li>
                <li>Progress: {progress} %</li>
                {error && <li>Error: {error}</li>}
            </ul>

            <button className="btn btn-primary" onClick={handelInitDb}>
                Инициализировать
            </button>
        </div>
    );
};

export default Main;
