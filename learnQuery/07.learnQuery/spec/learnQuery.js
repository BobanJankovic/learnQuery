/* global $, affix, learnQuery, describe, beforeEach, it, expect, spyOn, document */

describe('LearnQuery', () => {
  let $selectedElement;
  let selectedElement;
  let methods;

  beforeEach(() => {
    affix(
      '.learn-query-testing #toddler .hidden.toy+h1[class="title"]+span[class="subtitle"]+input[name="toyName"][value="cuddle bunny"]+input[class="creature"][value="unicorn"]+.hidden+.infinum[value="awesome cool"]'
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
    // eslint-disable-next-line no-unused-vars
    selectedElement = $selectedElement.get(0);
  });

  it('should allow cssClass method chaining', () => {
    learnQuery('#toddler').addClass('one').addClass('two').removeClass('one');

    expect($selectedElement.hasClass('one')).toBe(false);
    expect($selectedElement.hasClass('two')).toBe(true);
  });

  it('should allow dom method chaining', () => {
    const newElementH4 = document.createElement('h4');
    const newElementH2 = document.createElement('h2');
    const newElementSpan = document.createElement('span');

    learnQuery('#toddler')
      .before(newElementH4)
      .after(newElementH2)
      .append(newElementSpan);

    expect($selectedElement.next()[0]).toBe(newElementH2);
    expect($selectedElement.prev()[0]).toBe(newElementH4);
    expect($selectedElement.children().last()[0]).toBe(newElementSpan);
  });

  it('should allow eventListener method chaining', () => {
    learnQuery('#toddler')
      .on('click', methods.showLove)
      .on('click', methods.giveLove)
      .trigger('click');

    expect(methods.showLove.calls.count()).toBe(1);
    expect(methods.giveLove.calls.count()).toBe(1);
  });

  it('should allow multiple methods chaining', () => {
    const newElementH4 = document.createElement('h4');

    learnQuery('#toddler')
      .before(newElementH4)
      .addClass('blury')
      .on('hover', methods.showLove)
      .trigger('hover');

    expect($selectedElement.prev()[0]).toBe(newElementH4);
    expect($selectedElement.hasClass('blury')).toBe(true);
    expect(methods.showLove).toHaveBeenCalled();
  });
});
