//Services
import { Interval } from "../ts-utils/services/interval.service";
import { Timeout } from "../ts-utils/services/timeout.service";

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
  getComponentHost,
  replaceAttribute,
  addModifyAttribute,
} from "../ts-utils/helper-functions/dom.functions";

//Console methods

//String methods
import { sliceString } from "../ts-utils/helper-functions/string.function";

//Component specific functions
import {
  handleButtonEvents,
  setEventDelegationToContainer,
} from "../ts-utils/helper-functions/timer-component.functions";
import { log } from "../ts-utils/helper-functions/console-funtions";

//Component specific variables

/**
 * We set the elements of our Web Component inside a `<template>`
 */
const timerTemplate: HTMLTemplateElement = document.createElement("template");

const dialogStyle: string = /* css */ `
.timer-dialog{
  overflow-y: hidden;
  border-radius: 10px;

  z-index: 69;

  border: transparent;
  padding: 30px;

  background-color: rgb(35, 35, 35);
  color: white;

  position: fixed;
  inset: 50%;
  translate: -50% -50%;

  aspect-ratio: 1/1;
  height: 435px;

}

.timer-dialog::backdrop{
  background-color: #000000ad;
}

 @media screen and (width <=768px) {
      .timer-dialog{
          padding: 30px 15px;
      }
}

.timer-dialog__title-delete{
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;

}

.timer-dialog__title{
  
}

.timer-dialog__container {
  margin-top: 60px;

  background-color: rgb(31, 31, 31);

  display: flex;
  justify-content: center;
  gap: 5px;

  padding: 5px;

  border: 2px solid #333333;
  border-bottom: 2px solid rgb(146, 146, 146);
  border-radius: 6px;

  font-weight: 700;
}

.timer-dialog__container:has(input:focus){
  border-bottom: 2px solid #e4505c;
}

.timer-dialog__slot {
  position: relative;
}

.timer-dialog__slot--hours {}

.timer-dialog__slot--minutes {}

.timer-dialog__slot--seconds {}

.timer-dialog__label-input{
    margin: 80px 0 70px 0;

    position: relative;
}



.timer-dialog__label{
  width: 100%;

  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.timer-dialog__label > svg{
  flex: 1;
}

.timer-dialog__input {
  text-align: center;

  background-color: inherit;
  border: transparent;

  padding: 10px 10px;

  border-radius: 2px;

  display: inline-block;

  min-width: 50px;
  max-width: 80px;

  font-size: 32px;
  font-weight: inherit;

  color: rgb(165, 165, 165);
}

.timer-dialog__input--title{
  flex: 10;
  
  height: 35px;

  padding: 5px 50px 5px 10px;

  font-weight: inherit;
  font-size: 14px;

  color: white;
  background-color: rgb(48, 48, 48);

  border: transparent;
  border-bottom: 2px solid rgb(146, 146, 146);
  border-radius: 3px;
} 

.timer-dialog__input--title:focus{
  outline: transparent;
  
  background-color: rgb(31, 31, 31);

  border-bottom: 2px solid #e4505c;
}

 

.timer-dialog__input--reset{
  position: absolute;
  right: 5%;
  top: 15%;

  color: rgb(177, 177, 177);
  background-color: transparent;
  border: transparent;
  
  aspect-ratio: 1/1;
  height: 25px;
}

.timer-dialog__input--reset:hover{
  background-color: rgb(44, 44, 44);

}

.timer-dialog__input--reset:active{
  background-color: rgb(40, 40, 40);
  color: rgb(141, 141, 141);

}

.timer-dialog__input[type="number"]{
  -moz-appearance: textfield;
}

.timer-dialog__input[type="number"]::-webkit-inner-spin-button{
  -webkit-appearance: none;
 -moz-appearance:textfield;
   appearance: none;
}

.timer-dialog__input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
 -moz-appearance:textfield;
   appearance: none;
}

.timer-dialog__input:focus {
  background-color: rgb(44, 44, 44);
  outline: transparent;
    color: white;
}

.timer-dialog__input--hours {}

.timer-dialog__input--minutes {}

.timer-dialog__input--seconds {}

.timer-dialog__button {
  position: absolute;
  left: 50%;
  translate: -50% 0%;

  background-color: transparent;
  color: inherit;

  border: transparent;
  border-radius: 5px;

  display: inline-flex;
  justify-content: center;
  align-items: center;

  aspect-ratio: 1/1;
  height: 30px;

}

.timer-dialog__button:hover {
  background-color: rgb(47, 47, 47);
}

.timer-dialog__button:active {
  background-color: rgb(42, 42, 42);
}

.timer-dialog__delete {
  color: rgb(213, 130, 139);
  padding: 8px;

  border-radius: 5px;

  outline: transparent;
}
.timer-dialog__delete:hover {
   background-color: rgb(47, 47, 47);
}
.timer-dialog__delete:active {
  background-color: rgb(42, 42, 42);
}

.timer-dialog__button--increment {
  bottom: 130%;
}

.timer-dialog__button--decrement {
  top: 130%;
}

.timer-dialog__button--decrement > svg{
  rotate: 180deg;
}

.timer-dialog__button--cancel{
  flex: 1;
  
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  padding: 5px 15px;

  border-radius: 5px;

  background-color: rgb(46, 46, 46);
}

.timer-dialog__button--register{
  flex: 1;
  
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  padding: 5px 15px;

  border-radius: 5px;

  background-color: rgb(228, 80, 92);
  color: black;
}

.timer-dialog__button--cancel> svg, .timer-dialog__button--register> svg{
  width: fit-content !important;
}

.timer-dialog__button--cancel:hover {
   background-color: rgb(51, 51, 51);
}

.timer-dialog__button--cancel:active {
  background-color: rgb(40, 40, 40);
  outline: 2px solid rgb(43, 43, 43);
}

.timer-dialog__button--register:hover {
   background-color: rgb(208, 75, 85);
}

.timer-dialog__button--register:active {
  background-color: rgb(189, 71, 80);
  color: rgb(112, 42, 47)
}


.timer-dialog__buttons{
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 10px;
}

.timer-dialog__slot-separator {
  font-size: 32px;
  font-weight: inherit;

  color: white;
}

`;

