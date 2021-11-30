import { Injectable } from '@angular/core';
import { IRepository } from './IRepository';
import { Observable } from 'rxjs';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseRepositoryService<T> implements IRepository<T> {

  constructor(public afs: AngularFirestore) { }
  GetValueChanges(path: string, queryFun?: QueryFn): Observable<T[]> {
    return this.afs.collection<T>(path).valueChanges();
  }
  GetValueChangesDoc(path: string): Observable<T> {
    return this.afs.doc<T>(path).valueChanges();
  }
  GetSnapshotChanges(path: string) {
    return this.afs.collection(path).snapshotChanges();
  }
  GetById(path: string, id: string): Observable<T> {
    return this.afs.doc<T>(path + '/' + id).valueChanges();
  }
  Add(path: string, entity: T) {
    return this.afs.collection(path).add(entity);
  }
  AddWithId(path: string, docId: string, entity: T) {
    return this.afs.collection(path).doc(docId).set({ ...entity });
  }
  AddDoc(path: string, id: string, entity: T) {
    return this.afs.doc(path + '/' + id).set(entity);
  }
  Update(path: string, id: string, entity: T) {
    return this.afs.doc(`${path}/${id}`).update(entity);
  }
  Delete(path: string, id: string) {
    return this.afs.doc(`${path}/${id}`).delete();
  }
}
