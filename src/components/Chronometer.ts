import { getCentisecondsValue } from "../ts-utils/helper-functions/chronometer-component.functions";
import { log } from "../ts-utils/helper-functions/console-funtions";
import {
  addModifyAttribute,
  disableElement,
  enableElement,
  getClassListValues,
  getComponentHost,
  getSibling,
  replaceAttribute,
  selectQuery,
  selectQueryAll,
} from "../ts-utils/helper-functions/dom.functions";
import { Interval } from "../ts-utils/services/interval.service";
import { getTimeValues } from "./Timer";

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
  background-color: #f01224;
  color: white;
}

*::selection {
  background-color: #f01224;
  color: white;
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

.hide {
  display: none !important;
}

.chronometer__container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.chronometer__value {
  margin-block: 25px;

  display: inline-flex;
  justify-content: center;
  align-items: baseline;
  font-size: 84px;
  font-weight: normal;
}
.chronometer__value--centiseconds {
  font-size: 58px;
}
@media screen and (width <=768px) {
  .chronometer__value {
    font-size: 58px;
  }
  .chronometer__value--centiseconds {
    font-size: 32px;
  }
}

.chronometer__buttons-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin-block: 25px;
}
.chronometer__button {
  aspect-ratio: 1/1;
  background-color: #343434;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  padding: 12px;
}
.chronometer__button:disabled {
  background-color: #303030;
  color: #7b7b7b;
}
.chronometer__button--play {
  background-color: #e4505c;
}
.chronometer__button--partial {
  border: 2px solid #3c3c3c;
}
.chronometer__button--reset {
  border: 2px solid #3c3c3c;
}
.chronometer__table {
  border-collapse: collapse;
  border-spacing: 0;
  table-layout: fixed;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 80%;
  margin: auto;
}
.chronometer__table-head {
  border-bottom: 2px solid #393939;
  display: table;
  table-layout: fixed;
  flex: 0 0 auto;
  width: 100%;
}
.chronometer__table-body {
  resize: vertical;
  max-height: 750px; /* Max height for the table before having a scrollbar */
  min-height: 71px;
  width: 100%;
  display: block;
  overflow-y: auto;
}
.chronometer__table-body::-webkit-scrollbar {
  background-color: #303030;
  width: 7px;
  border-radius: 100vmax;
}
.chronometer__table-body::-webkit-scrollbar-thumb {
  background-color: #e4505c;
  border-radius: 100vmax;
}
.chronometer__table-body::-webkit-scrollbar-thumb:hover {
  background-color: #ff606c;
}
.chronometer__table-body::-webkit-scrollbar-thumb:active {
  background-color: #be4851;
}
@supports (scrollbar-color: black white) {
  .chronometer__table-body {
    scrollbar-width: thin;
    scrollbar-color: #e4505c #303030;
  }
}
.chronometer__table-row--body {
  display: table;
  table-layout: fixed;
  width: 100%;
}

.chronometer__table-row--body.dragging{
  opacity: 50%;
}

