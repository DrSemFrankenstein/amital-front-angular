// user-form.component.ts
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '../user.service';
import { MyApiService } from '../my-api.service';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup = new FormGroup({});
  Users: any[] = [];
  myControl = new FormControl();
  filteredOptions: Observable<string[]> | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private myApiService: MyApiService
  ) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      subject: ['', Validators.required],
      userId: [null, Validators.required],
      targetDate: ['', Validators.required],
      isCompleted: [false],
    });

    this.myControl.valueChanges.subscribe((selectedUser) => {
      const matchingUser = this.Users.find(
        (user) => user.name === selectedUser
      );
      if (matchingUser) {
        this.userForm.get('userId')?.setValue(matchingUser.id);
      }
    });

    this.fetchUsers();
  }

  isNullOrUndefined(value: any): boolean {
    return value === null || value === undefined;
  }

  saveUserData() {
    const formData = this.userForm.value;
    this.myApiService.create('/api/Tasks/AddTask', formData).subscribe(
      (response) => {
        this.userService.notifyUserAdded();
        this.resetForm();
      },
      (error) => {
        alert(
          'An error occurred while saving user data: ' + error.error.errors
        );
      }
    );
  }

  resetForm() {
    this.userForm.reset();
    this.userForm.markAsPristine();
    this.userForm.markAsUntouched();
    this.myControl.reset();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    if (filterValue === '') {
      return this.Users.map((user) => user?.name);
    }

    return this.Users.filter((option) =>
      option?.name.toLowerCase().includes(filterValue)
    ).map((option) => option?.name);
  }

  fetchUsers() {
    this.myApiService.get('/api/Tasks/GetUsers').subscribe((users) => {
      this.Users = users;
      this.userService.setUsers(users);
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value || ''))
      );
    });
  }
}
