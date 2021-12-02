import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/User.model';
import { FirebaseRepositoryService } from '../Repository/FirebaseRepository.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly path: string = 'users';
  constructor(private afs: AngularFirestore, private userRepository: FirebaseRepositoryService<User>) { }

  addUser(id: string, user: User) {
    return this.userRepository.AddDoc(this.path, id, user);
  }
  getUserById(id: string) {
    return this.userRepository.GetById(this.path, id);
  }
  loadUsers() {
    return this.userRepository.GetValueChanges(this.path);
  }
}