const timerStyle: string = /* css */ `
*,
::before,
::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}


*::-moz-selection {
    background-color: rgb(240, 18, 36);
    color: white;
    ;
}

*::selection {
    background-color: rgb(240, 18, 36);
    color: white;
    ;
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

.timer__svg{
  width: 75%;
}

.circle{
  scale: -100% 100%;
  fill: transparent;
    
  stroke: rgb(210, 77, 87);
  stroke-width: 5px;
  stroke-linecap: round;
  stroke-dasharray: var(--svg-dasharray);
  stroke-dashoffset: var(--svg-dashoffset);

  transition: stroke-dasharray 350ms ease, stroke-dashoffset 350ms ease;

  transform-origin: center;
  rotate: 90deg;
}

.circle--bg{
  fill: none;
    
  stroke: #3e3e3e;

  transition: stroke 150ms ease;
  stroke-width: 5px;

  transform-origin: center;
  rotate: 270deg;
}

.timer-component__container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  width:100%;
  
  position: relative;
  
  background-color: rgb(50, 50, 50);
  transition: 
    filter 75ms ease, 
    scale 150ms ease,
    box-shadow 150ms ease
    ;
    
  box-shadow: 0px 3px 5px 0px rgb(32, 32, 32);

  outline: 2px solid rgb(42, 42, 42);
  border-radius: 8px;
}
  
  .timer-component__container:hover{
  filter: brightness(93%);

  transform-origin: bottom;
  scale: 101%;

  box-shadow: 0px 0px 15px 0px rgb(32, 32, 32);
  outline: 2px solid rgb(54, 54, 54);
}
  
  .timer-component__container:active{
  scale: 100%;

  box-shadow: 0px 0px 15px 0px rgb(32, 32, 32);
  outline: 2px solid rgb(54, 54, 54);
}

.timer-component__title{
    width: 100%;
    padding: 10px 40px 10px 20px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.timer-component__title:empty{
  height: 45px;
  padding: 0;
}

.timer-component__delete{
  position: absolute;
  top: 2%;
  right: 5%;

  color: rgb(213, 130, 139);
  padding: 8px;
  border-radius: 5px;
  outline: transparent;
}

.timer-component__delete:hover {
    background-color: rgb(47, 47, 47);
}

.timer-component__delete:active {
    background-color: rgb(42, 42, 42);
}

.timer-component__paragraph {
    display: inline-block;
    margin: 0;
  
    position: absolute;
    left: 50%;
    right: 50%;
    top: 47%;
    translate: -50% -50%;
  
    width: min-content;
    height: min-content;

    font-variant-numeric: tabular-nums;
    font-size: 44px;
    font-weight: 500;
  }

   @media screen and (width <=768px) {
      .timer-component__paragraph{
          padding: 30px 15px;
          top: 46%;
          font-size: 42px;
      }
}

.timer-component__button{
  border: 2px solid rgb(64, 64, 64);
  aspect-ratio: 1/1;
  width: 35px;

  border-radius: 50%;
  
}

.timer-component__buttons-container{
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

  padding-bottom: 25px;
  padding-top: 20px
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

.timer-component__button--play:disabled{
  background-color: rgb(82, 82, 82);
  color: rgb(174, 174, 174);
}

.timer-component__button--restart{
  right: 30%;
  background-color: rgb(62, 62, 62);
  color: white;
}

.timer-component__button--restart:disabled{
  background-color: rgb(59, 59, 59);
  color: rgb(125, 125, 125);
}
`;
/**
 * Style for the component
 */
