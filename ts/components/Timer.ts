//Utils
import {
  selectQuery,
  selectQueryAll,
} from "../../ts-utils/helper-functions/dom.functions.js";

import { log } from "../../ts-utils/helper-functions/console-funtions.js";

import { sliceString } from "../../ts-utils/helper-functions/string.function.js";

/**
 * We set the elements of our Web Component inside a `<template>`
 */
const timerTemplate: HTMLTemplateElement = document.createElement("template");
timerTemplate.innerHTML = `
<style>

svg{
  aspect-ratio: 1/1;
  width: 500px;
}

.circle{
  scale: -100% 100%;
  fill: #222;
  
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

    width:min-content;

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
  position: absolute;
}
</style>

<div class="timer-component__container">
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle class="circle--bg"></circle>
    <circle class="circle"></circle>
  </svg>
  <p class="timer-component__paragraph" for="time-input">00:00:00</p>
  <button type="button" class="timer-component__button">Play-pause</button>
  <button type="button" class="timer-component__button">Restart</button>
</div>
`;

class TimerComponent extends HTMLElement {
  constructor() {
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
    const clonedTemplate: Node = timerTemplate.content.cloneNode(true);

    /**
     * We append the template content to the container
     */
    shadowRoot.appendChild(clonedTemplate);

    /**
     * We get the circle
     */
    //@ts-ignore
    const svgCircle: HTMLElement = selectQuery(".circle", this.shadowRoot);
    //@ts-ignore
    const svgCircleLength: number = svgCircle?.getTotalLength();

    document.body.style.setProperty("--svg-dasharray", `${svgCircleLength}`);
    document.body.style.setProperty(
      "--svg-dashoffset",
      `${2 * svgCircleLength}`
    );

    //@ts-ignore
    const paragraph: HTMLElement = selectQuery(
      ".timer-component__input",
      //@ts-ignore
      this.shadowRoot
    );
  }
}

/**
 * We defined it so that we can use it
 */
customElements.define("timer-component", TimerComponent);
// <timer-component>
