import React from 'react';

const SearchStatus = ({usersQty}) => {
    let spellCount = 5;

    if (usersQty >= 5 && usersQty <= 14) {
        spellCount = 5;
    } else {
        const lastOneChar = Number(usersQty.toString().slice(-1));

        if (lastOneChar === 1) {
            spellCount = 1;
        } else if (lastOneChar >= 2 && lastOneChar <= 4) {
            spellCount = 2;
        }
    }

    const [text, color] = usersQty === 0
        ? ['Никто не потусит с тобой сегодня', 'danger']
        : [`${usersQty} ${spellCount === 2 ? 'человека' : 'человек'} тусанет с тобой сегодня`, 'primary'];

    return (
        <span className={`badge bg-${color}`}><h6>{text}</h6></span>
    );
};

export default SearchStatus;
