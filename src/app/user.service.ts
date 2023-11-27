import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSource = new BehaviorSubject<string[]>([]);
  currentUsers = this.usersSource.asObservable();
  
  private userAddedSubject = new Subject<void>();

  userAdded$ = this.userAddedSubject.asObservable();

  private users: any[] = []; // New property to store the Users array

  constructor() {}

  addUser(user: string) {
    const currentValue = this.usersSource.value;
    const updatedValue = [...currentValue, user];
    this.usersSource.next(updatedValue);
  }
  
  notifyUserAdded() {
    this.userAddedSubject.next();
  }

  // New method to set the Users array
  setUsers(users: any[]) {
    this.users = users;
  }

  // New method to get the Users array
  getUsers() {
    return this.users;
  }
}
