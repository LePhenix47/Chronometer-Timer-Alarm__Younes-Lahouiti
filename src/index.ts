import {
  selectQuery,
  selectQueryAll,
} from "./ts-utils/helper-functions/dom.functions";

import "./components/Timer";
import { log } from "./ts-utils/helper-functions/console-funtions";
import {
  addDialogBoxEventListeners,
  changeDialogBoxState,
  handleButton,
  handleInput,
  verifyInputValue,
} from "./ts-utils/helper-functions/dialog.functions";

const container = selectQuery(".main-page");

/**
 * Button to delete the timer component
 * from the UI + local storage
 */
//@ts-ignore
const removeTimersButton: HTMLButtonElement = selectQuery(
  ".main-page__button--delete"
);

/**
 * Button to add the timer component
 * from the UI + local storage
 */
//@ts-ignore
const addNewTimerButton: HTMLButtonElement = selectQuery(
  ".main-page__button--add"
);

/**
 * `<dialog>` element opened whenever the user clicks on the `+` button
 */
//@ts-ignore
const dialog: HTMLDialogElement = selectQuery(".main-page__dialog");
addDialogBoxEventListeners();

log({ removeTimersButton, addNewTimerButton });
function addEventListeners() {
  removeTimersButton.addEventListener("click", (e) => {
    log("Del", e);
  });

  addNewTimerButton.addEventListener("click", (e) => {
    log("Add", e);
    changeDialogBoxState(dialog);
  });
}

addEventListeners();
