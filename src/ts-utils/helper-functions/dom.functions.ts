/**
 * A simplified version of `document.querySelector()`
 *
 * @param {string} query - HTML Element to select
 * @param {HTMLElement} container - HTML Element to select the query from
 * @returns  - The element selected or `null` if the element doesn't exist
 */

export function selectQuery(
  query: string,
  container?: HTMLElement
): HTMLElement | null {
  if (!container) {
    return document.querySelector(query);
  }
  /**
   * We check if it's a web component, they always have a hyphen in their tag name
   */
  const isWebComponent: boolean = container?.tagName?.includes("-");

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
export function selectQueryAll(
  query: string,
  container?: HTMLElement
): HTMLElement[] | null {
  if (!container) {
    return Array.from(document.querySelectorAll(query));
  }

  const isWebComponent: boolean = container.tagName.includes("-");

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
 * @returns {Element[]} An array containing all child nodes of the parent element or null if the parent element has no children.
 */
export function getChildren(elementOfReference: HTMLElement | null): Element[] {
  if (!elementOfReference) {
    return [];
  }
  return Array.from(elementOfReference.children);
}

/**
 * Returns the closest ancestor element of a given HTML element based on a CSS selector.
 *
 * @param {HTMLElement} elementOfReference - The HTML element of reference.
 * @param {string} [cssSelector=""] - The CSS selector to use to select the ancestor element. Default is an empty string.
 *
 * @returns {HTMLElement|null} The closest ancestor element that matches the CSS selector, or null if no ancestor element matches the selector.
 */

export function getAncestor(
  elementOfReference: HTMLElement,
  cssSelector: string = ""
): HTMLElement | null {
  return elementOfReference.closest(cssSelector);
}

/**
 *Returns the host element of a web component given a reference element within it.
 *
 *@param {Element} elementOfReference - An element that is a child of the web component.
 *
 * @returns {Element} - The host element of the web component.
 */

export function getComponentHost(elementOfReference: Element): Element {
  //@ts-ignore
  return elementOfReference.getRootNode().host;
}

/**
 * Returns the next sibling element of the specified element.
 *
 * @param {HTMLElement} elementOfReference - The reference element whose sibling to return.
 * @returns {HTMLElement | null} The next sibling element, or null if there is none.
 */
export function getSibling(
  elementOfReference: HTMLElement
): HTMLElement | null {
  //@ts-ignore
  return elementOfReference.nextElementSibling;
}

/**
 *
 * Returns an array of strings representing the classes of the specified element.
 *
 * @param {HTMLElement} elementOfReference - The element to retrieve class values from.
 *
 * @returns An array of strings representing the classes of the specified element.
 */
export function getClassListValues(elementOfReference: HTMLElement): string[] {
  return Array.from(elementOfReference.classList);
}

/**
 * Sets the value of a specified CSS property for the given HTML element.
 *
 * @param {string} property - The name of the style property to set.
 * @param {any} value - The value to set for the specified style property.
 * @param {HTMLElement} [element=document.body] - The HTML element to set the style property for, ***NOT mandatory***.

* @returns {void}
 */
export function setStyleProp(
  property: string,
  value: any,
  element: HTMLElement = document.body
): void {
  const stringifiedValue = value.toString();
  return element.style.setProperty(property, stringifiedValue);
}

/**
 * Adds or modifies an attribute to the given element.
 *
 * @param element The element to add the attribute to.
 * @param property The name of the attribute to add.
 * @param value The value to set the attribute to.
 */
export function addModifyAttribute(
  element: Element,
  property: string,
  value: any
): void {
  element.setAttribute(property, value.toString());
}

/**
 * Removes an attribute from an element and sets a new attribute in its place.
 *
 * @param {Element} element - The element from which to remove the attribute.
 * @param {string} oldAttribute - The name of the attribute to remove.
 * @param {string} newAttribute - The name of the new attribute to set.
 */
export function replaceAttribute(
  element: Element,
  oldAttribute: string,
  newAttribute: string
) {
  element.removeAttribute(oldAttribute);
  element.setAttribute(newAttribute, "");
}

/**
 * Enables the specified element by removing the "disabled" attribute and setting the "enabled" attribute.
 *
 * @param element - The element to enable.
 */
export function enableElement(element: any): void {
  replaceAttribute(element, "disabled", "enabled");
}

/**
 * Disables the specified element by removing the "enabled" attribute and setting the "disabled" attribute.
 *
 * @param element - The element to disable.
 */
export function disableElement(element: any): void {
  replaceAttribute(element, "enabled", "disabled");
}
