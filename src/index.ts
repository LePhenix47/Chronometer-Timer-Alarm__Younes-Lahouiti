import {
  addModifyAttribute,
  getClassListValues,
  replaceAttribute,
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
  createTimerComponent,
} from "./ts-utils/helper-functions/dialog.functions";
import { WebStorageService } from "./ts-utils/services/webstorage.service";

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

/**
 * Function that add event listeners to the page
 */
function addEventListenersForMainPage() {
  //@ts-ignore
  const pencilSvg: SVGSVGElement = selectQuery(".main-page__button-pencil");
  //@ts-ignore
  const checkmarkSvg: SVGSVGElement = selectQuery(
    ".main-page__button-checkmark"
  );

  /**
   * Function that enables the quick delete mode
   */
  function enableQuickDelete() {
    log("enabling");

    pencilSvg.classList.add("hide");
    checkmarkSvg.classList.remove("hide");

    replaceAttribute(addNewTimerButton, "enabled", "disabled");
  }

  /**
   * Function that disables the quick delete mode
   */
  function disableQuickDelete() {
    log("disabling");

    pencilSvg.classList.remove("hide");
    checkmarkSvg.classList.add("hide");

    replaceAttribute(addNewTimerButton, "disabled", "enabled");
  }

  removeTimersButton.addEventListener("click", (e) => {
    log("Enable quick del", e);
    //@ts-ignore
    const quickDeleteIsEnabled =
      //@ts-ignore
      getClassListValues(pencilSvg).includes("hide");
    log({ quickDeleteIsEnabled });

    if (quickDeleteIsEnabled) {
      disableQuickDelete();
    } else {
      enableQuickDelete();
    }
  });

  addNewTimerButton.addEventListener("click", (e) => {
    log("Add", e);
    changeDialogBoxState(dialog);
  });
}

addEventListenersForMainPage();

function addTimersFromWebStorageInContainer() {
  const timers = WebStorageService.getKey("timers") || [];

  for (const timer of timers) {
    const { initialTime, title, index } = timer;
    createTimerComponent(initialTime, title, index);
  }
}
addTimersFromWebStorageInContainer();