const componentStyle: string = /* css */ `
${timerStyle}
${dialogStyle}
`;

const dialogUI: string = /* html */ `
<dialog class="timer-dialog">
  <div class="timer-dialog__title-delete">
    <h2 class="timer-dialog__title">Modify the timer</h2>
    <button type="button" class="timer-dialog__delete">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92 92" width="20" height="20" fill="currentColor">
    <path
        d="m78.4 30.4-3.1 57.8c-.1 2.1-1.9 3.8-4 3.8H20.7c-2.1 0-3.9-1.7-4-3.8l-3.1-57.8c-.1-2.2 1.6-4.1 3.8-4.2 2.2-.1 4.1 1.6 4.2 3.8l2.9 54h43.1l2.9-54c.1-2.2 2-3.9 4.2-3.8 2.1.1 3.8 2 3.7 4.2zM89 17c0 2.2-1.8 4-4 4H7c-2.2 0-4-1.8-4-4s1.8-4 4-4h22V4c0-1.9 1.3-3 3.2-3h27.6C61.7 1 63 2.1 63 4v9h22c2.2 0 4 1.8 4 4zm-53-4h20V8H36v5zm1.7 65c2 0 3.5-1.9 3.5-3.8l-1-43.2c0-1.9-1.6-3.5-3.6-3.5-1.9 0-3.5 1.6-3.4 3.6l1 43.3c0 1.9 1.6 3.6 3.5 3.6zm16.5 0c1.9 0 3.5-1.6 3.5-3.5l1-43.2c0-1.9-1.5-3.6-3.4-3.6-2 0-3.5 1.5-3.6 3.4l-1 43.2c-.1 2 1.5 3.7 3.5 3.7-.1 0-.1 0 0 0z" />
</svg>  

    </button>
  </div>
<!--    -->
<!--    -->
  <!-- Timer begin -->


<form class="timer-dialog__container">
  <section class="timer-dialog__slot timer-dialog__slot--hours"> 
  <input type="number" value="00" min="0" max="99" class="timer-dialog__input timer-dialog__input--hours">
  <button type="button" class="timer-dialog__button timer-dialog__button--increment">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="10" height="10" fill="white">
    <path
        d="M102.299 58.5c-3.955 4.046-9.458 4.363-14.291 0L52.579 24.525 17.141 58.5c-4.834 4.363-10.347 4.046-14.269 0a10.77 10.77 0 0 1 0-14.643C6.555 40.066 45.44 3.04 45.44 3.04a9.917 9.917 0 0 1 14.286 0s38.868 37.026 42.568 40.817a10.764 10.764 0 0 1 0 14.643Z" />
</svg>
</button>
  <button type="button" class="timer-dialog__button timer-dialog__button--decrement">  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="10" height="10" fill="white">
    <path
        d="M102.299 58.5c-3.955 4.046-9.458 4.363-14.291 0L52.579 24.525 17.141 58.5c-4.834 4.363-10.347 4.046-14.269 0a10.77 10.77 0 0 1 0-14.643C6.555 40.066 45.44 3.04 45.44 3.04a9.917 9.917 0 0 1 14.286 0s38.868 37.026 42.568 40.817a10.764 10.764 0 0 1 0 14.643Z" />
</svg></button>
</section>
  <div class="timer-dialog__slot-separator">:</div>
  <section class="timer-dialog__slot timer-dialog__slot--minutes"> 
  <input type="number" value="00" min="0" max="59" class="timer-dialog__input timer-dialog__input--minutes">
  <button type="button" class="timer-dialog__button timer-dialog__button--increment"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="10" height="10" fill="white">
    <path
        d="M102.299 58.5c-3.955 4.046-9.458 4.363-14.291 0L52.579 24.525 17.141 58.5c-4.834 4.363-10.347 4.046-14.269 0a10.77 10.77 0 0 1 0-14.643C6.555 40.066 45.44 3.04 45.44 3.04a9.917 9.917 0 0 1 14.286 0s38.868 37.026 42.568 40.817a10.764 10.764 0 0 1 0 14.643Z" />
</svg></button>
  <button type="button" class="timer-dialog__button timer-dialog__button--decrement">  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="10" height="10" fill="white">
    <path
        d="M102.299 58.5c-3.955 4.046-9.458 4.363-14.291 0L52.579 24.525 17.141 58.5c-4.834 4.363-10.347 4.046-14.269 0a10.77 10.77 0 0 1 0-14.643C6.555 40.066 45.44 3.04 45.44 3.04a9.917 9.917 0 0 1 14.286 0s38.868 37.026 42.568 40.817a10.764 10.764 0 0 1 0 14.643Z" />
</svg></button>
  </section>
  <div class="timer-dialog__slot-separator">:</div>
  <section class="timer-dialog__slot timer-dialog__slot--seconds"> 
  <input type="number" value="00" min="0" max="59" class="timer-dialog__input timer-dialog__input--seconds">
  <button type="button" class="timer-dialog__button timer-dialog__button--increment"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="10" height="10" fill="white">
    <path
        d="M102.299 58.5c-3.955 4.046-9.458 4.363-14.291 0L52.579 24.525 17.141 58.5c-4.834 4.363-10.347 4.046-14.269 0a10.77 10.77 0 0 1 0-14.643C6.555 40.066 45.44 3.04 45.44 3.04a9.917 9.917 0 0 1 14.286 0s38.868 37.026 42.568 40.817a10.764 10.764 0 0 1 0 14.643Z" />
</svg></button>
  <button type="button" class="timer-dialog__button timer-dialog__button--decrement">  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="10" height="10" fill="white">
    <path
        d="M102.299 58.5c-3.955 4.046-9.458 4.363-14.291 0L52.579 24.525 17.141 58.5c-4.834 4.363-10.347 4.046-14.269 0a10.77 10.77 0 0 1 0-14.643C6.555 40.066 45.44 3.04 45.44 3.04a9.917 9.917 0 0 1 14.286 0s38.868 37.026 42.568 40.817a10.764 10.764 0 0 1 0 14.643Z" />
</svg></button>
  </section>
</form>

<!-- Timer end -->
<!--    -->
<!--    -->

<form class="timer-dialog__label-input">
  <label class="timer-dialog__label" for="title-input"> 
    <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke="currentColor"
    stroke-linejoin="round" height="16px" width="16px" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
</svg>
    <input type="text" class="timer-dialog__input--title" placeholder="Name of timer" id="title-input"/> 
  </label>
  <input type="reset" class="timer-dialog__input--reset" value="×">
</form>

<div class="timer-dialog__buttons">
  <button class="timer-dialog__button--register">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16">
    <path fill="currentColor"
        d="M31.707,7.293l-7-7A1,1,0,0,0,24,0H1A1,1,0,0,0,0,1V31a1,1,0,0,0,1,1H31a1,1,0,0,0,1-1V8A1,1,0,0,0,31.707,7.293ZM18,2V6H8V2ZM8,30V18H24V30Zm22,0H26V17a1,1,0,0,0-1-1H7a1,1,0,0,0-1,1V30H2V2H6V7A1,1,0,0,0,7,8H19a1,1,0,0,0,1-1V2h3.586L30,8.414Z" />
</svg> Register</button>

  <button class="timer-dialog__button--cancel">
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="20" height="20" fill="white">
    <switch>
        <g>
            <path
                d="m53.657 48 25.171-25.172a4 4 0 1 0-5.656-5.656L48 42.343 22.829 17.172a4 4 0 0 0-5.657 5.656L42.344 48 17.172 73.172a4 4 0 1 0 5.657 5.656L48 53.657l25.172 25.171C73.953 79.609 74.977 80 76 80s2.048-.391 2.828-1.172a4 4 0 0 0 0-5.656L53.657 48z" />
        </g>
    </switch>
</svg>
Cancel</button>
</div>
</dialog>
`;

