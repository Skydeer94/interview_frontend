import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator , MatPaginatorModule} from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { HttpClientModule } from "@angular/common/http";
import { MatSort } from "@angular/material/sort";
import { ClientsService } from "../clients.service";
import { AddClientComponent } from "../add-client/add-client.component";
import { DeleteClientComponent } from "../delete-client/delete-client.component";
import { EditClientComponent } from "../edit-client/edit-client.component";
import { Client, DocumentTypeList } from "src/app/interfaces/clients.interface";

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [ClientsService],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})

export class ClientsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nameClient', 'documentType', 'documentNumber', 'address', 'phone', 'email', 'creationDate', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  documentTypeList!: DocumentTypeList[];

  constructor(
    public dialog: MatDialog,
    private _clientsService: ClientsService
  ){

  }


  ngOnInit(): void {
      this.getAllClients();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllClients() {
    this._clientsService.getAllClients().subscribe({
      next: (result: any) => {
        this.dataSource.data = result.data;
      },
      error: (err: any) => {
        console.warn(err);
      }
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  onAddClient() {
    // Aqui se abrirá un dialogo para crear el cliente
    const dialogRef = this.dialog.open( AddClientComponent, {
      width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.getAllClients();
      }
    });
  }

  onDeleteClient(idClient: number) {
    // Aqui se abrirá un dialogo para eliminar el cliente
    const dialogRef = this.dialog.open( DeleteClientComponent, {
      width: '420px',
      height: '200px',
      disableClose: true,
      data: {
        idClient
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.getAllClients();
      }
    });
  }


  onEditClient(client: Client) {
    // Aqui se abrirá un dialogo para editar el cliente
    const dialogRef = this.dialog.open( EditClientComponent, {
      width: '500px',
      disableClose: true,
      data: {
        client,
        idClient: client.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.getAllClients();
      }
    });
  }
}
