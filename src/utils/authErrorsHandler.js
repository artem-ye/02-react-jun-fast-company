function handleAuthError(err) {
    const {code, message} = err.response.data.error;
    const ERR_PREFIX = 'Ошибка авторизации: ';

    if (code === 400) {
        switch (message) {
        case 'EMAIL_EXISTS':
            return ERR_PREFIX + 'Email существует';
        case 'INVALID_PASSWORD':
            return ERR_PREFIX + 'Неверный пароль';
        default:
            return ERR_PREFIX + message;
        };
    }

    return 'Неизвестная ошибка: ' + err.message;
}

export default handleAuthError;
