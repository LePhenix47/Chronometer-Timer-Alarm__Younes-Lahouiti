import { log } from "./console-funtions";

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
export function formatText(string: string, option: string): string | never {
  let formattedOption: string = option.toLowerCase().trim();

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
      throw new Error(
        "Formatting text error: unknown option passed in argument"
      );
    }
  }
}

/**
 * Function that normalizes a string by removing diacritical marks, replaces letters with accents by their "non-accented" counter-part.
 *
 **ex: "crème brûlée" → "creme brulee"
 *@param {string} string - The string to be normalized.
 *@returns {string|null} - The normalized string or null if the argument is not a string.
 */
export function normalizeString(string: string): string | null {
  if (typeof string !== "string") {
    log("Value passed in argument is not a string !");
    return null;
  }
  return string
    .normalize("NFD") //returns the unicode NORMALIZATION FORM of the string using a canonical DECOMPOSITION (NFD).
    .replace(/[\u0300-\u036f]/g, "");
}

/**
 * Tests a regular expression against a string and
 * returns a boolean value indicating whether the regular expression matches the string.
 *
 * @param {string} string - The string to test against the regular expression.
 * @param {RegExp} RegularExpression - The regular expression to test against the string.
 * @returns {boolean} - A boolean value indicating whether the regular expression matches the string.
 */
export function testRegExp(string: string, RegularExpression: RegExp): boolean {
  return RegularExpression.test(string);
}

/**
 * Copies the given text to the clipboard.
 * @param {string} textToCopy - The text to be copied to the clipboard.
 * @returns {Promise<void>} - A Promise that resolves when the text has been successfully copied to the clipboard.
 */
export function copyTextToClipBoard(textToCopy: string): Promise<void> {
  return navigator.clipboard.writeText(textToCopy);
}
/**

Splits a string into an array of substrings using the specified separator.

@param {string} string - The string to split.

@param {string|RegExp} character - The separator to use when splitting the string.

@returns {string[]} An array of substrings created by splitting the original string using the specified separator.

*/
export function splitString(
  string: string,
  character: string | RegExp
): string[] {
  return string.split(character);
}

/**
 * Replaces words or characters of a string with new ones
 *
 * @param stringOfText The entire string of text
 * @param textToBeReplaced Character or word be replaced
 * @param textToReplaceBy Character or word that will replace
 * @returns string
 */
export function replaceText(
  stringOfText: string,
  textToBeReplaced: string,
  textToReplaceBy: string
): string {
  return stringOfText.replaceAll(textToBeReplaced, textToReplaceBy);
}
