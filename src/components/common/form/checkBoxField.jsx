import React from 'react';
import PropTypes from 'prop-types';

const CheckBoxField = ({name, value, onChange, children, error}) => {
    const handleChange = ({target}) => {
        onChange({name: name, value: !value});
    };

    const getInputClassList = () => {
        return 'form-check-input' + (error ? ' is-invalid' : '');
    };

    return (
        <div className="mb-4">
            <div className="form-check">
                <input
                    className={getInputClassList()}
                    type="checkbox"
                    value={value}
                    id={name}
                    name={name}
                    onChange={handleChange}
                    checked={value}
                />
                <label className="form-check-label" htmlFor={name}>
                    {children}
                </label>
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};

CheckBoxField.propTypes = {
    value: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    children: PropTypes.oneOfType(
        [PropTypes.arrayOf(PropTypes.node), PropTypes.node]
    ),
    error: PropTypes.string
};

export default CheckBoxField;
