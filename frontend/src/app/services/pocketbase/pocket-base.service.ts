import { Injectable, NgZone } from '@angular/core';
import PocketBase from 'pocketbase';
import { BehaviorSubject, Observable, from, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PocketBaseService {

  private apiUrl = 'http://127.0.0.1:8090';
  pb: PocketBase;

  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this._isLoggedIn.asObservable();

  private _currentUser = new BehaviorSubject<any>(null);
  currentUser$: Observable<any> = this._currentUser.asObservable();

  constructor(private ngZone: NgZone) {
    this.pb = new PocketBase(this.apiUrl);

    this.checkAuth();

    this.pb.authStore.onChange(() => {
      this.ngZone.run(() => {
        this.checkAuth();
      });
    }, true);
  }

  private checkAuth() {
    const isLoggedIn = this.pb.authStore.isValid;
    this._isLoggedIn.next(isLoggedIn);
    this._currentUser.next(this.pb.authStore.model);
  }

  register(username: string, password: string, passwordConfirm: string): Observable<any> {
    const data = {
      username,
      password,
      passwordConfirm,
    };
    return from(this.pb.collection('users').create(data)).pipe(
      catchError(error => {
        console.error('PocketBase signUp error:', error);
        return throwError(() => error);
      })
    );
  }

  signIn(username: string, password: string): Observable<any> {
    return from(this.pb.collection('users').authWithPassword(username, password)).pipe(
      catchError(error => {
        console.error('PocketBase signIn error:', error);
        return throwError(() => error);
      })
    );
  }

  signOut(): void {
    this.pb.authStore.clear();
  }


  getCollection(collectionName: string, queryParams?: any): Observable<any[]> {
    return from(this.pb.collection(collectionName).getFullList(queryParams)).pipe(
      catchError(error => {
        console.error(`PocketBase getCollection (${collectionName}) error:`, error);
        return throwError(() => error);
      })
    );
  }

  getRecord(collectionName: string, id: string, queryParams?: any): Observable<any> {
    return from(this.pb.collection(collectionName).getOne(id, queryParams)).pipe(
      catchError(error => {
        console.error(`PocketBase getRecord (${collectionName}, ${id}) error:`, error);
        return throwError(() => error);
      })
    );
  }

  createRecord(collectionName: string, data: any): Observable<any> {
    return from(this.pb.collection(collectionName).create(data)).pipe(
      catchError(error => {
        console.error(`PocketBase createRecord (${collectionName}) error:`, error);
        return throwError(() => error);
      })
    );
  }

  updateRecord(collectionName: string, id: string, data: any): Observable<any> {
    return from(this.pb.collection(collectionName).update(id, data)).pipe(
      catchError(error => {
        console.error(`PocketBase updateRecord (${collectionName}, ${id}) error:`, error);
        return throwError(() => error);
      })
    );
  }

  deleteRecord(collectionName: string, id: string): void {
    from(this.pb.collection(collectionName).delete(id)).pipe(
      catchError(error => {
        console.error(`PocketBase deleteRecord (${collectionName}, ${id}) error:`, error);
        return throwError(() => error);
      })
    );
  }
}
