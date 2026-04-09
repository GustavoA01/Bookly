import '@testing-library/jest-dom';
window.HTMLElement.prototype.scrollIntoView = function () {};
global.fetch = jest.fn();
global.Request = class Request {};
global.Response = class Response {};
