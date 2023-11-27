import { Component, OnInit } from '@angular/core';
import { MyApiService } from '../my-api.service';
import { UserService } from '../user.service';

interface UserTaskCount {
  userId: number;
  userName: string;
  taskCount: number;
}

@Component({
  selector: 'app-user-task-count',
  templateUrl: './user-task-count.component.html',
  styleUrls: ['./user-task-count.component.css']
})
export class UserTaskCountComponent implements OnInit {
  userTaskCounts: UserTaskCount[] = [];

  constructor(
    private myApiService: MyApiService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.fetchTaskCounts();
    this.userService.userAdded$.subscribe(() => {
      this.fetchTaskCounts();
    });
  }

  fetchTaskCounts() {
    this.myApiService.get('/api/Tasks/GetTasks').subscribe((tasks) => {
      const users = this.userService.getUsers();
      const userTaskCounts = this.calculateUserTaskCounts(users, tasks);
      this.userTaskCounts = userTaskCounts;
    });
  }

  calculateUserTaskCounts(users: any[], tasks: any[]): UserTaskCount[] {
    const userTaskCounts: UserTaskCount[] = [];

    users.forEach((user) => {
      const tasksForUser = tasks.filter((task) => task.userId === user.id);
      const taskCount = tasksForUser.length;
      userTaskCounts.push({
        userId: user.id,
        userName: user.name,
        taskCount: taskCount
      });
    });

    return userTaskCounts;
  }
}
