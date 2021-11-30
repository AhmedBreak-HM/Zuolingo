import { Observable } from 'rxjs';

export interface IRepository<T> {

    GetValueChanges(path?: string): Observable<T[]>;
    GetValueChangesDoc(path?: string): Observable<T>;
    GetSnapshotChanges(path?: string);
    GetById(path?: string, id?: string): Observable<T>;
    Add(path: string, entity?: T);
    AddWithId(path: string, docId: string, entity?: T);
    Update(path: string, id: string, entity?: T);
    Delete(path: string, id: string);

}
