/* global $, document, affix, dom, describe, beforeEach, it, expect */

describe('domManipulation', () => {
  let $selectedElement;
  let selectedElement;

  beforeEach(() => {
    affix(
      '.learn-query-testing #toddler .hidden.toy+h1[class="title"]+span[class="subtitle"]+span[class="subtitle"]+input[name="toyName"][value="cuddle bunny"]+input[class="creature"][value="unicorn"]+.hidden+.infinum[value="awesome cool"]'
    );

    $selectedElement = $('#toddler');
    [selectedElement] = $selectedElement;
  });

  it('should be able to remove a HTML element', () => {
    expect(document.contains(selectedElement)).toBe(true);
    dom.remove(selectedElement);
    expect(document.contains(selectedElement)).toBe(false);
  });

  it('should append a HTML element to the given element', () => {
    const newElement = document.createElement('h4');
    const initialChildrenCount = $selectedElement.children().length;

    expect(initialChildrenCount).toBeGreaterThan(0);

    dom.append(selectedElement, newElement);

    expect($selectedElement.children().length).toBe(initialChildrenCount + 1);
    expect($selectedElement.children()[initialChildrenCount]).toBe(newElement);
  });

  it('should prepend a HTML element to the given element', () => {
    const newElement = document.createElement('h4');
    const initialChildrenCount = $selectedElement.children().length;

    expect(initialChildrenCount).toBeGreaterThan(0);

    dom.prepend(selectedElement, newElement);

    expect($selectedElement.children().length).toBe(initialChildrenCount + 1);
    expect($selectedElement.children()[0]).toBe(newElement);
  });

  it('should be able to add a new HTML element after a given HTML element', () => {
    const newElement = document.createElement('div');

    const $targetElement = $('.creature');
    const targetElement = $targetElement[0];

    expect($targetElement.next()[0]).not.toBe(newElement);
    dom.after(targetElement, newElement);
    expect($targetElement.next()[0]).toBe(newElement);
  });

  it('should be able to add a new HTML element before a given HTML element', () => {
    const newElement = document.createElement('main');

    expect($selectedElement.prev()[0]).not.toBe(newElement);
    dom.before(selectedElement, newElement);
    expect($selectedElement.prev()[0]).toBe(newElement);
  });

  it('should return a value of a given HTML non-select element', () => {
    const element = $('.creature')[0];
    let elementValue = dom.val(element);

    expect(elementValue).toBe('unicorn');

    element.value = 'pikachu';

    elementValue = dom.val(element);
    expect(elementValue).toBe('pikachu');
  });

  it('should return a value of a given select HTML element', () => {
    $selectedElement = $selectedElement.affix(
      'select option[value="Option1"]+option[value="Option2"][selected=true]'
    );
    expect(dom.val(document.querySelector('select'))).toBe('Option2');
  });

  it('should not throw exception if the target element is not in the DOM when calling dom.remove', () => {
    const elementNotInTheDom = document.createElement('div');
    expect(() => {
      dom.remove(elementNotInTheDom);
    }).not.toThrowError();
  });

  it('should not throw exception if the target element is not in the DOM when calling dom.after', () => {
    const elementNotInTheDom = document.createElement('div');
    const newElement = document.createElement('h4');

    expect(() => {
      dom.after(elementNotInTheDom, newElement);
    }).not.toThrowError();
  });
});
