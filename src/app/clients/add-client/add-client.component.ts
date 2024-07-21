import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef } from '@angular/material/dialog';
import { ClientsService } from '../clients.service';
import { Client, DocumentTypeList } from 'src/app/interfaces/clients.interface';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-add-client',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule
  ],
  providers: [ClientsService],
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

  form: any;

  documentTypeList!: DocumentTypeList[];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddClientComponent>,
    private _clientsServices: ClientsService)
  {
    this.form = this.fb.group({
      nameClient: ['', [Validators.required]],
      documentType: ['', [Validators.required]],
      documentNumber: ['', [Validators.required]],
      address: [''],
      email: ['', [Validators.email]],
      phone: ['', [Validators.required]],
      creationDate: ['']
    })
  }

  ngOnInit(): void {
    this.getAllDocumentTypes();
  }

  onCancel() {
    this.dialogRef.close(null);
  }

  getAllDocumentTypes() {
    this._clientsServices.getAllDocumentTypes().subscribe({
      next: (resp: any) => {
        this.documentTypeList = resp.data;
      },
      error: (error: any) => {
        console.log( error )
      }
    })
  }

  onAddClient() {

    const clientToAdd: Client = this.form.getRawValue();

    this._clientsServices.addClient(clientToAdd).subscribe({
      next: (resp: any) => {
        this.dialogRef.close(true);
      },
      error: (error: any) => {
        console.log( error )
      }
    })
  }
}
