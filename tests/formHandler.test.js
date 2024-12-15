// src/client/__tests__/formHandler.test.js
import { handleSubmit } from '../js/formHandler';

// Ensure fetch is mocked
beforeAll(() => {
  global.fetch = require('jest-fetch-mock');
});

describe('handleSubmit', () => {
  beforeEach(() => {
    fetch.resetMocks(); // Reset mocks before each test
    document.body.innerHTML = `
      <form id="form">
        <input type="text" id="url" name="url" />
        <div id="results"></div>
      </form>
    `;
  });

  test('It should be defined', () => {
    expect(handleSubmit).toBeDefined();
  });

  test('It should call handleSubmit and update the results div', async () => {
    const mockResponse = {
      score_tag: 'P',
      subjectivity: 'subjective',
      sentence_list: [{ text: 'This is a mock response.' }]
    };

    fetch.mockResponseOnce(JSON.stringify(mockResponse));

    const form = document.getElementById('form');
    form.addEventListener('submit', handleSubmit);

    document.getElementById('url').value = 'http://example.com';
    form.dispatchEvent(new Event('submit'));

    await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for async operations to complete

    const results = document.getElementById('results').innerHTML;
    expect(results).toContain('Polarity: P');
    expect(results).toContain('Subjectivity: subjective');
    expect(results).toContain('Text: This is a mock response.');
  });

  test('It should handle errors and update the results div with an error message', async () => {
    fetch.mockReject(() => Promise.reject('API is down'));

    const form = document.getElementById('form');
    form.addEventListener('submit', handleSubmit);

    document.getElementById('url').value = 'http://example.com';
    form.dispatchEvent(new Event('submit'));

    await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for async operations to complete

    const results = document.getElementById('results').innerHTML;
    expect(results).toContain('An error occurred. Please try again.');
  });

  test('It should validate URL format and show error message for invalid URLs', async () => {
    const form = document.getElementById('form');
    form.addEventListener('submit', handleSubmit);

    document.getElementById('url').value = 'invalid-url';
    form.dispatchEvent(new Event('submit'));

    await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for async operations to complete

    const results = document.getElementById('results').innerHTML;
    expect(results).toContain('Invalid URL format.');
  });
});
