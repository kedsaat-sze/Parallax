import { Injectable, inject } from '@angular/core';
import { Auth, authState } from "@angular/fire/auth";
import { doc, docData, Firestore, updateDoc, collection, addDoc, collectionData, query, deleteDoc } from  "@angular/fire/firestore";
import { Storage, deleteObject, ref } from '@angular/fire/storage';
import { Router } from "@angular/router";
import { limit, orderBy } from "firebase/firestore";
import { Observable, filter, map } from "rxjs";

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
  private readonly storage: Storage = inject(Storage);

  get userId() { return SharedDataService.userId; }
  get displayName() { return SharedDataService.displayName; }
  get email() { return SharedDataService.email; }

  async addComment(path: string, data: MyComment) {
    await addDoc(collection(this.firestore, path), data);
  }

  async addRating(path: string, data: {userId: string, rating: number}) {
    await addDoc(collection(this.firestore, path), data);
  }

  async  updateRating(path: string, fieldPath: string, value: number) {
    await updateDoc(doc(this.firestore, path), fieldPath, value);
  }

  async deleteAnimationData(path: string, animationPath: string) {
    const  docRef = doc(this.firestore, path);
    const pathRef = ref(this.storage, animationPath);
    console.log(pathRef);
    await  deleteDoc(docRef);
    await deleteObject(pathRef);
  }

  getDocData(path: string) {
    return  docData(doc(this.firestore, path)) as  Observable<{}>
  }

  getCollectionData(path: string) {
    return  collectionData(collection(this.firestore, path), {idField: "id"}) as  Observable<{}[]>
  }

  getComments(path: string) {
    const recentMessagesQuery =  query(collection(this.firestore, path), orderBy("timestamp","desc"), limit(10));
    return  collectionData(recentMessagesQuery) as  Observable<{}[]>
  }
}
