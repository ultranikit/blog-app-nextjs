import React from 'react';

export const InputField = (props) => {
    const { field, onChange, style } = props;
    const [key, value] = Object.entries(field)[0];

    return key === 'body' ? (
        <textarea name={key} className={style} onChange={onChange}></textarea>
    ) : (
        <input className={style} type="text" onChange={onChange} name={key} />
    );
};
