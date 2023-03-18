//Utils
import { log } from "./console-funtions";
import {
  getAncestor,
  getComponentHost,
  getChildren,
  getClassListValues,
  selectQueryAll,
  setStyleProp,
  addModifyAttribute,
  replaceAttribute,
  selectQuery,
} from "./dom.functions";

import { WebStorageService } from "../services/webstorage.service";
import { Interval } from "../services/interval.service";
import { removeTimerComponent } from "./dialog.functions";
//

export function setEventDelegationToContainer(e: MouseEvent) {
  const clickedElement: EventTarget | null = e.target;

  const container = this;

  const modalWindow = selectQuery(".timer-dialog", container);
  //@ts-ignore
  const isButton: boolean = clickedElement.tagName.includes("BUTTON");

  if (isButton) {
    handleButtonEvents(clickedElement);
  } else {
    const isNotContainer = clickedElement !== modalWindow;
    if (isNotContainer) {
      //@ts-ignore
      const modalIsAlreadyOpened: boolean = modalWindow?.attributes?.open;
      //@ts-ignore
      const modalShouldBeInctive: boolean = getClassListValues(
        //@ts-ignore
        modalWindow
      )?.includes("inactive")
        ? true
        : false;
      if (modalIsAlreadyOpened || modalShouldBeInctive) {
        return;
      } else {
        //@ts-ignore
        modalWindow.showModal();
      }
    } else {
      return;
    }
  }
}

/**
 * Handles click events on the timer button elements
 *
 * @param {any} buttonElement - The timer button element
 * @returns {void}
 */
export function handleButtonEvents(buttonElement: any): void {
  const buttonClasses: string[] = getClassListValues(buttonElement);

  log(buttonClasses);

  const isPlayButton: boolean = buttonClasses.includes(
    "timer-component__button--play"
  );
  const isRestartButton: boolean = buttonClasses.includes(
    "timer-component__button--restart"
  );
  const isDeleteButton: boolean = buttonClasses.includes(
    "timer-dialog__delete"
  );

  const isTimerDialogButton: boolean = buttonClasses.includes(
    "timer-dialog__button"
  );

  const isRegisterButton: boolean = buttonClasses.includes(
    "timer-dialog__button--register"
  );
  const isCancelButton: boolean = buttonClasses.includes(
    "timer-dialog__button--cancel"
  );

  const isDialogButton: boolean =
    isDeleteButton || isTimerDialogButton || isRegisterButton || isCancelButton;

  if (isPlayButton) {
    handlePlayButton(buttonElement);
  } else if (isRestartButton) {
    handleRestartButton(buttonElement);
  } else if (isDialogButton) {
    handleDialogButtons(buttonElement);
  } else {
    log("Unknown button pressed");
  }
}

/**
 * Handles click events on the play button element
 * @param {any} buttonElement - The play button element
 * @returns {void}
 */

export function handlePlayButton(buttonElement: any): void {
  //We get the svgs inside the play button
  const [playSvg, pauseSvg]: any = getChildren(buttonElement);

  //We get the <timer-component> element through the button and get the total amount of seconds
  const timerComponent: Element = getComponentHost(buttonElement);

  /**
   * We check if the timer was paused before cliking the button
   */
  const timerWasPaused: boolean = getClassListValues(pauseSvg).includes("hide");
  //@ts-ignore
  let callback: NodeJS.Timer | null = null;

  //@ts-ignore
  const dialog = selectQuery("dialog", timerComponent);

  //We create closures to make the code more readable
  function showPlayButton() {
    pauseSvg.classList.add("hide");
    playSvg.classList.remove("hide");

    addModifyAttribute(timerComponent, "is-running", false);
  }

  function showPauseButton() {
    pauseSvg.classList.remove("hide");
    playSvg.classList.add("hide");

    addModifyAttribute(timerComponent, "is-running", true);
  }

  function startTimer() {
    dialog?.classList.add("inactive");

    addModifyAttribute(timerComponent, "is-running", true);
    callback = Interval.set(() => {
      let currentAmountOfSeconds: number = Number(
        timerComponent.getAttribute("current-time")
      );
      const countdownFinished = currentAmountOfSeconds <= 0;
      if (countdownFinished) {
        //@ts-ignore
        Interval.clear(callback);

        showPlayButton();
        return;
      }
      //We decrease the amount of seconds
      currentAmountOfSeconds--;

      //We modify the amount of seconds in the current-time attribute that will update the web component
      addModifyAttribute(
        timerComponent,
        "current-time",
        currentAmountOfSeconds
      );
    }, 1_000);
    addModifyAttribute(timerComponent, "interval-id", callback);
  }

  function stopTimer() {
    const timerIntervalId = Number(timerComponent.getAttribute("interval-id"));
    //we're supposed to clear the timer here
    //@ts-ignore
    Interval.clear(timerIntervalId);
    addModifyAttribute(timerComponent, "is-running", false);
  }

  if (timerWasPaused) {
    //The button was clicked, the timer was paused and is now running
    log("Is running");

    //we show the paused icon
    showPauseButton();
    //We start the timer
    startTimer();
  } else {
    //The button was clicked, the timer was running and is now paused,
    log("Is paused");
    //we show the play icon
    showPlayButton();

    //We clear the timer
    stopTimer();
  }
}

