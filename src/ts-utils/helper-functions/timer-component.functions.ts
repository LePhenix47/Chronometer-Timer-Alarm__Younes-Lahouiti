import { log } from "./console-funtions";
import { getChildren, getClassListValues, setStyleProp } from "./dom.functions";

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
  //@ts-ignore
  log(getClassListValues(buttonElement));

  const isPlayButton: boolean = getClassListValues(buttonElement).includes(
    "timer-component__button--play"
  );
  const isRestartButton: boolean = getClassListValues(buttonElement).includes(
    "timer-component__button--restart"
  );

  if (isPlayButton) {
    handlePlayButton(buttonElement, timerState);
  } else if (isRestartButton) {
    handleRestartButton(buttonElement, timerState);
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

  const [playSvg, pauseSvg]: any = getChildren(buttonElement);

  /**
   * We check if the timer is running
   */
  const timerIsPaused: boolean = getClassListValues(pauseSvg).includes("hide");

  log("play-resume/pause button", { buttonElement });
  const timerHasNotStarted: boolean = timerState.state === "idle";

  if (timerHasNotStarted) {
    //We make the restart button disabled
  }

  const timerHasStarted: boolean = timerState.state === "started";
  if (timerHasStarted) {
    log("Has started");
    //We enable the restart button
    if (timerState.isRunning) {
      log("Is running");
      //We just reset the countdown and keep the timer running
    } else {
      log("Is paused");
      //We reset the countdown and we
    }
  }

  const timerHasReachedZero: boolean = timerState.state === "finished";
  if (timerHasReachedZero) {
    //We still enable it
  }

  if (timerIsPaused) {
    //The button was clicked, the timer was paused and is now running, we show the paused icon
    pauseSvg.classList.remove("hide");
    playSvg.classList.add("hide");

    timerState.state = "started";
    timerState.isRunning = false;
  } else {
    //The button was clicked, the timer was running and is now paused, we show the play icon
    pauseSvg.classList.add("hide");
    playSvg.classList.remove("hide");

    timerState.state = "started";
    timerState.isRunning = true;
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
