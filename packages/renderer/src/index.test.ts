import { describe, expect, it } from 'vitest';
import { createCard } from '@card-forge/core';
import { fabClassicTemplate, renderCardSvg } from './index';
describe('SVG renderer',()=>{it('binds card data through template layers',()=>{const svg=renderCardSvg({...createCard('fab','fab-classic'),name:'Arc Lightning',cost:1},fabClassicTemplate);expect(svg).toContain('<svg');expect(svg).toContain('Arc Lightning');expect(svg).toContain('Cost: 1')})});
