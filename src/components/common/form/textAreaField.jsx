import React from 'react';
import PropTypes from 'prop-types';

const TextAreaField = ({label, name, value, onChange, error}) => {
    const domId = 'textArea'+name;
    const textAreaClassList = 'form-control' + (error ? ' is-invalid' : '');

    const handleChange = ({target}) => {
        onChange({
            name: name,
            value: target.value
        });
    };

    return (
        <div className='mb-4'>
            <div className="mb-4 has-validation">
                <label htmlFor={domId} className="form-label">{label}</label>
                <textarea className={textAreaClassList} id={domId} rows="3" onChange={handleChange} value={value}></textarea>
                {error && <div className="invalid-feedback">{error}</div>}
            </div>

            {/* <div className="input-group has-validation">
                <input
                    type={(showPassword ? 'text' : type)}
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className={'form-control' + (error ? ' is-invalid' : '')}
                />
                {type==='password' &&
                    <button className="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04" onClick={toggleShowPassword}>
                        <i className={'bi bi-eye' + (showPassword ? '-slash' : '') }></i>
                    </button>
                }
                {error && <div className="invalid-feedback">{error}</div>}
            </div> */}
        </div>
    );
};

TextAreaField.defaultProps = {
    rows: 3
};

TextAreaField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default TextAreaField;
