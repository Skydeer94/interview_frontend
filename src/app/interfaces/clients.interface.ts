export interface Client {
  id: number,
  nameClient: string,
  documentType: string,
  documentNumber: string,
  address: string,
  email: string,
  creationDate: Date
}

export interface DocumentTypeList {
  id: number,
  name: string,
  description: string,
}
