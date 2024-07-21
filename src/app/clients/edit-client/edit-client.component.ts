import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Client, DocumentTypeList } from 'src/app/interfaces/clients.interface';
import { ClientsService } from '../clients.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-client',
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
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit{

  form: any;
  clientData!: any;

  documentTypeList!: DocumentTypeList[];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditClientComponent>,
    private _clientsServices: ClientsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cdr: ChangeDetectorRef)
  {
    this.form = this.fb.group({
      nameClient: ['', [Validators.required]],
      documentType: [null, [Validators.required]],
      documentNumber: ['', [Validators.email]],
      address: [''],
      email: ['', [Validators.email]],
      phone: ['', [Validators.required]],
      creationDate: ['']
    })
  }

  ngOnInit(): void {
    this.clientData = this.data.client;
    this.updateForm(this.clientData);
    this.getAllDocumentTypes();
  }

  onCancel() {

    this.dialogRef.close(null);
  }

  updateForm(clientData: any) {
    this.form.get('nameClient').patchValue(clientData.name_client);
    this.form.get('documentType').setValue(null);
    this.form.get('documentType').patchValue(clientData.document_type);
    this.form.get('documentNumber').patchValue(clientData.document_number);
    this.form.get('address').patchValue(clientData.address);
    this.form.get('email').patchValue(clientData.email);
    this.form.get('phone').patchValue(clientData.phone);
    this.form.get('creationDate').patchValue(clientData.creationDate);
    this.cdr.detectChanges();
  }

  onEditClient() {

    const clientToEdit: Client = this.form.getRawValue();
    const idClient: number = this.data.idClient;

    this._clientsServices.editClient(idClient, clientToEdit).subscribe({
      next: (resp: any) => {
        if(resp) {
          this.dialogRef.close(true);
        }
      },
      error: (error: any) => {
        console.log( error )
      }
    })
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
}
