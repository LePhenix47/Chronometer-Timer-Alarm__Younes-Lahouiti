import {
  selectQuery,
  selectQueryAll,
} from "./ts-utils/helper-functions/dom.functions";

import "./components/Timer";
import { log } from "./ts-utils/helper-functions/console-funtions";

const component = selectQuery("timer-component");

//@ts-ignore
log(component.initialTime);
