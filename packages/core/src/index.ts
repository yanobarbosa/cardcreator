/** Framework-, browser- and ruleset-independent domain contracts. */
export type CardStatus = 'draft' | 'testing' | 'approved' | 'deprecated';
export type CardSource = 'official-reference' | 'custom';
export interface CardMetadata { status: CardStatus; source: CardSource; createdAt: string; updatedAt: string; tags: string[]; notes?: string }
export interface ArtworkConfig { source?: string; positionX: number; positionY: number; scale: number; rotation: number; cropMode: 'cover' | 'contain' | 'manual'; alt?: string }
export type FieldKey = keyof Pick<Card, 'name' | 'type' | 'subtypes' | 'supertypes' | 'classes' | 'talents' | 'pitch' | 'cost' | 'power' | 'defense' | 'life' | 'intellect' | 'rulesText' | 'rarity' | 'setId' | 'collectorNumber' | 'artist'>;
export interface Card { id:string; rulesetId:string; name:string; type:string; subtypes:string[]; supertypes:string[]; classes:string[]; talents:string[]; pitch?:number; cost?:number; power?:number; defense?:number; life?:number; intellect?:number; rulesText:string; rarity?:string; setId?:string; collectorNumber?:string; artist?:string; artwork?:ArtworkConfig; templateId:string; metadata:CardMetadata }
export interface FieldDefinition { key:FieldKey; label:string; kind:'text'|'number'|'textarea'|'tags'; required?:boolean }
export interface CardTypeDefinition { id:string; label:string; fields:FieldKey[] }
export interface ValidationResult { severity:'info'|'warning'|'error'; code:string; message:string; field?:FieldKey|'templateId'|'type' }
export interface Ruleset { id:string; name:string; cardTypes:CardTypeDefinition[]; fields:FieldDefinition[]; getFields(cardType:string):FieldDefinition[]; validate(card:Card):ValidationResult[] }
export type TemplateLayerType = 'image'|'artwork'|'text'|'shape'|'stat';
export interface TemplateLayer { id:string; type:TemplateLayerType; binding?:'name'|'typeLine'|'stats'|'rulesText'|'footer'; x:number; y:number; width:number; height:number; zIndex:number; visible:boolean; condition?:string; style?:Record<string,string|number> }
export interface CardTemplate { id:string; name:string; rulesetId?:string; width:number; height:number; background:string; layers:TemplateLayer[] }
export interface StorageAdapter { saveCard(card:Card):Promise<void>; loadCard(id:string):Promise<Card|null>; listCards():Promise<Card[]>; deleteCard(id:string):Promise<void> }
export const createCard = (rulesetId:string, templateId:string, type='Action'):Card => { const now=new Date().toISOString(); return { id:crypto.randomUUID(), rulesetId, templateId, type, name:'Untitled Card', subtypes:[], supertypes:[], classes:[], talents:[], rulesText:'', metadata:{status:'draft',source:'custom',tags:[],createdAt:now,updatedAt:now} }; };
export const validateTemplate = (card:Card, templates:readonly CardTemplate[]):ValidationResult[] => templates.some(t=>t.id===card.templateId) ? [] : [{severity:'error',code:'template-not-found',field:'templateId',message:'The selected template does not exist.'}];
