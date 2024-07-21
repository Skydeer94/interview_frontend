import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientsService } from '../clients.service';

@Component({
  selector: 'app-delete-client',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [ClientsService],
  templateUrl: './delete-client.component.html',
  styleUrls: ['./delete-client.component.scss']
})
export class DeleteClientComponent implements OnInit {
  idClient!: number;

  constructor(public dialogRef: MatDialogRef<DeleteClientComponent>,
              private _clientsServices: ClientsService,
              @Inject(MAT_DIALOG_DATA) public data: any )
  {

  }

  ngOnInit(): void {
    this.idClient = this.data.idClient;
  }

  onCancel() {
    this.dialogRef.close(null);
  }

  onDelete() {

    this._clientsServices.deleteClient(this.idClient).subscribe({
      next: (resp: any) => {
        this.dialogRef.close(true);
      },
      error: (error: any) => {
        console.log( error )
      }
    })
  }
}
