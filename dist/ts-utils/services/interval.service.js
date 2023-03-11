"use strict";
/**
 * Utility class that sets and clears intervals
 */
class IntervalUtility {
    id;
    arrayOfIds;
    constructor() {
        this.id = 0;
        this.arrayOfIds = [];
    }
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
    static add(callback, milliseconds) {
        //@ts-ignore
        this.id = setInterval(() => {
            callback();
        }, milliseconds);
        //@ts-ignore
        this.arrayOfIds.push(this.id);
        //@ts-ignore
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
    static remove(id) {
        //@ts-ignore
        const actualId = this.arrayOfIds.filter((idNumber) => {
            return idNumber === id;
        })[0];
        clearInterval(actualId);
        //@ts-ignore
        this.arrayOfIds = this.arrayOfIds.filter((idNumber) => {
            return idNumber !== actualId;
        });
    }
}
