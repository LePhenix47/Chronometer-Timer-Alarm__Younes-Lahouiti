/**
 * Utility class that sets and clears timeouts
 */
export class Timeout {
  private static id: NodeJS.Timeout;
  private static arrayOfIds: NodeJS.Timeout[] = [];

  constructor() {}

  /**
   * Method that creates an timeout
   *
   * @param {(...args: any) => any | void} callback Callback function that will be called after the timeout runs out
   * @param milliseconds Duration of the timeout in milliseconds before executing the callback function
   * @returns A number as an ID for the timeout
   *
   * @example
   * let fct = () => {
   *   console.log("Hello World");
   * };
   *
   * let timeoutTrigger = Timeout.add(fct, 2_500);
   *
   */
  static set(
    callback: (...args: any) => any | void,
    milliseconds: number
  ): NodeJS.Timeout {
    this.id = setTimeout(() => {
      callback();
    }, milliseconds);

    this.arrayOfIds.push(this.id);

    return this.id;
  }

  /**
   * Method that clears a timeout
   *
   * @param {number} id ID of the timeout to clear (stored inside the trigger of the timeout)
   *
   * @example
   *
   * function fct() {
   *   console.log("Hello world!");
   * }
   *
   *
   * let timeoutTrigger = Timeout.add(fct, 2_500);
   *
   * // ...
   *
   * Timeout.clear(timeoutTrigger);
   *
   */
  static clear(id: NodeJS.Timeout): void {
    const actualId: NodeJS.Timeout = this.arrayOfIds.filter(
      (idNumber: NodeJS.Timeout) => {
        return idNumber === id;
      }
    )[0];

    clearTimeout(actualId);

    this.arrayOfIds = this.arrayOfIds.filter((idNumber: NodeJS.Timeout) => {
      return idNumber !== actualId;
    });
  }
}
