import { Component, ElementRef, Input, OnInit } from '@angular/core';

import { TodoListService } from './todo-list.service';

import { Task } from './task';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: [ './todo-list.component.styl' ]
})

export class TodoListComponent implements OnInit {

  editTaskId: number;

  @Input()
  tasks: Task[] = [];

  constructor(
    private todoListService: TodoListService
  ) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.todoListService.list()
      .subscribe(response => this.tasks = response);
  }

  addTask() {
    this.todoListService.add({
      name: 'New task'
    }).subscribe(response => {
      this.tasks.push(response);
    });
  }

  updateTask(index: number) {
    this.editTaskId = null;
    if (this.tasks[index]) {
      this.todoListService.update(this.tasks[index]).subscribe();
    }
  }

  deleteTask(id: number) {
    this.todoListService.delete(id)
      .subscribe(response => this.tasks = this.tasks
        .filter(task => task.id !== id)
      );
  }

  clearAllTasks() {
    this.todoListService.clearAll()
      .subscribe(response => this.tasks = []);
  }

  toggleCell(id: number, event: MouseEvent) {
    this.editTaskId = id;
    const target: HTMLElement = event.target as HTMLElement;
    const input = target.parentElement.querySelector('input') as HTMLInputElement;
    setTimeout(() => input.focus());
  }
}
