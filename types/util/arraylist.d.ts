/**
 * An ArrayList stores a variable number of objects. This is similar to making an array of
 * objects, but with an ArrayList, items can be easily added and removed from the ArrayList
 * and it is resized dynamically.
 */
export class ArrayList<T = any> {
  /**
   * Creates a new ArrayList
   * @param a Initial array of items (optional)
   */
  constructor(a?: T[]);

  /** The internal data array */
  readonly data: T[];

  /**
   * Clears the array
   * @returns this
   */
  clear(): this;

  /**
   * Reverses the order of the elements in the ArrayList. The array will be modified!
   * @returns this
   */
  reverse(): this;

  /**
   * Returns the first element in the list
   * @returns The first element
   */
  first(): T;

  /**
   * Returns the last element in the list
   * @returns The last element
   */
  last(): T;

  /**
   * Returns a value indicating whether the given element is in the ArrayList
   * @param obj The element to locate in the ArrayList
   * @returns True if item is found in the ArrayList
   */
  contains(obj: T): boolean;

  /**
   * Removes the last element from an array and returns it
   * @returns The element that was removed
   */
  pop(): T;

  /**
   * Adds one element to the end of the ArrayList and returns the new length
   * @param obj The element to add
   * @returns The new length
   */
  push(obj: T): number;

  /**
   * Removes the first element from an ArrayList and returns it
   * @returns The element that was removed
   */
  shift(): T;

  /**
   * Adds one element to the beginning of the ArrayList
   * @param obj The element to add
   * @returns this
   */
  unshift(obj: T): this;

  /**
   * Return a new ArrayList with a subset of the elements
   * @param from The index to begin (inclusive)
   * @param to The index to end (exclusive)
   * @returns The new ArrayList
   */
  slice(from: number, to?: number): ArrayList<T>;

  /**
   * Sorts the collection based on a field name or custom sort function
   * @param f The sort function or field name
   * @returns this
   */
  sort(f: string | ((a: T, b: T) => number)): this;

  /**
   * Copies the contents of a ArrayList to another ArrayList
   * @param deep If true, will call "clone" on each element (if available)
   * @returns The new ArrayList
   */
  clone(deep?: boolean): ArrayList<T>;

  /**
   * Iterates over the list of elements, yielding each in turn to a callback function
   * @param func The callback function to execute
   * @param reverse If true, iterates in reverse order
   * @returns this
   */
  each(func: (index: number, element: T) => void, reverse?: boolean): this;

  /**
   * Creates a new ArrayList with the results of calling a provided function
   * on every element in this ArrayList
   * @param func The mapping function
   * @returns The new ArrayList
   */
  map<U>(func: (item: T, index: number) => U): ArrayList<U>;

  /**
   * Creates a new ArrayList with all elements that pass the test
   * @param func The test function
   * @returns The new ArrayList
   */
  grep(func: (item: T, index: number) => boolean): ArrayList<T>;

  /**
   * Find an element in the ArrayList
   * @param func The test function
   * @returns The found element or null
   */
  find(func: (item: T, index: number) => boolean): T | null;

  /**
   * Removes duplicates from the ArrayList
   * @returns this
   */
  unique(): this;

  /**
   * Add all elements from another ArrayList to this one
   * @param list The ArrayList to add
   * @param avoidDuplicates If true, checks for duplicates before adding
   * @returns this
   */
  addAll(list: ArrayList<T>, avoidDuplicates?: boolean): this;

  /**
   * Remove the element at the specified index
   * @param index The index
   * @returns The removed element
   */
  removeElementAt(index: number): T;

  /**
   * Removes the given element from the array
   * @param obj The element to remove
   * @returns True if the element was removed
   */
  remove(obj: T): boolean;

  /**
   * Removes an element which satisfies the given predicate
   * @param func The test function
   * @returns The removed element or null
   */
  removeByPredicate(func: (item: T) => boolean): T | null;

  /**
   * Remove all occurrences of the given element from the array
   * @param obj The element to remove
   * @returns The number of elements removed
   */
  removeAll(obj: T): number;

  /**
   * Return the zero-based position of the given element in the ArrayList
   * @param obj The element to locate
   * @returns The position of the element, or -1 if not found
   */
  indexOf(obj: T): number;

  /**
   * Insert an element at a specific position
   * @param i The position to insert at
   * @param obj The element to insert
   * @returns this
   */
  insertElementAt(i: number, obj: T): this;

  /**
   * Get the element at a specific position
   * @param i The index
   * @returns The element at the given position
   */
  get(i: number): T;

  /**
   * Set an element at a specific position
   * @param i The index
   * @param obj The element to set
   * @returns this
   */
  set(i: number, obj: T): this;

  /**
   * The size/length of the ArrayList
   * @returns The size
   */
  getSize(): number;

  /**
   * The size/length of the ArrayList
   * @returns The size
   */
  size(): number;

  /**
   * Checks if the ArrayList is empty
   * @returns True if empty
   */
  isEmpty(): boolean;

  /**
   * Overwrite the element at the given index
   * @param obj The new element
   * @param index The index to overwrite
   * @returns this
   */
  overwriteElementAt(obj: T, index: number): this;

  /**
   * Get the attributes which are required for persistence
   * @returns The persistent attributes
   */
  getPersistentAttributes(): { data: T[] };

  /**
   * Read attributes from serialized properties
   * @param memento The serialized data
   * @returns this
   */
  setPersistentAttributes(memento: { data: T[] }): this;
}

/** Empty list constant */
export const EMPTY_LIST: ArrayList<any>;