.chronometer__table-cell--head {
  text-align: left;
  padding-bottom: 15px;
  font-weight: bold;
}
.chronometer__table-cell--body {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-block: 25px;
}
`;

const chronometerHTML = /* html */ `
<div class="chronometer__container">
  <h2 class="chronometer__value">
    <span class="chronometer__value--main">00:00:00,</span><span class="chronometer__value--centiseconds">00</span>
  </h2>

  <section class="chronometer__buttons-container">
    <button class="chronometer__button chronometer__button--play">
      <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256.000000 256.000000" preserveAspectRatio="xMidYMid meet" class="chronometer__icon chronometer__icon--play"  width="24" height="24">
        <g transform="translate(0.000000,256.000000) scale(0.100000,-0.100000)" fill="black" stroke="none">
            <path d="M623 2210 c-18 -10 -42 -39 -55 -62 l-23 -43 0 -820 0 -820 22 -47
    c29 -62 70 -88 143 -88 33 0 72 8 98 20 24 11 175 108 335 217 161 109 398
    268 527 354 129 86 247 167 261 181 109 103 115 243 14 344 -46 45 -1071 734
    -1140 765 -54 25 -140 25 -182 -1z"></path>
        </g>
    </svg>
      
      <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" preserveAspectRatio="xMidYMid meet" class="chronometer__icon chronometer__icon--pause hide"  width="24" height="24">
  
      <g transform="translate(0,256) scale(0.10,-0.10)" fill="black" stroke="none">
          <path d="M610 1280 l0 -840 165 0 165 0 0 840 0 840 -165 0 -165 0 0 -840z"></path>
          <path d="M1620 1280 l0 -840 165 0 165 0 0 840 0 840 -165 0 -165 0 0 -840z"></path>
      </g>
  </svg>
    </button>
    <button class="chronometer__button chronometer__button--partial" disabled>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 256 256"
    preserveAspectRatio="xMidYMid meet" width="28" height="28" class="chronometer__icon chronometer__icon--flag">

    <g transform="translate(0,256) scale(0.1,-0.1)" fill="currentColor" stroke="none">
        <path
            d="M509 2211 l-29 -29 0 -902 0 -902 29 -29 c37 -37 65 -37 102 0 l29 29 0 291 0 291 608 0 c693 0 681 -1 757 75 32 32 49 59 61 101 24 82 10 129 -86 297 -48 83 -80 150 -80 167 0 17 32 83 80 166 95 165 110 216 85 299 -11 38 -29 69 -58 99 -74 78 -58 76 -810 76 l-659 0 -29 -29z m1386 -156 c15 -14 25 -36 25 -51 0 -16 -34 -88 -80 -170 -133 -233 -133 -238 4 -476 42 -74 76 -145 76 -159 0 -15 -9 -38 -21 -53 l-20 -26 -620 0 -619 0 0 480 0 480 615 0 616 0 24 -25z" />
    </g>
</svg></button>
    <button class="chronometer__button chronometer__button--reset" disabled>
    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" preserveAspectRatio="xMidYMid meet" class="chronometer__icon chronometer__icon--restart" width="26" height="26">
  
              <g transform="translate(0,256) scale(0.10,-0.10)" fill="currentColor" stroke="none">
                  <path d="M1200 2336 c-279 -58 -528 -222 -681 -447 -49 -73 -123 -225 -140
          -291 -7 -27 -16 -48 -20 -48 -4 0 -37 58 -74 130 -36 71 -74 134 -85 140 -47
          25 -104 1 -115 -50 -6 -25 14 -69 130 -289 127 -243 138 -261 171 -271 33 -11
          42 -7 291 123 268 141 291 158 277 211 -8 34 -37 57 -71 58 -19 1 -92 -32
          -202 -91 -96 -50 -175 -91 -177 -91 -20 0 33 175 83 275 93 187 273 355 463
          431 161 65 342 87 497 60 358 -62 633 -304 739 -651 25 -82 28 -105 28 -250 1
          -137 -3 -171 -22 -239 -105 -365 -387 -616 -756 -672 -212 -33 -447 17 -621
          132 -87 56 -112 62 -148 34 -21 -17 -27 -30 -27 -60 0 -32 6 -44 38 -70 49
          -40 195 -116 285 -146 147 -50 352 -68 507 -44 101 16 246 66 342 118 281 152
          475 412 544 728 23 107 23 321 0 428 -89 408 -381 716 -786 827 -97 27 -371
          35 -470 15z"></path>
              </g>
      </svg>
    </button>
  </section>

  <table class="chronometer__table hide">
    <thead class="chronometer__table-head">
      <tr class="chronometer__table-row chronometer__table-row--head">
        <th class="chronometer__table-cell chronometer__table-cell--head">Passing order</th>
        <th class="chronometer__table-cell chronometer__table-cell--head">Time</th>
        <th class="chronometer__table-cell chronometer__table-cell--head">Total</th>
      </tr>
    </thead>
    
    <tbody class="chronometer__table-body">
    <!--
        <tr class="chronometer__table-row chronometer__table-row--body" draggable="true" data-total-time="69420">
          <td class="chronometer__table-cell chronometer__table-cell--body">1</td>
          <td class="chronometer__table-cell chronometer__table-cell--body">00:00:00,69</td>
          <td class="chronometer__table-cell chronometer__table-cell--body">00:00:00,69</td>
        </tr> 
    -->
    </tbody>
  </table>

