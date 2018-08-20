import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Task } from './task';

@Injectable({
  providedIn: 'root'
})

export class TodoListService {

  constructor(private http: HttpClient) { }

  public list(): Observable<Task[]> {
    return this.http.get<Task[]>('tasks');
  }

  public add(task: Task): Observable<Task> {
    return this.http.post<Task>('tasks', task);
  }

  public get(id: number) {
    return this.http.get('tasks/' + id);
  }

  public update(task: Task): Observable<Task> {
    return this.http.put<Task>('tasks/' + task.id, task);
  }

  public delete(id: number): Observable<{}> {
    return this.http.delete('tasks/' + id);
  }

  public clearAll(): Observable<{}> {
    return this.http.delete('tasks/clear');
  }
}
