export const transformSizeFile = (size) => {
    return Math.floor((size / (1024 * 1024)) * 100) / 100 + 'MB';
};
