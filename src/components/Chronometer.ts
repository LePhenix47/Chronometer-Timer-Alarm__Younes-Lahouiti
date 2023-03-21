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
  align-items: flex-end;
  font-size: 84px;
  font-weight: normal;
}
.chronometer__value--centiseconds {
  font-size: 58px;
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
  max-height: 450px; /* Max height for the table before having a scrollbar */
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
       <tr class="chronometer__table-row chronometer__table-row--body" draggable="true" data-current-time="0">
        <td class="chronometer__table-cell chronometer__table-cell--body">1</td>
        <td class="chronometer__table-cell chronometer__table-cell--body">00:00:00,69</td>
        <td class="chronometer__table-cell chronometer__table-cell--body">00:00:00,69</td>
      </tr>
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

    partialButton?.addEventListener("click", (e: MouseEvent) => {
      log(e.currentTarget, "click!");
    });

    restartButton?.addEventListener("click", (e: MouseEvent) => {
      log(e.currentTarget, "click!");
    });
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

    partialButton?.removeEventListener("click", (e: MouseEvent) => {
      log(e.currentTarget, "click!");
    });

    restartButton?.removeEventListener("click", (e: MouseEvent) => {
      log(e.currentTarget, "click!");
    });
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
        const chronometerValue = selectQuery(
          ".chronometer__value",
          chronometerComponent
        );
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

function startResumeChronometer(event: MouseEvent): void {
  //@ts-ignore
  const chronometerComponent = getComponentHost(event.currentTarget);

  //@ts-ignore
  const pauseSvg: SVGSVGElement = selectQuery(
    ".chronometer__icon--pause",
    //@ts-ignore
    chronometerComponent
  );

  //@ts-ignore
  const playSvg: SVGSVGElement = selectQuery(
    ".chronometer__icon--play",
    //@ts-ignore
    chronometerComponent
  );

  function showPauseButton(): void {
    pauseSvg.classList.remove("hide");
    playSvg.classList.add("hide");
  }

  function showPlayButton(): void {
    pauseSvg.classList.add("hide");
    playSvg.classList.remove("hide");
  }

  //@ts-ignore
  const partialButton: HTMLButtonElement = getSibling(event.currentTarget);
  //@ts-ignore
  const restartButton: HTMLButtonElement = getSibling(partialButton);

  /**
   * Constant to know if the chronometer was paused
   */
  const chronometerWasPlaying: boolean =
    //@ts-ignore
    getClassListValues(playSvg).includes("hide");

  switch (chronometerWasPlaying) {
    case true: {
      //Is currently paused
      showPlayButton();
      disableElement(partialButton);

      log("Paused ▶");
      addModifyAttribute(chronometerComponent, "is-running", false);
      break;
    }

    case false: {
      //Is currently playing
      showPauseButton();

      enableElement(partialButton);
      enableElement(restartButton);

      log("Playing ⏸");
      addModifyAttribute(chronometerComponent, "is-running", true);
      break;
    }
  }
}

function addPartial(event: MouseEvent): void {
  //@ts-ignore
  const chronometerComponent = getComponentHost(event.currentTarget);

  //@ts-ignore
  const table = selectQuery(".chronometer__table", chronometerComponent);

  function showTable() {
    table.classList.remove("hide");
  }

  const chronometerJustStarted =
    Number(chronometerComponent.getAttribute("current-time")) === 0;

  if (chronometerJustStarted) {
    showTable();
  }
}

function restartChronometer(event: MouseEvent): void {}

/**
 * We defined it so that we can use it
 */
customElements.define("chrono-meter", Chronometer);
// <chrono-meter></chrono-meter>
