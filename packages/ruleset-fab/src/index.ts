import type { Card, CardTypeDefinition, FieldDefinition, Ruleset, ValidationResult } from '@card-forge/core';

const types: CardTypeDefinition[] = [
  ['Hero', ['name','type','subtypes','classes','talents','life','intellect','rulesText','rarity']],
  ['Weapon', ['name','type','subtypes','classes','cost','power','rulesText','rarity']],
  ['Equipment', ['name','type','subtypes','classes','defense','rulesText','rarity']],
  ['Action', ['name','type','subtypes','classes','pitch','cost','rulesText','rarity']],
  ['Attack Action', ['name','type','subtypes','classes','pitch','cost','power','defense','rulesText','rarity']],
  ['Attack Reaction', ['name','type','classes','pitch','cost','rulesText','rarity']],
  ['Defense Reaction', ['name','type','classes','pitch','cost','defense','rulesText','rarity']],
  ['Instant', ['name','type','classes','pitch','cost','rulesText','rarity']],
  ['Token', ['name','type','subtypes','power','defense','rulesText']], ['Mentor', ['name','type','classes','rulesText']], ['Resource', ['name','type','pitch','rulesText']]
].map(([id, fields]) => ({ id: id as string, label: id as string, fields: fields as CardTypeDefinition['fields'] }));
const definitions: FieldDefinition[] = [
  ['name','Name','text',true], ['type','Type','text',true], ['subtypes','Subtype','tags'], ['supertypes','Supertype','tags'], ['classes','Class','tags'], ['talents','Talent','tags'], ['pitch','Pitch','number'], ['cost','Cost','number'], ['power','Power','number'], ['defense','Defense','number'], ['life','Life','number'], ['intellect','Intellect','number'], ['rulesText','Rules Text','textarea'], ['rarity','Rarity','text'], ['setId','Set','text'], ['collectorNumber','Collector #','text'], ['artist','Artist','text']
].map(([key,label,kind,required]) => ({ key: key as FieldDefinition['key'], label: label as string, kind: kind as FieldDefinition['kind'], required: required as boolean }));
export const fabRuleset: Ruleset = { id: 'fab', name: 'Flesh and Blood', cardTypes: types, fields: definitions,
  getFields: type => { const allowed = types.find(t => t.id === type)?.fields ?? []; return definitions.filter(f => allowed.includes(f.key)); },
  validate: (card: Card): ValidationResult[] => { const results: ValidationResult[] = []; const allowed = new Set(types.find(t => t.id === card.type)?.fields ?? []); if (!types.some(t => t.id === card.type)) results.push({ field: 'type', severity: 'error', code: 'unknown-type', message: 'Unsupported FAB card type.' }); if (!card.name.trim()) results.push({ field: 'name', severity: 'error', code: 'name-required', message: 'Name is required.' }); const warn = (field: 'life'|'intellect'|'power', message: string) => { if (card[field] === undefined) results.push({ field, severity: 'warning', code: `${card.type.toLowerCase().replaceAll(' ', '-')}-${field}-missing`, message }); }; if (card.type === 'Hero') { warn('life', 'Hero should have Life.'); warn('intellect', 'Hero should have Intellect.'); } if (card.type === 'Attack Action') warn('power', 'Attack Action should have Power.'); return results; }
};
