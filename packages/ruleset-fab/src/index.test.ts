import { describe, expect, it } from 'vitest';
import { createCard } from '@card-forge/core';
import { fabRuleset } from './index';

describe('FAB ruleset', () => {
  it('exposes attack fields without applying hero fields', () => {
    const keys = fabRuleset.getFields('Attack Action').map(field => field.key);
    expect(keys).toContain('power');
    expect(keys).toContain('defense');
    expect(keys).not.toContain('life');
  });

  it('rejects unknown card types', () => {
    const card = createCard('fab', 'fab-classic', 'Unknown');
    expect(fabRuleset.validate(card)).toContainEqual(expect.objectContaining({ field: 'type', severity: 'error' }));
  });
});