/**
 * Handles click events on the restart button element
 * @param {any} buttonElement - The restart button element
 * @returns {void}
 */
export function handleRestartButton(buttonElement: any): void {
  log("restart button", { buttonElement });

  //@ts-ignore
  const timerComponent: Element = getComponentHost(buttonElement);

  const totalSeconds: number = Number(
    timerComponent.getAttribute("initial-time")
  );

  addModifyAttribute(timerComponent, "current-time", totalSeconds);

  const playPauseButton = selectQuery(
    ".timer-component__button--play",
    //@ts-ignore
    timerComponent
  );

  //@ts-ignore
  const playButtonIsDisabled = playPauseButton?.disabled;
  if (playButtonIsDisabled) {
    replaceAttribute(playPauseButton, "disabled", "enabled");
  }
}

/**
 * Handles the click events for buttons in a timer dialog.
 * @param buttonElement The button element that was clicked.
 */
export function handleDialogButtons(buttonElement: any) {
  // Get an array of classes for the clicked button element
  const buttonClasses: string[] = getClassListValues(buttonElement);

  // Determine which type of button was clicked
  const isDeleteButton: boolean = buttonClasses.includes(
    "timer-dialog__delete"
  );
  const isTimerDialogButton: boolean = buttonClasses.includes(
    "timer-dialog__button"
  );
  const isRegisterButton: boolean = buttonClasses.includes(
    "timer-dialog__button--register"
  );
  const isCancelButton: boolean = buttonClasses.includes(
    "timer-dialog__button--cancel"
  );

  // Get the parent dialog element that contains the clicked button
  const modalWindow = getAncestor(buttonElement, "dialog");

  // Get the timer component host element associated with the dialog
  //@ts-ignore
  const timerComponent = getComponentHost(modalWindow);

  const indexOfTimer = Number(timerComponent.getAttribute("index"));

  const playPauseButton = selectQuery(
    ".timer-component__button--play",
    //@ts-ignore
    timerComponent
  );

  const restartPauseButton = selectQuery(
    ".timer-component__button--restart",
    //@ts-ignore
    timerComponent
  );

  // Get an array of input elements in the dialog
  //@ts-ignore
  const inputs = selectQueryAll("input", modalWindow);

  // Handle different button types
  if (isDeleteButton) {
    removeTimerComponent(indexOfTimer);
  } else if (isTimerDialogButton) {
    // Determine whether an increment or decrement button was clicked
  } else if (isRegisterButton) {
    // Get the values of the input elements and convert them to numbers
    let inputsValues: any[] = [];
    if (inputs) {
      for (const input of inputs) {
        //@ts-ignore
        const valueOfInput = input.value;
        inputsValues.push(valueOfInput);
      }
    }
    const hoursValue: number = Number(inputsValues[0]);
    const minutesValue: number = Number(inputsValues[1]);
    const secondsValue: number = Number(inputsValues[2]);

    // Calculate the total time in seconds from the input values
    const totalTimeInSeconds: number =
      3_600 * hoursValue + 60 * minutesValue + secondsValue;

    const titleValue: string = inputsValues[3];

    // Set the initial and current time attributes of the timer component
    addModifyAttribute(timerComponent, "initial-time", totalTimeInSeconds);
    addModifyAttribute(timerComponent, "current-time", totalTimeInSeconds);
    addModifyAttribute(timerComponent, "timer-title", titleValue);

    //@ts-ignore
    replaceAttribute(playPauseButton, "disabled", "enabled");
    //@ts-ignore
    replaceAttribute(restartPauseButton, "enabled", "disabled");
    // Close the dialog
    //@ts-ignore
    modalWindow.close();
  } else if (isCancelButton) {
    // Close the dialog
    //@ts-ignore
    modalWindow.close();
  }
}
