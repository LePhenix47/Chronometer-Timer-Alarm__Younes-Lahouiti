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
export function changeDialogBoxState(dialog: HTMLDialogElement): void {
  const modalIsAlreadyOpened: boolean | undefined =
    dialog?.hasAttribute("open");

  if (modalIsAlreadyOpened) {
    dialog.close();
    return;
  } else {
    dialog.showModal();
  }
}

/**
 * Adds event listeners to dialog box slots for time input
 *
 * @returns void
 */
export function addDialogBoxEventListeners() {
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
