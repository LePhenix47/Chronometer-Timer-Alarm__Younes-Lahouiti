import { selectQuery, } from "../../ts-utils/helper-functions/dom.functions.js";
/**
 * We set the elements of our Web Component inside a `<template>`
 */
const timerTemplate = document.createElement("template");
timerTemplate.innerHTML = `
<style>
.circle{
  fill: #222;
  
  cx: 50;
  cy: 50;
  r: 45;
  
  stroke: grey;
  stroke-dasharray: var(--svg-dasharray);
  stroke-dashoffset: var(--svg-dashoffset);

  transition: stroke-dasharray 350ms ease, stroke-dashoffset 350ms ease;

  transform-origin: center;
  rotate: 270deg;
}

.timer-component__container {
    background-color: black;
    display: block;
}
</style>

<div class="timer-component__container">
<svg 
viewBox="0 0 100 100"
  xmlns="http://www.w3.org/2000/svg">

  <circle class="circle"></circle>
  
</svg>
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
        const shadowRoot = this.attachShadow({ mode: "open" });
        /**
         * HTML of the component
         */
        const clonedTemplate = timerTemplate.content.cloneNode(true);
        /**
         * We append the template content to the container
         */
        shadowRoot.appendChild(clonedTemplate);
        //@ts-ignore
        const svgCircle = selectQuery("circle", this.shadowRoot);
        //@ts-ignore
        const svgCircleLength = svgCircle === null || svgCircle === void 0 ? void 0 : svgCircle.getTotalLength();
        svgCircle === null || svgCircle === void 0 ? void 0 : svgCircle.style.setProperty("--svg-dasharray", `${svgCircleLength}`);
        svgCircle === null || svgCircle === void 0 ? void 0 : svgCircle.style.setProperty("--svg-dashoffset", `${2 * svgCircleLength}`);
    }
}
/**
 * We defined it so that we can use it
 */
customElements.define("timer-component", TimerComponent);
// <timer-component>