const timerUI: string = /* html */ `
  <h3 class="timer-component__title"></h3>
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="timer__svg">
    <circle cx="50" cy="50" r="45" class="timer-component__circle--bg circle--bg"></circle>
    <circle cx="50" cy="50" r="45" class="timer-component__circle circle"></circle>
  </svg>
  <p class="timer-component__paragraph">00:00:00</p>
  <section class="timer-component__buttons-container">

  <button type="button" class="timer-component__delete">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92 92" width="20" height="20" fill="currentColor">
        <path
          d="m78.4 30.4-3.1 57.8c-.1 2.1-1.9 3.8-4 3.8H20.7c-2.1 0-3.9-1.7-4-3.8l-3.1-57.8c-.1-2.2 1.6-4.1 3.8-4.2 2.2-.1 4.1 1.6 4.2 3.8l2.9 54h43.1l2.9-54c.1-2.2 2-3.9 4.2-3.8 2.1.1 3.8 2 3.7 4.2zM89 17c0 2.2-1.8 4-4 4H7c-2.2 0-4-1.8-4-4s1.8-4 4-4h22V4c0-1.9 1.3-3 3.2-3h27.6C61.7 1 63 2.1 63 4v9h22c2.2 0 4 1.8 4 4zm-53-4h20V8H36v5zm1.7 65c2 0 3.5-1.9 3.5-3.8l-1-43.2c0-1.9-1.6-3.5-3.6-3.5-1.9 0-3.5 1.6-3.4 3.6l1 43.3c0 1.9 1.6 3.6 3.5 3.6zm16.5 0c1.9 0 3.5-1.6 3.5-3.5l1-43.2c0-1.9-1.5-3.6-3.4-3.6-2 0-3.5 1.5-3.6 3.4l-1 43.2c-.1 2 1.5 3.7 3.5 3.7-.1 0-.1 0 0 0z" />
      </svg>  
  </button>

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
    <button type="button" class="timer-component__button timer-component__button--restart" disabled="true">
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
  </section>
`;

