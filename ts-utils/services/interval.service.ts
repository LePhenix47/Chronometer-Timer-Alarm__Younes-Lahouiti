/**
 * Utility class that sets and clears intervals
 */
class IntervalUtility {
  private static id: number;
  private static arrayOfIds: number[];

  constructor() {}

  /**
   * Method that creates an interval
   *
   * @param {function(...args: any[]): any | void} callback Callback function that will be called after the timer runs out
   * @param milliseconds Duration of the timer in milliseconds before executing the callback function
   * @returns A number as an ID for the interval
   *
   * @example
   * const intervalCreator = new Interval();
   *
   * let fct = () => {
   *   console.log("Hello World");
   * };
   *
   * let intervalTrigger = intervalCreator.addInterval(fct, 2_500);
   *
   */
  static add(
    callback: (...args: any) => any | void,
    milliseconds: number
  ): number {
    this.id = setInterval(() => {
      callback();
    }, milliseconds);

    this.arrayOfIds.push(this.id);

    return this.id;
  }

  /**
   * Method that removes an interval
   *
   * @param {number} id ID of the interval to remove (stored inside the trigger of the interval)
   *
   * @example
   *
   * const intervalCreator = new Interval();
   *
   * function fct() {
   *   console.log("Hello world!");
   * }
   *
   * let intervalTrigger = intervalCreator.addInterval(fct, 2_500);
   *
   * // ...
   *
   * intervalCreator.removeInterval(intervalTrigger);
   *
   */
  static remove(id: number): void {
    const actualId: number = this.arrayOfIds.filter((idNumber: number) => {
      return idNumber === id;
    })[0];

    clearInterval(actualId);

    this.arrayOfIds = this.arrayOfIds.filter((idNumber: number) => {
      return idNumber !== actualId;
    });
  }
}
