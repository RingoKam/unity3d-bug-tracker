/**
 * return a string with limited amount of character
 * @param {any} object that will be convert to string and take only lengthLimit Char 
 * @param {number} lengthLimit
*/
export function limitStringLength(src ,lengthLimit) {
    if(isNaN(src)) {
        return ("" + src).substring(0, lengthLimit);
    } else {
        return +src.toFixed(lengthLimit);
    }
}

