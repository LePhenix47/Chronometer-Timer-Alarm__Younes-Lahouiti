"use strict";
/**
 * A simplified version of `document.querySelector()`
 *
 * @param  query HTML Element to select
 * @param  container HTML Element to select the query from
 * @returns The element selected *or* `null` if the element doesn't exist
 */
function selectQuery(query, container) {
    if (container) {
        return container.querySelector(query);
    }
    return document.querySelector(query);
}
/**
 * A simplified version of `document.querySelectorAll()`
 *
 * @param  query HTML Element to select
 * @param  container HTML Element to select the query from
 * @returns An array with all the elements selected *or* `null` if the element doesn't exist
 */
function selectQueryAll(query, container) {
    if (container) {
        return Array.from(container.querySelectorAll(query));
    }
    return Array.from(document.querySelectorAll(query));
}
/**
 * Function that selects all the children of an HTML element
 *
 * @param  element HTML element with children
 * @returns Array with all the children of the element
 */
function getChildNodes(element) {
    return Array.from(element.childNodes);
}
