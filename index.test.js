import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getRandomLink } from './index.js';

beforeEach(() => {
  vi.unstubAllGlobals();
});

describe('getRandomLink', () => {
  it('sends filter with select type for Status property', async () => {
    let capturedBody;

    vi.stubGlobal('fetch', async (url, options) => {
      capturedBody = JSON.parse(options.body);
      return {
        json: async () => ({
          results: [{
            properties: {
              Title: { title: [{ plain_text: 'Test Article' }] },
              URL: { url: 'https://example.com' }
            }
          }]
        })
      };
    });

    await getRandomLink();

    const filterConditions = capturedBody.filter.or;
    expect(filterConditions).toEqual([
      { property: 'Status', select: { equals: 'To Check' } },
      { property: 'Status', select: { equals: 'Reading' } }
    ]);
  });

  it('filters for To Check and Reading statuses only', async () => {
    let capturedBody;

    vi.stubGlobal('fetch', async (url, options) => {
      capturedBody = JSON.parse(options.body);
      return {
        json: async () => ({
          results: [{
            properties: {
              Title: { title: [{ plain_text: 'Test' }] },
              URL: { url: 'https://example.com' }
            }
          }]
        })
      };
    });

    await getRandomLink();

    const statuses = capturedBody.filter.or.map(f => f.select.equals);
    expect(statuses).toContain('To Check');
    expect(statuses).toContain('Reading');
    expect(statuses).toHaveLength(2);
  });

  it('throws when no results found', async () => {
    vi.stubGlobal('fetch', async () => ({
      json: async () => ({ results: [] })
    }));

    await expect(getRandomLink()).rejects.toThrow('No items found in database');
  });
});
