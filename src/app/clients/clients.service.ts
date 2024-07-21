import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client, DocumentTypeList } from '../interfaces/clients.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}


  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.baseUrl}clients`);
  }

  getAllDocumentTypes(): Observable<DocumentTypeList[]> {
    return this.http.get<DocumentTypeList[]>(`${this.baseUrl}type-document/get-all-types-documents`);
  }

  addClient(client: Client): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}clients/create-client`, client);
  }

  editClient(idClient: number, client: Client): Observable<Client[]> {
    return this.http.put<Client[]>(`${this.baseUrl}clients/edit-client/${ idClient }`, client);
  }

  deleteClient(idClient: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}clients/${ idClient }`);
  }
}
