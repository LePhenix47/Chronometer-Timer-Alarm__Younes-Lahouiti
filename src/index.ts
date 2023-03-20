//Utils
import {
  addModifyAttribute,
  getClassListValues,
  replaceAttribute,
  selectQuery,
  selectQueryAll,
} from "./ts-utils/helper-functions/dom.functions";

import {
  addDialogBoxEventListeners,
  changeDialogBoxState,
  createTimerComponent,
} from "./ts-utils/helper-functions/dialog.functions";
import { WebStorageService } from "./ts-utils/services/webstorage.service";

//Components
import "./components/Timer";
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

  removeTimersButton.addEventListener("click", (e) => {
    //@ts-ignore
    const quickDeleteIsEnabled =
      //@ts-ignore
      getClassListValues(pencilSvg).includes("hide");

    if (quickDeleteIsEnabled) {
      disableQuickDelete();
    } else {
      enableQuickDelete();
    }
  });

  addNewTimerButton.addEventListener("click", (e) => {
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

  const noTimersWereAdded = !timers.length;

  if (noTimersWereAdded) {
    replaceAttribute(removeTimersButton, "enabled", "disabled");
  }
}
addTimersFromWebStorageInContainer();

/**
 * Function that enables the quick delete mode
 */
export function disableQuickDelete() {
  //@ts-ignore
  const addNewTimerButton: HTMLButtonElement = selectQuery(
    ".main-page__button--add"
  );

  //@ts-ignore
  const pencilSvg: SVGSVGElement = selectQuery(".main-page__button-pencil");
  //@ts-ignore
  const checkmarkSvg: SVGSVGElement = selectQuery(
    ".main-page__button-checkmark"
  );

  pencilSvg.classList.remove("hide");
  checkmarkSvg.classList.add("hide");

  replaceAttribute(addNewTimerButton, "disabled", "enabled");

  const arrayOfTimerComponents = selectQueryAll("timer-component");

  for (const timerComponent of arrayOfTimerComponents) {
    addModifyAttribute(timerComponent, "quick-delete", false);
  }
}

/**
 * Function that disables the quick delete mode
 */
export function enableQuickDelete() {
  //@ts-ignore
  const addNewTimerButton: HTMLButtonElement = selectQuery(
    ".main-page__button--add"
  );

  //@ts-ignore
  const pencilSvg: SVGSVGElement = selectQuery(".main-page__button-pencil");
  //@ts-ignore
  const checkmarkSvg: SVGSVGElement = selectQuery(
    ".main-page__button-checkmark"
  );

  pencilSvg.classList.add("hide");
  checkmarkSvg.classList.remove("hide");

  replaceAttribute(addNewTimerButton, "enabled", "disabled");

  const arrayOfTimerComponents = selectQueryAll("timer-component");

  for (const timerComponent of arrayOfTimerComponents) {
    addModifyAttribute(timerComponent, "quick-delete", true);
  }
}
