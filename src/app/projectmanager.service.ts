import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Task } from './models/task';
import { Project } from './models/project';
import { User } from './models/user';
import { TASKS } from './models/mock-tasks';
import { PROJECTS } from './models/mock-projects';
import { USERS } from './models/mock-users';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectManagerService {
  private useMock = false;
  private tasksUrl = 'http://localhost:9090/Tasks';
  private projectsUrl = 'http://localhost:9090/Projects';
  private usersUrl = 'http://localhost:9090/Users';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /* ============================== Begin Region - Tasks =========================*/

  /** GET tasks from the server */
  getTasks(): Observable<Task[]> {
    this.messageService.add('ProjectManagerService: fetched tasks');

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

  /** PUT: update the task on the server */
  updateTask(task: Task): Observable<Task> {
    const url = `${this.tasksUrl}/${task.taskId}`;
    return this.http.put(url, task, httpOptions).pipe(
      tap((updatedTask: Task) => this.log(`updated task w/ id=${updatedTask.taskId}`)),
      catchError(this.handleError<any>('updateTask'))
    );
  }

  /** POST: add a new task to the server */
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.tasksUrl, task, httpOptions).pipe(
      tap((addedTask: Task) => this.log(`added task w/ id=${addedTask.taskId}`)),
      catchError(this.handleError<Task>('addTask'))
    );
  }

  /** DELETE: delete the task from the server */
  deleteTask(task: Task | number): Observable<Task> {
    const id = typeof task === 'number' ? task : task.taskId;
    const url = `${this.tasksUrl}/${id}`;

    return this.http.delete<Task>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted task id=${id}`)),
      catchError(this.handleError<Task>('deleteTask'))
    );
  }

  /* ============================== End Region - Tasks =========================*/

  /* ============================== Begin Region - Projects =========================*/

  /** GET projects from the server */
  getProjects(): Observable<Project[]> {
    this.messageService.add('ProjectManagerService: fetched projects');

    if (this.useMock) {
      return of(PROJECTS);
    } else {
      return this.http.get<Project[]>(this.projectsUrl)
        .pipe(
          tap(projects => this.log(`fetched projects`)),
          catchError(this.handleError('getProjects', []))
        );
    }
  }

  /** GET project by id. Will 404 if id not found */
  getProject(id: number): Observable<Project> {
    const url = `${this.projectsUrl}/${id}`;
    return this.http.get<Project>(url).pipe(
      tap(_ => this.log(`fetched project id=${id}`)),
      catchError(this.handleError<Project>(`getProject id=${id}`))
    );
  }

  /** PUT: update the project on the server */
  updateProject(project: Project): Observable<Project> {
    const url = `${this.projectsUrl}/${project.projectId}`;
    return this.http.put(url, project, httpOptions).pipe(
      tap((updatedProject: Project) => this.log(`updated project w/ id=${updatedProject.projectId}`)),
      catchError(this.handleError<any>('updateProject'))
    );
  }

  /** POST: add a new project to the server */
  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.projectsUrl, project, httpOptions).pipe(
      tap((addedProject: Project) => this.log(`added project w/ id=${addedProject.projectId}`)),
      catchError(this.handleError<Project>('addProject'))
    );
  }

  /** DELETE: delete the project from the server */
  deleteProject(project: Project | number): Observable<Project> {
    const id = typeof project === 'number' ? project : project.projectId;
    const url = `${this.projectsUrl}/${id}`;

    return this.http.delete<Project>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted project id=${id}`)),
      catchError(this.handleError<Project>('deleteProject'))
    );
  }

  /* ============================== End Region - Projects =========================*/

  /* ============================== Begin Region - Users =========================*/

  /** GET users from the server */
  getUsers(): Observable<User[]> {
    this.messageService.add('ProjectManagerService: fetched users');

    if (this.useMock) {
      return of(USERS);
    } else {
      return this.http.get<User[]>(this.usersUrl)
        .pipe(
          tap(users => this.log(`fetched users`)),
          catchError(this.handleError('getUsers', []))
        );
    }
  }

  /** GET user by id. Will 404 if id not found */
  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  /** PUT: update the user on the server */
  updateUser(user: User): Observable<User> {
    const url = `${this.usersUrl}/${user.userId}`;
    return this.http.put(url, user, httpOptions).pipe(
      tap((updatedUser: User) => this.log(`updated user w/ id=${updatedUser.userId}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  /** POST: add a new user to the server */
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, httpOptions).pipe(
      tap((addedUser: User) => this.log(`added user w/ id=${addedUser.userId}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }

  /** DELETE: delete the user from the server */
  deleteUser(user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.userId;
    const url = `${this.usersUrl}/${id}`;

    return this.http.delete<User>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted user id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  /* ============================== End Region - Users =========================*/

  /** Log a ProjectManagerService message with the MessageService */
  private log(message: string) {
    this.messageService.add('ProjectManagerService: ' + message);
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
