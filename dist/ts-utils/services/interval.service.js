"use strict";
/**
 * Utility class that sets and clears intervals
 */
class Interval {
    constructor() { }
    /**
     * Method that creates an interval
     *
     * @param {(...args: any) => any | void} callback Callback function that will be called after the timer runs out
     * @param milliseconds Duration of the timer in milliseconds before executing the callback function
     * @returns A number as an ID for the interval
     *
     * @example
     * let fct = () => {
     *   console.log("Hello World");
     * };
     *
     * let intervalTrigger = Interval.add(fct, 2_500);
     *
     */
    static add(callback, milliseconds) {
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
     * function fct() {
     *   console.log("Hello world!");
     * }
     *
     *
     * let intervalTrigger = Interval.add(fct, 2_500);
     *
     * // ...
     *
     * Interval.remove(intervalTrigger);
     *
     */
    static remove(id) {
        const actualId = this.arrayOfIds.filter((idNumber) => {
            return idNumber === id;
        })[0];
        clearInterval(actualId);
        this.arrayOfIds = this.arrayOfIds.filter((idNumber) => {
            return idNumber !== actualId;
        });
    }
}
Interval.arrayOfIds = [];
