export interface administrations {
  Code: number;
  Description: string;
}

export interface fileAdministration{
  EntityName: string;
  UploadExcel: string[];
}

export interface uploadfiles{
  entityId: string;
  fromDate: string;
  toDate: string;
  Content_Type: any;
}
