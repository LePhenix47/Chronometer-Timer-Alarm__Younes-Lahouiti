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

eval("\r\n/**\r\n * We set the elements of our Web Component inside a `<template>`\r\n */\r\nconst chronometerTemplate = document.createElement(\"template\");\r\n/**\r\n * CSS reset for the component\r\n *\r\n * (mandatory for the component elements on the shadow root)\r\n */\r\nconst resetCSS = /*css*/ `\r\n*,\r\n::before,\r\n::after {\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\n*::-moz-selection {\r\n  background-color: #f01224;\r\n  color: white;\r\n}\r\n\r\n*::selection {\r\n  background-color: #f01224;\r\n  color: white;\r\n}\r\n\r\nbutton {\r\n  border-color: transparent;\r\n  background-color: transparent;\r\n  font-family: inherit;\r\n  color: var(--color-primary);\r\n}\r\n\r\nbutton:hover {\r\n  cursor: pointer;\r\n}\r\n\r\nbutton:hover:disabled {\r\n  cursor: not-allowed;\r\n}\r\n`;\r\n/**\r\n * Style for the chronometer itself\r\n */\r\nconst chronometerCSS = /* css */ `\r\n\r\n.hide {\r\n  display: none;\r\n}\r\n\r\n.chronometer__container {\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n.chronometer__value {\r\n  margin-block: 25px;\r\n\r\n  display: inline-flex;\r\n  justify-content: center;\r\n  align-items: flex-end;\r\n  font-size: 84px;\r\n  font-weight: normal;\r\n}\r\n.chronometer__value--centiseconds {\r\n  font-size: 58px;\r\n}\r\n.chronometer__buttons-container {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  gap: 30px;\r\n  margin-block: 25px;\r\n}\r\n.chronometer__button {\r\n  aspect-ratio: 1/1;\r\n  background-color: #343434;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  border-radius: 50%;\r\n  padding: 12px;\r\n}\r\n.chronometer__button:disabled {\r\n  background-color: #303030;\r\n  color: #7b7b7b;\r\n}\r\n.chronometer__button--play {\r\n  background-color: #e4505c;\r\n}\r\n.chronometer__button--partial {\r\n  border: 2px solid #3c3c3c;\r\n}\r\n.chronometer__button--reset {\r\n  border: 2px solid #3c3c3c;\r\n}\r\n.chronometer__table {\r\n  border-collapse: collapse;\r\n  border-spacing: 0;\r\n  table-layout: fixed;\r\n  display: flex;\r\n  flex-direction: column;\r\n  height: 100%;\r\n  width: 80%;\r\n  margin: auto;\r\n}\r\n.chronometer__table-head {\r\n  border-bottom: 2px solid #393939;\r\n  display: table;\r\n  table-layout: fixed;\r\n  flex: 0 0 auto;\r\n  width: 100%;\r\n}\r\n.chronometer__table-body {\r\n  max-height: 200px;\r\n  width: 100%;\r\n  display: block;\r\n  overflow-y: auto;\r\n}\r\n.chronometer__table-body::-webkit-scrollbar {\r\n  background-color: #303030;\r\n  width: 9px;\r\n  border-radius: 100vmax;\r\n}\r\n.chronometer__table-body::-webkit-scrollbar-thumb {\r\n  background-color: #e4505c;\r\n  border-radius: 100vmax;\r\n}\r\n.chronometer__table-body::-webkit-scrollbar-thumb:hover {\r\n  background-color: #ff606c;\r\n}\r\n.chronometer__table-body::-webkit-scrollbar-thumb:active {\r\n  background-color: #be4851;\r\n}\r\n@supports (scrollbar-color: black white) {\r\n  .chronometer__table-body {\r\n    scrollbar-width: thin;\r\n    scrollbar-color: #e4505c #303030;\r\n  }\r\n}\r\n.chronometer__table-row--body {\r\n  display: table;\r\n  table-layout: fixed;\r\n  width: 100%;\r\n}\r\n.chronometer__table-cell--head {\r\n  text-align: left;\r\n  padding-bottom: 15px;\r\n  font-weight: bold;\r\n}\r\n.chronometer__table-cell--body {\r\n  overflow: hidden;\r\n  white-space: nowrap;\r\n  text-overflow: ellipsis;\r\n  padding-block: 25px;\r\n}\r\n`;\r\nconst chronometerHTML = /* html */ `\r\n<div class=\"chronometer__container\">\r\n  <h2 class=\"chronometer__value\">\r\n    <span class=\"chronometer__value--main\">00:00:00,</span><span class=\"chronometer__value--centiseconds\">00</span>\r\n  </h2>\r\n\r\n  <section class=\"chronometer__buttons-container\">\r\n    <button class=\"chronometer__button chronometer__button--play\">\r\n      <svg version=\"1.0\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256.000000 256.000000\" preserveAspectRatio=\"xMidYMid meet\" class=\"chronometer__icon chronometer__icon--play\"  width=\"24\" height=\"24\">\r\n        <g transform=\"translate(0.000000,256.000000) scale(0.100000,-0.100000)\" fill=\"black\" stroke=\"none\">\r\n            <path d=\"M623 2210 c-18 -10 -42 -39 -55 -62 l-23 -43 0 -820 0 -820 22 -47\r\n    c29 -62 70 -88 143 -88 33 0 72 8 98 20 24 11 175 108 335 217 161 109 398\r\n    268 527 354 129 86 247 167 261 181 109 103 115 243 14 344 -46 45 -1071 734\r\n    -1140 765 -54 25 -140 25 -182 -1z\"></path>\r\n        </g>\r\n    </svg>\r\n      \r\n      <svg version=\"1.0\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\" preserveAspectRatio=\"xMidYMid meet\" class=\"chronometer__icon chronometer__icon--pause hide\"  width=\"24\" height=\"24\">\r\n  \r\n      <g transform=\"translate(0,256) scale(0.10,-0.10)\" fill=\"black\" stroke=\"none\">\r\n          <path d=\"M610 1280 l0 -840 165 0 165 0 0 840 0 840 -165 0 -165 0 0 -840z\"></path>\r\n          <path d=\"M1620 1280 l0 -840 165 0 165 0 0 840 0 840 -165 0 -165 0 0 -840z\"></path>\r\n      </g>\r\n  </svg>\r\n    </button>\r\n    <button class=\"chronometer__button chronometer__button--partial\" disabled>\r\n      <svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.0\" viewBox=\"0 0 256 256\"\r\n    preserveAspectRatio=\"xMidYMid meet\" width=\"28\" height=\"28\" class=\"chronometer__icon chronometer__icon--flag\">\r\n\r\n    <g transform=\"translate(0,256) scale(0.1,-0.1)\" fill=\"currentColor\" stroke=\"none\">\r\n        <path\r\n            d=\"M509 2211 l-29 -29 0 -902 0 -902 29 -29 c37 -37 65 -37 102 0 l29 29 0 291 0 291 608 0 c693 0 681 -1 757 75 32 32 49 59 61 101 24 82 10 129 -86 297 -48 83 -80 150 -80 167 0 17 32 83 80 166 95 165 110 216 85 299 -11 38 -29 69 -58 99 -74 78 -58 76 -810 76 l-659 0 -29 -29z m1386 -156 c15 -14 25 -36 25 -51 0 -16 -34 -88 -80 -170 -133 -233 -133 -238 4 -476 42 -74 76 -145 76 -159 0 -15 -9 -38 -21 -53 l-20 -26 -620 0 -619 0 0 480 0 480 615 0 616 0 24 -25z\" />\r\n    </g>\r\n</svg></button>\r\n    <button class=\"chronometer__button chronometer__button--reset\">\r\n    <svg version=\"1.0\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\" preserveAspectRatio=\"xMidYMid meet\" class=\"chronometer__icon chronometer__icon--restart\" width=\"26\" height=\"26\">\r\n  \r\n              <g transform=\"translate(0,256) scale(0.10,-0.10)\" fill=\"currentColor\" stroke=\"none\">\r\n                  <path d=\"M1200 2336 c-279 -58 -528 -222 -681 -447 -49 -73 -123 -225 -140\r\n          -291 -7 -27 -16 -48 -20 -48 -4 0 -37 58 -74 130 -36 71 -74 134 -85 140 -47\r\n          25 -104 1 -115 -50 -6 -25 14 -69 130 -289 127 -243 138 -261 171 -271 33 -11\r\n          42 -7 291 123 268 141 291 158 277 211 -8 34 -37 57 -71 58 -19 1 -92 -32\r\n          -202 -91 -96 -50 -175 -91 -177 -91 -20 0 33 175 83 275 93 187 273 355 463\r\n          431 161 65 342 87 497 60 358 -62 633 -304 739 -651 25 -82 28 -105 28 -250 1\r\n          -137 -3 -171 -22 -239 -105 -365 -387 -616 -756 -672 -212 -33 -447 17 -621\r\n          132 -87 56 -112 62 -148 34 -21 -17 -27 -30 -27 -60 0 -32 6 -44 38 -70 49\r\n          -40 195 -116 285 -146 147 -50 352 -68 507 -44 101 16 246 66 342 118 281 152\r\n          475 412 544 728 23 107 23 321 0 428 -89 408 -381 716 -786 827 -97 27 -371\r\n          35 -470 15z\"></path>\r\n              </g>\r\n      </svg>\r\n    </button>\r\n  </section>\r\n\r\n  <table class=\"chronometer__table\">\r\n    <thead class=\"chronometer__table-head\">\r\n      <tr class=\"chronometer__table-row chronometer__table-row--head\">\r\n        <th class=\"chronometer__table-cell chronometer__table-cell--head\">Passing order</th>\r\n        <th class=\"chronometer__table-cell chronometer__table-cell--head\">Time</th>\r\n        <th class=\"chronometer__table-cell chronometer__table-cell--head\">Total</th>\r\n      </tr>\r\n    </thead>\r\n    \r\n    <tbody class=\"chronometer__table-body\">\r\n       <tr class=\"chronometer__table-row chronometer__table-row--body\" draggable=\"true\" data-current-time=\"0\">\r\n        <td class=\"chronometer__table-cell chronometer__table-cell--body\">1</td>\r\n        <td class=\"chronometer__table-cell chronometer__table-cell--body\">00:00:00,69</td>\r\n        <td class=\"chronometer__table-cell chronometer__table-cell--body\">00:00:00,69</td>\r\n      </tr>\r\n      \r\n      <tr class=\"chronometer__table-row chronometer__table-row--body\" draggable=\"true\" data-current-time=\"0\">\r\n        <td class=\"chronometer__table-cell chronometer__table-cell--body\">2</td>\r\n        <td class=\"chronometer__table-cell chronometer__table-cell--body\">00:00:00,69</td>\r\n        <td class=\"chronometer__table-cell chronometer__table-cell--body\">00:00:00,69</td>\r\n      </tr>\r\n      <tr class=\"chronometer__table-row chronometer__table-row--body\" draggable=\"true\" data-current-time=\"0\">\r\n        <td class=\"chronometer__table-cell chronometer__table-cell--body\">3</td>\r\n        <td class=\"chronometer__table-cell chronometer__table-cell--body\">00:00:00,69</td>\r\n        <td class=\"chronometer__table-cell chronometer__table-cell--body\">00:00:00,69</td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n\r\n</div>\r\n`;\r\nchronometerTemplate.innerHTML = /* html */ `\r\n<style>\r\n  ${resetCSS}\r\n  ${chronometerCSS}\r\n</style>\r\n\r\n<div class=\"chronometer__container\">\r\n${chronometerHTML}\r\n</div>\r\n`;\r\nclass Chronometer extends HTMLElement {\r\n    /**\r\n     * Constructor to set the HTML content and make the shadown root open\r\n     */\r\n    constructor() {\r\n        //We inherit the methods from the HTMLElement class\r\n        super();\r\n        /**\r\n         * Container that holds our web component\r\n         *\r\n         * to avoid affecting the style of other page elements\r\n         */\r\n        const shadowRoot = this.attachShadow({ mode: \"open\" });\r\n        /**\r\n         * HTML of the component\r\n         */\r\n        const clonedTemplate = chronometerTemplate.content.cloneNode(true);\r\n        /**\r\n         * We append the template content to the container\r\n         */\r\n        shadowRoot.appendChild(clonedTemplate);\r\n    }\r\n    /**\r\n     * Static getter methods that indicates the\r\n     * list of attributes that the custom element wants to observe for changes.\r\n     *\r\n     * ⚠ **Important**: The custom attributes must have a getter and setter in order to be observed\r\n     */\r\n    static get observedAttributes() {\r\n        return [\"current-time\", \"is-running\", \"interval-id\"];\r\n    }\r\n    get currentTime() {\r\n        const attributeValue = this.getAttribute(\"current-time\");\r\n        return attributeValue;\r\n    }\r\n    set currentTime(value) { }\r\n    get isRunning() {\r\n        const attributeValue = this.getAttribute(\"is-running\");\r\n        return attributeValue;\r\n    }\r\n    set isRunning(value) { }\r\n    get intervalId() {\r\n        const attributeValue = this.getAttribute(\"interval-id\");\r\n        return attributeValue;\r\n    }\r\n    set intervalId(value) { }\r\n    /**\r\n     * Method called every time the element is inserted into the DOM\r\n     * Used to add event listeners\r\n     */\r\n    connectedCallback() { }\r\n    /**\r\n     * Method called every time the element is removed from the DOM\r\n     * Used to remove event listeners\r\n     */\r\n    disconnectedCallback() { }\r\n    /**\r\n     * Methods as a callback function that is called by the browser's web API\r\n     *  when an observed attribute of a custom element is added, removed, or changed.\r\n     *\r\n     * @param {string} name\r\n     */\r\n    attributeChangedCallback(name, oldValue, newValue) { }\r\n}\r\n/**\r\n * We defined it so that we can use it\r\n */\r\ncustomElements.define(\"chrono-meter\", Chronometer);\r\n// <chrono-meter></chrono-meter>\r\n\n\n//# sourceURL=webpack://21.-timerchrono/./src/components/Chronometer.ts?");

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