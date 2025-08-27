export interface administrations {
  Id:number,
  Name:string,
  Code:number,
  Description:string,
  pdfNames:string
}

export interface GetExcelNameForEntity{
    Id: number,
    Name: number,
    Description: string,
    Code: number,
    TableName: string,
    SearchByNameColumn: string,
    TableHeaders:string
}

export interface fileAdministration{
  EntityName: string;
  UploadExcel: string[];
}

export interface uploadfiles{
  entityId: number;
  fromDate: string;
  toDate: string;
  Content_Type: any;
}