</div>
`;

chronometerTemplate.innerHTML = /* html */ `
<style>
  ${resetCSS}
  ${chronometerCSS}
</style>

<div class="chronometer__container">
${chronometerHTML}
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
    return ["current-time", "is-running"];
  }

  get currentTime() {
    const attributeValue: string = this.getAttribute("current-time");
    return attributeValue;
  }

  set currentTime(value) {}

  get isRunning() {
    const attributeValue: string = this.getAttribute("is-running");

    return attributeValue;
  }
  set isRunning(value) {}

  get intervalId() {
    const attributeValue: string = this.getAttribute("interval-id");

    return attributeValue;
  }
  set intervalId(value) {}

  /**
   * Method called every time the element is inserted into the DOM
   * Used to add event listeners
   */
  connectedCallback() {
    //@ts-ignore
    const playButton: HTMLButtonElement = selectQuery(
      ".chronometer__button--play",
      //@ts-ignore
      this.shadowRoot
    );
    //@ts-ignore
    const partialButton: HTMLButtonElement = selectQuery(
      ".chronometer__button--partial",
      //@ts-ignore
      this.shadowRoot
    );
    //@ts-ignore
    const restartButton: HTMLButtonElement = selectQuery(
      ".chronometer__button--reset",
      //@ts-ignore
      this.shadowRoot
    );

    playButton?.addEventListener("click", startResumeChronometer);

    partialButton?.addEventListener("click", addPartial);

    restartButton?.addEventListener("click", restartChronometer);

    //@ts-ignore
    const tableBody: HTMLTableSectionElement = selectQuery(
      "tbody",
      //@ts-ignore
      this.shadowRoot
    );

    tableBody?.addEventListener("dragover", dragOverContainerElement);
  }

  /**
   * Method called every time the element is removed from the DOM
   * Used to remove event listeners
   */
  disconnectedCallback() {
    //@ts-ignore
    const playButton: HTMLButtonElement = selectQuery(
      ".chronometer__button--play",
      //@ts-ignore
      this.shadowRoot
    );
    //@ts-ignore
    const partialButton: HTMLButtonElement = selectQuery(
      ".chronometer__button--partial",
      //@ts-ignore
      this.shadowRoot
    );
    //@ts-ignore
    const restartButton: HTMLButtonElement = selectQuery(
      ".chronometer__button--reset",
      //@ts-ignore
      this.shadowRoot
    );

    playButton?.removeEventListener("click", startResumeChronometer);

    partialButton?.removeEventListener("click", addPartial);

    restartButton?.removeEventListener("click", restartChronometer);
  }

  /**
   * Methods as a callback function that is called by the browser's web API
   *  when an observed attribute of a custom element is added, removed, or changed.
   *
   * @param {string} name
   */
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    const chronometerComponent = this;

    switch (name) {
      case "current-time": {
        const amountOfSeconds: number = Math.floor(Number(newValue) / 100);

        //@ts-ignore
        const hourMinutesSecondsPart: HTMLSpanElement = selectQuery(
          ".chronometer__value--main",
          chronometerComponent
        );

        const { hours, minutes, seconds } = getTimeValues(amountOfSeconds);
        hourMinutesSecondsPart.textContent = `${hours}:${minutes}:${seconds},`;

        const centisecondsRemaining: string = getCentisecondsValue(
          Number(newValue)
        );
        //@ts-ignore
        const centisecondsPart: HTMLSpanElement = selectQuery(
          ".chronometer__value--centiseconds",
          chronometerComponent
        );
        centisecondsPart.textContent = centisecondsRemaining;
        break;
      }

      case "is-running": {
        const isRunning: boolean = newValue === "true";
        log(isRunning ? "Playing ⏸" : "Paused ▶");
        if (isRunning) {
          function incrementChronometer() {
            let chronometerComponentLocal = selectQuery("chrono-meter");
            let value: number = Number(
              chronometerComponentLocal.getAttribute("current-time")
            );

            addModifyAttribute(
              chronometerComponentLocal,
              "current-time",
              value + 1
            );
          }
          const intervalId = Interval.set(incrementChronometer, 10);

          addModifyAttribute(chronometerComponent, "interval-id", intervalId);
        } else {
          const intervalId: number = Number(
            chronometerComponent.getAttribute("interval-id")
          );
          //@ts-ignore
          Interval.clear(intervalId);
        }
        break;
      }

      default: {
        log("unknown modif");
        break;
      }
    }
  }
}
/**
 * Toggles the start/pause button and enables/disables partial and restart buttons
 *
 * @param {MouseEvent} event - The click event on the start/pause button
 * @returns {void}
 */
