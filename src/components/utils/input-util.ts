import React, { ChangeEvent } from 'react';

/**
 * Genereller onChange Handler,
 * es wird der neue Wert aus dem Event übernommen und im setData gesetzt.
 * 
 * Funktioniert für strings, dates und check/radio-Boxen.
 * name Attribut des Input-Felds muss dem Attributnamen entsprechen!
 * 
 * @param setData Setter dispatch Funktion aus dem React-State.
 * @param event Das HTML Input Event.
 */
export default function setInputChange<T>(
    setData: (value: React.SetStateAction<T>) => void,
    event: ChangeEvent<HTMLInputElement>): void {

    const target = event.target;
    const name = target.name;

    if (target.type === 'checkbox' || target.type === 'radio') {
        setData(data => { return {...data, [name]: target.checked}});    
    } else 
    if (target.type === 'date') {
        setData(data => { return {...data, [name]: new Date(target.value)}});
    } else {
        // string
        setData(data => { return {...data, [name]: target.value}});
    }
};
