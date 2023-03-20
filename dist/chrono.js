/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/chrono.ts":
/*!***********************!*\
  !*** ./src/chrono.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_Chronometer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Chronometer */ \"./src/components/Chronometer.ts\");\n/* harmony import */ var _components_Chronometer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_Chronometer__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\n\n//# sourceURL=webpack://21.-timerchrono/./src/chrono.ts?");

/***/ }),

/***/ "./src/components/Chronometer.ts":
/*!***************************************!*\
  !*** ./src/components/Chronometer.ts ***!
  \***************************************/
/***/ (() => {

eval("\r\n/**\r\n * We set the elements of our Web Component inside a `<template>`\r\n */\r\nconst chronometerTemplate = document.createElement(\"template\");\r\n/**\r\n * CSS reset for the component\r\n *\r\n * (mandatory for the component elements on the shadow root)\r\n */\r\nconst resetCSS = /*css*/ `\r\n*,\r\n::before,\r\n::after {\r\n    box-sizing: border-box;\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n\r\n\r\n*::-moz-selection {\r\n    background-color: rgb(240, 18, 36);\r\n    color: white;\r\n    ;\r\n}\r\n\r\n*::selection {\r\n    background-color: rgb(240, 18, 36);\r\n    color: white;\r\n    ;\r\n}\r\n\r\n\r\nbutton {\r\n    border-color: transparent;\r\n    background-color: transparent;\r\n\r\n    font-family: inherit;\r\n\r\n    color: var(--color-primary);\r\n\r\n    \r\n  }\r\n\r\nbutton:hover {\r\n      cursor: pointer;\r\n}\r\n\r\nbutton:hover:disabled {\r\n        cursor: not-allowed;\r\n}\r\n`;\r\n/**\r\n * Style for the chronometer itself\r\n */\r\nconst chronometerCSS = /* css */ `\r\n`;\r\nconst chronometerHTML = /* html */ `\r\n`;\r\nchronometerTemplate.innerHTML = /* html */ `\r\n<style>\r\n  ${resetCSS}\r\n  ${chronometerCSS}\r\n</style>\r\n\r\n<div class=\"chronometer__container\">\r\n\r\n\r\n</div>\r\n`;\r\nclass Chronometer extends HTMLElement {\r\n    /**\r\n     * Constructor to set the HTML content and make the shadown root open\r\n     */\r\n    constructor() {\r\n        //We inherit the methods from the HTMLElement class\r\n        super();\r\n        /**\r\n         * Container that holds our web component\r\n         *\r\n         * to avoid affecting the style of other page elements\r\n         */\r\n        const shadowRoot = this.attachShadow({ mode: \"open\" });\r\n        /**\r\n         * HTML of the component\r\n         */\r\n        const clonedTemplate = chronometerTemplate.content.cloneNode(true);\r\n        /**\r\n         * We append the template content to the container\r\n         */\r\n        shadowRoot.appendChild(clonedTemplate);\r\n    }\r\n    /**\r\n     * Static getter methods that indicates the\r\n     * list of attributes that the custom element wants to observe for changes.\r\n     *\r\n     * ⚠ **Important**: The custom attributes must have a getter and setter in order to be observed\r\n     */\r\n    static get observedAttributes() {\r\n        return [\"current-time\", \"is-running\", \"interval-id\"];\r\n    }\r\n    get currentTime() {\r\n        const attributeValue = this.getAttribute(\"current-time\");\r\n        return attributeValue;\r\n    }\r\n    set currentTime(value) { }\r\n    get isRunning() {\r\n        const attributeValue = this.getAttribute(\"is-running\");\r\n        return attributeValue;\r\n    }\r\n    set isRunning(value) { }\r\n    get intervalId() {\r\n        const attributeValue = this.getAttribute(\"interval-id\");\r\n        return attributeValue;\r\n    }\r\n    set intervalId(value) { }\r\n    /**\r\n     * Method called every time the element is inserted into the DOM\r\n     * Used to add event listeners\r\n     */\r\n    connectedCallback() { }\r\n    /**\r\n     * Method called every time the element is removed from the DOM\r\n     * Used to remove event listeners\r\n     */\r\n    disconnectedCallback() { }\r\n    /**\r\n     * Methods as a callback function that is called by the browser's web API\r\n     *  when an observed attribute of a custom element is added, removed, or changed.\r\n     *\r\n     * @param {string} name\r\n     */\r\n    attributeChangedCallback(name, oldValue, newValue) { }\r\n}\r\n/**\r\n * We defined it so that we can use it\r\n */\r\ncustomElements.define(\"chrono-meter\", Chronometer);\r\n// <chrono-meter></chrono-meter>\r\n\n\n//# sourceURL=webpack://21.-timerchrono/./src/components/Chronometer.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/chrono.ts");
/******/ 	
/******/ })()
;