import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidatorsService } from 'src/app/services/validators.service';
import { environment } from 'src/enviroments/environment';

@Component({
  selector: 'app-add-unidad-venta',
  templateUrl: './add-unidad-venta.component.html',
  styleUrls: ['./add-unidad-venta.component.css']
})
export class AddUnidadVentaComponent {
//   nombre
// sigla
@Output()
sendToF = new EventEmitter<any>();
@Input() edit: any;

// @Output()
// messageToF = new EventEmitter<string>();
form: any = FormGroup;
loading = false;


loadedForm: any = false;

constructor(
  private router: Router,
  private formBuilder: FormBuilder,
  private toastrS: ToastrService,
  private validatorsS: ValidatorsService,
  private http: HttpClient
) {}

ngOnInit(): void {
  // this.getRecursos();
  this.formC();
}
formC() {
  {
    this.form = this.formBuilder.group({
      id: [this.edit?.id],
     
      nombre: [this.edit?.nombre, [Validators.required]],
      sigla: [this.edit?.sigla, [Validators.required]],
    
     
    });
  }
  this.loadedForm = true;
}
closeModal() {
  this.sendToF.emit({ action: 'closeModal' });
}

// getRecursos() {
//   this.http.get(`${environment.api_url}empresas`).subscribe(
//     (response: any) => {
//       let empresas = response.data;
//       let sortedStudents = empresas.sort((a:any,b:any) => (a.nombre.toLowerCase() < b.nombre.toLowerCase()) ? -1 : ((b.nombre.toLowerCase() > a.nombre.toLowerCase()) ? 1 : 0));
//       this.empresas = empresas;
//       this.loading = false;
//       this.formC();
//     },
//     (error) => {
//       console.log(error);
//     }
//   );
// }

store() {
  this.loading = true;
  this.form.markAllAsTouched();

  if (this.form.status == 'INVALID') {
    this.loading = false;
    return;
  }

  this.http.post(`${environment.api_url}unidades`, this.form.value).subscribe(
    (response: any) => {
      console.log("response post");
      console.log(response);

    
      let message = response.message;

      this.sendToF.emit({action:'msg-success',value: message });
      this.loading = false;
    },
    (error) => {
      console.log(error);
      this.loading = false;
      let detect_errors_server = this.validatorsS.detect_errors_server(
        error,
        this.form
      );
      if (detect_errors_server) {
        return;
      }
    }
  );
}

validate(name: string) {
  return this.validatorsS.sow_message(this.form, name);
}
}

