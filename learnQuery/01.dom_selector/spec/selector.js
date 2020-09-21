/* global $, affix, domSelector, describe, beforeEach, it, expect, HTMLElement */
describe('Selector', () => {
  beforeEach(() => {
    affix(
      '.learn-query-testing #toddler .hidden.toy+h1[class="title"]+span[class="subtitle"]+span[class="subtitle"]+input[name="toyName"][value="cuddle bunny"]+input[class="creature"][value="unicorn"]+.hidden+.infinum[value="awesome cool"]'
    );
  });

  it('should select an empty array if the element does not exist in DOM', () => {
    const selector = '.some-element-not-in-the-dom';

    // We're calling $.makeArray because we need to transform jQuery result set into real array object
    const expectedSelectedElement = $.makeArray($(selector));
    const selectedElement = domSelector(selector);

    expect(selectedElement).toEqual(expectedSelectedElement);
    expect(selectedElement.length).toBe(0);
  });

  it('should select a DOM element with given ID', () => {
    const id = 'toddler';
    const expectedSelectedElement = $.makeArray($(`#${id}`));
    const selectedElement = domSelector(`#${id}`);

    expect(selectedElement).toEqual(expectedSelectedElement);
    expect(selectedElement.length).toBe(1);
    expect(selectedElement[0] instanceof HTMLElement).toBe(true);
    expect(selectedElement[0]).toBe(expectedSelectedElement[0]);
    expect(selectedElement[0].id).toBe(id);
  });

  it('should select DOM elements with a given class name', () => {
    const className = '.infinum';
    const selectedElementsArray = domSelector(className);
    const expectedHTMLElementsArray = $.makeArray($(className));

    expect(selectedElementsArray.length).toBe(expectedHTMLElementsArray.length);

    // We need to check for each element if it's in the expected result set because element order is not guaranteed
    selectedElementsArray.forEach((element) => {
      expect(expectedHTMLElementsArray.indexOf(element)).not.toBe(-1);
    });
  });

  it('should select DOM elements with a given tag name', () => {
    const tagName = 'input';
    const selectedElementsArray = domSelector(tagName);
    const expectedHTMLElementsArray = $.makeArray($(tagName));

    selectedElementsArray.forEach((element) => {
      expect(expectedHTMLElementsArray.indexOf(element)).not.toBe(-1);
    });
  });

  it('should throw an expection for invalid selector', () => {
    expect(() => {
      domSelector(')(?/');
    }).toThrowError();
  });
});
