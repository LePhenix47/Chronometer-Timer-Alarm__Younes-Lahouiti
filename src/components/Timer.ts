//Utils
//DOM helper functions
import {
  selectQuery,
  selectQueryAll,
  setStyleProp,
  getChildren,
  getAncestor,
  getSibling,
  getClassListValues,
} from "../ts-utils/helper-functions/dom.functions";

//Console methods
import { log } from "../ts-utils/helper-functions/console-funtions";

//String methods
import { sliceString } from "../ts-utils/helper-functions/string.function";

//Component specific functions
import { handleButtonEvents } from "../ts-utils/helper-functions/timer-component.functions";

//Component specific variables

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
  <button type="button" class="timer-component__button timer-component__button--restart" disabled>
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
  /**
   * Object representing the current state of a timer.
   *
   * @type {Object}
   * @property {"idle" | "started" | "finished"} state - The current state of the timer.
   * @property {boolean} isRunning - Whether the timer is currently running or not.
   */
  timerState: { state: string; isRunning: boolean };

  constructor() {
    super();
    //

    this.timerState = { state: "idle", isRunning: false };
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
        handleButtonEvents(clickedElement, this.timerState);
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

/**
Functions for the timer setter in the modal window aka <dialog>

HTML:

<p class="timer">
  <span class="timer__slot timer__slot--hours"> <input type="number" value="00" min="0" max="99" class="timer__input timer__input--hours"><button class="timer__button timer__button--increment">↑</button><button class="timer__button timer__button--decrement">↓</button></span>
  <span class="timer__slot-separator">:</span>
  <span class="timer__slot timer__slot--minutes"> <input type="number" value="00" min="0" max="59" class="timer__input timer__input--minutes"><button class="timer__button timer__button--increment">↑</button><button class="timer__button timer__button--decrement">↓</button></span>
  <span class="timer__slot-separator">:</span>
  <span class="timer__slot timer__slot--seconds"> <input type="number" value="00" min="0" max="59" class="timer__input timer__input--seconds"><button class="timer__button timer__button--increment">↑</button><button class="timer__button timer__button--decrement">↓</button></span>
</p>

CSS:
body {
  min-height: 100vh;
  overflow-x: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(36, 36, 36);
  color: white;
}

.timer {
  background-color: rgb(31, 31, 31);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  padding: 5px;

  border: 2px solid #333333;
  border-bottom: 2px solid #e4505c;
  border-radius: 3px;
  
  font-weight: 700;

  &__slot {
    position: relative;
    &--hours {
    }

    &--minutes {
    }

    &--seconds {
    }
  }

  &__input {
    text-align: center;

    background-color: inherit;
    border: transparent;

    padding: 10px 10px;
    border-radius: 2px;
    
    display: inline-block;
    width: 50px;
    
    
    font-size: 32px;
    font-weight: inherit;

    
    color: rgb(165, 165, 165);

    &::-webkit-inner-spin-button {
      appearance: none;
    }

    &::-webkit-outer-spin-button {
      appearance: none;
    }

    &:focus {
      background-color: rgb(44, 44, 44);
      outline: transparent;
      color: inherit;
    }

    &--hours {
    }

    &--minutes {
    }

    &--seconds {
    }
  }

  &__button {
    position: absolute;
    left: 50%;
    translate: -50% 0%;

    background-color: transparent;
    color: inherit;
    border: transparent;

    &:hover {
      background-color: rgb(47, 47, 47);
    }

    &:active {
      background-color: rgb(42, 42, 42);
    }

    &--increment {
      bottom: 130%;
    }

    &--decrement {
      top: 130%;
    }
  }

  &__slot-separator {
       font-size: 32px;
    font-weight: inherit;
  }
}



JS:
const hoursSlot = selectQuery(".timer__slot--hours");
const minutesSlot = selectQuery(".timer__slot--minutes");
const secondsSlot = selectQuery(".timer__slot--seconds");

const allSlots = [hoursSlot, minutesSlot, secondsSlot];

function addEventListeners() {
  for (const slot of allSlots) {
    const [input, incrementButton, decrementButton] = getChildren(slot);

    input.addEventListener("input", handleInput);

    incrementButton.addEventListener("click", handleButton);
    decrementButton.addEventListener("click", handleButton);

    const valueOfInput = input.value;
  }
}

addEventListeners();

function handleInput(event) {
  let { value } = event.target;

  verifyInputValue(event.target, false);

  let currentValue = Number(event.target.value);
}

function handleButton(event) {
  const isIncrementButton = getClassListValues(event.target).includes(
    "timer__button--increment"
  );

  const valueToSum = isIncrementButton ? 1 : -1;

  const slotContainer = getAncestor(event.target, ".timer__slot");

  const input = getChildren(slotContainer)[0];

  input.valueAsNumber += valueToSum;

  verifyInputValue(input, true);

  let currentValue = Number(input.value);
}

function verifyInputValue(inputElement, isButtonEvent) {
  const classes = getClassListValues(inputElement);
  const isHoursInput = classes.includes("timer__input--hours");
  const inputLimit = isHoursInput ? 99 : 59;
  log({ isHoursInput });

  if (isButtonEvent) {
    const valueOfInputUnderflows = Number(inputElement.value) < 0;

    if (valueOfInputUnderflows) {
      inputElement.value = inputLimit;
    }
  }
  log(inputElement.value);
  const valueIsUnderTen = Number(inputElement.value) < 10;
  if (valueIsUnderTen) {
    inputElement.value = `0${inputElement.value.slice(-1)}`;
  }

  const valueOverflows = isHoursInput
    ? inputElement.value.slice(1, 3) > 99
    : inputElement.value > 59;

  if (valueOverflows) {
    let currentValue = inputElement.value.slice(1, 3);
    inputElement.value = `0${currentValue.slice(-1)}`;
  }

  const valueIsOverThreeDigits = inputElement.value.length > 2;
  if (valueIsOverThreeDigits) {
    inputElement.value = `${inputElement.value.slice(1, 3)}`;
  }
}
 */
