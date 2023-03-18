import { log } from "./console-funtions";
import {
  getChildren,
  selectQuery,
  getAncestor,
  getClassListValues,
  getComponentHost,
  setStyleProp,
  addModifyAttribute,
  getSibling,
  replaceAttribute,
  selectQueryAll,
} from "./dom.functions";

/**
 * Opens or closes a dialog box.
 * @param dialog The HTMLDialogElement to open or close.
 */
export function changeDialogBoxState(
  dialog: HTMLDialogElement,
  forcedState?: boolean
): void {
  const modalIsAlreadyOpened: boolean = dialog?.hasAttribute("open") ?? false;

  const developerWantsToForceState = forcedState !== undefined;
  if (!developerWantsToForceState) {
    if (modalIsAlreadyOpened) {
      return dialog.close();
    } else {
      return dialog.showModal();
    }
  }

  const devWantsToOpenBox = forcedState === true;
  if (devWantsToOpenBox) {
    return dialog.showModal();
  } else {
    return dialog.close();
  }
}

/**
 * Adds event listeners to dialog box slots for time input
 *
 * @returns void
 */
export function addDialogBoxEventListeners() {
  //@ts-ignore
  const dialog: HTMLDialogElement = selectQuery(".main-page__dialog");
  //@ts-ignore
  const hoursSlot: HTMLInputElement = selectQuery(
    ".main-page__dialog-slot--hours"
  );
  //@ts-ignore
  const minutesSlot: HTMLInputElement = selectQuery(
    ".main-page__dialog-slot--minutes"
  );
  //@ts-ignore
  const secondsSlot: HTMLInputElement = selectQuery(
    ".main-page__dialog-slot--seconds"
  );

  const allSlots: HTMLElement[] = [hoursSlot, minutesSlot, secondsSlot];

  for (const slot of allSlots) {
    const [input, incrementButton, decrementButton] = getChildren(slot);

    input?.addEventListener("input", handleInput);

    incrementButton?.addEventListener("click", handleButton);
    decrementButton?.addEventListener("click", handleButton);
  }

  //@ts-ignore
  const registerButton: HTMLButtonElement = selectQuery(
    ".main-page__dialog-button--register"
  );

  const container = selectQuery(".main-page");

  function getDialogBoxInputValues(
    event: MouseEvent,
    dialog: HTMLDialogElement
  ) {
    const inputs = selectQueryAll("input", dialog);
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

    log({ totalTimeInSeconds, titleValue });
    return { initialTime: totalTimeInSeconds, title: titleValue };
  }

  registerButton?.addEventListener("click", (e: MouseEvent) => {
    const { initialTime, title } = getDialogBoxInputValues(e, dialog);
    const newTimerComponent = document.createElement("timer-component");

    const allTimerComponents = selectQueryAll("timer-component");
    const amountOfTimers = allTimerComponents.length;
    log({ amountOfTimers });

    addModifyAttribute(newTimerComponent, "initial-time", initialTime);
    addModifyAttribute(newTimerComponent, "current-time", initialTime);
    addModifyAttribute(newTimerComponent, "timer-title", title);
    addModifyAttribute(newTimerComponent, "is-running", false);
    addModifyAttribute(newTimerComponent, "index", amountOfTimers);

    container.appendChild(newTimerComponent);
    changeDialogBoxState(dialog);
  });

  //@ts-ignore
  const cancelButton: HTMLButtonElement = selectQuery(
    ".main-page__dialog-button--cancel"
  );

  cancelButton?.addEventListener("click", (e) => {
    changeDialogBoxState(dialog);
  });
}

/**
 * Handles the input event for dialog box slots for time input
 *
 * @param {InputEvent} event - The input event
 *
 * @returns void
 */
export function handleInput(event: InputEvent) {
  //@ts-ignore
  verifyInputValue(event.target, false);
}

/**
 * Handles the button click event for dialog box slots for time input
 *
 * @param {MouseEvent} event - The mouse click event
 *
 * @returns void
 */
export function handleButton(event: MouseEvent) {
  //@ts-ignore
  const isIncrementButton: boolean = getClassListValues(
    //@ts-ignore
    event.target
  ).includes("main-page__dialog-button--increment");

  const valueToSum: number = isIncrementButton ? 1 : -1;

  //@ts-ignore
  const slotContainer = getAncestor(event.target, ".main-page__dialog-slot");

  //@ts-ignore
  const input: HTMLInputElement = getChildren(slotContainer)[0];

  const newValue: number = Number(input.value) + Number(valueToSum);

  input.value = newValue.toString();

  verifyInputValue(input, true);
}

/**
 * Verifies the input value of dialog box slots for time input and updates it if necessary
 *
 * @param {HTMLInputElement} inputElement - The input element to verify and update
 * @param {boolean} isButtonEvent - A flag to indicate if the verification was triggered by a button click event
 *
 * @returns void
 */
export function verifyInputValue(
  inputElement: HTMLInputElement,
  isButtonEvent: boolean
) {
  const classes: string[] = getClassListValues(inputElement);

  const isHoursInput: boolean = classes.includes(
    "main-page__dialog-input--hours"
  );

  const inputLimit: number = isHoursInput ? 99 : 59;

  if (isButtonEvent) {
    const valueOfInputUnderflows: boolean = Number(inputElement.value) < 0;

    if (valueOfInputUnderflows) {
      inputElement.value = inputLimit.toString().slice(-2);
    }
  }
  const valueIsUnderTen: boolean = Number(inputElement.value) < 10;
  if (valueIsUnderTen) {
    inputElement.value = `0${inputElement.value.slice(-1)}`;
  }

  const valueOverflows: boolean = isHoursInput
    ? Number(inputElement.value.slice(1, 3)) > 99
    : Number(inputElement.value.slice(-2)) > 59;

  if (valueOverflows) {
    let currentValue: string = inputElement.value.slice(1, 3);
    inputElement.value = `0${currentValue.slice(-1)}`;
  }

  const valueIsOverThreeDigits: boolean = inputElement.value.length > 2;
  if (valueIsOverThreeDigits) {
    inputElement.value = `${inputElement.value.slice(1, 3)}`;
  }
}
