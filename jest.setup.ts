import '@testing-library/jest-dom';
import 'whatwg-fetch';

window.HTMLElement.prototype.scrollIntoView = jest.fn();
