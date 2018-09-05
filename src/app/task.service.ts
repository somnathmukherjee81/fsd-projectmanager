import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Task } from './models/task';
import { TASKS } from './models/mock-tasks';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private useMock = false;
  private tasksUrl = 'http://localhost:9090/Tasks';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET tasks from the server */
  getTasks(): Observable<Task[]> {
    this.messageService.add('TaskService: fetched tasks');

    if (this.useMock) {
      return of(TASKS);
    } else {
      return this.http.get<Task[]>(this.tasksUrl)
        .pipe(
          tap(tasks => this.log(`fetched tasks`)),
          catchError(this.handleError('getTasks', []))
        );
    }
  }

  /** GET task by id. Will 404 if id not found */
  getTask(id: number): Observable<Task> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.get<Task>(url).pipe(
      tap(_ => this.log(`fetched task id=${id}`)),
      catchError(this.handleError<Task>(`getTask id=${id}`))
    );
  }

  /** Log a TaskService message with the MessageService */
  private log(message: string) {
    this.messageService.add('TaskService: ' + message);
  }

  /** PUT: update the task on the server */
  updateTask(task: Task): Observable<Task> {
    const url = `${this.tasksUrl}/${task.taskID}`;
    return this.http.put(url, task, httpOptions).pipe(
      tap((updatedTask: Task) => this.log(`updated task w/ id=${updatedTask.taskID}`)),
      catchError(this.handleError<any>('updateTask'))
    );
  }

  /** POST: add a new task to the server */
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.tasksUrl, task, httpOptions).pipe(
      tap((addedTask: Task) => this.log(`added task w/ id=${addedTask.taskID}`)),
      catchError(this.handleError<Task>('addTask'))
    );
  }

  /** DELETE: delete the task from the server */
  deleteTask(task: Task | number): Observable<Task> {
    const id = typeof task === 'number' ? task : task.taskID;
    const url = `${this.tasksUrl}/${id}`;

    return this.http.delete<Task>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted task id=${id}`)),
      catchError(this.handleError<Task>('deleteTask'))
    );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
