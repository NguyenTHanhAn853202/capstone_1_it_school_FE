export const formatPrice = (value = '') => {
    const arr = value.toString().split('');
    let position = 0;
    for (let index = arr.length - 1; index >= 0; index--) {
        position++;
        if (position === 3 && index !== 0) {
            arr.splice(index, 0, '.');
            position = 0;
        }
    }
    return arr.join('');
};
