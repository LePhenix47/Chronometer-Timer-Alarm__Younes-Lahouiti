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

/***/ "./src/components/Timer.ts":
/*!*********************************!*\
  !*** ./src/components/Timer.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ts_utils_helper_functions_dom_functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ts-utils/helper-functions/dom.functions */ \"./src/ts-utils/helper-functions/dom.functions.ts\");\n/* harmony import */ var _ts_utils_helper_functions_console_funtions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ts-utils/helper-functions/console-funtions */ \"./src/ts-utils/helper-functions/console-funtions.ts\");\n//Utils\r\n\r\n\r\n/**\r\n * We set the elements of our Web Component inside a `<template>`\r\n */\r\nconst timerTemplate = document.createElement(\"template\");\r\n/**\r\n * Style for the component\r\n */\r\nconst style = `\r\n\r\n*,\r\n::before,\r\n::after {\r\n    box-sizing: border-box;\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n\r\nbutton {\r\n    border-color: transparent;\r\n    background-color: transparent;\r\n\r\n    font-family: inherit;\r\n\r\n    color: var(--color-primary);\r\n\r\n    \r\n  }\r\n\r\nbutton:hover {\r\n      cursor: pointer;\r\n}\r\n\r\nbutton:hover:disabled {\r\n        cursor: not-allowed;\r\n}\r\n\r\nsvg{\r\n  aspect-ratio: 1/1;\r\n  width: 100%;\r\n}\r\n\r\n.circle{\r\n  scale: -100% 100%;\r\n  fill: #222;\r\n  \r\n  cx: 50;\r\n  cy: 50;\r\n  r: 45;\r\n  \r\n  stroke: grey;\r\n  stroke-linecap: round;\r\n  stroke-dasharray: var(--svg-dasharray);\r\n  stroke-dashoffset: var(--svg-dashoffset);\r\n\r\n  transition: stroke-dasharray 350ms ease, stroke-dashoffset 350ms ease;\r\n\r\n  transform-origin: center;\r\n  rotate: 90deg;\r\n}\r\n\r\n.circle--bg{\r\nfill: none;\r\n  \r\n  cx: 50;\r\n  cy: 50;\r\n  r: 45;\r\n  \r\n  stroke: #954444;\r\n\r\n  /* We make them  */\r\n   stroke-dasharray: var(--svg-dasharray);\r\n   stroke-dashoffset: calc(2 * var(--svg-dasharray));\r\n   \r\n}\r\n\r\n.timer-component__container {\r\n    background-color: black;\r\n    display: block;\r\n\r\n    width:350px;\r\n\r\n    position: relative;\r\n}\r\n\r\n.timer-component__paragraph {\r\n  display: inline-block;\r\n    margin: 0;\r\n  \r\n    position: absolute;\r\n    inset: 50%;\r\n    translate: -50% -50%;\r\n  \r\n    width: min-content;\r\n    height: min-content;\r\n\r\n      font-variant-numeric: tabular-nums;\r\n      font-size: 44px;\r\n  }\r\n\r\n\r\n.timer-component__button{\r\n  border: 2px solid rgb(64, 64, 64);\r\n  aspect-ratio: 1/1;\r\n  width: 35px;\r\n  \r\n  border-radius: 50%;\r\n  \r\n  position: absolute;\r\n  top: 70%; \r\n}\r\n\r\n.timer-component__button > svg{\r\n  aspect-ratio: 1/1;\r\n  width: 30px;\r\n}\r\n\r\n.timer-component__button--play{\r\nleft: 30%;\r\nbackground-color: rgb(210, 77, 87);\r\n\r\n}\r\n\r\n.timer-component__button--restart{\r\nright: 30%;\r\n}\r\n`;\r\n/**\r\n * Content of the component\r\n */\r\ntimerTemplate.innerHTML = `\r\n<style>\r\n${style}\r\n</style>\r\n\r\n<div class=\"timer-component__container\">\r\n  <svg viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\" class=\"timer__svg\">\r\n    <circle class=\"timer-component__circle--bg circle--bg\"></circle>\r\n    <circle class=\"timer-component__circle circle\"></circle>\r\n  </svg>\r\n  <p class=\"timer-component__paragraph\" for=\"time-input\">00:00:00</p>\r\n  <button type=\"button\" class=\"timer-component__button timer-component__button--play\">Play-pause</button>\r\n  <button type=\"button\" class=\"timer-component__button timer-component__button--restart\">\r\n    <svg version=\"1.0\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\"\r\n        preserveAspectRatio=\"xMidYMid meet\">\r\n\r\n            <g transform=\"translate(0,256) scale(0.10,-0.10)\" fill=\"currentColor\" stroke=\"none\">\r\n                <path d=\"M1200 2336 c-279 -58 -528 -222 -681 -447 -49 -73 -123 -225 -140\r\n        -291 -7 -27 -16 -48 -20 -48 -4 0 -37 58 -74 130 -36 71 -74 134 -85 140 -47\r\n        25 -104 1 -115 -50 -6 -25 14 -69 130 -289 127 -243 138 -261 171 -271 33 -11\r\n        42 -7 291 123 268 141 291 158 277 211 -8 34 -37 57 -71 58 -19 1 -92 -32\r\n        -202 -91 -96 -50 -175 -91 -177 -91 -20 0 33 175 83 275 93 187 273 355 463\r\n        431 161 65 342 87 497 60 358 -62 633 -304 739 -651 25 -82 28 -105 28 -250 1\r\n        -137 -3 -171 -22 -239 -105 -365 -387 -616 -756 -672 -212 -33 -447 17 -621\r\n        132 -87 56 -112 62 -148 34 -21 -17 -27 -30 -27 -60 0 -32 6 -44 38 -70 49\r\n        -40 195 -116 285 -146 147 -50 352 -68 507 -44 101 16 246 66 342 118 281 152\r\n        475 412 544 728 23 107 23 321 0 428 -89 408 -381 716 -786 827 -97 27 -371\r\n        35 -470 15z\" />\r\n            </g>\r\n    </svg>\r\n</button>\r\n</div>\r\n`;\r\nclass TimerComponent extends HTMLElement {\r\n    constructor() {\r\n        super();\r\n        /**\r\n         * Container that holds our web component\r\n         *\r\n         * to avoid affecting the style of other page elements\r\n         */\r\n        const shadowRoot = this.attachShadow({ mode: \"open\" });\r\n        /**\r\n         * HTML of the component\r\n         */\r\n        const clonedTemplate = timerTemplate.content.cloneNode(true);\r\n        /**\r\n         * We append the template content to the container\r\n         */\r\n        shadowRoot.appendChild(clonedTemplate);\r\n        /**\r\n         * We get the circle\r\n         */\r\n        //@ts-ignore\r\n        const svgCircle = (0,_ts_utils_helper_functions_dom_functions__WEBPACK_IMPORTED_MODULE_0__.selectQuery)(\".circle\", this.shadowRoot);\r\n        //@ts-ignore\r\n        const svgCircleLength = svgCircle === null || svgCircle === void 0 ? void 0 : svgCircle.getTotalLength();\r\n        /**\r\n         * We set the style prop of these variables to equal to the svgLength\r\n         */\r\n        (0,_ts_utils_helper_functions_dom_functions__WEBPACK_IMPORTED_MODULE_0__.setStyleProp)(\"--svg-dasharray\", `${svgCircleLength}`);\r\n        (0,_ts_utils_helper_functions_dom_functions__WEBPACK_IMPORTED_MODULE_0__.setStyleProp)(\"--svg-dashoffset\", `${2 * svgCircleLength}`);\r\n        //@ts-ignore\r\n        const paragraph = (0,_ts_utils_helper_functions_dom_functions__WEBPACK_IMPORTED_MODULE_0__.selectQuery)(\".timer-component__paragraph\", \r\n        //@ts-ignore\r\n        this.shadowRoot);\r\n        //@ts-ignore\r\n        const container = (0,_ts_utils_helper_functions_dom_functions__WEBPACK_IMPORTED_MODULE_0__.selectQuery)(\".timer-component__container\", \r\n        //@ts-ignore\r\n        this.shadowRoot);\r\n        //@ts-ignore\r\n        container.addEventListener(\"click\", (e) => {\r\n            (0,_ts_utils_helper_functions_console_funtions__WEBPACK_IMPORTED_MODULE_1__.log)(e.target);\r\n        });\r\n    }\r\n}\r\n/**\r\n * We defined it so that we can use it\r\n */\r\ncustomElements.define(\"timer-component\", TimerComponent);\r\n// <timer-component></timer-component>\r\n\n\n//# sourceURL=webpack://21.-timerchrono/./src/components/Timer.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_Timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Timer */ \"./src/components/Timer.ts\");\n\r\n\n\n//# sourceURL=webpack://21.-timerchrono/./src/index.ts?");

