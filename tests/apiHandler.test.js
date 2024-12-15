// src/client/__tests__/apiHandler.test.js
import { analyzeArticle } from '../js/apiHandler';

// Ensure fetch is mocked
beforeAll(() => {
  global.fetch = require('jest-fetch-mock');
});

describe('analyzeArticle', () => {
  beforeEach(() => {
    fetch.resetMocks(); // Reset mocks before each test
  });

  test('It should be defined', () => {
    expect(analyzeArticle).toBeDefined();
  });

  test('It should fetch data from the correct URL and return data', async () => {
    const mockResponse = {
      score_tag: 'P',
      subjectivity: 'subjective',
      sentence_list: [{ text: 'This is a mock response.' }]
    };

    fetch.mockResponseOnce(JSON.stringify(mockResponse));

    const url = 'http://example.com';
    const result = await analyzeArticle(url);

    expect(fetch).toHaveBeenCalledWith('http://localhost:8081/analyze', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });
    expect(result).toEqual(mockResponse);
  });

  test('It should handle HTTP errors', async () => {
    fetch.mockReject(() => Promise.reject('API is down'));

    const url = 'http://example.com';
    const result = await analyzeArticle(url);

    expect(result).toBeUndefined();
  });

  test('It should handle invalid JSON responses', async () => {
    fetch.mockResponseOnce('invalid json');

    const url = 'http://example.com';
    const result = await analyzeArticle(url);

    expect(result).toBeUndefined();
  });
});
