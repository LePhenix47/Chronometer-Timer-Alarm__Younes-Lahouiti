import {
  selectQuery,
  selectQueryAll,
} from "./ts-utils/helper-functions/dom.functions";

import "./components/Timer";
import { log } from "./ts-utils/helper-functions/console-funtions";

const component = selectQuery("timer-component");

const removeTimersButton = selectQuery(".main-page__button--delete");

const addNewTimerButton = selectQuery(".main-page__button--add");

log({ removeTimersButton, addNewTimerButton });
function addEventListeners() {}
