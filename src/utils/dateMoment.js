const getDateDiffMoment = (date) => {
    const dateNumber = Number(date);

    if (isNaN(dateNumber)) {
        return '';
    }

    const dateObj = new Date(dateNumber);

    const now = new Date();
    const diffMins = ((now - dateNumber) / 100) / 60;
    let text = '';

    const month = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    if (diffMins <= 1) {
        text = '1 минуту назад';
    } else if (diffMins <= 5) {
        text = '5 минут назад';
    } else if (diffMins <= 10) {
        text = '10 минут назад';
    } else if (diffMins <= (30)) {
        text = '30 минут назад';
    } else if ((diffMins/60) < 24) {
        text = `${dateObj.getHours()}.${dateObj.getMinutes()}`;
    } else if ((diffMins/60)/24 < 365) {
        text = `${dateObj.getDay()} ${month[dateObj.getMonth()]}`;
    } else {
        text = `${dateObj.getDay()} ${month[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
    }

    return text;
};

export default getDateDiffMoment;
export {getDateDiffMoment};
