import React, {useState} from 'react';
import PropTypes from 'prop-types';

const TextField = ({labelContent, type, name, value, onChange, error}) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(prevState => setShowPassword(!prevState));
    };

    return (
        <div className='mb-4'>
            <label htmlFor={name}>{labelContent}</label>
            <div className="input-group">
                <input
                    type={(showPassword ? 'text' : type)}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={'form-control' + (error ? ' is-invalid' : '')}
                />
                {type==='password' &&
                    <button className="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04" onClick={toggleShowPassword}>
                        <i className={'bi bi-eye' + (showPassword ? '-slash' : '') }></i>
                    </button>}
            </div>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

TextField.defaultProps = {
    type: 'text'
};

TextField.propTypes = {
    labelContent: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default TextField;
