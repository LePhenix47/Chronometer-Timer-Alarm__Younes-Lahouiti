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
 * @returns {ChildNode[]|null} An array containing all child nodes of the parent element or null if the parent element has no children.
 */
export function getChild(elementOfReference: HTMLElement): Element[] | null {
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
 * @param {string} value - The value to set for the specified style property.
 * @param {HTMLElement} [element=document.body] - The HTML element to set the style property for, ***NOT mandatory***.

* @returns {void}
 */
export function setStyleProp(
  property: string,
  value: string,
  element: HTMLElement = document.body
): void {
  return element.style.setProperty(property, value);
}
