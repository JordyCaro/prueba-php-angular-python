import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost/backend/api/';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getUsers(): Observable<{ users: User[] }> {
    return this.http.get<{ users: User[] }>(`${this.apiUrl}listar.php`);
  }

  addUser(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}agregar.php`, user, this.httpOptions);
  }

  updateUser(user: User): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}editar.php`, user, this.httpOptions);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}eliminar.php`, {
      headers: this.httpOptions.headers,
      body: { id: id }
    });
  }
}
