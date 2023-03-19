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

import { WebStorageService } from "../services/webstorage.service";
import { setEventDelegationToContainer } from "./timer-component.functions";
import { getRandomInt } from "./number.functions";
import {
  getTimeValues,
  handleDialogButton,
  handleDialogInput,
} from "../../components/Timer";

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
    function generateRandomTimerIndex() {
      //We get all the indicies of all the timers from the `localStorage`
      const arrayOfTimerIndices: {
        initialTime: number;
        title: string;
        index: number;
      }[] = WebStorageService.getKey("timers")?.map(
        (timer: { initialTime: number; title: string; index: number }) => {
          return timer.index;
        }
      );

      //We verify if timers are added or not, if not we return a number between 0 and 2³⁰
      const noTimersAreAdded: boolean = !arrayOfTimerIndices?.length;

      if (noTimersAreAdded) {
        return getRandomInt(0, 2 ** 30);
      }

      let randomIndex: number = getRandomInt(0, 2 ** 30);

      //We check if the already had added that index to a timer
      const indexAlreadyExists: boolean = arrayOfTimerIndices.some((timer) => {
        return timer.index === randomIndex;
      });

      //If it did we re-run the function using recursion
      if (indexAlreadyExists) {
        generateRandomTimerIndex();
      }

      //If it didn't we simply return the index
      return randomIndex;
    }
    const index = generateRandomTimerIndex();
    log({ index });

    /**
     * We create the timer componnet with the necessary attributes
     */
    const { initialTime, title } = getDialogBoxInputValues(e, dialog);
    createTimerComponent(initialTime, title, index, true);

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

/**
 * Creates a new timer component and adds it to the container element.
 * If `isCreating` is set to `true`, it will save the new timer to the local storage.
 *
 * @param {number} initialTime - The initial time value for the timer.
 * @param {string} title - The title of the timer.
 * @param {number} index - The index of the timer in the timers array.
 * @param {boolean} [isCreating=false] - Whether the timer should created in the `localStorage` or not.
 *
 * @returns {void}
 */
export function createTimerComponent(
  initialTime: number,
  title: string,
  index: number,
  isCreating?: boolean
): void {
  const container = selectQuery(".main-page");

  const newTimerComponent = document.createElement("timer-component");

  /**
   * Idea to refactor this part:
   *
   * Get an array of atributes and their values like this:
   * {attribute: string, value: any}[]
   *
   * And we loop through the entire array and add the attributes
   */

  const arrayOfAttrbiutesToAdd: { attribute: string; value: any }[] = [
    { attribute: "initial-time", value: initialTime },
    { attribute: "current-time", value: initialTime },
    { attribute: "timer-title", value: title },
    { attribute: "is-running", value: false },
    { attribute: "index", value: index },
  ];

  for (const attributeKeyPair of arrayOfAttrbiutesToAdd) {
    const { attribute, value } = attributeKeyPair;
    addModifyAttribute(newTimerComponent, attribute, value);
  }

  const modalWindow = selectQuery("dialog", newTimerComponent);
  const { hours, minutes, seconds } = getTimeValues(initialTime);

  //@ts-ignore
  const hoursInput: HTMLInputElement = selectQuery(
    ".timer-dialog__input--hours",
    modalWindow
  );
  //@ts-ignore
  const minutesInput: HTMLInputElement = selectQuery(
    ".timer-dialog__input--minutes",
    modalWindow
  );
  //@ts-ignore
  const secondsInput: HTMLInputElement = selectQuery(
    ".timer-dialog__input--seconds",
    modalWindow
  );

  hoursInput.value = hours;
  addModifyAttribute(hoursInput, "value", hours);

  minutesInput.value = minutes;
  addModifyAttribute(minutesInput, "value", minutes);

  secondsInput.value = seconds;
  addModifyAttribute(secondsInput, "value", seconds);

  //@ts-ignore
  const titleInput: HTMLInputElement = selectQuery(
    ".timer-dialog__input--title",
    modalWindow
  );

  titleInput.value = title;

  log({ modalWindow, titleInput });

  container.appendChild(newTimerComponent);

  const devWantsToSaveTimers = isCreating === true;

  if (devWantsToSaveTimers) {
    /**
     * We get the value of the timers in the local storage with our utility class
     */
    let newTimersArray = WebStorageService.getKey("timers") || [];
    newTimersArray.push({ initialTime, title, index });

    log({ newTimersArray });
    /**
     * We set the new timers in the localStorage
     *
     * ⚠ We must destructure the array as the `.push()` methods returns the length of the array
     */
    WebStorageService.setKey("timers", [...newTimersArray]);
  }
}

/**
 * Removes a timer component from the DOM and localStorage based on its index.
 *
 * @param {number} indexOfTimer - The index of the timer to remove.
 * @returns {void}
 */
export function removeTimerComponent(indexOfTimer: number): void {
  /**
   * We get all the `<timer-component>` elements
   */
  const timersObjectsArray: {
    initialTime: number;
    title: string;
    index: number;
  }[] = WebStorageService.getKey("timers") || [];
  const hasTimers: boolean = !!timersObjectsArray.length;

  const timerComponentsArray: HTMLElement[] = selectQueryAll("timer-component");

  const container: HTMLElement = selectQuery(".main-page");

  /**
   * If there are timers then we remove it by...
   */
  if (hasTimers) {
    let timerToRemove: HTMLElementTagNameMap["timer-component"] | null = null;

    for (const timer of timerComponentsArray) {
      let index = Number(timer.getAttribute("index"));

      const indexMatches = index === indexOfTimer;
      if (indexMatches) {
        //@ts-ignore
        timerToRemove = timer;
        break;
      }
    }

    const hasFoundElement: boolean = !!timerToRemove;
    if (hasFoundElement) {
      //We get the new array without the removed timer
      let newArrayOfTimers = timersObjectsArray.filter(
        (timerObject: {
          initialTime: number;
          title: string;
          index: number;
        }) => {
          const { initialTime, title, index } = timerObject;
          return index !== indexOfTimer;
        }
      );

      //We remove the deleted timer from the localStorage
      WebStorageService.setKey("timers", newArrayOfTimers);

      const timerComponentContainer = selectQuery(
        ".timer-component__container",
        timerToRemove
      );

      //We clean up the DOM by removing any event listener on the component
      timerComponentContainer.removeEventListener(
        "click",
        setEventDelegationToContainer
      );

      const hoursSlot = selectQuery(
        ".timer-dialog__slot--hours",
        timerToRemove
      );
      const minutesSlot = selectQuery(
        ".timer-dialog__slot--minutes",
        timerToRemove
      );
      const secondsSlot = selectQuery(
        ".timer-dialog__slot--seconds",
        timerToRemove
      );

      const allSlots = [hoursSlot, minutesSlot, secondsSlot];

      for (const slot of allSlots) {
        const [input, incrementButton, decrementButton] = getChildren(slot);

        //We clean up any event listner on the timer to avoid performance issues
        input.removeEventListener("input", handleDialogInput);

        incrementButton.removeEventListener("click", handleDialogButton);
        decrementButton.removeEventListener("click", handleDialogButton);
      }

      //We remove the deleted timer from the DOM
      container.removeChild(timerToRemove);
    }
  }
}
