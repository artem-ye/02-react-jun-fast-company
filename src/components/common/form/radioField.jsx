import React from 'react';
import PropTypes from 'prop-types';

const RadioField = ({label, name, options, onChange, value, error}) => {
    const handleChange = ({target}) => {
        onChange({
            name: target.name,
            value: target.value
        });
    };

    return (
        <div className="mb-4">
            <label className="form-label">
                {label}
            </label>
            <div>
                {
                    options.map((opt) => {
                        const id = opt.name +'_'+opt.value;
                        const checked = (opt.value === value);
                        return (
                            <div key={id} className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name={name}
                                    id={id}
                                    value={opt.value}
                                    checked={checked}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor={id}>{opt.name}</label>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};

RadioField.propTypes = {
    value: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    options: PropTypes.array,
    name: PropTypes.string
};

export default RadioField;
