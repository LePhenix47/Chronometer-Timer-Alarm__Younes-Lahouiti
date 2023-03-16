//Utils
import { log } from "./console-funtions";
import {
  getAncestor,
  getComponentHost,
  getChildren,
  getClassListValues,
  selectQueryAll,
  setStyleProp,
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
    handleRestartButton(buttonElement, timerState);
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

  let currentAmountOfSeconds: number = Number(
    timerComponent.getAttribute("current-time")
  );

  log({ totalAmountOfSeconds }, { currentAmountOfSeconds });
  /**
   * We check if the timer was paused before cliking the button
   */
  const timerWasPaused: boolean = getClassListValues(pauseSvg).includes("hide");

  //@ts-ignore
  let callback: NodeJS.Timer | null | undefined =
    //@ts-ignore
    intervalCreator.getArrayOfIds()[0] | null;

  log({ intervalCreator });

  if (timerWasPaused) {
    //The button was clicked, the timer was paused and is now running, we show the paused icon
    log("Is running");
    pauseSvg.classList.remove("hide");
    playSvg.classList.add("hide");

    timerState.state = "started";
    timerState.isRunning = false;

    //We start the timer
    callback = intervalCreator.set(() => {
      const countdownFinished = currentAmountOfSeconds <= 0;
      log({ totalAmountOfSeconds, currentAmountOfSeconds });
      if (countdownFinished) {
        //@ts-ignore
        intervalCreator.clear(callback);

        timerState.state = "finished";
        timerState.isRunning = false;
        return;
      }

      currentAmountOfSeconds--;
      timerComponent.setAttribute(
        "current-time",
        currentAmountOfSeconds.toString()
      );
    }, 1_000);
  } else {
    //The button was clicked, the timer was running and is now paused, we show the play icon
    log("Is paused");

    pauseSvg.classList.add("hide");
    playSvg.classList.remove("hide");

    timerState.state = "started";
    timerState.isRunning = true;
    //we're supposed to clear the timer here
    //@ts-ignore
    if (callback) {
      intervalCreator.clear(callback);
    }
  }
}

/**
 * Handles click events on the restart button element
 * @param {any} buttonElement - The restart button element
 * @returns {void}
 */
export function handleRestartButton(
  buttonElement: any,
  timerState: { state: string; isRunning: boolean }
): void {
  const { state, isRunning } = timerState;
  log("restart button", { buttonElement });
  const timerHasNotStarted: boolean = state === "idle";

  if (timerHasNotStarted) {
    //We make the restart button disabled
    setStyleProp("disabled", false, buttonElement);
  }

  const timerHasStarted: boolean = state === "started";
  if (timerHasStarted) {
    //We enable the restart button
    if (isRunning) {
      //We just reset the countdown and keep the timer running
    } else {
      //We reset the countdown and we
    }
  }

  const timerHasReachedZero: boolean = state === "finished";
  if (timerHasReachedZero) {
    //We still enable it
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

    // Set the initial and current time attributes of the timer component
    timerComponent.setAttribute("initial-time", totalTimeInSeconds.toString());
    timerComponent.setAttribute("current-time", totalTimeInSeconds.toString());

    // Close the dialog
    //@ts-ignore
    modalWindow.close();
  } else if (isCancelButton) {
    // Close the dialog
    //@ts-ignore
    modalWindow.close();
  }
}
