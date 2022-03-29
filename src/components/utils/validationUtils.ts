export const isEmpty = (fieldValue: any): boolean => {
    return fieldValue === '' || fieldValue === undefined;
};

export const isInLength = (fieldValue: string, minLength: number, maxLength: number): boolean => {
    return fieldValue.length >= minLength && fieldValue.length <= maxLength;
};