function startResumeChronometer(event: MouseEvent): void {
  // Get the chronometer component
  //@ts-ignore
  const chronometerComponent: HTMLElement = getComponentHost(
    //@ts-ignore
    event.currentTarget
  );

  // Get the pause and play SVG icons
  //@ts-ignore
  const pauseSvg: SVGSVGElement = selectQuery(
    ".chronometer__icon--pause",
    chronometerComponent
  );
  //@ts-ignore
  const playSvg: SVGSVGElement = selectQuery(
    ".chronometer__icon--play",
    chronometerComponent
  );

  /**
   * Shows the pause button and hides the play button
   *
   * @returns {void}
   */
  function showPauseButton(): void {
    pauseSvg.classList.remove("hide");
    playSvg.classList.add("hide");
  }

  /**
   * Shows the play button and hides the pause button
   *
   * @returns {void}
   */
  function showPlayButton(): void {
    pauseSvg.classList.add("hide");
    playSvg.classList.remove("hide");
  }

  // Get the partial and restart buttons
  //@ts-ignore
  const partialButton: HTMLButtonElement = getSibling(event.currentTarget);
  //@ts-ignore
  const restartButton: HTMLButtonElement = getSibling(partialButton);

  /**
   * Constant to know if the chronometer was paused
   * @type {boolean}
   */
  const chronometerWasPlaying: boolean =
    //@ts-ignore
    getClassListValues(playSvg).includes("hide");

  switch (chronometerWasPlaying) {
    case true: {
      // Is currently paused
      showPlayButton();
      disableElement(partialButton);

      log("Paused ▶");
      addModifyAttribute(chronometerComponent, "is-running", false);
      break;
    }

    case false: {
      // Is currently playing
      showPauseButton();

      enableElement(partialButton);
      enableElement(restartButton);

      log("Playing ⏸");
      addModifyAttribute(chronometerComponent, "is-running", true);
      break;
    }
  }
}

/**
 * Adds a new table row containing partial time data to the chronometer table body.
 *
 * @param {MouseEvent} event - The event triggered by the user clicking the "Add Partial" button.
 * @returns {void}
 */
