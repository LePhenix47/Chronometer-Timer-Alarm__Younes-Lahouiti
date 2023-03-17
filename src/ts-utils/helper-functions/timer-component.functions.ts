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
//

/**
 * Handles click events on the timer button elements
 *
 * @param {any} buttonElement - The timer button element
 * @returns {void}
 */
export function handleButtonEvents(
  buttonElement: any,
  timerState: { state: string; isRunning: boolean }
): void {
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
    handlePlayButton(buttonElement, timerState);
  } else if (isRestartButton) {
    handleRestartButton(buttonElement);
  } else if (isDialogButton) {
    handleDialogButtons(buttonElement, timerState);
  } else {
    log("Unknown button pressed");
  }
}

/**
 * Handles click events on the play button element
 * @param {any} buttonElement - The play button element
 * @returns {void}
 */

const intervalCreator: Interval = new Interval();
export function handlePlayButton(
  buttonElement: any,
  timerState: { state: string; isRunning: boolean }
): void {
  //We get the svgs inside the play button
  const [playSvg, pauseSvg]: any = getChildren(buttonElement);

  //We get the <timer-component> element through the button and get the total amount of seconds
  const timerComponent: Element = getComponentHost(buttonElement);

  let totalAmountOfSeconds: number = Number(
    timerComponent.getAttribute("initial-time")
  );

  /**
   * We check if the timer was paused before cliking the button
   */
  const timerWasPaused: boolean = getClassListValues(pauseSvg).includes("hide");
  //@ts-ignore
  let callback: NodeJS.Timer | null | undefined =
    //@ts-ignore
    intervalCreator.getArrayOfIds()[0] | null;

  log({ intervalCreator });
  //@ts-ignore
  const dialog = selectQuery("dialog", timerComponent);

  //We create closures to make the code more readable
  function showPlayButton() {
    pauseSvg.classList.add("hide");
    playSvg.classList.remove("hide");

    timerState.state = "started";
    timerState.isRunning = false;
    addModifyAttribute(timerComponent, "is-running", false);
  }

  function showPauseButton() {
    pauseSvg.classList.remove("hide");
    playSvg.classList.add("hide");

    timerState.state = "started";
    timerState.isRunning = true;
    addModifyAttribute(timerComponent, "is-running", true);
  }

  function startTimer() {
    dialog?.classList.add("inactive");

    addModifyAttribute(timerComponent, "is-running", true);
    callback = intervalCreator.set(() => {
      let currentAmountOfSeconds: number = Number(
        timerComponent.getAttribute("current-time")
      );
      const countdownFinished = currentAmountOfSeconds <= 0;
      if (countdownFinished) {
        //@ts-ignore
        intervalCreator.clear(callback);

        showPlayButton();
        return;
      }

      currentAmountOfSeconds--;
      addModifyAttribute(
        timerComponent,
        "current-time",
        currentAmountOfSeconds
      );
    }, 1_000);
  }

  function stopTimer() {
    if (callback) {
      //we're supposed to clear the timer here
      intervalCreator.clear(callback);
      addModifyAttribute(timerComponent, "is-running", false);
    }
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
  // const currentSeconds: number = Number(
  //   timerComponent.getAttribute("current-time")
  // );

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
 * @param timerState The current state of the timer.
 */
export function handleDialogButtons(buttonElement: any, timerState: any) {
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
