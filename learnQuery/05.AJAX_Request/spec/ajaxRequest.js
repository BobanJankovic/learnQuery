/* global ajaxReq, jasmine, describe, beforeEach, it, expect, afterEach, spyOn */

describe('AjaxRequest', () => {
  beforeEach(() => {
    jasmine.Ajax.install();

    this.onSuccessSpy = jasmine.createSpy('success');
    this.onFailureSpy = jasmine.createSpy('failure');
    this.onCompleteSpy = jasmine.createSpy('complete');

    jasmine.Ajax.stubRequest('/flownform/index').andReturn({
      status: 200,
      responseText: '{ "response": "incredible cool things" }',
    });

    jasmine.Ajax.stubRequest('/flownform/not-found').andReturn({
      status: 404,
      responseText: 'page not found',
    });
  });

  afterEach(() => {
    jasmine.Ajax.uninstall();
  });

  it('should make a successful ajax request', () => {
    ajaxReq('/flownform/index', {
      success: this.onSuccessSpy,
      complete: this.onCompleteSpy,
      failure: this.onFailureSpy,
    });

    expect(this.onSuccessSpy).toHaveBeenCalled();
    expect(this.onFailureSpy).not.toHaveBeenCalled();
    expect(this.onCompleteSpy).toHaveBeenCalled();
  });

  it('should make POST ajax request', () => {
    ajaxReq('/flownform/index', {
      success: this.onSuccessSpy,
      complete: this.onCompleteSpy,
      failure: this.onFailureSpy,
      method: 'POST',
    });

    expect(jasmine.Ajax.requests.mostRecent().method).toBe('POST');
    expect(this.onSuccessSpy).toHaveBeenCalled();
    expect(this.onFailureSpy).not.toHaveBeenCalled();
    expect(this.onCompleteSpy).toHaveBeenCalled();
  });

  it('should call a custom function with proper context on failure', () => {
    const context = {
      secretUnicorn: 'Glumpsy',
    };

    const onFailure = (xhr, status, responseText) => {
      expect(status).toBe(404);
      expect(responseText).toBe('page not found');
      expect(this).toBe(context);
      expect(this.secretUnicorn).toBe('Glumpsy');
    };

    const methods = {
      onFailure,
    };

    spyOn(methods, 'onFailure').and.callFake(onFailure);

    ajaxReq('/flownform/not-found', {
      context,
      success: this.onSuccessSpy,
      failure: methods.onFailure,
      complete: this.onCompleteSpy,
    });

    expect(methods.onFailure).toHaveBeenCalled();
    expect(this.onCompleteSpy).toHaveBeenCalled();
    expect(this.onSuccessSpy).not.toHaveBeenCalled();
  });

  it('should call a custom function with proper context on success', () => {
    const context = {
      secretUnicorn: 'Glumpsy',
    };

    // eslint-disable-next-line no-unused-vars
    const onSuccess = (data, status, xhr) => {
      expect(status).toBe(200);
      expect(data.response).toBe('incredible cool things');
      expect(this).toBe(context);
      expect(this.secretUnicorn).toBe('Glumpsy');
    };

    const methods = {
      onSuccess,
    };

    spyOn(methods, 'onSuccess').and.callFake(onSuccess);

    ajaxReq('/flownform/index', {
      context,
      success: methods.onSuccess,
      failure: this.onFailureSpy,
      complete: this.onCompleteSpy,
    });

    expect(methods.onSuccess).toHaveBeenCalled();
    expect(this.onCompleteSpy).toHaveBeenCalled();
    expect(this.onFailureSpy).not.toHaveBeenCalled();
  });

  it('should call a custom function with proper context when request is completed', () => {
    const context = {
      secretUnicorn: 'Glumpsy',
    };

    const onComplete = (xhr, status) => {
      expect(status).toBe(200);
      expect(this).toBe(context);
      expect(this.secretUnicorn).toBe('Glumpsy');
    };

    const methods = {
      onComplete,
    };

    spyOn(methods, 'onComplete').and.callFake(onComplete);

    ajaxReq('/flownform/index', {
      context,
      success: this.onSuccessSpy,
      failure: this.onFailureSpy,
      complete: methods.onComplete,
    });

    expect(methods.onComplete).toHaveBeenCalled();
    expect(this.onSuccessSpy).toHaveBeenCalled();
    expect(this.onFailureSpy).not.toHaveBeenCalled();
  });
});
