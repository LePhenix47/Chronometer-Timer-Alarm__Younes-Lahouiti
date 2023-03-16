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

export function handlePlayButton(
  buttonElement: any,
  timerState: { state: string; isRunning: boolean }
): void {
  log("Play button");

  //We get the svgs inside the play button
  const [playSvg, pauseSvg]: any = getChildren(buttonElement);

  //We get the <timer-component> element through the button and get the total amount of seconds
  const timerComponent: Element = getComponentHost(buttonElement);
  let currentAmountOfSeconds: number = Number(
    timerComponent.getAttribute("initial-time")
  );
  /**
   * We check if the timer is running
   */
  const timerIsPaused: boolean = getClassListValues(pauseSvg).includes("hide");

  //@ts-ignore
  let callback: NodeJS.Timer | null | undefined =
    //@ts-ignore
    Interval.getArrayOfIds()[0] | null;

  if (timerIsPaused) {
    //The button was clicked, the timer was paused and is now running, we show the paused icon
    log("Is running");
    pauseSvg.classList.remove("hide");
    playSvg.classList.add("hide");

    timerState.state = "started";
    timerState.isRunning = false;

    //We start the timer
    callback = Interval.set(() => {
      const countdownFinished = currentAmountOfSeconds <= 0;
      log({ currentAmountOfSeconds });
      if (countdownFinished) {
        //@ts-ignore
        Interval.clear(callback);

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
      Interval.clear(callback);
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

export function handleDialogButtons(buttonElement: any, timerState) {
  const buttonClasses: string[] = getClassListValues(buttonElement);

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
  const modalWindow = getAncestor(buttonElement, "dialog");

  //@ts-ignore
  const timerComponent = getComponentHost(modalWindow);

  //@ts-ignore
  const inputs = selectQueryAll("input", modalWindow);
  log({ inputs });

  if (isDeleteButton) {
    log("Delete button");
  } else if (isTimerDialogButton) {
    log(
      "Timer button",
      buttonClasses.includes("timer-dialog__button--increment") ? "Up" : "Down"
    );
  } else if (isRegisterButton) {
    let inputsValues: any[] = [];
    if (inputs) {
      for (const input of inputs) {
        //@ts-ignore
        const valueOfInput = input.value;
        inputsValues.push(valueOfInput);
      }
    }
    log({ inputsValues });
    const hoursValue = Number(inputsValues[0]);
    const minutesValue = Number(inputsValues[1]);
    const secondsValue = Number(inputsValues[2]);

    log({ hoursValue, minutesValue, secondsValue });

    const totalTimeInSeconds =
      3_600 * hoursValue + 60 * minutesValue + secondsValue;

    timerComponent.setAttribute("initial-time", totalTimeInSeconds.toString());
    //@ts-ignore
    modalWindow.close();
    log("Register button", timerComponent.attributes);
  } else if (isCancelButton) {
    //@ts-ignore
    modalWindow.close();
    log("Cancel button");
  }
}
