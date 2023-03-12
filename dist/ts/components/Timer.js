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
  stroke-dasharray: var(--svg-circle-length-end);
  stroke-dashoffset: calc(var(--svg-circle-length) * 2);


  transform-origin: center;
  rotate: 0deg;
}
</style>

<svg 
  viewBox="0 0 100 100"
   xmlns="http://www.w3.org/2000/svg">

    <circle class="circle"></circle>
   
</svg>
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
        console.log(svgCircle, svgCircleLength);
        svgCircle === null || svgCircle === void 0 ? void 0 : svgCircle.style.setProperty("--svg-circle-length", `${svgCircleLength}`);
        svgCircle === null || svgCircle === void 0 ? void 0 : svgCircle.style.setProperty("--svg-circle-length-end", `${svgCircleLength}`);
    }
}
/**
 * We defined it so that we can use it
 */
customElements.define("timer-component", TimerComponent);
// <timer-component>
