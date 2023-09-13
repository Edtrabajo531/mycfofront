import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComunicarEmpresaAnavbarService {
  private subjectName = new Subject<any>(); 

  sendUpdate(message: string) {
    this.subjectName.next({ text: message });
  }

  getUpdate(): Observable<any> {
    return this.subjectName.asObservable();
  }
}
