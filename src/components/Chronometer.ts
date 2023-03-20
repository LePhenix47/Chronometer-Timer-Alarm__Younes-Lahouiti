/**
 * We set the elements of our Web Component inside a `<template>`
 */
const chronometerTemplate: HTMLTemplateElement =
  document.createElement("template");

/**
 * CSS reset for the component
 *
 * (mandatory for the component elements on the shadow root)
 */
const resetCSS = /*css*/ `
*,
::before,
::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}


*::-moz-selection {
    background-color: rgb(240, 18, 36);
    color: white;
    ;
}

*::selection {
    background-color: rgb(240, 18, 36);
    color: white;
    ;
}


button {
    border-color: transparent;
    background-color: transparent;

    font-family: inherit;

    color: var(--color-primary);

    
  }

button:hover {
      cursor: pointer;
}

button:hover:disabled {
        cursor: not-allowed;
}
`;

/**
 * Style for the chronometer itself
 */
const chronometerCSS = /* css */ `
`;

const chronometerHTML = /* html */ `
`;

chronometerTemplate.innerHTML = /* html */ `
<style>
  ${resetCSS}
  ${chronometerCSS}
</style>

<div class="chronometer__container">


</div>
`;

class Chronometer extends HTMLElement {
  /**
   * Constructor to set the HTML content and make the shadown root open
   */
  constructor() {
    //We inherit the methods from the HTMLElement class
    super();

    /**
     * Container that holds our web component
     *
     * to avoid affecting the style of other page elements
     */
    const shadowRoot: ShadowRoot = this.attachShadow({ mode: "open" });

    /**
     * HTML of the component
     */
    const clonedTemplate: Node = chronometerTemplate.content.cloneNode(true);

    /**
     * We append the template content to the container
     */
    shadowRoot.appendChild(clonedTemplate);
  }

  /**
   * Static getter methods that indicates the
   * list of attributes that the custom element wants to observe for changes.
   *
   * ⚠ **Important**: The custom attributes must have a getter and setter in order to be observed
   */
  static get observedAttributes() {
    return ["current-time", "is-running", "interval-id"];
  }

  get currentTime() {
    const attributeValue = this.getAttribute("current-time");
    return attributeValue;
  }

  set currentTime(value) {}

  get isRunning() {
    const attributeValue = this.getAttribute("is-running");

    return attributeValue;
  }
  set isRunning(value) {}

  get intervalId() {
    const attributeValue = this.getAttribute("interval-id");

    return attributeValue;
  }
  set intervalId(value) {}

  /**
   * Method called every time the element is inserted into the DOM
   * Used to add event listeners
   */
  connectedCallback() {}

  /**
   * Method called every time the element is removed from the DOM
   * Used to remove event listeners
   */
  disconnectedCallback() {}

  /**
   * Methods as a callback function that is called by the browser's web API
   *  when an observed attribute of a custom element is added, removed, or changed.
   *
   * @param {string} name
   */
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {}
}

/**
 * We defined it so that we can use it
 */
customElements.define("chrono-meter", Chronometer);
// <chrono-meter></chrono-meter>
