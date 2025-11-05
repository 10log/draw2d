/**
 * Unit tests for draw2d.util.ArrayList
 */

describe('draw2d.util.ArrayList', () => {
  let draw2d;

  beforeAll(() => {
    // Load the built library
    draw2d = require('../../../dist/draw2d.js');
  });

  describe('constructor', () => {
    it('should create empty list', () => {
      const list = new draw2d.util.ArrayList();

      expect(list.getSize()).toBe(0);
      expect(list.isEmpty()).toBe(true);
    });

    it('should create list from array', () => {
      const list = new draw2d.util.ArrayList([1, 2, 3]);

      expect(list.getSize()).toBe(3);
      expect(list.get(0)).toBe(1);
      expect(list.get(1)).toBe(2);
      expect(list.get(2)).toBe(3);
    });
  });

  describe('add and get', () => {
    it('should add single element', () => {
      const list = new draw2d.util.ArrayList();
      list.add('test');

      expect(list.getSize()).toBe(1);
      expect(list.get(0)).toBe('test');
    });

    it('should add multiple elements', () => {
      const list = new draw2d.util.ArrayList();
      list.add('a', 'b', 'c');

      expect(list.getSize()).toBe(3);
      expect(list.get(0)).toBe('a');
      expect(list.get(1)).toBe('b');
      expect(list.get(2)).toBe('c');
    });

    it('should return self for chaining', () => {
      const list = new draw2d.util.ArrayList();
      const result = list.add('test');

      expect(result).toBe(list);
    });

    it('should add objects', () => {
      const list = new draw2d.util.ArrayList();
      const obj = {x: 10, y: 20};
      list.add(obj);

      expect(list.get(0)).toBe(obj);
    });
  });

  describe('getSize and isEmpty', () => {
    it('should return correct size', () => {
      const list = new draw2d.util.ArrayList();

      expect(list.getSize()).toBe(0);
      list.add('a');
      expect(list.getSize()).toBe(1);
      list.add('b');
      expect(list.getSize()).toBe(2);
    });

    it('should report empty status correctly', () => {
      const list = new draw2d.util.ArrayList();

      expect(list.isEmpty()).toBe(true);
      list.add('test');
      expect(list.isEmpty()).toBe(false);
    });
  });

  describe('first and last', () => {
    it('should return first element', () => {
      const list = new draw2d.util.ArrayList([1, 2, 3]);

      expect(list.first()).toBe(1);
    });

    it('should return last element', () => {
      const list = new draw2d.util.ArrayList([1, 2, 3]);

      expect(list.last()).toBe(3);
    });

    it('should return null for first on empty list', () => {
      const list = new draw2d.util.ArrayList();

      expect(list.first()).toBeNull();
    });

    it('should return undefined for last on empty list', () => {
      const list = new draw2d.util.ArrayList();

      expect(list.last()).toBeUndefined();
    });
  });

  describe('remove', () => {
    it('should remove element', () => {
      const list = new draw2d.util.ArrayList(['a', 'b', 'c']);
      const removed = list.remove('b');

      expect(removed).toBe('b');
      expect(list.getSize()).toBe(2);
      expect(list.get(0)).toBe('a');
      expect(list.get(1)).toBe('c');
    });

    it('should return null when element not found', () => {
      const list = new draw2d.util.ArrayList(['a', 'b']);
      const removed = list.remove('z');

      expect(removed).toBeNull();
      expect(list.getSize()).toBe(2);
    });

    it('should remove object by reference', () => {
      const obj = {x: 10};
      const list = new draw2d.util.ArrayList([obj, {x: 20}]);
      list.remove(obj);

      expect(list.getSize()).toBe(1);
      expect(list.get(0).x).toBe(20);
    });
  });

  describe('removeElementAt', () => {
    it('should remove element at index', () => {
      const list = new draw2d.util.ArrayList(['a', 'b', 'c']);
      const removed = list.removeElementAt(1);

      expect(removed).toBe('b');
      expect(list.getSize()).toBe(2);
      expect(list.get(0)).toBe('a');
      expect(list.get(1)).toBe('c');
    });

    it('should remove first element', () => {
      const list = new draw2d.util.ArrayList(['a', 'b', 'c']);
      list.removeElementAt(0);

      expect(list.first()).toBe('b');
    });

    it('should remove last element', () => {
      const list = new draw2d.util.ArrayList(['a', 'b', 'c']);
      list.removeElementAt(2);

      expect(list.last()).toBe('b');
    });
  });

  describe('insertElementAt', () => {
    it('should insert at beginning', () => {
      const list = new draw2d.util.ArrayList(['b', 'c']);
      list.insertElementAt('a', 0);

      expect(list.getSize()).toBe(3);
      expect(list.get(0)).toBe('a');
      expect(list.get(1)).toBe('b');
    });

    it('should insert in middle', () => {
      const list = new draw2d.util.ArrayList(['a', 'c']);
      list.insertElementAt('b', 1);

      expect(list.get(0)).toBe('a');
      expect(list.get(1)).toBe('b');
      expect(list.get(2)).toBe('c');
    });

    it('should return self for chaining', () => {
      const list = new draw2d.util.ArrayList(['a']);
      const result = list.insertElementAt('b', 0);

      expect(result).toBe(list);
    });
  });

  describe('indexOf and contains', () => {
    it('should return index of element', () => {
      const list = new draw2d.util.ArrayList(['a', 'b', 'c']);

      expect(list.indexOf('a')).toBe(0);
      expect(list.indexOf('b')).toBe(1);
      expect(list.indexOf('c')).toBe(2);
    });

    it('should return -1 for non-existent element', () => {
      const list = new draw2d.util.ArrayList(['a', 'b']);

      expect(list.indexOf('z')).toBe(-1);
    });

    it('should check if contains element', () => {
      const list = new draw2d.util.ArrayList(['a', 'b', 'c']);

      expect(list.contains('b')).toBe(true);
      expect(list.contains('z')).toBe(false);
    });
  });

  describe('clear', () => {
    it('should remove all elements', () => {
      const list = new draw2d.util.ArrayList(['a', 'b', 'c']);
      list.clear();

      expect(list.isEmpty()).toBe(true);
      expect(list.getSize()).toBe(0);
    });

    it('should return self for chaining', () => {
      const list = new draw2d.util.ArrayList(['a']);
      const result = list.clear();

      expect(result).toBe(list);
    });
  });

  describe('reverse', () => {
    it('should reverse order of elements', () => {
      const list = new draw2d.util.ArrayList([1, 2, 3]);
      list.reverse();

      expect(list.get(0)).toBe(3);
      expect(list.get(1)).toBe(2);
      expect(list.get(2)).toBe(1);
    });

    it('should return self for chaining', () => {
      const list = new draw2d.util.ArrayList([1, 2]);
      const result = list.reverse();

      expect(result).toBe(list);
    });
  });

  describe('clone', () => {
    it('should create shallow copy', () => {
      const list = new draw2d.util.ArrayList(['a', 'b', 'c']);
      const clone = list.clone();

      expect(clone).not.toBe(list);
      expect(clone.getSize()).toBe(3);
      expect(clone.get(0)).toBe('a');
      expect(clone.get(1)).toBe('b');
    });

    it('should not affect original when modifying clone', () => {
      const list = new draw2d.util.ArrayList(['a', 'b']);
      const clone = list.clone();
      clone.add('c');

      expect(list.getSize()).toBe(2);
      expect(clone.getSize()).toBe(3);
    });

    it('should create deep copy with clone() on elements', () => {
      const point1 = new draw2d.geo.Point(10, 20);
      const point2 = new draw2d.geo.Point(30, 40);
      const list = new draw2d.util.ArrayList([point1, point2]);
      const clone = list.clone(true);

      expect(clone.get(0)).not.toBe(point1);
      expect(clone.get(0).x).toBe(10);
      expect(clone.get(0).y).toBe(20);
    });
  });

  describe('each', () => {
    it('should iterate over all elements', () => {
      const list = new draw2d.util.ArrayList(['a', 'b', 'c']);
      const values = [];
      const indices = [];

      list.each((i, val) => {
        indices.push(i);
        values.push(val);
      });

      expect(indices).toEqual([0, 1, 2]);
      expect(values).toEqual(['a', 'b', 'c']);
    });

    it('should iterate in reverse order', () => {
      const list = new draw2d.util.ArrayList(['a', 'b', 'c']);
      const values = [];

      list.each((i, val) => {
        values.push(val);
      }, true);

      expect(values).toEqual(['c', 'b', 'a']);
    });

    it('should stop iteration when returning false', () => {
      const list = new draw2d.util.ArrayList(['a', 'b', 'c']);
      const values = [];

      list.each((i, val) => {
        values.push(val);
        return val !== 'b'; // Stop after 'b'
      });

      expect(values).toEqual(['a', 'b']);
    });
  });

  describe('map', () => {
    it('should transform all elements', () => {
      const list = new draw2d.util.ArrayList([1, 2, 3]);
      list.map(x => x * 2);

      expect(list.get(0)).toBe(2);
      expect(list.get(1)).toBe(4);
      expect(list.get(2)).toBe(6);
    });

    it('should pass index to function', () => {
      const list = new draw2d.util.ArrayList(['a', 'b', 'c']);
      list.map((val, i) => val + i);

      expect(list.get(0)).toBe('a0');
      expect(list.get(1)).toBe('b1');
      expect(list.get(2)).toBe('c2');
    });
  });

  describe('grep (filter)', () => {
    it('should keep only matching elements', () => {
      const list = new draw2d.util.ArrayList([1, 2, 3, 4, 5]);
      list.grep(x => x > 2);

      expect(list.getSize()).toBe(3);
      expect(list.get(0)).toBe(3);
      expect(list.get(1)).toBe(4);
      expect(list.get(2)).toBe(5);
    });

    it('should remove all elements if none match', () => {
      const list = new draw2d.util.ArrayList([1, 2, 3]);
      list.grep(x => x > 10);

      expect(list.isEmpty()).toBe(true);
    });
  });

  describe('find', () => {
    it('should return first matching element', () => {
      const list = new draw2d.util.ArrayList([1, 2, 3, 4, 5]);
      const result = list.find(x => x > 2);

      expect(result).toBe(3);
    });

    it('should return undefined if no match', () => {
      const list = new draw2d.util.ArrayList([1, 2, 3]);
      const result = list.find(x => x > 10);

      expect(result).toBeUndefined();
    });
  });

  describe('unique', () => {
    it('should remove duplicate elements', () => {
      const list = new draw2d.util.ArrayList([1, 2, 2, 3, 1, 4]);
      list.unique();

      expect(list.getSize()).toBe(4);
      expect(list.contains(1)).toBe(true);
      expect(list.contains(2)).toBe(true);
      expect(list.contains(3)).toBe(true);
      expect(list.contains(4)).toBe(true);
    });

    it('should preserve order of first occurrence', () => {
      const list = new draw2d.util.ArrayList(['a', 'b', 'a', 'c', 'b']);
      list.unique();

      expect(list.get(0)).toBe('a');
      expect(list.get(1)).toBe('b');
      expect(list.get(2)).toBe('c');
    });
  });

  describe('addAll', () => {
    it('should add all elements from another ArrayList', () => {
      const list1 = new draw2d.util.ArrayList(['a', 'b']);
      const list2 = new draw2d.util.ArrayList(['c', 'd']);
      list1.addAll(list2);

      expect(list1.getSize()).toBe(4);
      expect(list1.get(2)).toBe('c');
      expect(list1.get(3)).toBe('d');
    });

    it('should avoid duplicates when flag is true', () => {
      const list1 = new draw2d.util.ArrayList(['a', 'b']);
      const list2 = new draw2d.util.ArrayList(['b', 'c']);
      list1.addAll(list2, true);

      expect(list1.getSize()).toBe(3);
      expect(list1.contains('a')).toBe(true);
      expect(list1.contains('b')).toBe(true);
      expect(list1.contains('c')).toBe(true);
    });
  });

  describe('removeAll', () => {
    it('should remove all elements from ArrayList', () => {
      const list = new draw2d.util.ArrayList(['a', 'b', 'c', 'd']);
      const toRemove = new draw2d.util.ArrayList(['b', 'd']);
      list.removeAll(toRemove);

      expect(list.getSize()).toBe(2);
      expect(list.get(0)).toBe('a');
      expect(list.get(1)).toBe('c');
    });

    it('should remove all elements from array', () => {
      const list = new draw2d.util.ArrayList(['a', 'b', 'c', 'd']);
      list.removeAll(['b', 'd']);

      expect(list.getSize()).toBe(2);
      expect(list.get(0)).toBe('a');
      expect(list.get(1)).toBe('c');
    });
  });

  describe('push and pop (stack operations)', () => {
    it('should push and pop elements', () => {
      const list = new draw2d.util.ArrayList();
      list.push('a');
      list.push('b');
      list.push('c');

      expect(list.getSize()).toBe(3);

      const popped = list.pop();
      expect(popped).toBe('c');
      expect(list.getSize()).toBe(2);
    });

    it('should pop in LIFO order', () => {
      const list = new draw2d.util.ArrayList(['a', 'b', 'c']);

      expect(list.pop()).toBe('c');
      expect(list.pop()).toBe('b');
      expect(list.pop()).toBe('a');
      expect(list.isEmpty()).toBe(true);
    });
  });

  describe('sort', () => {
    it('should sort with custom function', () => {
      const list = new draw2d.util.ArrayList([3, 1, 4, 1, 5]);
      list.sort((a, b) => a - b);

      expect(list.get(0)).toBe(1);
      expect(list.get(1)).toBe(1);
      expect(list.get(2)).toBe(3);
      expect(list.get(3)).toBe(4);
      expect(list.get(4)).toBe(5);
    });

    it('should sort by field name', () => {
      const list = new draw2d.util.ArrayList([
        {name: 'Charlie', age: 30},
        {name: 'Alice', age: 25},
        {name: 'Bob', age: 35}
      ]);
      list.sort('name');

      expect(list.get(0).name).toBe('Alice');
      expect(list.get(1).name).toBe('Bob');
      expect(list.get(2).name).toBe('Charlie');
    });
  });

  describe('asArray', () => {
    it('should return internal array', () => {
      const list = new draw2d.util.ArrayList(['a', 'b', 'c']);
      const arr = list.asArray();

      expect(Array.isArray(arr)).toBe(true);
      expect(arr.length).toBe(3);
      expect(arr[0]).toBe('a');
    });
  });

  describe('edge cases', () => {
    it('should handle empty operations', () => {
      const list = new draw2d.util.ArrayList();

      expect(list.first()).toBeNull();
      expect(list.isEmpty()).toBe(true);
      list.reverse();
      expect(list.isEmpty()).toBe(true);
    });

    it('should handle single element', () => {
      const list = new draw2d.util.ArrayList(['only']);

      expect(list.first()).toBe('only');
      expect(list.last()).toBe('only');
      list.reverse();
      expect(list.first()).toBe('only');
    });

    it('should handle null values', () => {
      const list = new draw2d.util.ArrayList([null, 'a', null]);

      expect(list.getSize()).toBe(3);
      expect(list.contains(null)).toBe(true);
    });

    it('should handle undefined values', () => {
      const list = new draw2d.util.ArrayList([undefined, 'a', undefined]);

      expect(list.getSize()).toBe(3);
      expect(list.contains(undefined)).toBe(true);
    });
  });
});
