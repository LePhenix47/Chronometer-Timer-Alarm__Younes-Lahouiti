/**
 * A simplified version of `document.querySelector()`
 *
 * @param {string} query - HTML Element to select
 * @param {HTMLElement} container - HTML Element to select the query from
 * @returns {HTMLElement|null} - The element selected or `null` if the element doesn't exist
 */
export function selectQuery(query, container) {
    var _a;
    if (!container) {
        return document.querySelector(query);
    }
    /**
     * We check if it's a web component, they always have a hyphen in their tag name
     */
    const isWebComponent = (_a = container === null || container === void 0 ? void 0 : container.tagName) === null || _a === void 0 ? void 0 : _a.includes("-");
    if (isWebComponent) {
        //@ts-ignore
        return container.shadowRoot.querySelector(query);
    }
    return container.querySelector(query);
}
/**
 * A simplified version of `document.querySelectorAll()`
 *
 * @param {string} query - HTML Element to select
 * @param {HTMLElement} container - HTML Element to select the query from
 * @returns {HTMLElement[]|null} - An array with all the elements selected or `null` if the element doesn't exist
 */
export function selectQueryAll(query, container) {
    if (!container) {
        return Array.from(document.querySelectorAll(query));
    }
    const isWebComponent = container.tagName.includes("-");
    if (isWebComponent) {
        //@ts-ignore
        return Array.from(container.shadowRoot.querySelectorAll(query));
    }
    return Array.from(container.querySelectorAll(query));
}
/**
 * Function that returns an array containing all child nodes of an HTML element.
 *
 * @param {HTMLElement} elementOfReference The parent HTML element whose children to select.
 * @returns {ChildNode[]|null} An array containing all child nodes of the parent element or null if the parent element has no children.
 */
export function getChildNodes(elementOfReference) {
    return Array.from(elementOfReference.childNodes);
}
/**
 * Returns the closest ancestor element of a given HTML element based on a CSS selector.
 *
 * @param {HTMLElement} elementOfReference - The HTML element of reference.
 * @param {string} [cssSelector=""] - The CSS selector to use to select the ancestor element. Default is an empty string.
 *
 * @returns {HTMLElement|null} The closest ancestor element that matches the CSS selector, or null if no ancestor element matches the selector.
 */
export function getAncestor(elementOfReference, cssSelector = "") {
    return elementOfReference.closest(cssSelector);
}