/***/ }),

/***/ "./src/ts-utils/helper-functions/console-funtions.ts":
/*!***********************************************************!*\
  !*** ./src/ts-utils/helper-functions/console-funtions.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"assert\": () => (/* binding */ assert),\n/* harmony export */   \"clear\": () => (/* binding */ clear),\n/* harmony export */   \"count\": () => (/* binding */ count),\n/* harmony export */   \"countReset\": () => (/* binding */ countReset),\n/* harmony export */   \"debug\": () => (/* binding */ debug),\n/* harmony export */   \"dir\": () => (/* binding */ dir),\n/* harmony export */   \"dirxml\": () => (/* binding */ dirxml),\n/* harmony export */   \"error\": () => (/* binding */ error),\n/* harmony export */   \"group\": () => (/* binding */ group),\n/* harmony export */   \"groupCollapsed\": () => (/* binding */ groupCollapsed),\n/* harmony export */   \"groupEnd\": () => (/* binding */ groupEnd),\n/* harmony export */   \"info\": () => (/* binding */ info),\n/* harmony export */   \"log\": () => (/* binding */ log),\n/* harmony export */   \"profile\": () => (/* binding */ profile),\n/* harmony export */   \"profileEnd\": () => (/* binding */ profileEnd),\n/* harmony export */   \"table\": () => (/* binding */ table),\n/* harmony export */   \"time\": () => (/* binding */ time),\n/* harmony export */   \"timeEnd\": () => (/* binding */ timeEnd),\n/* harmony export */   \"timeLog\": () => (/* binding */ timeLog),\n/* harmony export */   \"timeStamp\": () => (/* binding */ timeStamp),\n/* harmony export */   \"trace\": () => (/* binding */ trace),\n/* harmony export */   \"warn\": () => (/* binding */ warn)\n/* harmony export */ });\n/**\r\n * The console methods are exported as separate methods through destructuring\r\n */\r\nconst { log, error, table, time, timeEnd, timeStamp, timeLog, assert, clear, count, countReset, group, groupCollapsed, groupEnd, trace, profile, profileEnd, warn, debug, info, dir, dirxml, } = console;\r\n\n\n//# sourceURL=webpack://21.-timerchrono/./src/ts-utils/helper-functions/console-funtions.ts?");

