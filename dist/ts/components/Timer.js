"use strict";
const timerTemplate = ``;
class Timer extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
    }
}
customElements.define("timer", Timer);