/**
 * Content of the component
 */
timerTemplate.innerHTML = /* html */ `
<style>
  ${componentStyle}
</style>

<div class="timer-component__container">
  ${dialogUI}
  ${timerUI}
</div>
`;

export class TimerComponent extends HTMLElement {
  /**
   * Object representing the current state of a timer.
   *
   * @type {Object}
   * @property {"idle" | "started" | "finished"} state - The current state of the timer.
   * @property {boolean} isRunning - Whether the timer is currently running or not.
   */
  svgCircle: HTMLElement | null;
  callback: any;
  callbackIdsArray: any[];

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

    this.callback = null;
    this.callbackIdsArray = [];
  }

  /**
   * Gets the value of the initial timer
   */
  get initialTime() {
    const attributeValue: string | null = this.getAttribute("initial-time");

    const attributeIsNotANumber: boolean = isNaN(Number(attributeValue));
    if (attributeIsNotANumber) {
      return 0;
    }
    return Number(attributeValue);
  }

  /**
   * Sets the value of the initialTime
   */
  set initialTime(value) {}

  /**
   * Getter that gets the current time of the timer in seconds
   *
   * **ex:**
   * ```js
   *  const a = this.currentTime;
   * ```
   */
  get currentTime() {
    const attributeValue: string | null = this.getAttribute("current-time");

    const attributeIsNotANumber: boolean = isNaN(Number(attributeValue));
    if (attributeIsNotANumber) {
      return 0;
    }
    return Number(attributeValue);
  }

  /**
   * Setter that changes the value of the timer
   *
   * **ex:**
   * ```js
    this.currentTime = 69;
   * ```
   */
  set currentTime(value) {}

  get timerTitle() {
    return this.getAttribute("timer-title");
  }

  set timerTitle(title: string | null) {}

  get isRunning() {
    const attributeValue: string | null = this.getAttribute("is-running");
    //@ts-ignore
    return JSON.parse(attributeValue);
  }

  set isRunning(booleanValue) {}

  /**
   * Static getter methods that indicates the
   * list of attributes that the custom element wants to observe for changes.
   *
   * There are currently 6 custom attributes in which 4 need to be observed
   *
   * (we're not observing the `interval-id` nor the `index` attributes as they doesn't need to)
   */
  static get observedAttributes() {
    return ["initial-time", "current-time", "timer-title", "is-running"];
  }

  /**
   * Method called every time the element is inserted into the DOM
   */
  connectedCallback() {
    //@ts-ignore
    const container: HTMLElement = selectQuery(
      ".timer-component__container",
      //@ts-ignore
      this.shadowRoot
    );
    /**
     * We get the circle
     */

    //@ts-ignore
    this.svgCircle = selectQuery(".circle", this.shadowRoot);

    //@ts-ignore
    const svgCircleLength: number = this.svgCircle?.getTotalLength();
    /**
     * We set the style prop of these variables to equal to the svgLength
     */
    setStyleProp("--svg-dasharray", `${svgCircleLength}`, container);
    setStyleProp("--svg-dashoffset", `${svgCircleLength}`, container);

    //@ts-ignore
    container?.addEventListener("click", setEventDelegationToContainer);
    const hoursSlot = selectQuery(
      ".timer-dialog__slot--hours",
      //@ts-ignore
      this.shadowRoot
    );
    const minutesSlot = selectQuery(
      ".timer-dialog__slot--minutes",
      //@ts-ignore
      this.shadowRoot
    );
    const secondsSlot = selectQuery(
      ".timer-dialog__slot--seconds",
      //@ts-ignore
      this.shadowRoot
    );

    const allSlots = [hoursSlot, minutesSlot, secondsSlot];

    for (const slot of allSlots) {
      const [input, incrementButton, decrementButton] = getChildren(slot);

      input.addEventListener("input", handleDialogInput);

      incrementButton.addEventListener("click", handleDialogButton);
      decrementButton.addEventListener("click", handleDialogButton);
    }
  }

  /**
   * Method called every time the element is removed from the DOM
   */
  disconnectedCallback() {}

  /**
   * Methods as a callback function that is called by the browser's web API
   *  when an observed attribute of a custom element is added, removed, or changed.
   *
   * @param {string} name
   */
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
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
    //We get the <timer-component> element through the button and get the total amount of seconds
    //@ts-ignore
    const timerComponent: Element = this.shadowRoot?.host;
    switch (name) {
      case "initial-time": {
        const { hours, minutes, seconds } = getTimeValues(this.initialTime);

        paragraph.textContent = `${hours}:${minutes}:${seconds}`;
        break;
      }

      case "current-time": {
        //@ts-ignore
        const svgCircleLength: number = this.svgCircle?.getTotalLength();
        /**
         * We set the style prop of these variables to equal to the svgLength
         */
        setStyleProp("--svg-dasharray", `${svgCircleLength}`, container);
        setStyleProp(
          "--svg-dashoffset",
          `${svgCircleLength * (1 + this.currentTime / this.initialTime)}`,
          container
        );

        const { hours, minutes, seconds } = getTimeValues(this.currentTime);

        paragraph.textContent = `${hours}:${minutes}:${seconds}`;
        break;
      }
      case "timer-title": {
        //@ts-ignore
        const title = selectQuery(".timer-component__title", this.shadowRoot);

        //@ts-ignore
        title?.textContent = newValue;
        break;
      }
      case "is-running": {
        const timerIsRunning: boolean = newValue === "true" ? true : false;

        const totalSeconds: number = Number(
          timerComponent.getAttribute("initial-time")
        );
        const currentSeconds: number = Number(
          timerComponent.getAttribute("current-time")
        );

        const timerHasNotStarted: boolean = totalSeconds === currentSeconds;

        const timerHasStarted: boolean = totalSeconds !== currentSeconds;

        const timerHasFinished: boolean = currentSeconds === 0;

        //@ts-ignore
        const restartButton: HTMLButtonElement = selectQuery(
          ".timer-component__button--restart",
          //@ts-ignore
          timerComponent
        );

        //@ts-ignore
        const playPauseButton: HTMLButtonElement = selectQuery(
          ".timer-component__button--play",
          //@ts-ignore
          timerComponent
        );

        //@ts-ignore
        const dialog: HTMLDialogElement = selectQuery(
          "dialog",
          //@ts-ignore
          timerComponent
        );

        if (timerHasNotStarted) {
          //@ts-ignore
          replaceAttribute(restartButton, "disabled", "enabled");
          dialog?.classList.remove("inactive");
        }

        if (timerHasStarted) {
          if (timerIsRunning) {
            log({ timerIsRunning });
            dialog?.classList.add("inactive");
          } else {
            dialog?.classList.remove("inactive");
          }
        }

        if (timerHasFinished) {
          //@ts-ignore
          addModifyAttribute(playPauseButton, "disabled", "");
          //@ts-ignore
          replaceAttribute(restartButton, "disabled", "enabled");
          dialog?.classList.remove("inactive");
        }

        break;
      }

      default: {
        break;
      }
    }
  }
}

