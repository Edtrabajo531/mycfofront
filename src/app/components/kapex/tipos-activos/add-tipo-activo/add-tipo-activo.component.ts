import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidatorsService } from 'src/app/services/validators.service';
import { environment } from 'src/enviroments/environment';

@Component({
  selector: 'app-add-tipo-activo',
  templateUrl: './add-tipo-activo.component.html',
  styleUrls: ['./add-tipo-activo.component.css'],
})
export class AddTipoActivoComponent {
  @Output()
  sendToF = new EventEmitter<any>();
  @Input() edit: any;
  url = `${environment.api_url}tipoactivos`;

  form: any = FormGroup;
  loading = false;
  // empresas: any = [];
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
        tipo: [this.edit?.tipo, [Validators.required]],
        annos: [this.edit?.annos, [Validators.required,this.validatorsS.integer]],
        categoria: [this.edit?.categoria, [Validators.required]],

        
        
      });
    }
    this.loadedForm = true;
  }
  closeModal() {
    this.sendToF.emit({ action: 'closeModal' });
  }

  // getRecursos() {
  //   this.http.get(`${environment.api_url}plans-recursos`).subscribe(
  //     (response: any) => {
  //       this.empresas = response.empresas;
  //       this.unidades = response.unidades;
  //       console.log(response);

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

    this.http.post(this.url, this.form.value).subscribe(
      (response: any) => {
        console.log('response post');
        console.log(response);

        let message = response.message;

        this.sendToF.emit({ action: 'msg-success', value: message });
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
