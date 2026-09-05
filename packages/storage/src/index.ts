import type { Card, StorageAdapter } from '@card-forge/core';
export class IndexedDBStorageAdapter implements StorageAdapter {
  constructor(private readonly dbName='card-forge') {}
  private open():Promise<IDBDatabase> { return new Promise((resolve,reject)=>{const request=indexedDB.open(this.dbName,1);request.onupgradeneeded=()=>request.result.createObjectStore('cards',{keyPath:'id'});request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);}); }
  private async request<T>(mode:IDBTransactionMode, action:(store:IDBObjectStore)=>IDBRequest<T>):Promise<T> { const db=await this.open(); return new Promise((resolve,reject)=>{const request=action(db.transaction('cards',mode).objectStore('cards'));request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);}); }
  async listCards(){return (await this.request('readonly',s=>s.getAll())).sort((a:Card,b:Card)=>b.metadata.updatedAt.localeCompare(a.metadata.updatedAt));} async loadCard(id:string){return (await this.request('readonly',s=>s.get(id)))??null;} async saveCard(card:Card){await this.request('readwrite',s=>s.put(card));} async deleteCard(id:string){await this.request('readwrite',s=>s.delete(id));}
}
