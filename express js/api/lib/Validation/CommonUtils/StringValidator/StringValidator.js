/**
 * isEmptyString - check if string is empty
 * @param {*} val 
 * @returns {Boolean} return true if string is empty, false if string not empty
 */
function isEmptyString(val){
    return val.length === 0 ? true : false
}

/**
 * isNullString - check if string is null
 * @param {*} val 
 * @returns {Boolean} return true if string is null, false if string not null
 */
function isNullString(val){
    return val === null ? true : false
}

/**
 * isUndefinedString - check if string is undefined
 * @param {*} val 
 * @returns {Boolean} return true if string is undefined, false if string not undefined
 */
function isUndefinedString(val){
    return val === undefined ? true : false
}

/**
 * isTruthyString - check if string is truthy
 * @param {*} val 
 * @returns {Boolean} return true if string is truthy, false if string not truthy
 */
function isTruthyString(val){
    return val ? true : false
}

function isStringLengthValid(str, minLength, maxLength){
    return val ? true : false
}

module.exports = {
    isEmptyString,isNullString,isUndefinedString,isTruthyString,isStringLengthValid
}