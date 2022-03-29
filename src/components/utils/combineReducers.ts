/**
 * Kombiniert mehrere Reducer zu einem.
 * Übergebene Reducer werden hierfür der Reihe nach aufgerufen.
 * 
 * @param initialState Initialer State
 * @param reducers Reducer
 * @returns Reducer kompatible Funktion welche alle übergebenen Reducer nacheinander aufruft.
 */
export const combineReducers = (initialState: any, ...reducers: Function[]) =>
    (state: any = initialState, action: any): any => {
        for (let i = 0; i < reducers.length; i++) {
            state = reducers[i](state, action);
        }
        return state;
    };

// const combineReducers = (...reducers: Function[]) =>     // combineReducers ist eine Func, Pfeil Operator ohne { }, also wird das Erg direkt zurückgegeben ohne das ein return notwendig ist
//     (state: any = initialState, action: any): any => {   // WAS wird zurückgegeben: Eine Func die state & action bekommt und any zurückgibt. Das passt zu dem was ein useReducer erwartet!
//         for (let i = 0; i < reducers.length; i++) {      // impl der inneren Func, alle Reducer aufrufen, state überschreiben und an nächsten Reducer übergeben. Bei überschneidenden Verantwortlichkeiten der Reducer kann hier die Reihenfolge entscheidend sein! Reducer müssen im default den unveränderten State zurückgeben!
//             state = reducers[i](state, action);
//         }
//         return state;
//     };
