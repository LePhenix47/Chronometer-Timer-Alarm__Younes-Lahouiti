"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRelativeTimePeriod = exports.formatRelativeTime = exports.formatDate = exports.formatCurrencyValueNumber = exports.formatSignificantDigitsNumber = void 0;
/**
 * Formats a number by separating every thousand with a format from the user's locale.
 * If no locale is specified, it uses the default locale of the user's browser.
 *
 *  *example*:
 * - The user lives in Italy and we have:
 * `const number = 1_930 → returns "1.930"`
 *
 * - If they lived in the US and we have:
 *
 *`const number = 1_930 → returns "1,930"`
 *
 *
 * @param number
 * @returns
 */
function formatSignificantDigitsNumber(number, locale) {
    const formatter = new Intl.NumberFormat(locale, {
        maximumSignificantDigits: 3,
    });
    return formatter.format(number);
}
exports.formatSignificantDigitsNumber = formatSignificantDigitsNumber;
/**
 *
 * Function that formats currency values by the user's locale
 *
 * @param {number} number - The number to format
 * @param {string} currencyType - The currency type to format the number in (default is "USD")
 * @param {Object} options - An optional object of options to customize the number format
 *
 * @returns {string} The formatted currency value
 */
function formatCurrencyValueNumber(number, locale = undefined, currencyType = "USD", options) {
    const formatter = new Intl.NumberFormat(locale, {
        currency: currencyType,
        style: "currency",
        maximumFractionDigits: 2,
        ...options,
    });
    return formatter.format(number);
}
exports.formatCurrencyValueNumber = formatCurrencyValueNumber;
/**
 *
 * Formats a date object according to the user's locale and specified options using the `Intl.DateTimeFormat` API
 *
 * @param {Date} unformattedDateObject - The Date object to format
 * @param {string} locale - The locale to use for formatting (optional)
 * @param {Object} options - The options object to pass to the formatter (optional)
 *
 * @returns {string} The formatted date string
 * @throws {string} If the first argument is not a Date object
 */
function formatDate(unformattedDateObject, locale, options) {
    const dateIsNotADateObject = !(unformattedDateObject instanceof Date);
    if (dateIsNotADateObject) {
        throw `"${unformattedDateObject}" is not a date object`;
    }
    /**
     * We create the time formatter with the internalization web API
     */
    let dateFormatter = new Intl.DateTimeFormat(locale, options);
    return dateFormatter.format(unformattedDateObject);
}
exports.formatDate = formatDate;
/**
 *
 * Returns a string representing the relative time format of the input date.
 *
 * @param {Date} relativeDateInput - The date to be transformed into a relative time format.
 * @param {string} [locale] - A string with a BCP 47 language tag (i.e: `"en-US"`), or an array of such strings.
 * @param {Intl.RelativeTimeFormatOptions} [options] - An optional object with configuration options for the Intl.RelativeTimeFormat.
 *
 * Can be either these values for each property:
 * ```js
 *  {
 *      localeMatcher: "best fit" | "lookup";
 *      numeric: "always" | "auto";
 *      style: "long" | "narrow" |; "short";
 *  }
 *
 * ```
 *
 * @returns {string} A string representing the relative time format of the input date.
 */
function formatRelativeTime(relativeDateInput, locale, options = {
    localeMatcher: "best fit",
    numeric: "always",
    style: "long", // other values: "short" or "narrow"
}) {
    const formatter = new Intl.RelativeTimeFormat(locale, options);
    const now = new Date();
    const diffInSeconds = Math.round((relativeDateInput.getTime() - now.getTime()) / 1000);
    /**
     * If the date is from the past or future (x units ago or in y units)
     *
     */
    const relativeDirection = diffInSeconds >= 0 ? 1 : -1;
    let { unit, value } = getRelativeTimePeriod(diffInSeconds);
    return formatter.format(relativeDirection * value, unit);
}
exports.formatRelativeTime = formatRelativeTime;
/**
 *Returns the relative time period based on the input in seconds.
 *
 *@param {number} dateInSeconds - The input date in seconds.
 *@returns {object} - The relative time period in string format.
 */
function getRelativeTimePeriod(dateInSeconds) {
    /**
     * The number of seconds in one minute.
     */
    const ONE_MINUTE_IN_SECONDS = 60;
    /**
     * The number of seconds in one hour.
     */
    const ONE_HOUR_IN_SECONDS = 3600;
    /**
     * The number of seconds in one day.
     */
    const ONE_DAY_IN_SECONDS = 86400;
    /**
     * The number of seconds in one week.
     */
    const ONE_WEEK_IN_SECONDS = 604800;
    /**
     * The number of seconds in one month.
     */
    const ONE_MONTH_IN_SECONDS = 2629800;
    /**
     * The number of seconds in one year.
     */
    const ONE_YEAR_IN_SECONDS = 31557600;
    //If the number in seconds is negative, we transform it into a positive value
    dateInSeconds = Math.abs(dateInSeconds);
    // Check if the input date is under a minute
    const isUnderAMinute = dateInSeconds < ONE_MINUTE_IN_SECONDS;
    // Check if the input date is under an hour
    const isUnderAnHour = !isUnderAMinute && dateInSeconds < ONE_HOUR_IN_SECONDS;
    // Check if the input date is under a day
    const isUnderADay = !isUnderAnHour && dateInSeconds < ONE_DAY_IN_SECONDS;
    // Check if the input date is under a week
    const isUnderAWeek = !isUnderADay && dateInSeconds < ONE_WEEK_IN_SECONDS;
    // Check if the input date is under a month
    const isUnderAMonth = !isUnderAWeek && dateInSeconds < ONE_MONTH_IN_SECONDS;
    // Check if the input date is under a year
    const isUnderAYear = !isUnderAMonth && dateInSeconds < ONE_YEAR_IN_SECONDS;
    if (isUnderAMinute) {
        return { value: dateInSeconds, unit: "seconds" };
    }
    else if (isUnderAnHour) {
        //We get the amount of minutes
        let minutes = Math.floor(dateInSeconds / ONE_MINUTE_IN_SECONDS);
        return { value: minutes, unit: "minutes" };
    }
    else if (isUnderADay) {
        //We get the amount of hours
        let hours = Math.floor(dateInSeconds / ONE_HOUR_IN_SECONDS);
        return { value: hours, unit: "hours" };
    }
    else if (isUnderAWeek) {
        //We get the amount of days
        let days = Math.floor(dateInSeconds / ONE_DAY_IN_SECONDS);
        return { value: days, unit: "days" };
    }
    else if (isUnderAMonth) {
        //We get the amount of weeks
        let weeks = Math.floor(dateInSeconds / ONE_WEEK_IN_SECONDS);
        return { value: weeks, unit: "weeks" };
    }
    else if (isUnderAYear) {
        //We get the amount of months
        let months = Math.floor(dateInSeconds / ONE_MONTH_IN_SECONDS);
        return { value: months, unit: "months" };
    }
    else {
        //We get the amount of years
        let years = Math.floor(dateInSeconds / ONE_YEAR_IN_SECONDS);
        return { value: years, unit: "years" };
    }
}
exports.getRelativeTimePeriod = getRelativeTimePeriod;