/**
 * Takes a total number of seconds and returns an object containing the equivalent in hours, minutes, and seconds.
 *
 * @param {number} totalSeconds - The total number of seconds.
 *
 * @returns {{hours: string, minutes: string, seconds: string}} An object containing the equivalent hours, minutes, and seconds.
 *
 */
export function getTimeValues(totalSeconds: number): {
  hours: string;
  minutes: string;
  seconds: string;
} {
  const hours: string =
    totalSeconds / 3_600 < 10
      ? `0${Math.floor(totalSeconds / 3_600)}`
      : Math.floor(totalSeconds / 3_600).toString();

  const minutes: string =
    (totalSeconds / 60) % 60 < 10
      ? `0${Math.floor((totalSeconds / 60) % 60)}`
      : Math.floor((totalSeconds / 60) % 60).toString();

  const seconds: string =
    totalSeconds % 60 < 10
      ? `0${totalSeconds % 60}`
      : (totalSeconds % 60).toString();

  return { hours, minutes, seconds };
}

export function handleDialogInput(event: InputEvent) {
  //@ts-ignore
  verifyInputValue(event.target, false);
}

export function handleDialogButton(event: MouseEvent) {
  //@ts-ignore
  const isIncrementButton: boolean = getClassListValues(
    //@ts-ignore
    event.target
  ).includes("timer-dialog__button--increment");

  const valueToSum: number = isIncrementButton ? 1 : -1;

  //@ts-ignore
  const slotContainer = getAncestor(event.target, ".timer-dialog__slot");

  //@ts-ignore
  const input: HTMLInputElement = getChildren(slotContainer)[0];

  const newValue: number = Number(input.value) + Number(valueToSum);

  input.value = newValue.toString();

  verifyInputValue(input, true);
}

