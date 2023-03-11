"use strict";
/**
 * A simplified version of `document.querySelector()`
 *
 * @param {string} query - HTML Element to select
 * @param {HTMLElement} container - HTML Element to select the query from
 * @returns {HTMLElement|null} - The element selected or `null` if the element doesn't exist
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAncestor = exports.getChildNodes = exports.selectQueryAll = exports.selectQuery = void 0;
function selectQuery(query, container) {
    if (container) {
        return container.querySelector(query);
    }
    return document.querySelector(query);
}
exports.selectQuery = selectQuery;
/**
 * A simplified version of `document.querySelectorAll()`
 *
 * @param {string} query - HTML Element to select
 * @param {HTMLElement} container - HTML Element to select the query from
 * @returns {HTMLElement[]|null} - An array with all the elements selected or `null` if the element doesn't exist
 */
function selectQueryAll(query, container) {
    if (container) {
        return Array.from(container.querySelectorAll(query));
    }
    return Array.from(document.querySelectorAll(query));
}
exports.selectQueryAll = selectQueryAll;
/**
 * Function that returns an array containing all child nodes of an HTML element.
 *
 * @param {HTMLElement} elementOfReference The parent HTML element whose children to select.
 * @returns {ChildNode[]|null} An array containing all child nodes of the parent element or null if the parent element has no children.
 */
function getChildNodes(elementOfReference) {
    return Array.from(elementOfReference.childNodes);
}
exports.getChildNodes = getChildNodes;
/**
 * Returns the closest ancestor element of a given HTML element based on a CSS selector.
 *
 * @param {HTMLElement} elementOfReference - The HTML element of reference.
 * @param {string} [cssSelector=""] - The CSS selector to use to select the ancestor element. Default is an empty string.
 *
 * @returns {HTMLElement|null} The closest ancestor element that matches the CSS selector, or null if no ancestor element matches the selector.
 */
function getAncestor(elementOfReference, cssSelector = "") {
    return elementOfReference.closest(cssSelector);
}
exports.getAncestor = getAncestor;
