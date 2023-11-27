import { UserService } from '../user.service';
import { MyApiService } from './../my-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];

  constructor(
    private userService: UserService,
    private myApiService: MyApiService
  ) {}

  ngOnInit(): void {
    this.fetchTasks();
    this.userService.userAdded$.subscribe(() => {
      this.fetchTasks();
    });
  }

  fetchTasks() {
    this.myApiService.get('/api/Tasks/GetTasks').subscribe((tasks) => {
      this.tasks = tasks;
      this.replaceUserIdsWithNames();
    });
  }

  replaceUserIdsWithNames() {
    const users = this.userService.getUsers();

    this.tasks.forEach((task) => {
      const matchingUser = users.find((user) => user.id === task.userId);
      if (matchingUser) {
        task.userName = matchingUser.name; 
      }
    });
  }
}
