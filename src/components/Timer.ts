//Utils
//DOM helper functions
import {
  selectQuery,
  selectQueryAll,
  setStyleProp,
  getChild,
  getAncestor,
  getClassListValues,
} from "../ts-utils/helper-functions/dom.functions";

//Console methods
import { log } from "../ts-utils/helper-functions/console-funtions";

//String methods
import { sliceString } from "../ts-utils/helper-functions/string.function";

//Component specific functions
import { handleButtonEvents } from "../ts-utils/helper-functions/timer-component.functions";

//Component specific variables
import { timerStates } from "../ts-utils/variables/timer-component.variables";

/**
 * We set the elements of our Web Component inside a `<template>`
 */
const timerTemplate: HTMLTemplateElement = document.createElement("template");

/**
 * Style for the component
 */
const style: string = `

*,
::before,
::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.hide {
    display: none;
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

svg{
  aspect-ratio: 1/1;
  width: 100%;

  pointer-events: none;
}

.circle{
  scale: -100% 100%;
  fill: rgb(38, 38, 38);
  
  cx: 50;
  cy: 50;
  r: 45;
  
  stroke: grey;
  stroke-linecap: round;
  stroke-dasharray: var(--svg-dasharray);
  stroke-dashoffset: var(--svg-dashoffset);

  transition: stroke-dasharray 350ms ease, stroke-dashoffset 350ms ease;

  transform-origin: center;
  rotate: 90deg;
}

.circle--bg{
fill: none;
  
  cx: 50;
  cy: 50;
  r: 45;
  
  stroke: #954444;

  /* We make them  */
   stroke-dasharray: var(--svg-dasharray);
   stroke-dashoffset: calc(2 * var(--svg-dasharray));
   
}

.timer-component__container {
    background-color: black;
    display: block;

    width:350px;

    position: relative;
}

.timer-component__paragraph {
  display: inline-block;
    margin: 0;
  
    position: absolute;
    inset: 50%;
    translate: -50% -50%;
  
    width: min-content;
    height: min-content;

      font-variant-numeric: tabular-nums;
      font-size: 44px;
  }


.timer-component__button{
  border: 2px solid rgb(64, 64, 64);
  aspect-ratio: 1/1;
  width: 35px;

  border-radius: 50%;
  
  position: absolute;
  top: 70%; 
}


.timer-component__svg{
  aspect-ratio: 1/1;
  width: 20px;

}

.timer-component__svg--pause{
 
}

.timer-component__svg--play{

}

.timer-component__svg--restart{

}

.timer-component__button{
  display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

.timer-component__button--play{
  left: 30%;
  background-color: rgb(210, 77, 87);
  color: black;
}

.timer-component__button--restart{
right: 30%;
}


`;

/**
 * Content of the component
 */
timerTemplate.innerHTML = `
<style>
${style}
</style>

<div class="timer-component__container">
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="timer__svg">
    <circle class="timer-component__circle--bg circle--bg"></circle>
    <circle class="timer-component__circle circle"></circle>
  </svg>
  <p class="timer-component__paragraph" for="time-input">00:00:00</p>
  <button type="button" class="timer-component__button timer-component__button--play">
  <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256.000000 256.000000" preserveAspectRatio="xMidYMid meet" class="timer-component__svg timer-component__svg--play">
      <g transform="translate(0.000000,256.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
          <path d="M623 2210 c-18 -10 -42 -39 -55 -62 l-23 -43 0 -820 0 -820 22 -47
  c29 -62 70 -88 143 -88 33 0 72 8 98 20 24 11 175 108 335 217 161 109 398
  268 527 354 129 86 247 167 261 181 109 103 115 243 14 344 -46 45 -1071 734
  -1140 765 -54 25 -140 25 -182 -1z" />
      </g>
  </svg>
  <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"
    preserveAspectRatio="xMidYMid meet" class="timer-component__svg timer-component__svg--pause hide">

    <g transform="translate(0,256) scale(0.10,-0.10)" fill="currentColor" stroke="none">
        <path d="M610 1280 l0 -840 165 0 165 0 0 840 0 840 -165 0 -165 0 0 -840z" />
        <path d="M1620 1280 l0 -840 165 0 165 0 0 840 0 840 -165 0 -165 0 0 -840z" />
    </g>
</svg>
</button>
  <button type="button" class="timer-component__button timer-component__button--restart">
    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"
        preserveAspectRatio="xMidYMid meet" 
         class="timer-component__svg timer-component__svg--restart"
        >

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
        35 -470 15z" />
            </g>
    </svg>
</button>
</div>
`;

class TimerComponent extends HTMLElement {
  constructor() {
    super();
    //
    /**
     * Container that holds our web component
     *
     * to avoid affecting the style of other page elements
     */
    const shadowRoot: ShadowRoot = this.attachShadow({ mode: "open" });

    /**
     * HTML of the component
     */
    const clonedTemplate: Node = timerTemplate.content.cloneNode(true);

    /**
     * We append the template content to the container
     */
    shadowRoot.appendChild(clonedTemplate);
    //

    /**
     * We get the circle
     */
    //@ts-ignore
    const svgCircle: HTMLElement = selectQuery(".circle", this.shadowRoot);
    //@ts-ignore
    const svgCircleLength: number = svgCircle?.getTotalLength();

    /**
     * We set the style prop of these variables to equal to the svgLength
     */
    setStyleProp("--svg-dasharray", `${svgCircleLength}`);
    setStyleProp("--svg-dashoffset", `${2 * svgCircleLength}`);

    //@ts-ignore
    const paragraph: HTMLElement = selectQuery(
      ".timer-component__paragraph",
      //@ts-ignore
      this.shadowRoot
    );

    //@ts-ignore
    const container: HTMLElement = selectQuery(
      ".timer-component__container",
      //@ts-ignore
      this.shadowRoot
    );

    //@ts-ignore
    container.addEventListener("click", (e: MouseEvent) => {
      const clickedElement: EventTarget | null = e.target;

      //@ts-ignore
      const isButton: boolean = clickedElement.tagName.includes("BUTTON");

      if (isButton) {
        handleButtonEvents(clickedElement);
      } else {
        log("open dialog modal");
      }
    });
  }
}

/**
 * We defined it so that we can use it
 */
customElements.define("timer-component", TimerComponent);
// <timer-component></timer-component>