/***/ }),

/***/ "./src/ts-utils/helper-functions/dom.functions.ts":
/*!********************************************************!*\
  !*** ./src/ts-utils/helper-functions/dom.functions.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getAncestor\": () => (/* binding */ getAncestor),\n/* harmony export */   \"getChildNodes\": () => (/* binding */ getChildNodes),\n/* harmony export */   \"selectQuery\": () => (/* binding */ selectQuery),\n/* harmony export */   \"selectQueryAll\": () => (/* binding */ selectQueryAll),\n/* harmony export */   \"setStyleProp\": () => (/* binding */ setStyleProp)\n/* harmony export */ });\n/**\r\n * A simplified version of `document.querySelector()`\r\n *\r\n * @param {string} query - HTML Element to select\r\n * @param {HTMLElement} container - HTML Element to select the query from\r\n * @returns  - The element selected or `null` if the element doesn't exist\r\n */\r\nfunction selectQuery(query, container) {\r\n    var _a;\r\n    if (!container) {\r\n        return document.querySelector(query);\r\n    }\r\n    /**\r\n     * We check if it's a web component, they always have a hyphen in their tag name\r\n     */\r\n    const isWebComponent = (_a = container === null || container === void 0 ? void 0 : container.tagName) === null || _a === void 0 ? void 0 : _a.includes(\"-\");\r\n    if (isWebComponent) {\r\n        //@ts-ignore\r\n        return container.shadowRoot.querySelector(query);\r\n    }\r\n    return container.querySelector(query);\r\n}\r\n/**\r\n * A simplified version of `document.querySelectorAll()`\r\n *\r\n * @param {string} query - HTML Element to select\r\n * @param {HTMLElement} container - HTML Element to select the query from\r\n * @returns {HTMLElement[]|null} - An array with all the elements selected or `null` if the element doesn't exist\r\n */\r\nfunction selectQueryAll(query, container) {\r\n    if (!container) {\r\n        return Array.from(document.querySelectorAll(query));\r\n    }\r\n    const isWebComponent = container.tagName.includes(\"-\");\r\n    if (isWebComponent) {\r\n        //@ts-ignore\r\n        return Array.from(container.shadowRoot.querySelectorAll(query));\r\n    }\r\n    return Array.from(container.querySelectorAll(query));\r\n}\r\n/**\r\n * Function that returns an array containing all child nodes of an HTML element.\r\n *\r\n * @param {HTMLElement} elementOfReference The parent HTML element whose children to select.\r\n * @returns {ChildNode[]|null} An array containing all child nodes of the parent element or null if the parent element has no children.\r\n */\r\nfunction getChildNodes(elementOfReference) {\r\n    return Array.from(elementOfReference.childNodes);\r\n}\r\n/**\r\n * Returns the closest ancestor element of a given HTML element based on a CSS selector.\r\n *\r\n * @param {HTMLElement} elementOfReference - The HTML element of reference.\r\n * @param {string} [cssSelector=\"\"] - The CSS selector to use to select the ancestor element. Default is an empty string.\r\n *\r\n * @returns {HTMLElement|null} The closest ancestor element that matches the CSS selector, or null if no ancestor element matches the selector.\r\n */\r\nfunction getAncestor(elementOfReference, cssSelector = \"\") {\r\n    return elementOfReference.closest(cssSelector);\r\n}\r\n/**\r\n * Sets the value of a specified CSS property for the given HTML element.\r\n *\r\n * @param {string} property - The name of the style property to set.\r\n * @param {string} value - The value to set for the specified style property.\r\n * @param {HTMLElement} [element=document.body] - The HTML element to set the style property for, ***NOT mandatory***.\r\n\r\n* @returns {void}\r\n */\r\nfunction setStyleProp(property, value, element = document.body) {\r\n    return element.style.setProperty(property, value);\r\n}\r\n\n\n//# sourceURL=webpack://21.-timerchrono/./src/ts-utils/helper-functions/dom.functions.ts?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;