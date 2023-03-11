"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPercent = exports.replaceText = exports.spliceArray = exports.sliceString = exports.splitString = exports.copyTextToClipBoard = exports.testRegExp = exports.normalize = exports.formatText = void 0;
const console_funtions_1 = require("./console-funtions");
/**
 *Function that formats a given string in 3 cases: lowercase, uppercase and titlecase
 *
 * @param {string} string - The string to format.
 * @param {string} option - The option to use for formatting. Valid options are 'lowercase', 'uppercase', or 'titlecase'.
 *
 * @returns {string} The formatted string
 *
 * @throws {Error} If an invalid option is provided.
 * @throws {TypeError} If either the string or the option parameter is not a string.
 */
function formatText(string, option) {
    let formattedOption = option.toLowerCase().trim();
    switch (formattedOption) {
        case "lowercase": {
            return string.toLowerCase();
        }
        case "uppercase": {
            return string.toUpperCase();
        }
        case "titlecase": {
            let stringArray = string.split(" ");
            for (let i = 0; i < stringArray.length; i++) {
                stringArray[i] =
                    stringArray[i].substring(0, 1).toUpperCase() +
                        stringArray[i].slice(1).toLowerCase();
            }
            stringArray = stringArray.concat();
            return stringArray.toString();
        }
        default: {
            throw new Error("Formatting text error: unknown option passed in argument");
        }
    }
}
exports.formatText = formatText;
/**
 * Function that normalizes a string by removing diacritical marks
 * (replaces letters with accents by their "non-accented" counter-part).
 *
 * *ex: "crème brûlée" → "creme brulee"
 * @param {string} string - The string to be normalized.
 *
 * @returns {string|null} - The normalized string or null if the argument is not a string.
 */
function normalize(string) {
    const argumentIsNotAString = typeof string !== "string";
    if (argumentIsNotAString) {
        (0, console_funtions_1.log)("Value passed in argument is not a string !");
        return null;
    }
    return string
        .normalize("NFD") //returns the unicode NORMALIZATION FORM of the string using a canonical DECOMPOSITION (NFD).
        .replace(/[\u0300-\u036f]/g, "");
}
exports.normalize = normalize;
/**
 * Tests a regular expression against a string and
 * returns a boolean value indicating whether the string matches the RegExp pattern.
 *
 * @param {string} string - The string to test against the regular expression.
 * @param {RegExp} RegularExpression - The regular expression to test against the string.
 *
 * @returns {boolean} - A boolean value indicating whether the regular expression matches the string.
 */
function testRegExp(string, RegularExpression) {
    return RegularExpression.test(string);
}
exports.testRegExp = testRegExp;
/**
 * Copies the given text to the clipboard.
 *
 * @param {string} textToCopy - The text to be copied to the clipboard.
 *
 * @returns {Promise<void>} - A Promise that resolves when the text has been successfully copied to the clipboard.
 */
function copyTextToClipBoard(textToCopy) {
    return navigator.clipboard.writeText(textToCopy);
}
exports.copyTextToClipBoard = copyTextToClipBoard;
/**

Splits a string into an array of substrings using the specified separator.

@param {string} string - The string to split.

@param {string|RegExp} character - The separator to use when splitting the string.

@returns {string[]} An array of substrings created by splitting the original string using the specified separator.

*/
function splitString(string, character) {
    return string.split(character);
}
exports.splitString = splitString;
/**

Slices a string to extract a portion of it between the start and end indexes.

Ex: We have "Saturday" and we want to just end up with "at"

```js
let str = "Saturday"
str = sliceString(str, 1, 3);
```

@param {string} string - The input string to slice.
@param {number} startIndex - The index of the beginning of the slice.
@param {number} endIndex - The index of the end of the slice.

@returns {string} - The portion of the string between the start and end indexes.
*/
function sliceString(string, startIndex, endIndex) {
    return string.slice(startIndex, endIndex);
}
exports.sliceString = sliceString;
/**
 * Removes elements from an array and optionally inserts new elements in their place.
 *
 * @param {Array} array - The array to modify.
 * @param {number} startIndex - The index to start removing elements from.
 * @param {number} deleteCount - The number of elements to remove.
 * @param {...*} [items] - The elements to insert into the array.
 *
 * @returns {Object} - An object containing the removed items and the updated array.
 *
 * @throws {TypeError} - If the 'array' parameter is not an array or 'startIndex' and 'endIndex' are not numbers.
 * @throws {Error} - If the 'startIndex' or 'endIndex' parameter is out of bounds of the array.
 */
function spliceArray(array, startIndex, deleteCount, ...items) {
    const argumentInArrayIsNotValid = !Array.isArray(array);
    if (argumentInArrayIsNotValid) {
        throw new TypeError("The 'array' parameter must be an array");
    }
    const numberArgumentsAreInvalid = isNaN(startIndex) || isNaN(deleteCount);
    if (numberArgumentsAreInvalid) {
        throw new TypeError("The 'startIndex' and 'deleteCount' parameters must be a number");
    }
    const indexesAreOutOfBounds = startIndex < 0 || startIndex >= array.length;
    if (indexesAreOutOfBounds) {
        throw new Error("The 'startIndex' parameter is out of bounds of the array");
    }
    let newArray = structuredClone(array);
    let removedItems = [];
    const hasItems = !!items.length;
    if (hasItems) {
        removedItems = newArray.splice(startIndex, deleteCount, ...items);
    }
    else {
        removedItems = newArray.splice(startIndex, deleteCount);
    }
    return { removedItems, newArray };
}
exports.spliceArray = spliceArray;
/**
 *  Function that replaces all instances of a given character or word with a new one in a string of text.
 *
 * @param {string} stringOfText - The entire string of text.
 * @param {string} replacedText - The character or word to be replaced.
 * @param {string} replacer - The character or word that will replace the old one.
 *
 * @returns {string} - The updated string of text.
 */
function replaceText(stringOfText, replacedText, replacer) {
    return stringOfText.replaceAll(replacedText, replacer);
}
exports.replaceText = replaceText;
/**
 * Function that formats a number as a percentage string with a '%' symbol appended at the end.
 *
 * @param {number} number - The number to be formatted as a percentage.
 * @returns {string} - The formatted percentage string.
 */
function toPercent(number) {
    return number.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0,
    });
}
exports.toPercent = toPercent;
