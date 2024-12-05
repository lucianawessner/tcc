import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Pipe({
  name: 'addFile',
  standalone: true
})
export class AddFileDownloadPipe implements PipeTransform {

  transform(fileName: string): string {
    console.log(fileName)
    return `${environment.apiUrl}/Documento/GetFile/${fileName}`
  }

}