function addPartial(event: MouseEvent): void {
  //@ts-ignore
  const chronometerComponent: Element = getComponentHost(event.currentTarget);

  //@ts-ignore
  const table: HTMLTableElement = selectQuery(
    ".chronometer__table",
    //@ts-ignore
    chronometerComponent
  );

  //@ts-ignore
  const tableBody: HTMLTableSectionElement = selectQuery("tbody", table);

  //@ts-ignore
  const allTableBodyRows: HTMLTableRowElement[] = selectQueryAll(
    ".chronometer__table-row--body",
    tableBody
  );

  const passingOrderCurrent: number = allTableBodyRows?.length + 1;

  // Because of the drag and drop feature, we cannot rely on the table row on the top to later compute the total time
  const previousTableRow: HTMLTableRowElement | null = allTableBodyRows.find(
    (tableRow) => {
      //@ts-ignore
      const passingOrderCell: HTMLTableCellElement = selectQuery(
        ".chronometer__table-cell--body",
        tableRow
      );
      const passingOrderValue: number = Number(passingOrderCell.innerText);

      return passingOrderValue === passingOrderCurrent - 1;
    }
  );

  /**
   * Previous total amount of centiseconds from the data attribute
   */
  const previousTotal: number =
    Number(previousTableRow?.getAttribute("data-total-time")) || 0;

  /**
   * Current total in centiseconds displayed on the screen
   */
  const currentTotal: number = Number(
    chronometerComponent.getAttribute("current-time")
  );

  /**
   * Time for that partial in **centiseconds**
   */
  const unformattedTimeForPartial: number = currentTotal - previousTotal;

  const timeForPartialMain = getTimeValues(
    Math.floor(unformattedTimeForPartial / 100)
  );

  const timeForPartialCenti = getCentisecondsValue(unformattedTimeForPartial);

  function showTable(): void {
    table.classList.remove("hide");
  }

  showTable();

  function addTableRow(): void {
    const amountOfTime = getTimeValues(Math.floor(currentTotal / 100));
    let totalCenti: string = getCentisecondsValue(currentTotal);

    const tableRowHTML: string = /* html */ `
      <tr class="chronometer__table-row chronometer__table-row--body" draggable="true" data-total-time="${currentTotal}">
          <td class="chronometer__table-cell chronometer__table-cell--body">${passingOrderCurrent}</td>
          <td class="chronometer__table-cell chronometer__table-cell--body">${timeForPartialMain.hours}:${timeForPartialMain.minutes}:${timeForPartialMain.seconds},${timeForPartialCenti}</td>
          <td class="chronometer__table-cell chronometer__table-cell--body">${amountOfTime.hours}:${amountOfTime.minutes}:${amountOfTime.seconds},${totalCenti}</td>
        </tr> 
    `;

    // We insert the row just inside the table body, before its first child.
    tableBody.insertAdjacentHTML("afterbegin", tableRowHTML);
  }

  addTableRow();

  function addEventListenerToPartial() {
    //@ts-ignore
    const latestPartial: HTMLTableRowElement = selectQuery(
      ".chronometer__table-row--body",
      tableBody
    );

    latestPartial.addEventListener("dragstart", addDraggingClassToElement);
    latestPartial.addEventListener("dragend", removeDraggingClassToElement);
  }

  addEventListenerToPartial();
}

function addDraggingClassToElement(event: DragEvent) {
  log(
    "%cdrag start",
    "background: darkgreen; font-size: 24px",
    event.currentTarget
  );
  //@ts-ignore
  event.target.classList.add("dragging");
}

function removeDraggingClassToElement(event: DragEvent) {
  log(
    "%cdrag end",
    "background: darkblue; font-size: 24px",
    event.currentTarget
  );
  //@ts-ignore
  event.target.classList.remove("dragging");
}

