/**
 * Object representing the current state of a timer.
 *
 * @type {Object}
 * @property {"idle" | "started" | "finished"} state - The current state of the timer.
 * @property {boolean} isRunning - Whether the timer is currently running or not.
 */
export let timerStates: {
  state: "idle" | "started" | "finished";
  isRunning: boolean;
} = { state: "idle", isRunning: false };
