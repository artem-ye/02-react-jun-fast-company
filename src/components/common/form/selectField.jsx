import React from 'react';
import PropTypes from 'prop-types';

const SelectField = ({label, value, onChange, defaultOption, options, error}) => {
    const getInputClassList = () => {
        return 'form-select' + (error ? ' is-invalid' : '');
    };

    const handleChange = ({target}) => {
        onChange({
            name: target.name,
            value: target.value
        });
    };

    return (
        <div className="mb-4">
            <label htmlFor="validationDefault04" className="form-label">
                {label}
            </label>
            <select
                className={getInputClassList()}
                id="validationDefault04"
                name="profession"
                value={value}
                onChange={handleChange}
            >
                <option disabled value="">{defaultOption}</option>
                {
                    options && options.map(opt => (
                        <option
                            key={opt.value}
                            value={opt.value}
                        >{opt.name}</option>
                    ))
                }
            </select>
            {error &&
                <div className="invalid-feedback">
                    {error}
                </div>
            }
        </div>
    );
};

SelectField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    options: PropTypes.array,
    defaultOption: PropTypes.string
};

export default SelectField;
