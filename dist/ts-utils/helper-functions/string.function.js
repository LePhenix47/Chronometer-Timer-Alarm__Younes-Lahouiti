"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceText = exports.splitString = exports.copyTextToClipBoard = exports.testRegExp = exports.normalizeString = exports.formatText = void 0;
const console_funtions_1 = require("./console-funtions");
/**
 *Function that formats a given string in 3 cases: lowercase, uppercase and titlecase
 *
 * @param {string} string - The string to format.
 * @param {string} option - The option to use for formatting. Valid options are 'lowercase', 'uppercase', or 'titlecase'.
 *
 * @returns {string} The formatted string.
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
 * Function that normalizes a string by removing diacritical marks, replaces letters with accents by their "non-accented" counter-part.
 *
 **ex: "crème brûlée" → "creme brulee"
 *@param {string} string - The string to be normalized.
 *@returns {string|null} - The normalized string or null if the argument is not a string.
 */
function normalizeString(string) {
    if (typeof string !== "string") {
        (0, console_funtions_1.log)("Value passed in argument is not a string !");
        return null;
    }
    return string
        .normalize("NFD") //returns the unicode NORMALIZATION FORM of the string using a canonical DECOMPOSITION (NFD).
        .replace(/[\u0300-\u036f]/g, "");
}
exports.normalizeString = normalizeString;
/**
 * Tests a regular expression against a string and
 * returns a boolean value indicating whether the regular expression matches the string.
 *
 * @param {string} string - The string to test against the regular expression.
 * @param {RegExp} RegularExpression - The regular expression to test against the string.
 * @returns {boolean} - A boolean value indicating whether the regular expression matches the string.
 */
function testRegExp(string, RegularExpression) {
    return RegularExpression.test(string);
}
exports.testRegExp = testRegExp;
/**
 * Copies the given text to the clipboard.
 * @param {string} textToCopy - The text to be copied to the clipboard.
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
 * Replaces words or characters of a string with new ones
 *
 * @param stringOfText The entire string of text
 * @param textToBeReplaced Character or word be replaced
 * @param textToReplaceBy Character or word that will replace
 * @returns string
 */
function replaceText(stringOfText, textToBeReplaced, textToReplaceBy) {
    return stringOfText.replaceAll(textToBeReplaced, textToReplaceBy);
}
exports.replaceText = replaceText;
