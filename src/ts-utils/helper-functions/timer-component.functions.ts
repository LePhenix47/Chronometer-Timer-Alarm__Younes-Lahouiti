import { log } from "./console-funtions";
import { getChild, getClassListValues } from "./dom.functions";

/**
 * Handles click events on the timer button elements
 *
 * @param {any} buttonElement - The timer button element
 * @returns {void}
 */
export function handleButtonEvents(buttonElement: any): void {
  //@ts-ignore
  log(buttonElement.classList);

  const isPlayButton: boolean = getClassListValues(buttonElement).includes(
    "timer-component__button--play"
  );

  if (isPlayButton) {
    handlePlayButton(buttonElement);
  } else {
    handleRestartButton(buttonElement);
  }
}

/**
 * Handles click events on the play button element
 * @param {any} buttonElement - The play button element
 * @returns {void}
 */

export function handlePlayButton(buttonElement: any): void {
  log("Play button");

  const [playSvg, pauseSvg]: any = getChild(buttonElement);

  /**
   * We check if the timer is running
   */
  const timerIsPaused: boolean = getClassListValues(pauseSvg).includes("hide");

  if (timerIsPaused) {
    //The button was clicked, the timer was paused and is now running, we show the paused icon
    pauseSvg.classList.remove("hide");
    playSvg.classList.add("hide");
    log("playing", pauseSvg);
  } else {
    //The button was clicked, the timer was running and is now paused, we show the play icon
    pauseSvg.classList.add("hide");
    playSvg.classList.remove("hide");
    log("paused", playSvg);
  }
}

/**
 * Handles click events on the restart button element
 * @param {any} buttonElement - The restart button element
 * @returns {void}
 */
export function handleRestartButton(buttonElement: any): void {
  log("restart button", { buttonElement });
}

function resumePlayTimer() {}

function stopTimer() {}

function restart() {}
