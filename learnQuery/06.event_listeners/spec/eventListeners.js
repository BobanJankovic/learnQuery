/* global $, affix, eventListener, describe, beforeEach, it, expect, spyOn, MouseEvent, Event, document */

function createNewClickEvent() {
  return new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  });
}

describe('EventListeners', () => {
  let $selectedElement;
  let selectedElement;
  let methods;

  beforeEach(() => {
    affix(
      '.learn-query-testing #toddler .hidden.toy+h1[class="title"]+span[class="subtitle"]+span[class="subtitle"]+input[name="toyName"][value="cuddle bunny"]+input[class="creature"][value="unicorn"]+.hidden+.infinum[value="awesome cool"]'
    );

    methods = {
      showLove() {
        // eslint-disable-next-line no-console
        console.log('<3 JavaScript <3');
      },

      giveLove() {
        // eslint-disable-next-line no-console
        console.log('==> JavaScript ==>');
        return '==> JavaScript ==>';
      },
    };

    spyOn(methods, 'showLove');
    spyOn(methods, 'giveLove');

    $selectedElement = $('#toddler');
    [selectedElement] = $selectedElement;
  });

  it('should be able to add a click event to an HTML element', () => {
    eventListener.on(selectedElement, 'click', methods.showLove);

    const eClick = createNewClickEvent();
    selectedElement.dispatchEvent(eClick);

    expect(methods.showLove).toHaveBeenCalled();
  });

  it('should be able to add the same event+callback two times to an HTML element', () => {
    eventListener.on(selectedElement, 'click', methods.showLove);
    eventListener.on(selectedElement, 'click', methods.showLove);

    const eClick = createNewClickEvent();
    selectedElement.dispatchEvent(eClick);

    expect(methods.showLove.calls.count()).toEqual(2);
  });

  it('should be able to add the same callback for two different events to an HTML element', () => {
    eventListener.on(selectedElement, 'click', methods.showLove);
    eventListener.on(selectedElement, 'hover', methods.showLove);

    const eClick = createNewClickEvent();
    selectedElement.dispatchEvent(eClick);

    const eHover = new Event('hover');
    selectedElement.dispatchEvent(eHover);

    expect(methods.showLove.calls.count()).toEqual(2);
  });

  it('should be able to add two different callbacks for same event to an HTML element', () => {
    eventListener.on(selectedElement, 'click', methods.showLove);
    eventListener.on(selectedElement, 'click', methods.giveLove);

    const eClick = createNewClickEvent();
    selectedElement.dispatchEvent(eClick);

    expect(methods.showLove.calls.count()).toEqual(1);
    expect(methods.giveLove.calls.count()).toEqual(1);
  });

  it('should be able to remove one event handler of an HTML element', () => {
    $selectedElement.off();

    eventListener.on(selectedElement, 'click', methods.showLove);
    eventListener.on(selectedElement, 'click', methods.giveLove);
    eventListener.off(selectedElement, 'click', methods.showLove);

    const eClick = createNewClickEvent();
    selectedElement.dispatchEvent(eClick);

    expect(methods.showLove.calls.count()).toEqual(0);
    expect(methods.giveLove.calls.count()).toEqual(1);
  });

  it('should be able to remove all click events of a HTML element', () => {
    $selectedElement.off();

    eventListener.on(selectedElement, 'click', methods.showLove);
    eventListener.on(selectedElement, 'click', methods.giveLove);
    eventListener.on(selectedElement, 'hover', methods.showLove);

    eventListener.off(selectedElement, 'click');

    const eClick = createNewClickEvent();
    selectedElement.dispatchEvent(eClick);

    const eHover = new Event('hover');
    selectedElement.dispatchEvent(eHover);

    expect(methods.showLove.calls.count()).toEqual(1);
    expect(methods.giveLove).not.toHaveBeenCalled();
  });

  it('should be able to remove all events of a HTML element', () => {
    $selectedElement.off();

    eventListener.on(selectedElement, 'click', methods.showLove);
    eventListener.on(selectedElement, 'click', methods.giveLove);
    eventListener.on(selectedElement, 'hover', methods.showLove);

    eventListener.off(selectedElement);

    const eClick = createNewClickEvent();
    selectedElement.dispatchEvent(eClick);

    const eHover = new Event('hover');
    selectedElement.dispatchEvent(eHover);

    expect(methods.showLove).not.toHaveBeenCalled();
    expect(methods.giveLove).not.toHaveBeenCalled();
  });

  it('should trigger a click event on a HTML element', () => {
    $selectedElement.off();
    $selectedElement.on('click', methods.showLove);

    eventListener.trigger(selectedElement, 'click');

    expect(methods.showLove.calls.count()).toBe(1);
  });

  it('should delegate an event to elements with a given css class name', () => {
    eventListener.delegate(selectedElement, 'title', 'click', methods.showLove);
    const titleEl = document.querySelector('h1.title');

    const eClick = createNewClickEvent();
    titleEl.dispatchEvent(eClick);

    expect(methods.showLove.calls.count()).toEqual(1);
  });

  it('should not delegate an event to elements without a given css class name', () => {
    eventListener.delegate(selectedElement, 'title', 'click', methods.showLove);
    const titleEl = document.querySelector('h1.title');
    const subtitleEl = document.querySelector('.subtitle');

    const eClickTitle = createNewClickEvent();
    const eClickSubtitle = createNewClickEvent();
    titleEl.dispatchEvent(eClickTitle);
    subtitleEl.dispatchEvent(eClickSubtitle);

    expect(methods.showLove.calls.count()).toEqual(1);
  });

  it('should delegate an event to elements that are added to the DOM to after delegate call', () => {
    eventListener.delegate(
      selectedElement,
      'new-element-class',
      'click',
      methods.showLove
    );

    const newElement = document.createElement('div');
    newElement.className = 'new-element-class';
    $selectedElement.append(newElement);

    const eClick = createNewClickEvent();
    newElement.dispatchEvent(eClick);

    expect(methods.showLove.calls.count()).toEqual(1);
  });

  it('should trigger delegated event handler when clicked on an element inside a targeted element', () => {
    eventListener.delegate(selectedElement, 'title', 'click', methods.showLove);

    const newElement = document.createElement('div');
    newElement.className = 'new-element-class';
    $selectedElement.append(newElement);

    $('h1.title').append(newElement);

    const eClick = createNewClickEvent();
    newElement.dispatchEvent(eClick);

    expect(methods.showLove.calls.count()).toEqual(1);
  });

  it('should not trigger delegated event handler if clicked on container of delegator', () => {
    const $targetElement = $('<p class="target"></p>');
    $selectedElement.append($targetElement);

    eventListener.delegate(
      selectedElement,
      'target',
      'click',
      methods.showLove
    );

    const eClick = createNewClickEvent();
    selectedElement.dispatchEvent(eClick);

    expect(methods.showLove.calls.count()).toEqual(0);
  });

  it('should trigger delegated event handler multiple times if event happens on multiple elements', () => {
    eventListener.delegate(
      selectedElement,
      'subtitle',
      'click',
      methods.showLove
    );
    const subtitleEls = document.querySelectorAll('.subtitle');
    subtitleEls.forEach((e) => e.dispatchEvent(createNewClickEvent()));

    expect(methods.showLove.calls.count()).toEqual(2);
  });

  it('should not trigger method registered on element A when event id triggered on element B', () => {
    const elementA = document.createElement('div');
    const elementB = document.createElement('div');
    $selectedElement.append(elementA);
    $selectedElement.append(elementB);

    eventListener.on(elementA, 'click', methods.showLove);
    eventListener.on(elementB, 'click', methods.giveLove);

    const eClick = createNewClickEvent();
    elementA.dispatchEvent(eClick);

    expect(methods.showLove).toHaveBeenCalled();
    expect(methods.giveLove).not.toHaveBeenCalled();
  });
});
