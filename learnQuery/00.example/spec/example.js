/* global Fibonacci, describe, beforeEach, it, expect */

describe('Fibonacci calculator', () => {
  let fibonacciCalculator;

  beforeEach(() => {
    fibonacciCalculator = new Fibonacci();
  });

  it('should cover small numbers', () => {
    expect(fibonacciCalculator.compute(0)).toBe(1);
    expect(fibonacciCalculator.compute(1)).toBe(1);
  });

  it('should cover bigger numbers', () => {
    expect(fibonacciCalculator.compute(27)).toBe(317811);
  });

  it('should cover negative numbers', () => {
    expect(() => {
      fibonacciCalculator.compute(-1);
    }).toThrowError('Number must be positive');
  });

  it('should cover invalid values', () => {
    expect(() => {
      fibonacciCalculator.compute(
        'the answer to life the universe and everything'
      );
    }).toThrowError('Parameter must be a number');
  });
});