export function verifyInputValue(
  inputElement: HTMLInputElement,
  isButtonEvent: boolean
) {
  const classes: string[] = getClassListValues(inputElement);

  const isHoursInput: boolean = classes.includes("timer-dialog__input--hours");

  const inputLimit: number = isHoursInput ? 99 : 59;

  if (isButtonEvent) {
    const valueOfInputUnderflows: boolean = Number(inputElement.value) < 0;

    if (valueOfInputUnderflows) {
      inputElement.value = inputLimit.toString().slice(-2);
    }
  }
  const valueIsUnderTen: boolean = Number(inputElement.value) < 10;
  if (valueIsUnderTen) {
    inputElement.value = `0${inputElement.value.slice(-1)}`;
  }

  const valueOverflows: boolean = isHoursInput
    ? Number(inputElement.value.slice(1, 3)) > 99
    : Number(inputElement.value.slice(-2)) > 59;

  if (valueOverflows) {
    let currentValue: string = inputElement.value.slice(1, 3);
    inputElement.value = `0${currentValue.slice(-1)}`;
  }

  const valueIsOverThreeDigits: boolean = inputElement.value.length > 2;
  if (valueIsOverThreeDigits) {
    inputElement.value = `${inputElement.value.slice(1, 3)}`;
  }
}

/**
 * We defined it so that we can use it
 */
customElements.define("timer-component", TimerComponent);
// <timer-component></timer-component>

declare global {
  interface HTMLElementTagNameMap {
    "timer-component": TimerComponent;
  }
}
