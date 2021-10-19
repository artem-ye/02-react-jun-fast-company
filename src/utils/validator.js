
function validate(validateMethod, data, validateMethodConfig) {
    const REGEX_EMAIL = /^\S+@\S+\.\S+$/g;
    const REGEX_CONTAIN_CAPITAL = /[A-Z]+/;
    const REGEX_CONTAIN_DIGIT = /\d+/;

    let isDataValid = true;

    switch (validateMethod) {
    case 'isRequired':
        if (typeof data === 'boolean') {
            isDataValid = !!data;
        } else {
            isDataValid = (data.trim() !== '');
        }
        break;
    case 'isEmail':
        isDataValid = REGEX_EMAIL.test(data);
        break;
    case 'isCapital':
        isDataValid = REGEX_CONTAIN_CAPITAL.test(data);
        break;
    case 'isDigit':
        isDataValid = REGEX_CONTAIN_DIGIT.test(data);
        break;
    case 'minLen':
        isDataValid = (data.length >= validateMethodConfig.value);
        break;
    default:
        return `Unsupported validate method: ${validateMethod}`;
    }

    return !isDataValid ? validateMethodConfig.message : null;
}

export function validator(data, config) {
    const errors = {};

    for (const [fieldName, fieldData] of Object.entries(data)) {
        const fieldConf = config[fieldName];

        if (!fieldConf) continue;

        for (const [validateMethod, validateMethodConfig] of Object.entries(fieldConf)) {
            const error = validate(validateMethod, fieldData, validateMethodConfig);

            if (error) {
                errors[fieldName] = error;
                break;
            }
        }
    }

    return errors;
}
