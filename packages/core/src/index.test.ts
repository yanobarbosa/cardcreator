import { describe, expect, it } from 'vitest';
import { createCard } from './index';

describe('createCard', () => {
  it('creates a framework-independent card with audit metadata', () => {
    const card = createCard('example-ruleset', 'example-template');
    expect(card.rulesetId).toBe('example-ruleset');
    expect(card.templateId).toBe('example-template');
    expect(card.id).toBeTruthy();
    expect(card.metadata.createdAt).toBeTruthy();
  });
});
