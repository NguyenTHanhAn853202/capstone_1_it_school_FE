const numberRegex = /^\d+$/;

async function inputOnlyNumber(value, callback) {
    (numberRegex.test(value) || value.length === 0) && callback(value ? +value : '');
}

export default inputOnlyNumber;
