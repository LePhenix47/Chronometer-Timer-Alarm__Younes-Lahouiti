import { spliceArray } from "./string.function";

/**
 * Update an array of objects by a specific property value while preserving the order of objects inside.
 *
 * @param {Array} arrayOfObjects - The array of objects to update.
 * @param {string} property - The name of the property to compare.
 * @param {Object} newObject - The new object to replace the existing one.
 *
 * @returns {Array|null} A new array of objects with the updated object or null if the object was not found.
 */
export function updateArrayOfObjectByProp(
  arrayOfObjects: any[],
  property: string,
  newObject: object
): any[] | null {
  /**
   * Object to be updated
   */
  const objectToRemove: object = arrayOfObjects.find((object) => {
    return object[property] === newObject[property];
  });

  /**
   * Boolean value to know if the object was found
   */
  const notFound: boolean = !objectToRemove;

  if (notFound) {
    return null;
  }

  /**
   * We get the starting index for the
   */
  const startIndex: number = arrayOfObjects.indexOf(objectToRemove);

  const { removedItems, newArray } = spliceArray(
    arrayOfObjects,
    startIndex,
    1,
    newObject
  );

  return newArray;
}
