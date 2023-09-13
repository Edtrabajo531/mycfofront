import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidatorsService } from 'src/app/services/validators.service';
import { environment } from 'src/enviroments/environment';

@Component({
  selector: 'app-add-recurso-humano',
  templateUrl: './add-recurso-humano.component.html',
  styleUrls: ['./add-recurso-humano.component.css'],
})
export class AddRecursoHumanoComponent {
  @Output()
  sendToF = new EventEmitter<any>();
  @Input() edit: any;
  @Input() empresa_id: any;

  // @Output()
  // messageToF = new EventEmitter<string>();
  form: any = FormGroup;
  loading = false;

  empresas: any = [];
  areas: any = [];
  posiciones: any = [];
  loadedForm: any = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastrS: ToastrService,
    private validatorsS: ValidatorsService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getRecursos();
  }
  formC() {
    if (!this.edit?.empresa_id) {
      this.edit.empresa_id = this.empresa_id;
    }
    {
      this.form = this.formBuilder.group({
        id: [this.edit?.id],
        area_id: [this.edit?.area_id, [Validators.required]],
        posicion_id: [this.edit?.posicion_id, [Validators.required]],
        empleados: [
          this.edit?.empleados,
          [Validators.required, this.validatorsS.number],
        ],
        sueldo: [
          this.edit?.sueldo,
          [Validators.required, this.validatorsS.number],
        ],
        empresa_id: [this.edit?.empresa_id, [Validators.required]],
      });
    }
    this.loadedForm = true;
  }
  closeModal() {
    this.sendToF.emit({ action: 'closeModal' });
  }

  getRecursos() {
    this.http.get(`${environment.api_url}recursos-humanos-recursos`).subscribe(
      (response: any) => {
        console.log('response');
        console.log(response);
        console.log(response);
        console.log(response);
        console.log('response xxxx');

        this.empresas = response.empresas;
        this.areas = response.areas;
        this.posiciones = response.posiciones;
        this.loading = false;
        this.formC();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  store() {
    this.loading = true;
    this.form.markAllAsTouched();

    if (this.form.status == 'INVALID') {
      this.loading = false;
      return;
    }

    this.http
      .post(`${environment.api_url}recursos-humanos`, this.form.value)
      .subscribe(
        (response: any) => {
          this.sendToF.emit({ action: 'msg-success', value: response.message });
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
