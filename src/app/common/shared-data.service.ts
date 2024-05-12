import { Injectable, inject } from '@angular/core';
import { Auth, authState } from "@angular/fire/auth";
import { doc, docData, DocumentReference, Firestore, getDoc, setDoc, updateDoc, collection, addDoc, deleteDoc, collectionData, Timestamp, FieldValue, query } from  "@angular/fire/firestore";
import { Router } from "@angular/router";
import { limit, orderBy } from "firebase/firestore";
import { Observable, filter, map, timestamp } from "rxjs";

export interface MyComment {
  userId: string;
  email: string;
  displayname: string;
  comment: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  static userId: string = "";
  static displayName: string = "";
  static email: string = "";
  firestore: Firestore = inject(Firestore);
  auth: Auth = inject(Auth);
  user$ = authState(this.auth).pipe(filter(user  =>  user !== null), map(user  =>  user!));
  router: Router = inject(Router);

  get userId() { return SharedDataService.userId; }
  get displayName() { return SharedDataService.displayName; }
  get email() { return SharedDataService.email; }

  async addComment(path: string, data: MyComment) {
    await addDoc(collection(this.firestore, path), data);
  }

  async  updateRating(path: string, fieldPath: string, value: number) {
    await updateDoc(doc(this.firestore, path), fieldPath, value);
  }

  getDocData(path: string) {
    return  docData(doc(this.firestore, path)) as  Observable<{}>
  }

  getCollectionData(path: string) {
    return  collectionData(collection(this.firestore, path)) as  Observable<{}[]>
  }

  getComments(path: string) {
    const recentMessagesQuery =  query(collection(this.firestore, path), orderBy("timestamp","desc"), limit(10));
    return  collectionData(recentMessagesQuery) as  Observable<{}[]>
  }
}