function restartChronometer(event: MouseEvent): void {
  // Get the chronometer component
  //@ts-ignore
  const chronometerComponent: HTMLElement = getComponentHost(
    //@ts-ignore
    event.currentTarget
  );

  // Get the pause and play SVG icons
  //@ts-ignore
  const pauseSvg: SVGSVGElement = selectQuery(
    ".chronometer__icon--pause",
    chronometerComponent
  );
  //@ts-ignore
  const playSvg: SVGSVGElement = selectQuery(
    ".chronometer__icon--play",
    chronometerComponent
  );

  /**
   * Shows the play button and hides the pause button
   *
   * @returns {void}
   */
  function showPlayButton(): void {
    pauseSvg.classList.add("hide");
    playSvg.classList.remove("hide");
  }

  showPlayButton();

  function resetChronometer() {
    addModifyAttribute(chronometerComponent, "current-time", 0);
    addModifyAttribute(chronometerComponent, "is-running", false);
  }
  resetChronometer();

  // Get the partial and restart buttons
  //@ts-ignore
  const partialButton: HTMLButtonElement = selectQuery(
    ".chronometer__button--partial",
    chronometerComponent
  );
  //@ts-ignore
  const restartButton: HTMLButtonElement = selectQuery(
    ".chronometer__button--reset",
    chronometerComponent
  );
  function resetButtons() {
    disableElement(partialButton);
    disableElement(restartButton);
  }
  resetButtons();

  //@ts-ignore
  const table: HTMLTableElement = selectQuery(
    ".chronometer__table",
    //@ts-ignore
    chronometerComponent
  );

  //@ts-ignore
  const arrayOfPartials: HTMLTableRowElement[] = selectQueryAll(
    ".chronometer__table-row--body",
    table
  );
  function removeEventListenersToPartials() {}
  for (const partial of arrayOfPartials) {
    partial.removeEventListener("dragstart", addDraggingClassToElement);
    partial.removeEventListener("dragover", removeDraggingClassToElement);
  }
  removeEventListenersToPartials();

  const tableBody = selectQuery("tbody", table);
  function resetTable() {
    tableBody.innerHTML = "";
    table.classList.add("hide");
  }
  resetTable();
}

function dragOverContainerElement(event: DragEvent) {
  /**
   * By def, dropping inside an element is disabled
   *
   * we do this to enable dropping
   */
  event.preventDefault();
  //@ts-ignore
  const container: HTMLTableSectionElement = event.currentTarget;
  //@ts-ignore
  const draggingElement: HTMLTableRowElement = selectQuery(
    ".chronometer__table-row--body.dragging",
    //@ts-ignore
    container
  );

  const mouseAxisY: number = event.clientY;

  function getClosestElementFromMouse(container: any, mouseAxisY: number) {
    //@ts-ignore
    const idleDraggableElements: HTMLTableRowElement[] = selectQueryAll(
      ".chronometer__table-row--body:not(.dragging)",
      //@ts-ignore
      container
    );

    let closestElement: HTMLTableRowElement | null = null;
    let minDistance: number = Infinity;

    /**
     * We iterate over each element and calculate its middle point
     * on the Y axis using the `getBoundingClientRect()` method.
     */
    for (const element of idleDraggableElements) {
      /***
       * We get the top and bottom of the idle draggable element
       */
      const { top, bottom, height }: DOMRect = element.getBoundingClientRect();
      /*
      We get the Y value of the element from the middle
      */
      const middle: number = (top + bottom) / 2;

      /**
       * We get the offset between the draggale element and the closest idle element
       */
      const offset: number = Math.abs(middle - mouseAxisY);

      log({ middle, mouseAxisY, offset });

      const isAboveElement: boolean = minDistance > offset;
      if (isAboveElement) {
        closestElement = element;
        minDistance = offset;
      }
    }

    return closestElement;
  }

  const afterElement = getClosestElementFromMouse(container, mouseAxisY);
  const thereAreNoAfterElement = !afterElement;

  const foundDraggable: boolean = !!draggingElement;
  if (foundDraggable) {
    if (thereAreNoAfterElement) {
      //@ts-ignore
      container.appendChild(draggingElement);
    } else {
      container.insertBefore(draggingElement, afterElement);
    }
  }
}
/**
 * We defined it so that we can use it
 */
customElements.define("chrono-meter", Chronometer);
// <chrono-meter></chrono-meter>
